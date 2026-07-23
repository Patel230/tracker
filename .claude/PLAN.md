# Tracker — Implementation Plan (all audit findings, one by one)

Locked decisions:
- **applied_at** = permanent "first applied" timestamp. Never clear on demotion; instead gate stats queries on `status='applied'` (+responded) so a demoted job stops dragging on responseRate/weekly without losing history.
- **CVD palette** = wire actual Okabe-Ito values as the real `--color-brut-*` tokens, re-verify contrast.
- **Scope** = everything including big P2 (contact/activity/reminder edit UI, pagination, indexes, CI deploy).

Order is by risk/dependency: P0 correctness first (each pinned by a regression test), then backend completeness, then frontend, then a11y, then infra/docs. Every change keeps the existing test suite green and adds regression tests for each bug fixed. Run `npm run typecheck`, `npm test`, `npm run build` after each milestone.

---

## MILESTONE A — P0 backend correctness + security (small, surgical, each test-pinned)

### A1. Fix `clearSession` omitting `Secure` (Bug #1) — `worker/lib/auth.ts`
`createSession` sets `secure: new URL(c.req.url).protocol === "https:"`, but `clearSession` calls `deleteCookie(c, AUTH_COOKIE, { path: "/" })` with no flags. hono's `deleteCookie` forwards `opt` into a `maxAge:0` Set-Cookie, so over HTTPS the deletion lacks `Secure` and browsers ignore it.
- **Change**: `clearSession` reads the protocol the same way `createSession` does and passes `{ secure: new URL(c.req.url).protocol === "https:", sameSite: "Lax", path: "/" }`.
- Extract a shared `cookieOpts(c)` helper used by both `createSession` and `clearSession` so the flags can't drift again (DRY + makes the bug structurally impossible).

### A2. Fix `/reminders/upcoming` 7-day boundary (Bug #2) — `worker/routes/items.ts:63`
`due_at` is ISO-T (`...T...Z`) but the cutoff `datetime('now','+7 days')` is space-format; lexicographic compare at char 8 excludes same-day in-window reminders.
- **Change**: cutoff → `strftime('%Y-%m-%dT%H:%M:%SZ','now','+7 days')`. Compare ISO-T to ISO-T.

### A3. Fix stats weekly 90-day boundary (Bug #8) — `worker/routes/stats.ts:54`
Same T-vs-space mismatch; an `applied_at` ~9h older than the 90-day cutoff is included in the oldest weekly bucket.
- **Change**: cutoff → `strftime('%Y-%m-%dT%H:%M:%SZ','now','-90 days')`.

### A4. applied_at permanent-semantics + stats gating (Bug #3) — `worker/routes/stats.ts`
Decision: `applied_at` stays a permanent "first applied" stamp (no change to jobs.ts stamp logic). A demoted job (Applied→Wishlist/Rejected) currently still counts in `responseRate` denominator and weekly because both gate on `applied_at IS NOT NULL`. Gate on status instead.
- **responseRate query** (`stats.ts:26-36`): denominator becomes `... AND archived = 0 AND status = 'applied' AND applied_at IS NOT NULL`. (Responded numerator already counts interview/offer via status or activities — keep, but a rejected job that had an interview still "responded", which is correct; the fix is the *denominator* only, so a demoted-to-wishlist job leaves the denominator. A demoted-to-rejected job: still in denominator? No — "response rate of applied jobs": a job now rejected is no longer "applied". Gate denominator on `status = 'applied'`.)
  - Keep responded numerator as-is (interview/offer status OR has interview activity) — it measures "got a response", independent of current status.
- **weekly query** (`stats.ts:53-54`): add `AND status = 'applied'` so the weekly chart counts applications, not "anything ever marked applied".
- **avgDaysToInterview** (`stats.ts:38-48`): already scoped to `applied_at IS NOT NULL` and joins activities for first_iv — a demoted job's first_iv is still valid; leave (it measures time-to-interview, independent of current status). Confirm no change needed.
- Net: responseRate and weekly stop double-counting demoted jobs; funnel already groups by current status so it's unaffected.

