export const meta = {
  name: 'tracker-deep-audit',
  description: 'Deep audit of tracker codebase: implemented vs partial vs missing, plus bugs/gaps',
  phases: [
    { title: 'Audit', detail: 'parallel readers each own a slice; report implemented/partial/missing + bugs' },
    { title: 'Synthesize', detail: 'merge into one cross-cutting report with priorities' },
  ],
}

const CONTEXT = `
Project: "tracker" — a free kanban-style job-application tracker for students.
Stack: React 19 + Vite + Tailwind v4 + dnd-kit (frontend); Hono on Cloudflare Workers + D1 (SQLite) + WebCrypto PBKDF2 + jose JWT + Zod (backend). Single worker serves API + SPA.
Repo root: /Users/lakshmanpatel/Desktop/ProjectAlpha/tracker

Feature set per README:
- Kanban board (drag jobs: Wishlist then Applied then Interview then Offer then Rejected)
- Table view (sort/filter/search)
- Analytics dashboard (funnel, response rate, weekly volume, avg days to interview)
- Job drawer (details/timeline/contacts/reminders)
- Salary tracking (multi-currency, hour/day/week/month/year periods)
- Reminders (per-job + global upcoming banner, completion tracking)
- Auth (email/password, JWT sessions, change password, account deletion)
- Colorblind-safe pipeline colors (Okabe-Ito)

Security posture (from CHANGELOG): JWT_SECRET min-length enforced, PBKDF2 (deliberate low iteration for Workers Free 10ms cap; 600k for Paid), token_version session revocation, login timing-leak fixed, rate limiting on credential endpoints, javascript:/data: URL rejection on job.url + contact.linkedin, CSP + security headers + self-hosted font, registration-orphan fix, public/protected router split.

Constraints to respect (from memory — DO NOT flag these as bugs to "fix"):
- PBKDF2 50k iterations is DELIBERATE for Workers Free 10ms CPU cap. Do NOT recommend raising it unconditionally.
- Closed registration (ALLOW_REGISTRATION gating) is intentional; other users self-host. Not a gap.
- Deploy requires a 32+ char JWT_SECRET + token_version migration.

Your job: read your assigned files DEEPLY. For your slice, report:
1. IMPLEMENTED — what actually works and is wired end-to-end (client to API to DB).
2. PARTIAL — started but incomplete, stubbed, or broken in some path.
3. MISSING — features referenced in docs/README/types but with no implementation, or obviously-needed functionality absent.
4. BUGS/RISKS — concrete defects, inconsistencies, security/edge-case gaps, dead code, or client/server contract mismatches. Be specific with file:line.

Be precise and cite file:line. Distinguish "documented but not implemented" from "implemented but not documented". Only flag real issues you can point to — do not invent problems. Note any client/server type contract drift vs shared/types.ts.
`

const FINDINGS_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['slice', 'implemented', 'partial', 'missing', 'bugs', 'notes'],
  properties: {
    slice: { type: 'string', description: 'which slice this covers' },
    implemented: {
      type: 'array',
      items: { type: 'object', additionalProperties: false, required: ['item', 'where'],
        properties: { item: { type: 'string' }, where: { type: 'string', description: 'file:line evidence' } } },
      description: 'what works end-to-end',
    },
    partial: {
      type: 'array',
      items: { type: 'object', additionalProperties: false, required: ['item', 'where', 'gap'],
        properties: { item: { type: 'string' }, where: { type: 'string' }, gap: { type: 'string', description: 'what is incomplete' } } },
    },
    missing: {
      type: 'array',
      items: { type: 'object', additionalProperties: false, required: ['item', 'evidence'],
        properties: { item: { type: 'string' }, evidence: { type: 'string', description: 'why you think it is missing / where it would be' } } },
    },
    bugs: {
      type: 'array',
      items: { type: 'object', additionalProperties: false, required: ['title', 'where', 'detail', 'severity'],
        properties: {
          title: { type: 'string' },
          where: { type: 'string', description: 'file:line' },
          detail: { type: 'string', description: 'concrete failure scenario + why' },
          severity: { type: 'string', enum: ['critical', 'high', 'medium', 'low', 'nit'] },
        } },
    },
    notes: { type: 'string', description: 'any other observations for the synthesis' },
  },
}

