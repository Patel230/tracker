<div align="center">
  <h1> Tracker</h1>
  <p><strong>Free kanban-style job application tracker for students</strong></p>
  <p>
    <img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" alt="React"/>
    <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/Cloudflare%20Workers-F38020?logo=cloudflare&logoColor=white" alt="Cloudflare Workers"/>
    <img src="https://img.shields.io/badge/D1-FF9E00?logo=cloudflare&logoColor=white" alt="D1"/>
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
    <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" alt="Vite"/>
  </p>
</div>

##  Overview

Tracker replaces scattered tabs and spreadsheets with a single organized board for your job search. Drag applications through your pipeline, log contacts and activities, track salary data, and view analytics — all in one place.

##  Features

- **Kanban Board** — Drag jobs across pipeline stages (Wishlist → Applied → Interview → Offer → Rejected)
- **Table View** — Sort, filter, and search all your jobs in a grid
- **Analytics Dashboard** — Pipeline funnel, response rate, weekly volume, avg days to interview
- **Job Drawer** — Four-tab detail panel: details, timeline, contacts, reminders
- **Salary Tracking** — Multi-currency with hourly/daily/weekly/monthly/yearly periods
- **Reminders** — Per-job and global upcoming reminders with completion tracking
- **Authentication** — Email/password with JWT sessions, change password, account deletion

## 󰒲 Architecture

```
                           Cloudflare Worker
                           ┌──────────────────────────┐
  /api/*  ────────────────►  Hono API Router          │
                           │  ├── /api/auth/*         │
                           │  ├── /api/jobs/*         │
                           │  ├── /api/stats          │
                           │  └── /api/reminders/*    │
                           │                          │
  /* (non-API) ──────────►  ASSETS binding ──► SPA    │
                           └──────────────────────────┘
```

## 󰚰 Quick Start

```bash
# Install
cd tracker && npm install

# Local secrets
cp .dev.vars.example .dev.vars
# Edit JWT_SECRET and set ALLOW_REGISTRATION=true

# Database
npm run db:migrate:local

# Dev server
npm run dev        # → http://localhost:5173
```

## 󰮫 Scripts

| Script | Description |
|---|---|
| `npm run dev` | Local dev server with HMR |
| `npm run build` | TypeScript check + Vite build |
| `npm run deploy` | Build + deploy to Cloudflare Workers |
| `npm run test` | Integration tests (Vitest + Miniflare D1) |
| `npm run typecheck` | TypeScript type checking |
| `npm run db:migrate:local` | Apply D1 migrations locally |
| `npm run db:migrate:remote` | Apply D1 migrations to production |
| `npm run logs` | Tail live Worker logs |

##  Deployment

```bash
npm run deploy
npm run db:migrate:remote
npx wrangler secret put JWT_SECRET
```

##  License

MIT — see [LICENSE](./LICENSE).
