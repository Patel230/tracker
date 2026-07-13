# Architecture

## Overview

Tracker is a **single-worker** application: a Cloudflare Worker serves both the REST API and the static SPA assets. There is no separate backend server.

```
                          Cloudflare Worker
                          ┌──────────────────────────────────────┐
  /api/*  ───────────────►  Hono Router                         │
                          │   ├── /api/auth/*  (no auth req.)    │
                          │   ├── /api/*       (auth required)   │
                          │   ├── /api/jobs/*                    │
                          │   └── /api/stats                     │
                          │                                      │
  /* (non-API) ──────────►  ASSETS binding ──────────────────► SPA
                          └──────────────────────────────────────┘
```

## Directory structure

```
tracker/
├── src/                  # React SPA
│   ├── components/       # UI components (JobCard, KanbanColumn, JobDrawer, Logo, etc.)
│   ├── lib/              # API client, auth context, theme, custom hooks
│   ├── pages/            # Route pages (Landing, Login, Dashboard, Board, TableView)
│   ├── App.tsx           # Root component with routing + auth gating
│   └── main.tsx          # Entry point
├── worker/               # Hono API (Cloudflare Worker)
│   ├── lib/auth.ts       # JWT signing/verification, password hashing
│   ├── routes/           # Route modules (auth, jobs, items, stats)
│   ├── index.ts          # Worker entry — Hono app, middleware, router setup
│   └── api.test.ts       # Integration tests
├── shared/               # Types shared between client and server
├── migrations/           # D1 SQL migrations
└── wrangler.jsonc        # Cloudflare Workers configuration
```

## Frontend

Built with React 19 + Vite + Tailwind CSS v4.

### State management

No external state library — React context and component state are sufficient:

- **AuthContext** — stores the current user, provides `login`/`register`/`logout`
- **RemindersContext** — polls `/api/reminders/upcoming` every 5 minutes, provides reminder list and `complete` action
- **Component state** — each page manages its own data via `useState` + `useEffect` (e.g., `Board.tsx` fetches jobs on mount)

### Routing

`react-router-dom` v7 with a simple auth gate in `App.tsx`:
- **Unauthenticated:** Landing page (`/`), Login page (`/login`), everything else redirects to `/`
- **Authenticated:** Dashboard (`/`), Board (`/board`), Table (`/table`)

### Styling

Brutalist design system built on Tailwind CSS v4 `@theme` directives:

- **Colors:** `brut-ink` (#111), `brut-paper` (#f2eee3), `brut-surface` (#fff), `brut-yellow` (#ffd60a), plus five pipeline stage colors (CVD-validated Okabe-Ito palette)
- **Components:** `btn-brut`, `card-brut`, `panel-brut`, `input-brut`, `badge-brut` — thick borders, hard box-shadows, bold uppercase type
- **Typography:** Space Grotesk (500–800 weight), zero border-radius everywhere

### Drag and drop

Uses dnd-kit (`@dnd-kit/core` + `@dnd-kit/sortable`):
1. **`onDragOver`** — optimistic local state update (cross-column drag)
2. **`onDragEnd`** — calls `PATCH /api/jobs/:id/move`, replaces the destination column from the server response
3. **Collision detection** — `closestCorners` strategy

## Backend (Worker)

Built with Hono v4. Runs on Cloudflare Workers with D1 database and static asset binding.

### Request flow

```
Request → Worker (fetch handler)
  → URL matches /api/*? → Hono router
    → /api/auth/* → requireAuth middleware (skip for auth routes)
    → Route handler → D1 query → JSON response
  → Otherwise → ASSETS.fetch(request) → SPA or static file
```

### Authentication

1. **Registration/Login** — validates with Zod, hashes password (bcryptjs, cost 10), signs JWT (HS256, jose), sets httpOnly cookie `tracker_auth`
2. **Verification** — `requireAuth` middleware reads cookie, verifies JWT, sets `c.set("userId", userId)`
3. **Logout** — clears the cookie server-side

### Database

Cloudflare D1 (SQLite via workerd). Five tables with `ON DELETE CASCADE`:

```
users ──→ jobs ──→ contacts
              ├──→ activities
              └──→ reminders
```

### Route patterns

Child resources (contacts, activities, reminders) use a factory pattern in `worker/routes/items.ts` — `childRoutes()` and `itemRoutes()` generate consistent CRUD handlers with ownership enforcement:

```sql
-- Every child query joins through the parent job to verify ownership
WHERE job_id IN (SELECT id FROM jobs WHERE user_id = ?)
```

### Analytics

Stats are computed client-side from D1 aggregate queries in `worker/routes/stats.ts`. Four concurrent queries via `Promise.all`:

- Pipeline funnel (COUNT per status)
- Total active, response rate, offers count
- Avg days from application to first interview
- Weekly application volume (last 12 weeks)

## Deployment

See [Setup Guide](./SETUP.md) for deployment instructions.
