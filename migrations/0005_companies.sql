-- Companies: a first-class entity holding a company's name and its official
-- job portal URL, so the portal is stored once and many jobs can link to it
-- (and the user can open it to apply). Previously company was free text on
-- every job, so the same portal was either re-typed per job or not stored.
--
-- jobs.company (the denormalized display name) is kept: every view, the
-- reminders join and stats group by it, and dropping it would mean rewriting
-- all of them. company_id is the canonical link; when set, the name comes from
-- the companies table and is copied into jobs.company on write.
CREATE TABLE companies (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  portal_url TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_companies_user_name ON companies(user_id, name);

-- One company per distinct (user_id, company) already on jobs. lower(hex(...))
-- is a random UUID-v4-shaped key without needing a uuid extension; it is never
-- user-typed, so its shape doesn't matter beyond uniqueness.
INSERT INTO companies (id, user_id, name)
SELECT lower(hex(randomblob(16))), user_id, company
FROM jobs
GROUP BY user_id, company;

-- Link jobs to their company. Nullable: jobs created with free-text company
-- that has no match still validate and display; the Company tab exists to link
-- them. The backfill below matches by (user_id, company) name.
ALTER TABLE jobs ADD COLUMN company_id TEXT REFERENCES companies(id);
CREATE INDEX IF NOT EXISTS idx_jobs_company_id ON jobs(company_id);

UPDATE jobs SET company_id = (
  SELECT c.id FROM companies c
  WHERE c.user_id = jobs.user_id AND c.name = jobs.company
);
