import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { RotateCcw, Search, Filter } from "lucide-react";
import { api } from "../lib/api";
import { JOB_STATUSES, type Job, type JobStatus } from "../../shared/types";
import KanbanColumn from "../components/KanbanColumn";
import { JobCard } from "../components/JobCard";
import JobDrawer from "../components/JobDrawer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const COL_PREFIX = "col:";

export default function Board() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openJobId, setOpenJobId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const load = useCallback(() => {
    const controller = new AbortController();
    api
      .get<Job[]>("/jobs", controller.signal)
      .then((jobs) => {
        if (!controller.signal.aborted) {
          setJobs(jobs);
          setError(false);
        }
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const cancel = load();
    const handleJobCreated = () => load();
    window.addEventListener("job-created", handleJobCreated);
    return () => {
      cancel();
      window.removeEventListener("job-created", handleJobCreated);
    };
  }, [load]);

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return jobs;
    return jobs.filter(
      (j) =>
        j.company.toLowerCase().includes(q) ||
        j.title.toLowerCase().includes(q) ||
        (j.location ?? "").toLowerCase().includes(q)
    );
  }, [jobs, query]);

  const columns = useMemo(() => {
    const map = Object.fromEntries(JOB_STATUSES.map((s) => [s, [] as Job[]])) as Record<JobStatus, Job[]>;
    for (const j of [...filteredJobs].filter((j) => !j.archived).sort((a, b) => a.sort_order - b.sort_order))
      map[j.status].push(j);
    return map;
  }, [filteredJobs]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const columnOf = (id: string): JobStatus | null => {
    if (id.startsWith(COL_PREFIX)) return id.slice(COL_PREFIX.length) as JobStatus;
    return jobs.find((j) => j.id === id)?.status ?? null;
  };

  const onDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id));

  const onDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!over) return;
    const from = columnOf(String(active.id));
    const to = columnOf(String(over.id));
    if (!from || !to || from === to) return;
    setJobs((prev) => {
      const overJob = prev.find((j) => j.id === String(over.id));
      const colJobs = prev.filter((j) => j.status === to);
      const sortOrder = overJob
        ? overJob.sort_order - 0.5
        : colJobs.length
          ? Math.max(...colJobs.map((j) => j.sort_order)) + 1
          : 0;
      return prev.map((j) => (j.id === String(active.id) ? { ...j, status: to, sort_order: sortOrder } : j));
    });
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    setActiveId(null);
    if (!over) return;
    const activeIdStr = String(active.id);
    const job = jobs.find((j) => j.id === activeIdStr);
    const to = columnOf(String(over.id));
    if (!job || !to) return;

    const col = jobs
      .filter((j) => j.status === to && j.id !== activeIdStr)
      .sort((a, b) => a.sort_order - b.sort_order);
    let index = col.length;
    if (!String(over.id).startsWith(COL_PREFIX)) {
      const overIdx = col.findIndex((j) => j.id === String(over.id));
      if (overIdx !== -1) {
        const overJob = col[overIdx];
        index = job.sort_order <= overJob.sort_order ? overIdx + 1 : overIdx;
      }
    }

    setJobs((js) => js.map((j) => (j.id === activeIdStr ? { ...j, status: to } : j)));
    api
      .patch<Job[]>(`/jobs/${activeIdStr}/move`, { status: to, index })
      .then((rows) => {
        const ids = new Set(rows.map((r) => r.id));
        setJobs((js) => [...js.filter((j) => !ids.has(j.id)), ...rows]);
      })
      .catch(load);
  };

  const activeJob = activeId ? jobs.find((j) => j.id === activeId) : null;
  const openJob = openJobId ? (jobs.find((j) => j.id === openJobId) ?? null) : null;

  if (loading) {
    return <div className="flex h-full items-center justify-center text-muted-foreground text-sm font-bold uppercase tracking-wider">Loading…</div>;
  }
  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-destructive">Couldn't load your board.</p>
        <Button variant="outline" size="sm" onClick={() => { setError(false); setLoading(true); load(); }}>
          <RotateCcw size={14} strokeWidth={2.5} />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-3">
          <div className="relative min-w-[240px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Filter board by company, title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>
          {query && (
            <Button size="sm" variant="ghost" onClick={() => setQuery("")} className="h-9 px-2 text-xs">
              Clear
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <Filter size={12} strokeWidth={2.5} />
          <span>Showing {filteredJobs.length} of {jobs.length} jobs</span>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto min-h-0">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
          onDragCancel={() => {
            setActiveId(null);
            load();
          }}
        >
          <div className="flex h-full min-w-max gap-4 pb-2">
            {JOB_STATUSES.map((status) => (
              <KanbanColumn
                key={status}
                status={status}
                droppableId={`${COL_PREFIX}${status}`}
                jobs={columns[status]}
                onOpen={setOpenJobId}
                onCreated={(job) => setJobs((js) => [...js, job])}
              />
            ))}
          </div>
          <DragOverlay>{activeJob ? <JobCard job={activeJob} overlay /> : null}</DragOverlay>
        </DndContext>
      </div>

      {openJob && (
        <JobDrawer
          key={openJob.id}
          job={openJob}
          onClose={() => setOpenJobId(null)}
          onChange={(updated) =>
            setJobs((js) => js.map((x) => updated.find((u) => u.id === x.id) ?? x))
          }
          onDelete={(id) => {
            setJobs((js) => js.filter((x) => x.id !== id));
            setOpenJobId(null);
          }}
        />
      )}
    </div>
  );
}
