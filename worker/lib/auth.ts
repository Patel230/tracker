import { SignJWT, jwtVerify } from "jose";
import type { Context, Next } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";

export const AUTH_COOKIE = "tracker_auth";
const SESSION_DAYS = 30;

export type AppEnv = { Bindings: Env; Variables: { userId: string } };

const MIN_SECRET_LENGTH = 32;

// TextEncoder turns a missing secret into a zero-length key, which jose will
// happily sign AND verify with — a deploy that forgot the secret would accept
// forged sessions for any user instead of failing. Refuse to start instead.
function secretKey(secret: string | undefined) {
  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    throw new Error(
      `JWT_SECRET is missing or shorter than ${MIN_SECRET_LENGTH} characters. ` +
        `Generate one with \`openssl rand -base64 32\` and set it with \`wrangler secret put JWT_SECRET\` ` +
        `(or in .dev.vars for local development).`
    );
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(c: Context<AppEnv>, userId: string) {
  const token = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secretKey(c.env.JWT_SECRET));
  setCookie(c, AUTH_COOKIE, token, {
    httpOnly: true,
    // Secure cookies don't stick on Safari over plain-http localhost dev.
    secure: new URL(c.req.url).protocol === "https:",
    sameSite: "Lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export function clearSession(c: Context<AppEnv>) {
  deleteCookie(c, AUTH_COOKIE, { path: "/" });
}

export async function verifySession(c: Context<AppEnv>): Promise<string | null> {
  const token = getCookie(c, AUTH_COOKIE);
  if (!token) return null;
  // Resolved outside the try: a bad JWT_SECRET is a misconfigured server, not a
  // bad token, and must not be swallowed into a 401.
  const key = secretKey(c.env.JWT_SECRET);
  try {
    const { payload } = await jwtVerify(token, key);
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}

export async function requireAuth(c: Context<AppEnv>, next: Next) {
  const userId = await verifySession(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  c.set("userId", userId);
  await next();
}
