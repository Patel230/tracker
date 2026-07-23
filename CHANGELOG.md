# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

### Security

- **Logout and account deletion now actually clear the cookie over HTTPS.** `clearSession` forwarded only `{ path: "/" }` to `deleteCookie`, so the `maxAge:0` Set-Cookie it emitted dropped `Secure` (and `SameSite`). A browser ignores a non-Secure deletion against the existing Secure cookie, so on production HTTPS the `tracker_auth` cookie survived logout and account-delete and kept authenticating for up to 30 days. The cookie options are now built in one place (`sessionCookieOpts`) shared by `createSession` and `clearSession`, so the two can't drift again. The test suite used to mask this by capturing only `name=value` from the Set-Cookie header.
- **Added HSTS and Permissions-Policy to `/api/*` responses.** The CHANGELOG previously claimed "security headers on both static assets and `/api/*`", but the API middleware set only CSP/nosniff/Referrer/X-Frame-Options. `/api/*` now matches `public/_headers`.

### Fixed

- **`/reminders/upcoming` no longer drops reminders on the 7-day boundary.** `due_at` is ISO-T (`…T…Z`) but the cutoff was `datetime('now','+7 days')` — space-separated, no `Z` — and a lexicographic compare at the 8th character (`'T'` vs `' '`) excluded same-day in-window reminders. Cutoffs are now `strftime('%Y-%m-%dT%H:%M:%SZ', …)`. Same fix applied to the stats weekly 90-day cutoff, which was over-including `applied_at` rows near the boundary.
- **Demoted jobs no longer drag on the response rate and weekly chart.** `applied_at` is a permanent "first applied" stamp (never cleared on demotion, so history is retained), but the response-rate denominator and the weekly volume query gated on `applied_at IS NOT NULL` alone — a job moved Applied→Wishlist stayed in both. They now also gate on `status = 'applied'`.
- **`salary_min` may no longer exceed `salary_max`.** Validated on create and on patch (server-side, with a field-named error) and in the job drawer's details form.
- **Job drawer mutating calls no longer reject unhandled.** Status change, archive, delete, and every child-resource add/edit/delete now wrap the server call in try/catch with an inline error banner and rollback of optimistic UI. A failed status change reverts the select to the job's real status; a failed reminder "complete" restores the item instead of leaving it gone locally for up to 5 minutes.
- **Reminder `complete` from the global banner now rolls back on failure** instead of vanishing silently until the next 5-minute poll; a load or complete failure now surfaces a banner.
- **`new Date(dueAt).toISOString()` can no longer throw on a partial/malformed datetime-local input** — invalid values are caught before submit and shown inline.
- **Board now shows an error/retry state on a failed `/jobs` fetch** instead of silently rendering five empty columns. Archived jobs are also filtered out of local state immediately on archive rather than lingering on the board until a reload.

### Changed

- **The colorblind-safe pipeline palette is now actually the documented Okabe-Ito set.** `STATUS_HEX` had been dead code; every rendered status used a different set of generic saturated tokens whose deutan/tritan separation was unverified. The `--color-brut-*` tokens now mirror Okabe-Ito (`applied` uses sky-blue `#56B4E9` rather than blue `#0072B2`, which fails WCAG 4.5:1 with black text on it). Verified ≥4.5:1 in both directions (black text on the color, and the color as text on the dark background) for all five stages.
- **Job cards and table rows are keyboard-activatable** (`role="button"`, `tabIndex`, Enter/Space), and the account menu has proper `role="menu"`/`aria-expanded` semantics plus Escape-to-close with focus return — the board and table were mouse-only despite the app investing in focus traps elsewhere.

### Added

