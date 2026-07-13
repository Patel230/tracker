# Contributing

## Getting Started

1. Fork the repo
2. `git checkout -b feat/your-feature`
3. `cd tracker && npm install`
4. Make changes, run `npm test` and `npm run typecheck`
5. Push and open a PR

## Guidelines

- **Commits**: Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
- **Tests**: Update `worker/api.test.ts` for backend changes
- **Types**: Keep `shared/types.ts` in sync between client and server
- **No secrets**: Never commit tokens, passwords, or keys
