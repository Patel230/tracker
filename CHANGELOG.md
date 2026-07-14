# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

### Security

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
