import { Hono } from "hono";
import { z } from "zod";
import { createSession, clearSession, authenticate, requireSessionConfig, type AppEnv } from "../lib/auth";
import { hashPassword, verifyPassword, needsRehash, configuredIterations, dummyVerify } from "../lib/password";
import { rateLimitByIp } from "../lib/ratelimit";

const credentials = z.object({
  email: z.string().email().max(254),
  password: z.string().min(8).max(128),
});

const changePasswordBody = z.object({
  currentPassword: z.string().min(1).max(128),
  newPassword: z.string().min(8).max(128),
});

const deleteAccountBody = z.object({
  password: z.string().min(1).max(128),
});

const auth = new Hono<AppEnv>();

// Before anything else: a broken JWT_SECRET must stop the request before a
// handler can write to the database.
auth.use("*", requireSessionConfig);

// Guessing a password is a game of volume; these are the only endpoints where
// volume is the attack. change-password and account are included because
// they accept the current password.
auth.use("/login", rateLimitByIp("login"));
auth.use("/register", rateLimitByIp("register"));
auth.use("/change-password", rateLimitByIp("change-password"));
auth.use("/account", rateLimitByIp("delete-account"));

auth.post("/register", async (c) => {
  if (c.env.ALLOW_REGISTRATION !== "true") {
    return c.json({ error: "This Tracker instance is private. You can run your own — fork it on GitHub." }, 403);
  }
  const parsed = credentials.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json({ error: "Valid email and password (min 8 chars) required" }, 400);
  const { email, password } = parsed.data;

  const id = crypto.randomUUID();
  const hash = await hashPassword(password, configuredIterations(c.env));

  // Let the UNIQUE(email) constraint decide, rather than checking first and
  // then inserting: two concurrent signups for the same address both passed
  // the check and the loser hit the constraint, surfacing as a 500.
  try {
    await c.env.DB.prepare("INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)")
      .bind(id, email.toLowerCase(), hash)
      .run();
  } catch (err) {
    if (String(err).includes("UNIQUE constraint failed")) {
      return c.json({ error: "Account already exists" }, 409);
    }
    throw err;
  }

  await createSession(c, id, 0);
  return c.json({ id, email: email.toLowerCase() }, 201);
});

auth.post("/login", async (c) => {
  const parsed = credentials.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json({ error: "Email and password required" }, 400);
  const { email, password } = parsed.data;

  const user = await c.env.DB.prepare(
    "SELECT id, email, password_hash, token_version FROM users WHERE email = ?"
  )
    .bind(email.toLowerCase())
    .first<{ id: string; email: string; password_hash: string; token_version: number }>();
  const invalid = () => c.json({ error: "Invalid email or password" }, 401);

  // An unknown email must cost the same as a known one. Skipping the hash here
  // made a miss ~6ms faster than a hit, which is a reliable oracle for
  // enumerating which addresses have accounts.
  if (!user) {
    await dummyVerify(password);
    return invalid();
  }
  if (!(await verifyPassword(password, user.password_hash))) return invalid();

  // Upgrade the stored hash on the way through: off bcrypt, or up to a raised
  // PBKDF2_ITERATIONS. Costs one extra hash on the login that does it.
  const iterations = configuredIterations(c.env);
  if (needsRehash(user.password_hash, iterations)) {
    await c.env.DB.prepare("UPDATE users SET password_hash = ? WHERE id = ?")
      .bind(await hashPassword(password, iterations), user.id)
      .run();
  }

  await createSession(c, user.id, user.token_version);
  return c.json({ id: user.id, email: user.email });
});

auth.post("/logout", (c) => {
  clearSession(c);
  return c.json({ ok: true });
});

auth.delete("/account", async (c) => {
  const userId = await authenticate(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);

  // A stolen session cookie must not be enough to irreversibly delete the
  // account — require the password, same as change-password.
  const parsed = deleteAccountBody.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json({ error: "Password is required" }, 400);

  const user = await c.env.DB.prepare("SELECT password_hash FROM users WHERE id = ?")
    .bind(userId)
    .first<{ password_hash: string }>();
  // 403, not 401: the session is still valid, only this specific action is
  // refused. api.ts treats any 401 as "the session is dead" and logs the
  // client out globally — a wrong password here must not do that.
  if (!user || !(await verifyPassword(parsed.data.password, user.password_hash))) {
    return c.json({ error: "Password is incorrect" }, 403);
  }

  // Cascades to jobs, contacts, activities, reminders via FK ON DELETE CASCADE.
  await c.env.DB.prepare("DELETE FROM users WHERE id = ?").bind(userId).run();
  clearSession(c);
  return c.json({ ok: true });
});

auth.post("/change-password", async (c) => {
  const userId = await authenticate(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);

  const parsed = changePasswordBody.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json({ error: "Current password and a new password (min 8 chars) required" }, 400);
  const { currentPassword, newPassword } = parsed.data;

  const user = await c.env.DB.prepare("SELECT password_hash FROM users WHERE id = ?")
    .bind(userId)
    .first<{ password_hash: string }>();
  // 403, not 401 — see the matching comment on DELETE /account.
  if (!user || !(await verifyPassword(currentPassword, user.password_hash))) {
    return c.json({ error: "Current password is incorrect" }, 403);
  }

  // Bumping token_version revokes every session issued before this change —
  // the point of changing a password is that a leaked one stops working.
  const hash = await hashPassword(newPassword, configuredIterations(c.env));
  const updated = await c.env.DB.prepare(
    "UPDATE users SET password_hash = ?, token_version = token_version + 1 WHERE id = ? RETURNING token_version"
  )
    .bind(hash, userId)
    .first<{ token_version: number }>();

  // Re-issue for the device that made the change, so "change password" doesn't
  // also mean "log yourself out".
  await createSession(c, userId, updated!.token_version);
  return c.json({ ok: true });
});

auth.get("/me", async (c) => {
  const userId = await authenticate(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  const user = await c.env.DB.prepare("SELECT id, email FROM users WHERE id = ?")
    .bind(userId)
    .first<{ id: string; email: string }>();
  if (!user) return c.json({ error: "Unauthorized" }, 401);
  return c.json(user);
});

export default auth;