### A5. Regression tests — `worker/api.test.ts`
Add to the `jobs` describe block:
1. **logout clears the Secure cookie over https**: register via a client whose requests carry `X-Forwarded-Proto: https` (or assert on the raw Set-Cookie from `app.request` directly, not through the cookie-stripping `client()` helper). Assert the logout `set-cookie` contains `Secure` and `Max-Age=0`. Also assert account-delete's `set-cookie` carries `Secure`.
2. **reminders/upcoming includes a reminder due ~6d23h out AND excludes one due 7d1h out** (boundary test). Use `new Date(Date.now() + 6*86400000 + 23*3600000).toISOString()` (in) and `+7*86400000 + 3600000` (out). Assert the in-one is present and the out-one absent.
3. **applied_at demotion stops counting in stats**: create job, move to applied (stamps applied_at), move back to wishlist, then GET /stats. Assert `funnel.applied === 0`, `funnel.wishlist === 1`, `responseRate === null` (no applied jobs), and `weekly` total === 0.

---

## MILESTONE B — Backend completeness (big P2)

### B1. Pagination on list endpoints (Missing #6) — `worker/routes/jobs.ts`, `worker/routes/items.ts`, `worker/routes/stats.ts`(upcoming)
Add `?limit` (max 100, default 50) and `?cursor` to `GET /jobs` and `GET /reminders/upcoming`. Keep child per-job GETs unbounded (scoped to one job, always small).
- `GET /jobs`: respond shape changes from `Job[]` to `{ items: Job[]; nextCursor: string | null }`. **This is a client-breaking change** → update `useFetch`/Board/TableView consumers in Milestone D. Add `?archived=1` still supported.
- Simpler alternative to avoid a sweeping client rewrite: keep `Job[]` response but cap with `LIMIT 100` and add `?limit`/`?offset`. Decision: use **offset pagination returning `{items, nextCursor}`** since the user asked for pagination done right; update all 3 consumers (Board, TableView, Dashboard-upcoming-reminders). nextCursor = last row's `(status, sort_order, id)` composite; `?cursor=` re-presents it.

Actually — reconsider. Offset pagination on a re-orderable kanban is fine for a personal tool. Given the cost/benefit and the user's "no mistakes" directive, use the **simpler, lower-risk approach**: add `LIMIT 100` server-side default + `?limit` clamp, keep returning a bare `Job[]`. This bounds payload without a contract rewrite. Document the cap. If a user exceeds 100 active jobs (rare for a student tracker), they'd see the first 100 — acceptable for now and flagged in CHANGELOG. **Decision: bare-array + LIMIT clamp, no cursor.** Revisit later if needed.

Apply:
- `GET /jobs` → `LIMIT ?` bound, clamp 1..200, default 100.
- `GET /jobs/:id/contacts|activities|reminders` → `LIMIT ?` default 200 (one job, small).
- `GET /reminders/upcoming` → already bounded to 7-day window; add `LIMIT 200` safety cap.

### B2. DB indexes (Missing #5) — new migration `migrations/0004_indexes.sql`
- `CREATE INDEX idx_jobs_applied_at ON jobs(user_id, applied_at);`
- `CREATE INDEX idx_jobs_archived ON jobs(user_id, archived, status);`
- (Existing `idx_jobs_user_status` covers the funnel/board query.)
- Idempotent: use `CREATE INDEX IF NOT EXISTS`.

### B3. Top-level list routes for child resources (Missing #7) — `worker/routes/items.ts`
Add `GET /contacts`, `GET /activities`, `GET /reminders` (all user-scoped, joined through jobs) for completeness + a future "all my contacts/reminders" view. Low priority but rounds out the API surface the `api.delete()` body param hinted at.
- Each: `SELECT ... FROM <t> JOIN jobs j ON j.id = <t>.job_id WHERE j.user_id = ? ORDER BY <t>.created_at DESC LIMIT ?`.
- Mount under `protectedApi`.

---

## MILESTONE C — Frontend error handling + a11y (P1) + contacts/phone/notes (P2)

### C1. JobDrawer: wrap all mutating calls in try/catch + rollback (Bugs #5, #11, #12)
Add a small `useDrawerError`-style local error state in `JobDrawer` (header-level error banner) and per-tab.
- `patch()` (line 70): try/catch; on failure set header error, don't call `onChange` with stale.
- `changeStatus()` (line 78): capture prev status; on failure, revert via `onChange([{...job, status: prevStatus}])` + error banner. (The drawer's `job` prop is the source of truth; Board/TableView's `onChange` patches local list.)
- `remove()` (line 83): try/catch; on failure show error, don't close drawer / don't call `onDelete`.
- Archive button (line 131): goes through `patch()` → covered by C1's `patch` fix.
- TimelineTab/ContactsTab/RemindersTab `remove()` (lines 320, 413, 510): try/catch; on failure keep the item in local state + tab-level error.
- RemindersTab `complete()` (line 503) + RemindersProvider `complete()` (RemindersProvider.tsx:49): optimistic + rollback on failure (restore item, show error).

