import { Hono } from "hono";
import { JOB_STATUSES, type JobStatus, type Stats } from "../../shared/types";
import type { AppEnv } from "../lib/auth";

const INTERVIEW_TYPES = "('phone_screen', 'interview', 'onsite', 'offer')";

// Every query here filters archived = 0. The funnel already did, but the rate,
// average and weekly queries did not, so archiving a job removed it from the
// funnel while it kept dragging on the response rate — the numbers on one
// screen disagreed with each other.
//
// applied_at is a permanent "first applied" timestamp: it is stamped the first
// time a job reaches "applied" and never cleared on demotion. So gating the
// response-rate denominator and the weekly chart on `applied_at IS NOT NULL`
// alone would still count a job that was since moved back to Wishlist or on to
// Rejected. Both gate on status = 'applied' as well, so a demoted job leaves
// the denominator and the weekly chart without losing its "first applied" history.

const stats = new Hono<AppEnv>();

stats.get("/", async (c) => {
  const userId = c.get("userId");

  // Four independent analytics reads — run them in parallel instead of
  // awaiting each one and paying four cold-D1 round-trips back-to-back.
  const [funnelRows, rates, avgRow, appliedDates] = await Promise.all([
    c.env.DB.prepare(
      "SELECT status, COUNT(*) AS n FROM jobs WHERE user_id = ? AND archived = 0 GROUP BY status"
    )
      .bind(userId)
      .all<{ status: JobStatus; n: number }>(),

    c.env.DB.prepare(
      `SELECT
         COUNT(*) AS applied,
         SUM(CASE WHEN status IN ('interview', 'offer')
                    OR EXISTS (SELECT 1 FROM activities a
                               WHERE a.job_id = jobs.id AND a.type IN ${INTERVIEW_TYPES})
                  THEN 1 ELSE 0 END) AS responded
       FROM jobs WHERE user_id = ? AND archived = 0 AND status = 'applied' AND applied_at IS NOT NULL`
    )
      .bind(userId)
      .first<{ applied: number; responded: number | null }>(),

    c.env.DB.prepare(
      `SELECT AVG(julianday(first_iv) - julianday(applied_at)) AS avg_days
       FROM (
         SELECT j.applied_at,
                (SELECT MIN(a.happened_at) FROM activities a
                 WHERE a.job_id = j.id AND a.type IN ${INTERVIEW_TYPES}) AS first_iv
         FROM jobs j WHERE j.user_id = ? AND j.archived = 0 AND j.applied_at IS NOT NULL
       ) WHERE first_iv IS NOT NULL`
    )
      .bind(userId)
      .first<{ avg_days: number | null }>(),

    c.env.DB.prepare(
      // 12 Monday-start weeks can span up to ~89 days, so pull 90 to make sure
      // the oldest bucket isn't under-counted at the boundary. The cutoff is
      // ISO-T (strftime …T…Z) to match the T-separated `applied_at` format —
      // datetime('now','-90 days') is space-separated and compares wrong at the
      // boundary (a row ~9h older than the cutoff was getting included).
      // status = 'applied' keeps a demoted job (first-applied stamp retained)
      // out of the "applications per week" chart.
      `SELECT applied_at FROM jobs
       WHERE user_id = ? AND archived = 0 AND status = 'applied'
         AND applied_at >= strftime('%Y-%m-%dT%H:%M:%SZ', 'now', '-90 days')`
    )
      .bind(userId)
      .all<{ applied_at: string }>(),
  ]);

  const funnel = Object.fromEntries(JOB_STATUSES.map((s) => [s, 0])) as Record<JobStatus, number>;
  for (const row of funnelRows.results) funnel[row.status] = row.n;

  // Bucket by Monday-start week, always emitting the full 12-week window.
  const weekStart = (d: Date) => {
    const day = (d.getUTCDay() + 6) % 7;
    const monday = new Date(d);
    monday.setUTCDate(d.getUTCDate() - day);
    return monday.toISOString().slice(0, 10);
  };
  const weekly: { weekStart: string; count: number }[] = [];
  const cursor = new Date();
  cursor.setUTCDate(cursor.getUTCDate() - 7 * 11);
  for (let i = 0; i < 12; i++) {
    weekly.push({ weekStart: weekStart(cursor), count: 0 });
    cursor.setUTCDate(cursor.getUTCDate() + 7);
  }
  for (const row of appliedDates.results) {
    const ws = weekStart(new Date(row.applied_at));
    const bucket = weekly.find((w) => w.weekStart === ws);
    if (bucket) bucket.count++;
  }

  const applied = rates?.applied ?? 0;
  const body: Stats = {
    funnel,
    totalActive: funnel.wishlist + funnel.applied + funnel.interview + funnel.offer,
    responseRate: applied > 0 ? (rates?.responded ?? 0) / applied : null,
    offers: funnel.offer,
    avgDaysToInterview: avgRow?.avg_days ?? null,
    weekly,
  };
  return c.json(body);
});

export default stats;