- **Edit-in-place UI for contacts, activities, and reminders** — the backend already supported `PATCH` on these, but the client only created and deleted them; fixing a typo meant delete-and-recreate. Each child row now has an inline edit mode. The contact form also collects `phone` and `notes`, which the schema supported but the form omitted.
- **Top-level list routes** `GET /api/contacts`, `GET /api/activities`, `GET /api/reminders` (user-scoped, joined through jobs), and `?limit=` clamps on `GET /jobs` (default 100, max 200), the per-job child GETs (default 200, max 500), and `/reminders/upcoming`. No list endpoint is now unbounded.
- **Database indexes** on `jobs(user_id, applied_at)` and `jobs(user_id, archived, status)` (`migrations/0004_indexes.sql`, idempotent) backing the stats and list queries.
- **CI now deploys to Cloudflare Workers on push to `main`.** PRs still only build+test; migrations stay manual (see deploy prerequisites).

### Removed

- Dead `isUnauthorized` export from `src/lib/api.ts`, orphaned after the centralized `onUnauthorized` 401 handler made per-call 401 branching redundant.

> **Upgrading:** run `npm run db:migrate:remote` (adds the `0004_indexes.sql` indexes). No data or secret changes required.



- **Refuse to start with a missing or weak `JWT_SECRET`.** An unset secret produced a zero-length signing key that `jose` would still sign *and verify* with, so a deploy that forgot to set it would have accepted forged sessions for any account, silently. A secret of at least 32 characters is now required.
- **Replaced bcryptjs with PBKDF2 (WebCrypto).** bcrypt cost-10 burns ~74ms of CPU; the Workers Free plan allows 10ms per request, so login and registration hard-failed on any fork deployed there. Legacy bcrypt hashes still verify and are re-hashed on next login. See `worker/lib/password.ts` for the iteration count and the trade-off behind it.
- **Password changes now revoke existing sessions** via `users.token_version`. Previously a session stayed valid for its full 30 days after the password changed.
- **Closed a user-enumeration timing leak on login** — an unknown email skipped hashing and answered measurably faster than a real account.
- **Rate limited the credential endpoints** (10/min/IP).
- **Rejected `javascript:` and `data:` URLs** on `job.url` and `contact.linkedin`, both of which are rendered into an `<a href>`. `contact.linkedin` had no URL validation at all.
- **Added a CSP** and security headers, on both static assets and `/api/*` responses, and self-hosted the font so the app makes no third-party request.
- **Registration no longer creates an orphan account when `JWT_SECRET` is broken.** It hashed and INSERTed the user, then threw while signing the session — leaving a row behind that turned the retry into a `409` for an account nobody could log into. Session config is now validated before any handler writes.
- **`PBKDF2_ITERATIONS` is configurable**, so a Paid deployment can run OWASP's 600k. Existing hashes upgrade on next login rather than needing a reset.

### Fixed

- Registration races return `409` instead of `500`.
- `/api/stats` excludes archived jobs from *every* stat; previously only the funnel filtered them, so archiving a job removed it from the funnel while it still dragged on the response rate.
- Changing status from the job drawer now reorders correctly — it went through `PATCH /jobs/:id`, which never updated `sort_order`, so the card landed at an arbitrary slot in its new column.
- Validation errors name the field that actually failed instead of always saying "Company and title are required".

### Changed

- The API is split into explicit public and protected routers, so a route's protection follows from where it is mounted rather than which line it sits on.
- CI now runs the build.

> **Upgrading:** run `npm run db:migrate:remote` (adds `users.token_version`) and make sure `JWT_SECRET` is at least 32 characters before deploying.

## [0.1.0] — 2026-07-14

### Added

- Kanban board with drag-and-drop (Wishlist → Applied → Interview → Offer → Rejected)
- Table view with sorting, filtering, and search
- Analytics dashboard with pipeline funnel, response rate, weekly volume, avg days to interview
- Job detail drawer with Details, Timeline, Contacts, and Reminders tabs
- Salary tracking with multiple currencies and periods
- Email/password authentication with JWT session cookies
- Change password and account deletion
- Reminders with global upcoming banner and per-job reminders
- Colorblind-safe pipeline stage colors (Okabe-Ito palette)
- Focus trap for modals and drawer (WCAG)
- Error boundary with reload

### Infrastructure

- Cloudflare Workers + D1 (SQLite) deployment
- Vite 6 build with React 19 + Tailwind CSS v4
- Integration tests with Vitest + Miniflare D1
- CI/CD via GitHub Actions
