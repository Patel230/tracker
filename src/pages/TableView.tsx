import { useEffect, useMemo, useState } from "react";
import { ArchiveRestore, ChevronDown, ChevronUp, Search } from "lucide-react";
import { api } from "../lib/api";
import { JOB_STATUSES, STATUS_LABELS, type Job, type JobStatus } from "../../shared/types";
import { salaryLabel, daysAgo, exactTimestamp } from "../components/JobCard";
import { STATUS_BG, STATUS_TEXT } from "../lib/theme";
import JobDrawer from "../components/JobDrawer";

type SortKey = "company" | "title" | "status" | "applied_at" | "created_at";

export default function TableView() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<JobStatus | "all">("all");
  const [showArchived, setShowArchived] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortAsc, setSortAsc] = useState(false);
  const [openJobId, setOpenJobId] = useState<string | null>(null);

  useEffect(() => {
    api.get<Job[]>(`/jobs${showArchived ? "?archived=1" : ""}`).then(setJobs);
  }, [showArchived]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = jobs.filter(
      (j) =>
        (status === "all" || j.status === status) &&
        (!q ||
          j.company.toLowerCase().includes(q) ||
          j.title.toLowerCase().includes(q) ||
          (j.location ?? "").toLowerCase().includes(q))
    );
    return filtered.sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      const cmp = String(av).localeCompare(String(bv));
      return sortAsc ? cmp : -cmp;
    });
  }, [jobs, query, status, sortKey, sortAsc]);

  const openJob = openJobId ? (jobs.find((j) => j.id === openJobId) ?? null) : null;

  const header = (key: SortKey, label: string) => (
    <th
      onClick={() => {
        if (sortKey === key) setSortAsc(!sortAsc);
        else {
          setSortKey(key);
          setSortAsc(true);
        }
      }}
      className="cursor-pointer select-none px-4 py-2.5 text-left text-xs font-extrabold uppercase tracking-wide text-brut-paper hover:text-brut-yellow"
    >
      <span className="flex items-center gap-1">
        {label}
        {sortKey === key &&
          (sortAsc ? <ChevronUp size={13} strokeWidth={3} /> : <ChevronDown size={13} strokeWidth={3} />)}
      </span>
    </th>
  );

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative w-72">
          <Search size={14} strokeWidth={2.5} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-brut-ink/40" />
          <input
            placeholder="Search company, title, location…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-brut pl-8"
          />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value as JobStatus | "all")} className="input-brut w-auto">
          <option value="all">All statuses</option>
          {JOB_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brut-ink">
          <input
            type="checkbox"
            checked={showArchived}
            onChange={(e) => setShowArchived(e.target.checked)}
            className="size-4 accent-brut-ink"
          />
          <ArchiveRestore size={13} strokeWidth={2.5} />
          Include archived
        </label>
        <span className="ml-auto text-xs font-bold uppercase tracking-wide text-brut-ink/40">{rows.length} jobs</span>
      </div>

      <div className="card-brut overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-brut-ink">
            <tr>
              {header("company", "Company")}
              {header("title", "Title")}
              {header("status", "Status")}
              <th className="px-4 py-2.5 text-left text-xs font-extrabold uppercase tracking-wide text-brut-paper">Location</th>
              <th className="px-4 py-2.5 text-left text-xs font-extrabold uppercase tracking-wide text-brut-paper">Salary</th>
              {header("applied_at", "Applied")}
              {header("created_at", "Added")}
            </tr>
          </thead>
          <tbody>
            {rows.map((j) => (
              <tr
                key={j.id}
                onClick={() => setOpenJobId(j.id)}
                className="cursor-pointer border-b-2 border-brut-ink/10 last:border-0 hover:bg-brut-yellow/20"
              >
                <td className="px-4 py-2.5 font-extrabold text-brut-ink">
                  {j.company}
                  {!!j.archived && <span className="ml-2 text-xs font-bold text-brut-ink/40">(archived)</span>}
                </td>
                <td className="px-4 py-2.5 font-medium text-brut-ink/80">{j.title}</td>
                <td className="px-4 py-2.5">
                  <span className={`badge-brut border-brut-ink ${STATUS_BG[j.status]} ${STATUS_TEXT[j.status]}`}>
                    {STATUS_LABELS[j.status]}
                  </span>
                </td>
                <td className="px-4 py-2.5 font-medium text-brut-ink/60">{j.location ?? "—"}</td>
                <td className="px-4 py-2.5 font-medium text-brut-ink/60">{salaryLabel(j) ?? "—"}</td>
                <td
                  title={j.applied_at ? exactTimestamp(j.applied_at) : undefined}
                  className="px-4 py-2.5 font-medium text-brut-ink/60"
                >
                  {j.applied_at ? daysAgo(j.applied_at) : "—"}
                </td>
                <td title={exactTimestamp(j.created_at)} className="px-4 py-2.5 font-medium text-brut-ink/60">
                  {daysAgo(j.created_at)}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm font-bold uppercase tracking-wide text-brut-ink/40">
                  No jobs match.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openJob && (
        <JobDrawer
          job={openJob}
          onClose={() => setOpenJobId(null)}
          onChange={(j) => setJobs((js) => js.map((x) => (x.id === j.id ? j : x)))}
          onDelete={(id) => {
            setJobs((js) => js.filter((x) => x.id !== id));
            setOpenJobId(null);
          }}
        />
      )}
    </div>
  );
}
