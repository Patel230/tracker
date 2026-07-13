-- Salary used to be bare integers with no unit. Attach a currency (ISO 4217)
-- and a period so the dashboard can compare like with like.
ALTER TABLE jobs ADD COLUMN salary_currency TEXT;
ALTER TABLE jobs ADD COLUMN salary_period TEXT
  CHECK (salary_period IS NULL OR salary_period IN ('hour', 'day', 'week', 'month', 'year'));
