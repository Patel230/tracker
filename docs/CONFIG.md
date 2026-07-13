# Configuration Reference

## Environment variables

These go in `.dev.vars` for local development and are set via `wrangler secret put` in production.

| Variable | Required | Description |
|---|---|---|
| `JWT_SECRET` | Yes | Used to sign auth cookies. Must be at least 32 characters. |
| `ALLOW_REGISTRATION` | No | Set to `"true"` to allow new account signups. Defaults to `"false"`. |

### `ALLOW_REGISTRATION` pattern

This app is designed for solo use. Registration is gated so that only you can create an account:

1. Set `ALLOW_REGISTRATION=true`
2. Register your account
3. Set `ALLOW_REGISTRATION=false`

After that, no one else can sign up.

---

## Secrets (production)

Set with `wrangler secret put`:

```bash
npx wrangler secret put JWT_SECRET
npx wrangler secret put ALLOW_REGISTRATION
```

Secrets are encrypted at rest and injected as environment variables at runtime. They are **not** stored in `wrangler.jsonc`.

---

## D1 database

Created and managed through Wrangler:

```bash
npx wrangler d1 create tracker-db
```

The binding is configured in `wrangler.jsonc`:

```jsonc
"d1_databases": [{
  "binding": "DB",
  "database_name": "tracker-db",
  "database_id": "<id from create command>",
  "migrations_dir": "migrations"
}]
```

Migrations live in `migrations/` and are applied with:

```bash
npm run db:migrate:local   # local dev
npm run db:migrate:remote  # production
```

### Schema

See `migrations/0001_init.sql` and `migrations/0002_salary_currency_period.sql` for the full schema. The database has five tables:

| Table | Purpose |
|---|---|
| `users` | Email + bcrypt password hash |
| `jobs` | Job applications with status, salary, metadata |
| `contacts` | Per-job contact people |
| `activities` | Per-job timeline entries |
| `reminders` | Per-job due-date reminders |

All child tables use `ON DELETE CASCADE` from their parent.

---

## Wrangler configuration

Key fields in `wrangler.jsonc`:

| Field | Description |
|---|---|
| `name` | Worker name (also used in the default deploy URL) |
| `main` | Entry point (`worker/index.ts`) |
| `compatibility_date` | Workers runtime date |
| `assets.not_found_handling` | Set to `"single-page-application"` for SPA routing |
| `assets.run_worker_first` | Array of path patterns that should hit the Worker before the asset store |
| `observability.enabled` | Enables logging and tail support |
