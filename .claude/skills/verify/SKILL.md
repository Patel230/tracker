---
name: verify
description: Build, run, and drive the tracker app (Vite + Hono Worker + local D1) to verify changes end-to-end.
---

# Verifying tracker

## Build / test / migrate

- `npm run db:migrate:local` — apply D1 migrations to `.wrangler/state` (needed once per new migration; dev server and tests share this state).
- `npx tsc -b` — typecheck (three project refs: src, worker, node).
- `npx vitest run` — API tests. They run in **Node** via `vitest.config.ts` (do not let vitest pick up `vite.config.ts`: the Cloudflare plugin tries to run tests inside workerd and fails with `module is not defined`).

## Run

- `npm run dev` (background) → http://localhost:5173 — one server for SPA + `/api/*` Worker. Poll the port; don't sleep.
- Local secrets come from `.dev.vars` (`ALLOW_REGISTRATION=true`, dev JWT secret).
- Auth is a cookie: `curl -c /tmp/j.txt -d '{"email":...,"password":...}' -H 'Content-Type: application/json' http://localhost:5173/api/auth/register` (or `/login`), then `-b /tmp/j.txt` on every call.

## Drive the UI headlessly

No chromium-cli on this machine, but Playwright's Chromium is cached. Recipe that works:

1. `npm i playwright-core` in a scratch dir (NOT the repo — home-dir package.json can hijack installs; scratch dir with its own package.json is safe).
2. Launch with the cached binary:
   `chromium.launch({ executablePath: "/Users/lakshmanpatel/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing", headless: true })`
3. Login flow: fill `input[type=email]` / `input[type=password]`, click `button[type=submit]`, wait for `text=Wishlist` (board columns).
4. Kanban drag works with raw `page.mouse` move/down/move/up (PointerSensor needs >5px movement before it activates); verify persistence with `GET /api/jobs` afterwards.
5. Expect exactly two console 401s pre-login (`/auth/me` under StrictMode); anything else is a finding.
