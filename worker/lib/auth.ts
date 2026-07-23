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

// The flag set createSession and clearSession both need. Centralizing it isn't
// just tidiness: clearSession used to forward only { path: "/" } to deleteCookie,
// so the maxAge:0 Set-Cookie it emits dropped `secure`/`sameSite`. Over HTTPS a
// browser ignores a non-Secure deletion against the existing Secure cookie, so
// logout and account-delete silently failed to clear the cookie. Both paths now
// take the same flags from one place — the drift can't come back.
const sessionCookieOpts = (c: Context<AppEnv>) => ({
  httpOnly: true,
  // Secure cookies don't stick on Safari over plain-http localhost dev.
  secure: new URL(c.req.url).protocol === "https:",
  sameSite: "Lax" as const,
  path: "/",
});

export async function createSession(c: Context<AppEnv>, userId: string, tokenVersion: number) {
  const token = await new SignJWT({ sub: userId, tv: tokenVersion })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secretKey(c.env.JWT_SECRET));
  setCookie(c, AUTH_COOKIE, token, {
    ...sessionCookieOpts(c),
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export function clearSession(c: Context<AppEnv>) {
  deleteCookie(c, AUTH_COOKIE, sessionCookieOpts(c));
}

// Authenticates the request: the cookie's JWT must be valid AND its token
// version must still match the user's current one. A valid signature alone is
// not enough — that is what let sessions outlive a password change.
export async function authenticate(c: Context<AppEnv>): Promise<string | null> {
  const token = getCookie(c, AUTH_COOKIE);
  if (!token) return null;
  // Resolved outside the try: a bad JWT_SECRET is a misconfigured server, not a
  // bad token, and must not be swallowed into a 401.
  const key = secretKey(c.env.JWT_SECRET);

  let userId: string;
  let tokenVersion: number;
  try {
    const { payload } = await jwtVerify(token, key);
    if (typeof payload.sub !== "string" || typeof payload.tv !== "number") return null;
    userId = payload.sub;
    tokenVersion = payload.tv;
  } catch {
    return null;
  }

  // Costs one D1 read per authenticated request. That is the price of being
  // able to revoke a session at all; the alternative is a 30-day window in
  // which a leaked cookie cannot be taken away.
  const user = await c.env.DB.prepare("SELECT token_version FROM users WHERE id = ?")
    .bind(userId)
    .first<{ token_version: number }>();
  if (!user || user.token_version !== tokenVersion) return null;

  return userId;
}

// Fails the request before any handler runs a side effect. Without this,
// register hashed the password and INSERTed the user, and only then threw on
// the bad secret when issuing the session — leaving an orphan account behind
// and answering the retry with a 409 for an account nobody can log into.
export async function requireSessionConfig(c: Context<AppEnv>, next: Next) {
  secretKey(c.env.JWT_SECRET); // throws → 500, before the handler touches the DB
  await next();
}

export async function requireAuth(c: Context<AppEnv>, next: Next) {
  const userId = await authenticate(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  c.set("userId", userId);
  await next();
}
