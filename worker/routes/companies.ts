import { Hono } from "hono";
import { z } from "zod";
import { safeExternalUrl, type Company } from "../../shared/types";
import type { AppEnv } from "../lib/auth";

// Only http(s). See safeExternalUrl: zod's .url() alone would let a
// javascript: scheme through to an href.
const httpUrl = (label: string, max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .refine((u) => safeExternalUrl(u) !== null, `${label} must start with http:// or https://`);

const companyFields = z.object({
  name: z.string().trim().min(1, "Company name is required").max(200),
  portal_url: httpUrl("Portal URL", 2000)
    .nullish()
    .or(z.literal("").transform(() => null)),
});

const now = () => new Date().toISOString();

async function ownedCompany(c: { env: AppEnv["Bindings"] }, userId: string, id: string) {
  return c.env.DB.prepare("SELECT * FROM companies WHERE id = ? AND user_id = ?")
    .bind(id, userId)
    .first<Company>();
}

const companies = new Hono<AppEnv>();

companies.get("/", async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT c.*, (SELECT COUNT(*) FROM jobs j WHERE j.company_id = c.id) AS job_count
     FROM companies c
     WHERE c.user_id = ?
     ORDER BY c.name COLLATE NOCASE`
  )
    .bind(c.get("userId"))
    .all<Company>();
  return c.json(results);
});

companies.get("/:id", async (c) => {
  const company = await ownedCompany(c, c.get("userId"), c.req.param("id"));
  if (!company) return c.json({ error: "Not found" }, 404);
  return c.json(company);
});

companies.post("/", async (c) => {
  const parsed = companyFields.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json({ error: parsed.error.issues[0]?.message ?? "Invalid fields" }, 400);
  const f = parsed.data;
  const id = crypto.randomUUID();
  await c.env.DB.prepare(
    `INSERT INTO companies (id, user_id, name, portal_url) VALUES (?, ?, ?, ?)`
  )
    .bind(id, c.get("userId"), f.name, f.portal_url ?? null)
    .run();
  const company = await ownedCompany(c, c.get("userId"), id);
  return c.json(company, 201);
});

companies.patch("/:id", async (c) => {
  const company = await ownedCompany(c, c.get("userId"), c.req.param("id"));
  if (!company) return c.json({ error: "Not found" }, 404);
  const parsed = companyFields.partial().safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json({ error: parsed.error.issues[0]?.message ?? "Invalid fields" }, 400);
  const f = parsed.data;

  const sets: string[] = [];
  const vals: unknown[] = [];
  if (f.name !== undefined) {
    sets.push("name = ?");
    vals.push(f.name);
  }
  if (f.portal_url !== undefined) {
    sets.push("portal_url = ?");
    vals.push(f.portal_url ?? null);
  }
  if (!sets.length) return c.json({ error: "Nothing to update" }, 400);
  sets.push("updated_at = ?");
  vals.push(now());
  vals.push(c.req.param("id"));
  vals.push(c.get("userId"));

  await c.env.DB.prepare(`UPDATE companies SET ${sets.join(", ")} WHERE id = ? AND user_id = ?`)
    .bind(...vals)
    .run();

  // Keep the denormalized jobs.company in sync when a company is renamed, so
  // every view that reads jobs.company (cards, table, reminders) updates too.
  if (f.name !== undefined) {
    await c.env.DB.prepare("UPDATE jobs SET company = ? WHERE company_id = ?")
      .bind(f.name, c.req.param("id"))
      .run();
  }
  return c.json(await ownedCompany(c, c.get("userId"), c.req.param("id")));
});

companies.delete("/:id", async (c) => {
  // Detach any jobs linking here before deleting, so they fall back to their
  // denormalized company name instead of dangling on a missing company.
  await c.env.DB.prepare("UPDATE jobs SET company_id = NULL WHERE company_id = ? AND user_id = ?")
    .bind(c.req.param("id"), c.get("userId"))
    .run();
  const result = await c.env.DB.prepare("DELETE FROM companies WHERE id = ? AND user_id = ?")
    .bind(c.req.param("id"), c.get("userId"))
    .run();
  if (!result.meta.changes) return c.json({ error: "Not found" }, 404);
  return c.json({ ok: true });
});

export default companies;
