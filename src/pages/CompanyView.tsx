import { useMemo, useState } from "react";
import { RotateCcw, ChevronDown, ChevronRight, Search, ExternalLink } from "lucide-react";
import { useFetch } from "../lib/useFetch";
import { JOB_STATUSES, STATUS_LABELS, safeExternalUrl, type Job, type JobStatus } from "../../shared/types";
import { STATUS_BG, STATUS_TEXT } from "../lib/theme";
import { salaryLabel } from "../components/JobCard";
import JobDrawer from "../components/JobDrawer";
import { Input } from "../components/ui/input";

interface CompanyGroup {
  name: string;
  jobs: Job[];
  total: number;
}

export default function CompanyView() {
  const { data: jobs, error, loading, reload } = useFetch<Job[]>("/jobs");
  const [query, setQuery] = useState("");
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);
  const [openJobId, setOpenJobId] = useState<string | null>(null);

  const groups = useMemo<CompanyGroup[]>(() => {
    if (!jobs) return [];
    const map = new Map<string, Job[]>();
    for (const job of jobs) {
      const existing = map.get(job.company) ?? [];
      existing.push(job);
      map.set(job.company, existing);
    }
    return Array.from(map.entries())
      .map(([name, js]) => ({ name, jobs: js, total: js.length }))
      .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
  }, [jobs]);

  const allRows = useMemo(() => {
    if (!jobs) return [];
    if (!query) return jobs;
    const q = query.trim().toLowerCase();
    return jobs
      .filter((j) => j.company.toLowerCase().includes(q) || j.title.toLowerCase().includes(q))
      .sort((a, b) => {
        const cmp = a.company.localeCompare(b.company);
        return cmp || a.title.localeCompare(b.title);
      });
  }, [jobs, query]);

  const toggleCompany = (name: string) => setExpandedCompany(expandedCompany === name ? null : name);
  const openJob = openJobId ? allRows.find((j) => j.id === openJobId) ?? null : null;

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-sm font-bold uppercase tracking-wider text-muted-foreground">
        Loading…
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-destructive">Couldn't load your jobs.</p>
        <button
          onClick={reload}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground border-[3px] border-brut-ink bg-card hover:bg-brut-paper transition-colors"
        >
          <RotateCcw size={14} strokeWidth={2.5} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-5 flex items-center gap-3">
        <button
          onClick={reload}
          className="flex items-center justify-center px-2"
        >
          <RotateCcw size={14} strokeWidth={2.5} className="text-muted-foreground hover:text-foreground transition-colors" />
        </button>
        <div className="relative">
          <Search size={14} strokeWidth={2.5} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search company, title…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <span className="ml-auto text-xs font-bold uppercase tracking-wider text-muted-foreground">{allRows.length} jobs</span>
      </div>

      {groups.length === 0 ? (
        <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">No companies found.</p>
      ) : (
        <div className="space-y-4">
          {groups.map(({ name, jobs: groupJobs }) => {
            const jobCount = groupJobs.length;
            const statusCounts: Record<JobStatus, number> = JOB_STATUSES.reduce(
              (acc, s) => ({ ...acc, [s]: groupJobs.filter((j) => j.status === s).length }),
              {} as Record<JobStatus, number>
            );


            return (
              <div key={name} className="border-[3px] border-brut-ink bg-card">
                <button
                  onClick={() => toggleCompany(name)}
                  className="flex w-full items-center gap-3 px-5 py-3 hover:bg-brut-paper/30 transition-colors"
                >
                  {expandedCompany === name ? <ChevronDown size={14} strokeWidth={2} className="text-muted-foreground shrink-0" />
                    : <ChevronRight size={14} strokeWidth={2} className="text-muted-foreground shrink-0" />}
                  <span className="flex-1 text-left text-sm font-bold uppercase tracking-wider text-foreground">{name}</span>
                  <span className="text-xs text-muted-foreground">{jobCount} job{jobCount === 1 ? "" : "s"}</span>
                </button>

                {expandedCompany === name && (
                  <div className="px-5 pb-3">
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {JOB_STATUSES.map((s) => (
                        statusCounts[s] > 0 && (
                          <span key={s} className={`flex items-center gap-1 border-[3px] border-brut-ink px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${STATUS_BG[s]} ${STATUS_TEXT[s]} text-white`}>
                            {STATUS_LABELS[s]}: {statusCounts[s]}
                          </span>
                        )
                      ))}
                    </div>

                    <div className="border-t-[3px] border-brut-ink/5">
                      {allRows
                        .filter((j) => j.company === name)
                        .map((j) => (
                          <div
                            key={j.id}
                            onClick={() => setOpenJobId(j.id)}
                            className="flex items-center gap-3 px-3 py-2.5 cursor-pointer border-b-[3px] border-brut-ink/5 last:border-0 hover:bg-brut-paper/30 transition-colors"
                          >
                            <span className="flex-1 text-xs font-bold text-foreground">{j.title}</span>
                            {safeExternalUrl(j.official_website) && (
                              <a href={safeExternalUrl(j.official_website)!} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[11px] font-bold text-brut-applied">
                                Open
                                <ExternalLink size={11} strokeWidth={2.5} />
                              </a>
                            )}
                            <span className={`text-xs font-bold uppercase ${STATUS_TEXT[j.status]}`}>
                              {STATUS_LABELS[j.status]}
                            </span>
                            {salaryLabel(j) && (
                              <span className="text-xs font-bold text-brut-offer">{salaryLabel(j)}</span>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {openJob && (
        <JobDrawer
          job={openJob}
          onClose={() => setOpenJobId(null)}
          onChange={() => {}}
          onDelete={() => {}}
        />
      )}
    </div>
  );
}
