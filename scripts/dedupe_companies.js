import { writeFileSync } from "fs";

// SQL Script to deduplicate companies and jobs in D1
const sql = `-- Deduplicate companies and merge jobs per user

-- Step 1: Update jobs to point to the canonical company_id for duplicate company names
UPDATE jobs
SET company_id = (
  SELECT c1.id
  FROM companies c1
  WHERE c1.user_id = jobs.user_id
    AND LOWER(TRIM(c1.name)) = (
      SELECT LOWER(TRIM(c2.name))
      FROM companies c2
      WHERE c2.id = jobs.company_id
    )
  ORDER BY c1.created_at ASC, c1.id ASC
  LIMIT 1
)
WHERE company_id IS NOT NULL;

-- Step 2: Delete duplicate company records, keeping the oldest canonical one per (user_id, LOWER(TRIM(name)))
DELETE FROM companies
WHERE id NOT IN (
  SELECT MIN(id)
  FROM companies
  GROUP BY user_id, LOWER(TRIM(name))
);

-- Step 3: Deduplicate identical jobs (same user_id, company_id, title)
DELETE FROM jobs
WHERE id NOT IN (
  SELECT MIN(id)
  FROM jobs
  GROUP BY user_id, company_id, LOWER(TRIM(title))
);
`;

writeFileSync("migrations/dedupe_companies.sql", sql);
console.log("Generated dedupe_companies.sql script.");
