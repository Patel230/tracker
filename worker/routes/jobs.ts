import { Hono } from "hono";
import { z } from "zod";
import {
  JOB_STATUSES,
  ACTIVITY_TYPES,
  STATUS_LABELS,
  CURRENCIES,
  PERIODS,
  safeExternalUrl,
  type Job,
  type JobStatus,
} from "../../shared/types";
import type { AppEnv } from "../lib/auth";

// Only http(s). See safeExternalUrl: zod's .url() alone would let a
// javascript: scheme through to an href.
const httpUrl = (label: string, max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .refine((u) => safeExternalUrl(u) !== null, `${label} must start with http:// or https://`);

// Surfaces the field that actually failed. Every 400 used to say "Company and
// title are required", so pasting a bad URL reported the wrong problem.
const firstIssue = (error: z.ZodError) => error.issues[0]?.message ?? "Invalid fields";

const jobFields = z.object({
  company: z.string().trim().min(1, "Company is required").max(200),
  official_website: httpUrl("Official website", 2000)
    .nullish()
    .or(z.literal("").transform(() => null)),
  title: z.string().trim().min(1, "Title is required").max(200),
  url: httpUrl("Job URL", 2000)
    .nullish()
    .or(z.literal("").transform(() => null)),
  location: z.string().trim().max(200).nullish(),
  salary_min: z.number().int().nonnegative().nullish(),
  salary_max: z.number().int().nonnegative().nullish(),
  salary_currency: z.enum(CURRENCIES).nullish(),
  salary_period: z.enum(PERIODS).nullish(),
  description: z.string().max(20000).nullish(),
  notes: z.string().max(20000).nullish(),
  status: z.enum(JOB_STATUSES).optional(),
});

// `index` is the 0-based slot inside the target column; the backend renumbers
// the whole column to integers to avoid fractional-sort drift accumulating.
const moveBody = z.object({
  status: z.enum(JOB_STATUSES),
  index: z.number().int().min(0),
});

const contactFields = z.object({
  name: z.string().trim().min(1).max(200),
  role: z.string().trim().max(200).nullish(),
  email: z.string().trim().email().max(254).nullish(),
  phone: z.string().trim().max(50).nullish(),
  linkedin: httpUrl("LinkedIn URL", 500)
    .nullish()
    .or(z.literal("").transform(() => null)),
  notes: z.string().max(5000).nullish(),
});

const activityFields = z.object({
  type: z.enum(ACTIVITY_TYPES),
  title: z.string().trim().min(1).max(300),
  notes: z.string().max(10000).nullish(),
  happened_at: z.string().datetime().optional(),
});

const reminderFields = z.object({
  due_at: z.string().datetime(),
  note: z.string().trim().min(1).max(1000),
});

const now = () => new Date().toISOString();

async function ownedJob(c: { env: Env }, userId: string, jobId: string) {
  return c.env.DB.prepare("SELECT * FROM jobs WHERE id = ? AND user_id = ?")
    .bind(jobId, userId)
    .first<Job>();
}

// Reassign int1-based sort_order, 0,1,2,… to an entire column after a move,
// with `movedJobId` pinned at `index`. Returns all refreshed rows for the
// column so the client can refresh the integer spacing in one shot.
async function renumberColumn(
  db: D1Database,
  userId: string,
  status: JobStatus,
  movedJobId: string,
  index: number
): Promise<Job[]> {
  const { results } = await db
    .prepare("SELECT id FROM jobs WHERE user_id = ? AND status = ? ORDER BY sort_order, id")
    .bind(userId, status)
    .all<{ id: string }>();
  const ids = results.map((r) => r.id);
  const others = ids.filter((id) => id !== movedJobId);
  const clamped = Math.max(0, Math.min(index, others.length));
  const ordered = [...others.slice(0, clamped), movedJobId, ...others.slice(clamped)];

  if (ordered.length) {
    await db.batch(
      ordered.map((id, order) =>
        db.prepare("UPDATE jobs SET sort_order = ? WHERE id = ? AND user_id = ?").bind(order, id, userId)
      )
    );
  }

  const placeholders = ordered.map(() => "?").join(",");
  const { results: rows } = await db
    .prepare(`SELECT * FROM jobs WHERE id IN (${placeholders})`)
    .bind(...ordered)
    .all<Job>();
  const byId = new Map(rows.map((r) => [r.id, r]));
  return ordered.map((id) => byId.get(id)!);
}

const jobs = new Hono<AppEnv>();

jobs.get("/", async (c) => {
  const includeArchived = c.req.query("archived") === "1";
  const { results } = await c.env.DB.prepare(
    `SELECT * FROM jobs WHERE user_id = ? ${includeArchived ? "" : "AND archived = 0"}
     ORDER BY status, sort_order`
  )
    .bind(c.get("userId"))
    .all<Job>();
  return c.json(results);
});

jobs.post("/", async (c) => {
  const parsed = jobFields.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json({ error: firstIssue(parsed.error) }, 400);
  const f = parsed.data;
  const id = crypto.randomUUID();
  const status: JobStatus = f.status ?? "wishlist";
  const appliedAt = status === "applied" ? now() : null;

  // Place at the top of the column: one less than the current minimum.
  const min = await c.env.DB.prepare(
    "SELECT MIN(sort_order) AS m FROM jobs WHERE user_id = ? AND status = ?"
  )
    .bind(c.get("userId"), status)
    .first<{ m: number | null }>();
  const sortOrder = (min?.m ?? 1) - 1;

  await c.env.DB.prepare(
    `INSERT INTO jobs (id, user_id, company, official_website, title, url, location, salary_min, salary_max,
       salary_currency, salary_period, description, notes, status, sort_order, applied_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      id,
      c.get("userId"),
      f.company,
      f.official_website ?? null,
      f.title,
      f.url ?? null,
      f.location ?? null,
      f.salary_min ?? null,
      f.salary_max ?? null,
      f.salary_currency ?? null,
      f.salary_period ?? null,
      f.description ?? null,
      f.notes ?? null,
      status,
      sortOrder,
      appliedAt
    )
    .run();
  const job = await ownedJob(c, c.get("userId"), id);
  return c.json(job, 201);
});

jobs.get("/:id", async (c) => {
  const job = await ownedJob(c, c.get("userId"), c.req.param("id"));
  if (!job) return c.json({ error: "Not found" }, 404);
  return c.json(job);
});

jobs.patch("/:id", async (c) => {
  const job = await ownedJob(c, c.get("userId"), c.req.param("id"));
  if (!job) return c.json({ error: "Not found" }, 404);
  const parsed = jobFields
    .partial()
    .extend({ archived: z.union([z.literal(0), z.literal(1)]).optional() })
    .safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json({ error: firstIssue(parsed.error) }, 400);
  const f = parsed.data;

  const merged = { ...job, ...Object.fromEntries(Object.entries(f).filter(([, v]) => v !== undefined)) };
  const appliedAt =
    merged.status === "applied" && !job.applied_at ? now() : merged.applied_at;
  await c.env.DB.prepare(
    `UPDATE jobs SET company=?, official_website=?, title=?, url=?, location=?,
       salary_min=?, salary_max=?,
       salary_currency=?, salary_period=?, description=?, notes=?, status=?, archived=?,
       applied_at=?, updated_at=?
     WHERE id = ? AND user_id = ?`
  )
    .bind(
      merged.company,
      merged.official_website ?? null,
      merged.title,
      merged.url ?? null,
      merged.location ?? null,
      merged.salary_min ?? null,
      merged.salary_max ?? null,
      merged.salary_currency ?? null,
      merged.salary_period ?? null,
      merged.description ?? null,
      merged.notes ?? null,
      merged.status,
      merged.archived,
      appliedAt ?? null,
      now(),
      job.id,
      c.get("userId")
    )
    .run();

  if (f.status && f.status !== job.status) {
    await logStatusChange(c.env.DB, job.id, f.status);
  }
  return c.json(await ownedJob(c, c.get("userId"), job.id));
});

jobs.patch("/:id/move", async (c) => {
  const id = c.req.param("id");
  const userId = c.get("userId");
  const parsed = moveBody.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json({ error: "status and index required" }, 400);
  const { status: to, index } = parsed.data;

  const job = await ownedJob(c, userId, id);
  if (!job) return c.json({ error: "Not found" }, 404);

  const assign = await c.env.DB.prepare(
    `UPDATE jobs SET status = ?,
       applied_at = CASE WHEN ? = 'applied' AND applied_at IS NULL THEN ? ELSE applied_at END,
       updated_at = ?
     WHERE id = ? AND user_id = ?`
  )
    .bind(to, to, now(), now(), id, userId)
    .run();
  if (!assign.meta.changes) return c.json({ error: "Not found" }, 404);

  if (to !== job.status) {
    await logStatusChange(c.env.DB, id, to);
  }

  // Renumber the destination column to integer sort_order with this card pinned at `index`.
  const rows = await renumberColumn(c.env.DB, userId, to, id, index);
  return c.json(rows);
});

jobs.delete("/:id", async (c) => {
  const result = await c.env.DB.prepare("DELETE FROM jobs WHERE id = ? AND user_id = ?")
    .bind(c.req.param("id"), c.get("userId"))
    .run();
  if (!result.meta.changes) return c.json({ error: "Not found" }, 404);
  return c.json({ ok: true });
});

async function logStatusChange(db: D1Database, jobId: string, status: JobStatus) {
  await db
    .prepare("INSERT INTO activities (id, job_id, type, title) VALUES (?, ?, 'status_change', ?)")
    .bind(crypto.randomUUID(), jobId, `Moved to ${STATUS_LABELS[status]}`)
    .run();
}

// ---- child resources ----

function childRoutes<T extends z.ZodTypeAny>(opts: {
  table: "contacts" | "activities" | "reminders";
  schema: T;
  columns: string[];
  orderBy: string;
}) {
  const r = new Hono<AppEnv>();

  r.get(`/:id/${opts.table}`, async (c) => {
    const job = await ownedJob(c, c.get("userId"), c.req.param("id"));
    if (!job) return c.json({ error: "Not found" }, 404);
    const { results } = await c.env.DB.prepare(
      `SELECT * FROM ${opts.table} WHERE job_id = ? ORDER BY ${opts.orderBy}`
    )
      .bind(job.id)
      .all();
    return c.json(results);
  });

  r.post(`/:id/${opts.table}`, async (c) => {
    const job = await ownedJob(c, c.get("userId"), c.req.param("id"));
    if (!job) return c.json({ error: "Not found" }, 404);
    const parsed = opts.schema.safeParse(await c.req.json().catch(() => null));
    if (!parsed.success) return c.json({ error: firstIssue(parsed.error) }, 400);
    const data = parsed.data as Record<string, unknown>;
    const id = crypto.randomUUID();
    const cols = opts.columns.filter((col) => data[col] !== undefined);
    await c.env.DB.prepare(
      `INSERT INTO ${opts.table} (id, job_id, ${cols.join(", ")})
       VALUES (?, ?, ${cols.map(() => "?").join(", ")})`
    )
      .bind(id, job.id, ...cols.map((col) => data[col] ?? null))
      .run();
    const row = await c.env.DB.prepare(`SELECT * FROM ${opts.table} WHERE id = ?`).bind(id).first();
    return c.json(row, 201);
  });

  return r;
}

jobs.route("/", childRoutes({ table: "contacts", schema: contactFields, columns: ["name", "role", "email", "phone", "linkedin", "notes"], orderBy: "created_at" }));
jobs.route("/", childRoutes({ table: "activities", schema: activityFields, columns: ["type", "title", "notes", "happened_at"], orderBy: "happened_at DESC" }));
jobs.route("/", childRoutes({ table: "reminders", schema: reminderFields, columns: ["due_at", "note"], orderBy: "due_at" }));

export { contactFields, activityFields, reminderFields };
export default jobs;
