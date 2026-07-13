import { useState, type FormEvent } from "react";
import { Plus, X } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { api } from "../lib/api";
import { STATUS_LABELS, type Job, type JobStatus } from "../../shared/types";
import { STATUS_BG } from "../lib/theme";
import { Badge } from "../components/ui/badge";
import JobCard from "./JobCard";

interface Props {
  status: JobStatus;
  droppableId: string;
  jobs: Job[];
  onOpen: (id: string) => void;
  onCreated: (job: Job) => void;
}

const COLUMN_COLORS: Record<JobStatus, { headerBg: string }> = {
  wishlist: { headerBg: "bg-brut-wishlist/15" },
  applied: { headerBg: "bg-brut-applied/15" },
  interview: { headerBg: "bg-brut-interview/15" },
  offer: { headerBg: "bg-brut-offer/15" },
  rejected: { headerBg: "bg-brut-rejected/15" },
};

export default function KanbanColumn({ status, droppableId, jobs, onOpen, onCreated }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: droppableId });
  const [adding, setAdding] = useState(false);
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !title.trim()) return;
    const job = await api.post<Job>("/jobs", { company: company.trim(), title: title.trim(), status });
    onCreated(job);
    setCompany("");
    setTitle("");
    setAdding(false);
  };

  const cc = COLUMN_COLORS[status];

  return (
    <section className="flex h-full w-72 flex-col border-[3px] border-brut-ink bg-card">
      <div className={`h-1.5 ${STATUS_BG[status]}`} />
      <header className={`flex items-center justify-between border-b-[3px] border-brut-ink px-3 py-2.5 ${cc.headerBg}`}>
        <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">{STATUS_LABELS[status]}</h2>
        <Badge variant="secondary" className="text-[11px] px-2 py-0.5">
          {jobs.length}
        </Badge>
      </header>

      <div
        ref={setNodeRef}
        className={`min-h-0 flex-1 space-y-2 overflow-y-auto p-2 ${isOver ? "bg-primary/20" : "bg-background/30"}`}
      >
        <SortableContext items={jobs.map((j) => j.id)} strategy={verticalListSortingStrategy}>
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onOpen={onOpen} />
          ))}
        </SortableContext>
      </div>

      <footer className="border-t-[3px] border-brut-ink p-2">
        {adding ? (
          <form onSubmit={submit} className="space-y-2">
            <input
              autoFocus
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="flex w-full border-[3px] border-brut-ink bg-input px-3 py-2 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-150"
            />
            <input
              placeholder="Job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex w-full border-[3px] border-brut-ink bg-input px-3 py-2 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-150"
            />
            <div className="flex gap-2">
              <button type="submit" className="inline-flex items-center justify-center gap-1.5 border-[3px] border-brut-ink bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-[3px_3px_0_0_#000] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_0_#000] transition-all duration-150">
                <Plus size={13} strokeWidth={2.5} />
                Add
              </button>
              <button type="button" onClick={() => setAdding(false)} className="inline-flex items-center justify-center gap-1.5 border-[3px] border-brut-ink bg-card px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground shadow-[3px_3px_0_0_#000] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_0_#000] transition-all duration-150">
                <X size={13} strokeWidth={2.5} />
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className={`flex w-full items-center justify-center gap-1.5 border-[3px] border-dashed py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
              isOver
                ? `${STATUS_BG[status]} border-brut-ink text-white`
                : "border-brut-ink/30 text-muted-foreground hover:border-brut-ink hover:text-foreground"
            }`}
          >
            <Plus size={13} strokeWidth={2.5} />
            Add job
          </button>
        )}
      </footer>
    </section>
  );
}
