# Setup Guide

## Prerequisites

- Node.js 22+
- npm
- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (for production deployment)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (included via dev dependencies)

---

## Local development

```bash
# 1. Install dependencies
npm install

# 2. Create local secrets
cp .dev.vars.example .dev.vars
```

Edit `.dev.vars`:

```env
JWT_SECRET=a-random-secret-at-least-32-chars-long
ALLOW_REGISTRATION=true
```

```bash
# 3. Apply database migrations locally
npm run db:migrate:local

# 4. Start the dev server
npm run dev
```

Open **http://localhost:5173** — both the React frontend and the Hono API run on the same port via Vite's Cloudflare integration.

### Local architecture

```
Vite dev server (port 5173)
  ├── React frontend (HMR via Vite)
  └── Cloudflare Worker (via wrangler --remote)
        └── Miniflare D1 (SQLite, local file)
```

The Worker and D1 run locally through Miniflare — no Cloudflare account needed for development.

### Seeding data

Registration is gated by `ALLOW_REGISTRATION`. Set it to `true` in `.dev.vars`, register one account, then set it back to `false`.

---

## Deployment (Cloudflare Workers)

### 1. Prerequisites

```bash
# Authenticate wrangler with your Cloudflare account
npx wrangler login

# Verify
npx wrangler whoami
```

### 2. Create the D1 database

```bash
npx wrangler d1 create tracker-db
```

Copy the returned `database_id` and paste it into `wrangler.jsonc`:

```jsonc
"d1_databases": [{
  "binding": "DB",
  "database_name": "tracker-db",
  "database_id": "<your-database-id>",
  "migrations_dir": "migrations"
}]
```

### 3. Apply migrations to production

```bash
npm run db:migrate:remote
```

### 4. Set secrets

```bash
npx wrangler secret put JWT_SECRET
# Generate one with: openssl rand -base64 32
# At least 32 characters — this is ENFORCED, not advisory. A missing or short
# secret makes the app refuse to issue sessions (it would otherwise sign them
# with an empty key, which anyone could forge).

npx wrangler secret put ALLOW_REGISTRATION
# Set to "true" initially, then "false" after creating your account
```

### 5. Deploy

```bash
npm run deploy
```

Your app is now live at `https://tracker.<your-subdomain>.workers.dev`.

### 6. Custom domain (optional)

```bash
npx wrangler deploy --routes "https://tracker.yourdomain.com/*"
```

Or add the domain in the Cloudflare dashboard under **Workers & Pages > tracker > Triggers**.

---

## CI/CD

The repo includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs on every push/PR:

- TypeScript type checking (`npm run typecheck`)
- Integration tests (`npm test`)

To deploy automatically from CI, add these [repository secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions):

| Secret | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Workers & D1 permissions |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |

Then uncomment or add a deploy step in `.github/workflows/ci.yml`:

```yaml
- name: Deploy
  run: npm run deploy
  env:
    CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

---

## Forking

To run your own instance:

1. Fork the [repo](https://github.com/Patel230/tracker)
2. Clone your fork
3. Follow steps 1–5 above

The project is MIT-licensed — no attribution required, but appreciated.
