import type { Context, Next } from "hono";
import type { AppEnv } from "./auth";

// Cloudflare's rate-limit binding. Typed locally rather than pulled from
// workers-types so the shape is visible at the call site.
export interface RateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

// The binding does not exist under vitest's platform proxy or in some local dev
// setups. Rate limiting is a production defence, not a correctness property, so
// its absence must not break the app — but it should be obvious, not silent.
let warned = false;

/**
 * Throttles by client IP. Used on the credential endpoints, where the whole
 * attack is "try a lot of passwords quickly".
 */
export function rateLimitByIp(bucket: string) {
  return async (c: Context<AppEnv>, next: Next) => {
    const limiter = c.env.AUTH_RATE_LIMITER;
    if (!limiter) {
      if (!warned) {
        warned = true;
        console.warn("AUTH_RATE_LIMITER binding is absent — credential endpoints are NOT rate limited.");
      }
      return next();
    }

    // CF-Connecting-IP is set by the edge and cannot be spoofed by the client.
    // Falling back to a constant means an unknown IP shares one bucket, which
    // throttles rather than exempts it.
    const ip = c.req.header("CF-Connecting-IP") ?? "unknown";
    const { success } = await limiter.limit({ key: `${bucket}:${ip}` });
    if (!success) {
      return c.json({ error: "Too many attempts. Wait a minute and try again." }, 429);
    }
    return next();
  };
}
