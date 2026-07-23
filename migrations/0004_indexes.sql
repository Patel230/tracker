-- Indexes for the stats queries and the jobs list filter.
--
-- idx_jobs_applied_at backs the response-rate / weekly / avg-days-to-interview
-- queries, all of which filter on applied_at across a user's whole table.
-- idx_jobs_archived_status backs the GET /jobs archived filter and the funnel's
-- GROUP BY status (the existing idx_jobs_user_status already covers status, but
-- the archived predicate is now on every list query too).
--
-- IF NOT EXISTS so re-applying migrations (local dev reset, or a partial apply)
-- is idempotent rather than failing on the second run.
CREATE INDEX IF NOT EXISTS idx_jobs_applied_at ON jobs(user_id, applied_at);
CREATE INDEX IF NOT EXISTS idx_jobs_archived_status ON jobs(user_id, archived, status);
