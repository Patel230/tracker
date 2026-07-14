import type { RateLimiter } from "./lib/ratelimit";

declare global {
  interface Env {
    DB: D1Database;
    ASSETS: Fetcher;
    JWT_SECRET: string;
    ALLOW_REGISTRATION?: string;
    // Raises the password-hash work factor above the free-tier-safe default.
    // See lib/password.ts.
    PBKDF2_ITERATIONS?: string;
    // Optional: not provided by vitest's platform proxy. See lib/ratelimit.ts.
    AUTH_RATE_LIMITER?: RateLimiter;
  }
}
