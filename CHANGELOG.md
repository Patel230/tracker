# Changelog

All notable changes to this project are documented in this file.

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
