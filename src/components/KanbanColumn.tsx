import { useState, type FormEvent } from "react";
import { Plus, X } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { api } from "../lib/api";
import { STATUS_LABELS, type Job, type JobStatus } from "../../shared/types";
import { STATUS_BG } from "../lib/theme";
import JobCard from "./JobCard";

interface Props {
  status: JobStatus;
  droppableId: string;
  jobs: Job[];
  onOpen: (id: string) => void;
  onCreated: (job: Job) => void;
}

const COLUMN_COLORS: Record<JobStatus, { headerBg: string; badge: string }> = {
  wishlist: { headerBg: "bg-brut-wishlist/20", badge: "bg-brut-wishlist text-brut-ink" },
  applied: { headerBg: "bg-brut-applied/20", badge: "bg-brut-applied text-white" },
  interview: { headerBg: "bg-brut-interview/20", badge: "bg-brut-interview text-white" },
  offer: { headerBg: "bg-brut-offer/20", badge: "bg-brut-offer text-brut-ink" },
  rejected: { headerBg: "bg-brut-rejected/20", badge: "bg-brut-rejected text-white" },
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
    <section className="flex h-full w-72 flex-col border-2 border-brut-ink bg-brut-surface">
      <div className={`h-2 ${STATUS_BG[status]}`} />
      <header className={`flex items-center justify-between border-b-2 border-brut-ink px-3 py-2.5 ${cc.headerBg}`}>
        <h2 className="text-xs font-extrabold uppercase tracking-wide text-brut-ink">{STATUS_LABELS[status]}</h2>
        <span className={`badge-brut border-brut-ink ${cc.badge}`}>
          {jobs.length}
        </span>
      </header>

      <div
        ref={setNodeRef}
        className={`min-h-0 flex-1 space-y-2 overflow-y-auto p-2 ${isOver ? "bg-brut-yellow/30" : "bg-brut-paper/40"}`}
      >
        <SortableContext items={jobs.map((j) => j.id)} strategy={verticalListSortingStrategy}>
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onOpen={onOpen} />
          ))}
        </SortableContext>
      </div>

      <footer className="border-t-2 border-brut-ink p-2">
        {adding ? (
          <form onSubmit={submit} className="space-y-2">
            <input
              autoFocus
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="input-brut"
            />
            <input
              placeholder="Job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-brut"
            />
            <div className="flex gap-2">
              <button type="submit" className="btn-brut-sm">
                <Plus size={13} strokeWidth={2.5} />
                Add
              </button>
              <button type="button" onClick={() => setAdding(false)} className="btn-brut-sm">
                <X size={13} strokeWidth={2.5} />
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className={`flex w-full items-center justify-center gap-1.5 border-2 border-dashed py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
              isOver
                ? `${STATUS_BG[status]} border-brut-ink text-white`
                : "border-brut-ink/40 text-brut-ink/50 hover:border-brut-ink hover:text-brut-ink"
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