### C2. Reminder `complete` rollback — `src/components/RemindersProvider.tsx:49` + `JobDrawer.tsx:503`
- Provider: capture the removed reminder; on `.catch`, re-add it and surface a transient error (add `error` to context, consumed by RemindersBanner).
- Drawer RemindersTab: same pattern — keep item, show inline error.

### C3. `new Date(dueAt).toISOString()` throw guard (Bug #12) — `JobDrawer.tsx:496`
- Validate `dueAt` produces a finite Date before `.toISOString()`; if invalid, set inline error "Pick a valid date and time" and return without submit.

### C4. salary_min > salary_max validation (Bug #13) — `JobDrawer.tsx` DetailsTab submit + server
- Client: in `submit()`, if both present and `Number(min) > Number(max)`, setError "Salary min can't exceed max" and return.
- Server: add a `.refine` to `jobFields` (jobs.ts:28) checking `salary_min <= salary_max` when both set, with field-named error. This also covers API-only callers.

### C5. Contact `phone` + `notes` inputs + contact edit UI (Missing #1, #2) — `JobDrawer.tsx` ContactsTab
- Add `phone` and `notes` to the add-form (grid → 2 cols, add rows). `form` state gains `phone`, `notes`.
- Add an **edit mode** per contact: click a contact's row → inline editable fields (name/role/email/phone/linkedin/notes) + Save/Cancel; Save calls `PATCH /contacts/:id` (already exists). Cancel restores.
- Same edit pattern for **activities** (TimelineTab: edit title/notes via `PATCH /activities/:id`) and **reminders** (RemindersTab: edit note/due_at via `PATCH /reminders/:id`).
- Reuse the existing ownership-enforced PATCH endpoints — no backend change needed.

### C6. Board error/retry UI (Bug #6) — `src/pages/Board.tsx:34-38`
Mirror Dashboard/TableView: add `error` state; in catch set `error=true`; render a centered "Couldn't load your board." + Retry button calling `load()` instead of empty columns.

### C7. Keyboard activation for JobCard + TableView rows (Bug #7) — `JobCard.tsx:64`, `TableView.tsx:144`
- JobCard: add `role="button"`, `tabIndex={0}`, `onKeyDown` (Enter/Space → `onOpen`). But JobCard is also a dnd-kit sortable — adding tabIndex/role is fine (listeners are separate). Keep `cursor-grab`.
- TableView row `<tr>`: add `role="button"`, `tabIndex={0}`, onKeyDown Enter/Space → `setOpenJobId(j.id)`.

