<div align="center">
  <br/>
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT"/>
  <img src="https://img.shields.io/github/actions/workflow/status/Patel230/tracker/ci.yml?branch=main&style=flat-square" alt="CI"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&style=flat-square" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&style=flat-square" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Cloudflare%20Workers-F38020?logo=cloudflare&style=flat-square" alt="Cloudflare Workers"/>
  <br/>
  <br/>

  **Tracker** — Free kanban-style job application tracker for students.

  *Run your job hunt like a pipeline, not a pile of tabs.*

  <br/>
</div>

---

## Features

- **Kanban Board** — Drag jobs across Wishlist → Applied → Interview → Offer → Rejected
- **Table View** — Sort, filter, and search all jobs in a sortable grid
- **Analytics Dashboard** — Pipeline funnel, response rate, weekly volume, avg days to interview
- **Job Drawer** — Four-tab detail panel: details, timeline, contacts, reminders
- **Salary Tracking** — Multi-currency with hourly/daily/weekly/monthly/yearly periods
- **Reminders** — Per-job and global upcoming reminders with completion tracking
- **Auth** — Email/password with JWT sessions, change password, account deletion
- **Colorblind-safe** — Pipeline stage colors validated against Okabe-Ito palette

## Docs

| Document | What you'll find |
|---|---|
| [📦 Setup Guide](./docs/SETUP.md) | Local dev, Docker-free, production deploy, CI/CD |
| [⚙ Config Reference](./docs/CONFIG.md) | Environment variables, secrets, D1 setup, wrangler |
| [📡 API Reference](./docs/API.md) | All endpoints, auth, request/response shapes |
| [🏗 Architecture](./docs/ARCHITECTURE.md) | How the pieces fit together |

## Quick start

```bash
npm install
cp .dev.vars.example .dev.vars      # edit JWT_SECRET + ALLOW_REGISTRATION
npm run db:migrate:local
npm run dev                          # → http://localhost:5173
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Development server with HMR |
| `npm run build` | TypeScript check + Vite production build |
| `npm run deploy` | Build + deploy to Cloudflare Workers |
| `npm run test` | Run integration tests |
| `npm run typecheck` | TypeScript type checking |
| `npm run db:migrate:local` | Apply D1 migrations locally |
| `npm run db:migrate:remote` | Apply D1 migrations to production |
| `npm run logs` | Tail live Worker logs |

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · dnd-kit · Hono · Cloudflare Workers · D1 (SQLite) · bcryptjs · jose · Zod

## License

MIT — see [LICENSE](./LICENSE).
