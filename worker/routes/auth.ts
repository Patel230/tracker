import { Hono } from "hono";
import { z } from "zod";
import { createSession, clearSession, authenticate, type AppEnv } from "../lib/auth";
import { hashPassword, verifyPassword, isLegacyHash, dummyVerify } from "../lib/password";
import { rateLimitByIp } from "../lib/ratelimit";

const credentials = z.object({
  email: z.string().email().max(254),
  password: z.string().min(8).max(128),
});

const changePasswordBody = z.object({
  currentPassword: z.string().min(1).max(128),
  newPassword: z.string().min(8).max(128),
});

const auth = new Hono<AppEnv>();

// Guessing a password is a game of volume; these are the only endpoints where
// volume is the attack. change-password is included because it accepts the
// current password.
auth.use("/login", rateLimitByIp("login"));
auth.use("/register", rateLimitByIp("register"));
auth.use("/change-password", rateLimitByIp("change-password"));

auth.post("/register", async (c) => {
  if (c.env.ALLOW_REGISTRATION !== "true") {
    return c.json({ error: "This Tracker instance is private. You can run your own — fork it on GitHub." }, 403);
  }
  const parsed = credentials.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json({ error: "Valid email and password (min 8 chars) required" }, 400);
  const { email, password } = parsed.data;

  const existing = await c.env.DB.prepare("SELECT id FROM users WHERE email = ?")
    .bind(email.toLowerCase())
    .first();
  if (existing) return c.json({ error: "Account already exists" }, 409);

  const id = crypto.randomUUID();
  const hash = await hashPassword(password);
  await c.env.DB.prepare("INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)")
    .bind(id, email.toLowerCase(), hash)
    .run();
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

  // Upgrade the account off bcrypt the first time it logs in successfully.
  if (isLegacyHash(user.password_hash)) {
    await c.env.DB.prepare("UPDATE users SET password_hash = ? WHERE id = ?")
      .bind(await hashPassword(password), user.id)
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
  if (!user || !(await verifyPassword(currentPassword, user.password_hash))) {
    return c.json({ error: "Current password is incorrect" }, 401);
  }

  // Bumping token_version revokes every session issued before this change —
  // the point of changing a password is that a leaked one stops working.
  const hash = await hashPassword(newPassword);
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
