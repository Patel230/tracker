import { Hono } from "hono";
import type { z } from "zod";
import { contactFields, activityFields, reminderFields } from "./jobs";
import type { AppEnv } from "../lib/auth";

// PATCH/DELETE for rows owned via their parent job. Ownership is enforced by
// joining through jobs.user_id in every statement.
function itemRoutes(table: "contacts" | "activities" | "reminders", schema: z.ZodTypeAny, columns: string[]) {
  const r = new Hono<AppEnv>();

  r.patch("/:id", async (c) => {
    const parsed = (schema as z.ZodObject<z.ZodRawShape>).partial().safeParse(
      await c.req.json().catch(() => null)
    );
    if (!parsed.success) return c.json({ error: "Invalid fields" }, 400);
    const data = parsed.data as Record<string, unknown>;
    const cols = columns.filter((col) => data[col] !== undefined);
    if (!cols.length) return c.json({ error: "Nothing to update" }, 400);

    const result = await c.env.DB.prepare(
      `UPDATE ${table} SET ${cols.map((col) => `${col} = ?`).join(", ")}
       WHERE id = ? AND job_id IN (SELECT id FROM jobs WHERE user_id = ?)`
    )
      .bind(...cols.map((col) => data[col] ?? null), c.req.param("id"), c.get("userId"))
      .run();
    if (!result.meta.changes) return c.json({ error: "Not found" }, 404);
    const row = await c.env.DB.prepare(`SELECT * FROM ${table} WHERE id = ?`)
      .bind(c.req.param("id"))
      .first();
    return c.json(row);
  });

  r.delete("/:id", async (c) => {
    const result = await c.env.DB.prepare(
      `DELETE FROM ${table} WHERE id = ? AND job_id IN (SELECT id FROM jobs WHERE user_id = ?)`
    )
      .bind(c.req.param("id"), c.get("userId"))
      .run();
    if (!result.meta.changes) return c.json({ error: "Not found" }, 404);
    return c.json({ ok: true });
  });

  return r;
}

export const contacts = itemRoutes("contacts", contactFields, ["name", "role", "email", "phone", "linkedin", "notes"]);
export const activities = itemRoutes("activities", activityFields, ["type", "title", "notes", "happened_at"]);

export const reminders = itemRoutes("reminders", reminderFields, ["due_at", "note"]);

reminders.get("/upcoming", async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT r.*, j.company, j.title AS job_title
     FROM reminders r JOIN jobs j ON j.id = r.job_id
     WHERE j.user_id = ? AND r.completed_at IS NULL
       AND r.due_at <= datetime('now', '+7 days')
     ORDER BY r.due_at`
  )
    .bind(c.get("userId"))
    .all();
  return c.json(results);
});

reminders.patch("/:id/complete", async (c) => {
  const result = await c.env.DB.prepare(
    `UPDATE reminders SET completed_at = ?
     WHERE id = ? AND completed_at IS NULL
       AND job_id IN (SELECT id FROM jobs WHERE user_id = ?)`
  )
    .bind(new Date().toISOString(), c.req.param("id"), c.get("userId"))
    .run();
  if (!result.meta.changes) return c.json({ error: "Not found" }, 404);
  return c.json({ ok: true });
});
