import { useEffect, useMemo, useState } from "react";
import { ArchiveRestore, ChevronDown, ChevronUp, Search, ListFilter } from "lucide-react";
import { api } from "../lib/api";
import { JOB_STATUSES, STATUS_LABELS, type Job, type JobStatus } from "../../shared/types";
import { salaryLabel, daysAgo, exactTimestamp } from "../components/JobCard";
import { STATUS_BG, STATUS_TEXT } from "../lib/theme";
import JobDrawer from "../components/JobDrawer";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

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

  const header = (key: SortKey, label: string, color: string) => (
    <th
      onClick={() => {
        if (sortKey === key) setSortAsc(!sortAsc);
        else { setSortKey(key); setSortAsc(true); }
      }}
      className={`cursor-pointer select-none px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-white hover:opacity-80 transition-opacity ${color}`}
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
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search size={14} strokeWidth={2.5} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search company, title, location…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex items-center gap-1">
          <ListFilter size={14} strokeWidth={2.5} className="text-brut-wishlist" />
          <select value={status} onChange={(e) => setStatus(e.target.value as JobStatus | "all")} className="flex w-auto border-[3px] border-brut-ink bg-input px-3 py-2.5 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            <option value="all">All statuses</option>
            {JOB_STATUSES.map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
          <input
            type="checkbox"
            checked={showArchived}
            onChange={(e) => setShowArchived(e.target.checked)}
            className="size-4 accent-primary"
          />
          <ArchiveRestore size={13} strokeWidth={2.5} className="text-brut-offer" />
          Include archived
        </label>
        <span className="ml-auto text-xs font-bold uppercase tracking-wider text-muted-foreground">{rows.length} jobs</span>
      </div>

      <div className="border-[3px] border-brut-ink bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              {header("company", "Company", "bg-brut-wishlist")}
              {header("title", "Title", "bg-brut-applied")}
              {header("status", "Status", "bg-brut-interview")}
              <th className="bg-brut-wishlist px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-white">Location</th>
              <th className="bg-brut-offer px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-white">Salary</th>
              {header("applied_at", "Applied", "bg-brut-applied")}
              {header("created_at", "Added", "bg-brut-ink")}
            </tr>
          </thead>
          <tbody>
            {rows.map((j) => (
              <tr
                key={j.id}
                onClick={() => setOpenJobId(j.id)}
                className="cursor-pointer border-b-[3px] border-brut-ink/5 last:border-0 hover:bg-brut-paper/80 transition-colors"
              >
                <td className="px-4 py-2.5 font-black text-foreground border-l-[6px]"
                  style={{ borderLeftColor: `var(--color-brut-${j.status})` }}>
                  {j.company}
                  {!!j.archived && <span className="ml-2 text-xs font-bold text-muted-foreground">(archived)</span>}
                </td>
                <td className="px-4 py-2.5 font-medium text-foreground/70">{j.title}</td>
                <td className="px-4 py-2.5">
                  <Badge variant="outline" className={`${STATUS_BG[j.status]} ${STATUS_TEXT[j.status]} border-brut-ink`}>
                    {STATUS_LABELS[j.status]}
                  </Badge>
                </td>
                <td className="px-4 py-2.5 font-medium text-muted-foreground">{j.location ?? "—"}</td>
                <td className="px-4 py-2.5 font-medium">
                  <span className="font-bold text-brut-offer">{salaryLabel(j) ?? "—"}</span>
                </td>
                <td
                  title={j.applied_at ? exactTimestamp(j.applied_at) : undefined}
                  className="px-4 py-2.5 font-medium text-brut-applied/60"
                >
                  {j.applied_at ? daysAgo(j.applied_at) : "—"}
                </td>
                <td title={exactTimestamp(j.created_at)} className="px-4 py-2.5 font-medium text-muted-foreground">
                  {daysAgo(j.created_at)}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm font-bold uppercase tracking-wider text-muted-foreground">
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
          onChange={(updated) => setJobs((js) => js.map((x) => updated.find((u) => u.id === x.id) ?? x))}
          onDelete={(id) => { setJobs((js) => js.filter((x) => x.id !== id)); setOpenJobId(null); }}
        />
      )}
    </div>
  );
}