const SLICES = [
  {
    key: 'backend-auth-security',
    label: 'backend: auth, security, password, ratelimit',
    prompt: CONTEXT + `

YOUR SLICE: Backend auth + security layer. Read these files deeply:
- worker/index.ts (worker entry, middleware, router mounting, CSP/headers, secret bootstrap)
- worker/lib/auth.ts (JWT sign/verify, requireAuth, token_version check, cookie config)
- worker/lib/password.ts (PBKDF2 + legacy bcrypt verify + rehash)
- worker/lib/ratelimit.ts (rate limit binding)
- worker/routes/auth.ts (register/login/logout/me/change-password/account delete)
- worker/env.d.ts, wrangler.jsonc (env bindings, secrets, rate-limit binding)
- migrations/0001_init.sql, 0003_token_version.sql (schema for users + token_version)
- public/_headers (security headers)

Report implemented/partial/missing + bugs for auth and security only. Check: cookie flags (Secure/SameSite/HttpOnly/path), JWT expiry, token_version enforcement on EVERY protected route, change-password revocation, account-delete auth, rate-limit optional-binding correctness, CSP completeness, secret bootstrap ordering, error status codes, user-enumeration. Cross-check against CHANGELOG claims.`,
  },
  {
    key: 'backend-jobs-items-stats',
    label: 'backend: jobs, child items, stats',
    prompt: CONTEXT + `

YOUR SLICE: Backend job + child resource + stats routes. Read deeply:
- worker/routes/jobs.ts (CRUD, move, archived filter, status to applied_at, activity logging)
- worker/routes/items.ts (childRoutes/itemRoutes factory for contacts/activities/reminders; ownership enforcement; /reminders/upcoming; /reminders/:id/complete)
- worker/routes/stats.ts (funnel, totalActive, responseRate, offers, avgDaysToInterview, weekly)
- migrations/0001_init.sql + 0002_salary_currency_period.sql (jobs/contacts/activities/reminders schema)
- shared/types.ts (contract)

Report implemented/partial/missing + bugs. Check: ownership enforcement on every child query (join through jobs.user_id), move sort_order renumbering correctness and races, archived exclusion consistency across stats, status-change activity logging, salary field validation, URL sanitization on write AND on the upcoming-reminders join, pagination/limits absent, input validation (Zod) coverage, NULL handling, SQL injection surface (parameterized?), response shape vs shared types. Be specific.`,
  },
  {
    key: 'frontend-pages-state',
    label: 'frontend: pages, routing, auth/theme context, data fetching',
    prompt: CONTEXT + `

YOUR SLICE: Frontend pages + app shell + state/data layer. Read deeply:
- src/App.tsx, src/main.tsx (routing, auth gate, providers)
- src/pages/Landing.tsx, Login.tsx, Dashboard.tsx, Board.tsx, TableView.tsx
- src/lib/auth.tsx (AuthContext: login/register/logout/me, token storage strategy)
- src/lib/api.ts, src/lib/useFetch.ts (API client, fetch wrapper, error handling, credentials)
- src/lib/theme.ts (theme system)
- src/components/RemindersProvider.tsx, RemindersBanner.tsx (global reminders polling)
- src/components/ErrorBoundary.tsx

Report implemented/partial/missing + bugs. Check: auth gate correctness (redirects, protected routes), token handling (cookie vs localStorage — does it match backend httpOnly cookie?), credential inclusion on fetch (credentials include?), error/loading states, optimistic updates and rollback, polling interval/cleanup, theme persistence, route coverage vs README features, 401 handling redirect to login, accessibility (focus trap usage), responsive design. Note any feature in README with no page/hook.`,
  },
  {
    key: 'frontend-components-drawer',
    label: 'frontend: JobDrawer, JobCard, KanbanColumn, UI primitives',
    prompt: CONTEXT + `

YOUR SLICE: Frontend components, especially the drawer + board DnD. Read deeply:
- src/components/JobDrawer.tsx (566 lines — 4 tabs: details/timeline/contacts/reminders; editing; activity timeline)
- src/components/JobCard.tsx, KanbanColumn.tsx (cards + DnD columns)
- src/components/ChangePasswordModal.tsx, DeleteAccountModal.tsx
- src/components/ui/badge.tsx, button.tsx, card.tsx, input.tsx (design-system primitives)
- src/components/Logo.tsx
- src/lib/useClickOutside.ts, useFocusTrap.ts (a11y hooks)
- src/index.css (brutalist theme tokens, color system)

Report implemented/partial/missing + bugs. Check: drawer tab completeness vs API, form validation client-side, optimistic DnD + server reconciliation (move endpoint), focus trap correctness, click-outside, controlled/uncontrolled inputs, salary UI (currency/period), reminder create/complete, contact CRUD UI, activity timeline rendering, color contrast (the recent commits touched this — check the centralized color system for leftover bg-primary/bg-foreground contrast gaps), dead/unused props. Be specific with file:line.`,
  },
  {
    key: 'tests-ci-docs-contract',
    label: 'tests, CI, docs, type contract, config',
    prompt: CONTEXT + `

YOUR SLICE: Tests, CI, docs, build config, and the client/server contract. Read deeply:
- worker/api.test.ts (572 lines — what is actually tested vs the API surface in docs/API.md)
- .github/workflows/*.yml (CI: what runs? typecheck/test/build/deploy? caching? secret handling?)
- docs/SETUP.md, CONFIG.md, ARCHITECTURE.md, API.md (accuracy vs actual code)
- vitest.config.ts, vite.config.ts, tsconfig*.json, wrangler.jsonc
- shared/types.ts vs the actual DB schema (migrations/*.sql) and vs worker route responses — flag drift
- README.md scripts vs package.json scripts

Report implemented/partial/missing + bugs. Specifically check:
- Test coverage gaps: which endpoints/paths have NO test (auth, jobs CRUD, move, child CRUD, stats, archived exclusion, ownership/403/404, URL rejection, rate limit).
- Contract drift: shared/types.ts fields vs migration columns vs API response (e.g. is archived 0/1 vs boolean? salary fields present everywhere? applied_at? sort_order?).
- Doc accuracy: does API.md match actual routes/status codes? Does ARCHITECTURE match the public/protected router split?
- CI: does it run typecheck + test + build? Is deploy gated? Any missing step the README promises?
- Config: env vars in docs vs env.d.ts vs wrangler.jsonc vs .dev.vars.example.
Be concrete and cite file:line.`,
  },
]

