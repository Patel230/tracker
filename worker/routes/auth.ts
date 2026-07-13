import { Hono } from "hono";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { createSession, clearSession, verifySession, type AppEnv } from "../lib/auth";

const credentials = z.object({
  email: z.string().email().max(254),
  password: z.string().min(8).max(128),
});

const changePasswordBody = z.object({
  currentPassword: z.string().min(1).max(128),
  newPassword: z.string().min(8).max(128),
});

const auth = new Hono<AppEnv>();

auth.post("/register", async (c) => {
  if (c.env.ALLOW_REGISTRATION !== "true") {
    return c.json({ error: "Registration is closed" }, 403);
  }
  const parsed = credentials.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json({ error: "Valid email and password (min 8 chars) required" }, 400);
  const { email, password } = parsed.data;

  const existing = await c.env.DB.prepare("SELECT id FROM users WHERE email = ?")
    .bind(email.toLowerCase())
    .first();
  if (existing) return c.json({ error: "Account already exists" }, 409);

  const id = crypto.randomUUID();
  const hash = await bcrypt.hash(password, 10);
  await c.env.DB.prepare("INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)")
    .bind(id, email.toLowerCase(), hash)
    .run();
  await createSession(c, id);
  return c.json({ id, email: email.toLowerCase() }, 201);
});

auth.post("/login", async (c) => {
  const parsed = credentials.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json({ error: "Email and password required" }, 400);
  const { email, password } = parsed.data;

  const user = await c.env.DB.prepare("SELECT id, email, password_hash FROM users WHERE email = ?")
    .bind(email.toLowerCase())
    .first<{ id: string; email: string; password_hash: string }>();
  const ok = user && (await bcrypt.compare(password, user.password_hash));
  if (!ok) return c.json({ error: "Invalid email or password" }, 401);

  await createSession(c, user.id);
  return c.json({ id: user.id, email: user.email });
});

auth.post("/logout", (c) => {
  clearSession(c);
  return c.json({ ok: true });
});

auth.delete("/account", async (c) => {
  const userId = await verifySession(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  // Cascades to jobs, contacts, activities, reminders via FK ON DELETE CASCADE.
  await c.env.DB.prepare("DELETE FROM users WHERE id = ?").bind(userId).run();
  clearSession(c);
  return c.json({ ok: true });
});

auth.post("/change-password", async (c) => {
  const userId = await verifySession(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);

  const parsed = changePasswordBody.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json({ error: "Current password and a new password (min 8 chars) required" }, 400);
  const { currentPassword, newPassword } = parsed.data;

  const user = await c.env.DB.prepare("SELECT password_hash FROM users WHERE id = ?")
    .bind(userId)
    .first<{ password_hash: string }>();
  if (!user || !(await bcrypt.compare(currentPassword, user.password_hash))) {
    return c.json({ error: "Current password is incorrect" }, 401);
  }

  const hash = await bcrypt.hash(newPassword, 10);
  await c.env.DB.prepare("UPDATE users SET password_hash = ? WHERE id = ?").bind(hash, userId).run();
  return c.json({ ok: true });
});

auth.get("/me", async (c) => {
  const userId = await verifySession(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  const user = await c.env.DB.prepare("SELECT id, email FROM users WHERE id = ?")
    .bind(userId)
    .first<{ id: string; email: string }>();
  if (!user) return c.json({ error: "Unauthorized" }, 401);
  return c.json(user);
});

export default auth;
