import { readFileSync, writeFileSync } from "fs";
import { TOP_COMPANIES } from "../shared/topCompaniesData.ts";

// User IDs fetched from remote D1:
// 70159a67-e787-4fdc-92a3-0ee0969c3753 (lp141015@gmail.com)
// 698e54f8-cd41-4eba-af93-80a4d8b5d8db (lakshmanpatel230@gmail.com)
// 3db69d62-6ede-46be-af62-2f5c00eb8351 (admin@tracker.app)

const userIds = [
  "70159a67-e787-4fdc-92a3-0ee0969c3753",
  "698e54f8-cd41-4eba-af93-80a4d8b5d8db",
  "3db69d62-6ede-46be-af62-2f5c00eb8351",
];

function sqlEscape(str) {
  if (!str) return "NULL";
  return "'" + str.replace(/'/g, "''") + "'";
}

let sql = `-- Seed Top 100 Companies & Top 100 Startups with Backend Engineer wishlist jobs\n\n`;

let companyCount = 0;
let jobCount = 0;

for (const userId of userIds) {
  let order = 0;
  for (const item of TOP_COMPANIES) {
    // Unique deterministic-ish ID based on user + company name
    const companyId = `comp_${userId.substring(0, 8)}_${item.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
    const jobId = `job_${userId.substring(0, 8)}_${item.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`;

    sql += `INSERT OR IGNORE INTO companies (id, user_id, name, portal_url) VALUES (${sqlEscape(companyId)}, ${sqlEscape(userId)}, ${sqlEscape(item.name)}, ${sqlEscape(item.portal_url)});\n`;
    companyCount++;

    const desc = `Backend Engineering career portal for ${item.name}. Check official career page for open roles.`;
    const notes = `Curated ${item.category === "startup" ? "Top Startup" : "Top Tech Company"} Career Page`;
    const loc = item.location || "Remote / Hybrid";

    sql += `INSERT OR IGNORE INTO jobs (id, user_id, company_id, company, title, url, location, status, sort_order, description, notes)\n`;
    sql += `VALUES (${sqlEscape(jobId)}, ${sqlEscape(userId)}, ${sqlEscape(companyId)}, ${sqlEscape(item.name)}, 'Backend Engineer', ${sqlEscape(item.portal_url)}, ${sqlEscape(loc)}, 'wishlist', ${order}, ${sqlEscape(desc)}, ${sqlEscape(notes)});\n`;
    jobCount++;
    order += 10;
  }
}

writeFileSync("migrations/seed_top_companies.sql", sql);
console.log(`Generated seed SQL with ${companyCount} company rows and ${jobCount} job rows.`);