phase('Audit')
const sliceResults = await parallel(SLICES.map(s => () =>
  agent(s.prompt, { label: 'audit:' + s.key, phase: 'Audit', schema: FINDINGS_SCHEMA, effort: 'high' })
    .then(r => ({ ...r, sliceKey: s.key, sliceLabel: s.label }))
))

const valid = sliceResults.filter(Boolean)

phase('Synthesize')
const synthesis = await agent(
  CONTEXT + `

You are the synthesis lead. Below are ` + valid.length + ` deep-audit reports, one per codebase slice, each with implemented/partial/missing/bugs arrays. Merge them into ONE cross-cutting report for the user.

Reports (JSON):
` + JSON.stringify(valid, null, 2) + `

Produce a single consolidated report as a well-structured Markdown string (NOT a tool call — return the markdown text directly). Structure:

1. Executive summary — 2-3 sentences: overall state of the project.
2. What is implemented — grouped, deduplicated. Bullet list of working features with evidence.
3. Partially implemented — things started but incomplete. Each with the gap.
4. Missing / Not yet implemented — features referenced but absent, or obviously-needed gaps. Rank by value.
5. Bugs and risks — consolidated, DEDUPED across slices, ranked by severity (critical then high then medium then low then nit). Each: title, where (file:line), one-line failure scenario. Strip anything that contradicts the project's stated constraints (PBKDF2 iteration count is deliberate; closed registration is intentional; JWT_SECRET/token_version deploy prereqs).
6. Recommended next steps — a short prioritized backlog (P0/P1/P2), each item concrete and actionable.

Be honest and specific. Prefer fewer high-quality findings over padding. If a slice reported nothing in a category, say so. Cite file:line wherever possible. Return ONLY the markdown report.`,
  { label: 'synthesize', phase: 'Synthesize', effort: 'xhigh' }
)

return synthesis