### C8. Avatar dropdown a11y (Bug #10) — `src/App.tsx:85-121`
- Add `role="menu"` to the dropdown container, `aria-haspopup="menu"` + `aria-expanded={menuOpen}` on the trigger button.
- Escape-to-close: add a keydown listener (or reuse `useFocusTrap`? — no, the dropdown isn't a modal; a simple Escape handler via `useEffect` on `menuOpen` is lighter).
- Roving focus is overkill; menu items are real `<button>`s (already focusable). Just ensure Escape closes and focus returns to the trigger.

### C9. Okabe-Ito palette wired as real colors (Bug #4) — `src/index.css` + `src/lib/theme.ts`
- Replace the five `--color-brut-{wishlist,applied,interview,offer,rejected}` tokens with Okabe-Ito values: wishlist `#E69F00`, applied `#0072B2`, interview `#009E73`, offer `#CC79A7`, rejected `#D55E00`.
- Contrast check: text on these is `--color-primary-foreground` (#000). Verify each ≥4.5:1 (these Okabe-Ito hues are bright; black-on-them should pass, but `#0072B2` blue and `#CC79A7` pink are darker — recompute luminance; if any fails, that specific token pairs with white `--color-foreground` instead, and update `STATUS_TEXT` for that status). The Dashboard Funnel text uses `color: var(--color-brut-${s})` on the dark `--color-background` (#0a0a0a) — verify those text colors ≥4.5:1 on near-black (Okabe-Ito colors are chosen to be distinguishable on white; on black some may be too dark — check `#0072B2`/`#009E73` on #0a0a0a; if fail, lighten the *text* usage via a separate lighter set while keeping the *bg* tokens Okabe-Ito).
- `STATUS_HEX` becomes the source the CSS tokens are derived from — keep the export, add a comment that the CSS tokens mirror it, and (optionally) have a tiny build-time constant. Simplest: keep `STATUS_HEX` as documentation/source-of-truth and set the CSS tokens to the same hexes manually with a comment pointing at `STATUS_HEX`.
- `--color-brut-note` (#64748b) and `--color-brut-system` (#78716c) stay (they're mid-tone activity colors, not pipeline stages).

### C10. Board archived-filter on archive (Bug #14) — `src/pages/Board.tsx`
- In the JobDrawer `onChange`/archive path, Board receives the updated job via `onChange([updatedJob])`. After an archive, the updated job has `archived=1`; Board's `GET /jobs` excludes archived, but local state still holds it. Filter client-side: in the `columns` useMemo, skip jobs where `archived === 1`. (Minimal, consistent with server behavior.)

---

## MILESTONE D — Frontend pagination consumer + dead code (P2)

### D1. Consume `?limit` on Board/TableView (pairs with B1)
- Board/TableView: `GET /jobs` still returns `Job[]` (B1 chose bare-array + cap) — no consumer change needed beyond awareness. If B1 stays bare-array, **D1 is a no-op** (confirm during implementation).

### D2. Remove dead `isUnauthorized` export (Missing #8) — `src/lib/api.ts:9-10`
- Delete `isUnauthorized`. Verify no imports (grep confirmed none). Keeps `ApiError` (used).

---

## MILESTONE E — Infra + docs (P2)

### E1. HSTS + Permissions-Policy on `/api/*` (Bug #17) — `worker/index.ts:21-25`
- Add `Strict-Transport-Security` and `Permissions-Policy` headers in the `/api/*` middleware `finally` block, matching `public/_headers`. Now the CHANGELOG's "security headers on both" claim is true.

### E2. CI deploy step (Missing #6) — `.github/workflows/ci.yml`
- Add a `deploy` job (needs: ci) that runs `npx wrangler deploy` on pushes to `main`, gated on `secrets.CLOUDFLARE_API_TOKEN` + `secrets.CLOUDFLARE_ACCOUNT_ID`. Use `if: github.event_name == 'push'` so PRs don't deploy. Run `db:migrate:remote` before deploy? — **no**, migrations are manual per the project's deploy-prerequisites memory (token_version migration must be applied deliberately). Deploy only the Worker; migrations stay manual.
- Add a second job `migrate` documentation? No — keep migrations manual (per memory).

### E3. Docs accuracy pass — `docs/API.md`, `docs/ARCHITECTURE.md`, `README.md`, `CHANGELOG.md`
- API.md: document the new top-level child list routes (B3), `?limit` (B1), and the `applied_at` permanent-semantics note (A4).
- CHANGELOG: add Unreleased entries for A1–A4, B1–B3, C1–C10, E1, E2. Be specific (each references the file/line + why).
- README: the CVD-palette line now becomes accurate (Okabe-Ito is really shipped). No other README change.
- ARCHITECTURE: note the `cookieOpts` shared helper and the pagination cap.

---

## Verification gates (after each milestone)
- `npm run typecheck` — must pass.
- `npm test` — existing suite green + new regression tests pass.
- `npm run build` — bundles cleanly (CI's build step exists to catch this).
- Manual: spot-check the drawer's error rollback (kill network, archive/delete), Board retry, keyboard-open a card, Okabe-Ito contrast in light+dark.

## Risk notes
- **B1 pagination**: chose bare-array + LIMIT cap specifically to avoid a sweeping `{items,nextCursor}` client rewrite that would touch Board/TableView/Dashboard — lower risk for "no mistakes".
- **C9 Okabe-Ito**: the highest-uncertainty item is contrast on the dark theme (text usage on #0a0a0a). Will compute luminance per color during implementation and adjust the *text* path only if a color fails, keeping bg tokens Okabe-Ito.
- **C5 contact edit UI**: largest new frontend surface; implement edit-in-place (toggle row to form) to avoid modal nesting inside the drawer.
