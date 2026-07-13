import type { RateLimiter } from "./lib/ratelimit";

declare global {
  interface Env {
    DB: D1Database;
    ASSETS: Fetcher;
    JWT_SECRET: string;
    ALLOW_REGISTRATION?: string;
    // Optional: not provided by vitest's platform proxy. See lib/ratelimit.ts.
    AUTH_RATE_LIMITER?: RateLimiter;
  }
}
