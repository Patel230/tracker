import { useEffect, useMemo, useState } from "react";
import { ArchiveRestore, ChevronDown, ChevronUp, RotateCcw, Search, ListFilter } from "lucide-react";
import { useFetch } from "../lib/useFetch";
import { JOB_STATUSES, STATUS_LABELS, type Job, type JobStatus } from "../../shared/types";
import { salaryLabel, daysAgo, exactTimestamp } from "../components/JobCard";
import JobDrawer from "../components/JobDrawer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

type SortKey = "company" | "title" | "status" | "applied_at" | "created_at";

const STATUS_BADGE_STYLES: Record<JobStatus, { bg: string; text: string; border: string }> = {
  wishlist: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  applied: { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/30" },
  interview: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  offer: { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/30" },
  rejected: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/30" },
};

export default function TableView() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<JobStatus | "all">("all");
  const [showArchived, setShowArchived] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortAsc, setSortAsc] = useState(false);
  const [openJobId, setOpenJobId] = useState<string | null>(null);

  const { data, error, loading, reload } = useFetch<Job[]>(`/jobs${showArchived ? "?archived=1" : ""}`, [
    showArchived,
  ]);
  const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => {
    if (data) setJobs(data);
  }, [data]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = jobs.filter(
      (j) =>
        (showArchived || !j.archived) &&
        (status === "all" || j.status === status) &&
        (!q ||
          j.company.toLowerCase().includes(q) ||
          j.title.toLowerCase().includes(q) ||
          (j.location ?? "").toLowerCase().includes(q))
    );
    return filtered.sort((a, b) => {
      let cmp: number;
      if (sortKey === "status") {
        cmp = JOB_STATUSES.indexOf(a.status) - JOB_STATUSES.indexOf(b.status);
      } else {
        const av = a[sortKey] ?? "";
        const bv = b[sortKey] ?? "";
        cmp = String(av).localeCompare(String(bv));
      }
      return sortAsc ? cmp : -cmp;
    });
  }, [jobs, query, status, sortKey, sortAsc]);

  const openJob = openJobId ? (jobs.find((j) => j.id === openJobId) ?? null) : null;

  const header = (key: SortKey, label: string) => (
    <th
      onClick={() => {
        if (sortKey === key) setSortAsc(!sortAsc);
        else { setSortKey(key); setSortAsc(true); }
      }}
      className="cursor-pointer select-none bg-slate-900/90 border-b border-white/10 px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
    >
      <span className="flex items-center gap-1.5">
        {label}
        {sortKey === key &&
          (sortAsc ? <ChevronUp size={13} strokeWidth={2.5} className="text-indigo-400" /> : <ChevronDown size={13} strokeWidth={2.5} className="text-indigo-400" />)}
      </span>
    </th>
  );

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-sm font-semibold text-slate-400">
        Loading…
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-sm font-semibold text-rose-400">Couldn't load your jobs.</p>
        <Button variant="outline" size="sm" onClick={reload} className="rounded-xl border-white/10">
          <RotateCcw size={14} strokeWidth={2} />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-3 shadow-xl">
          <Button variant="ghost" size="sm" onClick={reload} className="rounded-xl px-2.5 text-slate-400 hover:text-white">
            <RotateCcw size={15} strokeWidth={2} />
          </Button>
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} strokeWidth={2} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search company, title, location…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 rounded-xl border-white/5 bg-slate-950 text-white placeholder:text-slate-500 text-xs h-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <ListFilter size={15} strokeWidth={2} className="text-slate-400" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as JobStatus | "all")}
              className="rounded-xl border border-white/10 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500 h-9"
            >
              <option value="all">All statuses</option>
              {JOB_STATUSES.map((s) => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-2 px-2 text-xs font-medium text-slate-300">
            <input
              type="checkbox"
              checked={showArchived}
              onChange={(e) => setShowArchived(e.target.checked)}
              className="size-4 rounded accent-indigo-600"
            />
            <ArchiveRestore size={14} strokeWidth={2} className="text-slate-400" />
            Include archived
          </label>
          <span className="ml-auto text-xs font-semibold text-slate-400 px-2">{rows.length} jobs</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/80 shadow-2xl overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr>
                {header("company", "Company")}
                {header("title", "Title")}
                {header("status", "Status")}
                <th className="bg-slate-900/90 border-b border-white/10 px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-300">Location</th>
                <th className="bg-slate-900/90 border-b border-white/10 px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-300">Salary</th>
                {header("applied_at", "Applied")}
                {header("created_at", "Added")}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((j) => {
                const badge = STATUS_BADGE_STYLES[j.status];
                return (
                  <tr
                    key={j.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setOpenJobId(j.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpenJobId(j.id);
                      }
                    }}
                    aria-label={`Open ${j.company} — ${j.title}`}
                    className="cursor-pointer hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-4 py-3 font-bold text-white">
                      {j.company}
                      {!!j.archived && <span className="ml-2 text-xs font-normal text-slate-500">(archived)</span>}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-300">{j.title}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-lg border px-2.5 py-1 text-[11px] font-bold ${badge.bg} ${badge.text} ${badge.border}`}>
                        {STATUS_LABELS[j.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-400">{j.location ?? "—"}</td>
                    <td className="px-4 py-3 font-semibold text-slate-200">
                      {salaryLabel(j) ?? "—"}
                    </td>
                    <td
                      title={j.applied_at ? exactTimestamp(j.applied_at) : undefined}
                      className="px-4 py-3 font-medium text-sky-400"
                    >
                      {j.applied_at ? daysAgo(j.applied_at) : "—"}
                    </td>
                    <td title={exactTimestamp(j.created_at)} className="px-4 py-3 font-medium text-slate-400">
                      {daysAgo(j.created_at)}
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-xs font-semibold text-slate-400">
                    No jobs match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {openJob && (
        <JobDrawer
          key={openJob.id}
          job={openJob}
          onClose={() => setOpenJobId(null)}
          onChange={(updated) => setJobs((js) => js.map((x) => updated.find((u) => u.id === x.id) ?? x))}
          onDelete={(id) => { setJobs((js) => js.filter((x) => x.id !== id)); setOpenJobId(null); }}
        />
      )}
    </div>
  );
}
