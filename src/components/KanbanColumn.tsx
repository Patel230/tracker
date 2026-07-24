import { useState, type FormEvent } from "react";
import { Plus, X } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { api } from "../lib/api";
import { STATUS_LABELS, type Job, type JobStatus } from "../../shared/types";
import { SortableJobCard } from "./JobCard";

interface Props {
  status: JobStatus;
  droppableId: string;
  jobs: Job[];
  onOpen: (id: string) => void;
  onCreated: (job: Job) => void;
}

const COLUMN_THEMES: Record<JobStatus, { accent: string; badgeBg: string; badgeText: string; topBorder: string }> = {
  wishlist: { accent: "bg-amber-500", badgeBg: "bg-amber-500/10 border-amber-500/20", badgeText: "text-amber-400", topBorder: "from-amber-500 to-orange-500" },
  applied: { accent: "bg-sky-500", badgeBg: "bg-sky-500/10 border-sky-500/20", badgeText: "text-sky-400", topBorder: "from-sky-500 to-blue-500" },
  interview: { accent: "bg-emerald-500", badgeBg: "bg-emerald-500/10 border-emerald-500/20", badgeText: "text-emerald-400", topBorder: "from-emerald-500 to-teal-500" },
  offer: { accent: "bg-pink-500", badgeBg: "bg-pink-500/10 border-pink-500/20", badgeText: "text-pink-400", topBorder: "from-pink-500 to-rose-500" },
  rejected: { accent: "bg-rose-500", badgeBg: "bg-rose-500/10 border-rose-500/20", badgeText: "text-rose-400", topBorder: "from-rose-500 to-red-600" },
};

export default function KanbanColumn({ status, droppableId, jobs, onOpen, onCreated }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: droppableId });
  const [adding, setAdding] = useState(false);
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !title.trim() || busy) return;
    setBusy(true);
    setFormError(null);
    try {
      const job = await api.post<Job>("/jobs", { company: company.trim(), title: title.trim(), status });
      onCreated(job);
      setCompany("");
      setTitle("");
      setAdding(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Couldn't add job.");
    } finally {
      setBusy(false);
    }
  };

  const theme = COLUMN_THEMES[status];

  return (
    <section className="flex h-full w-80 flex-col rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl overflow-hidden shadow-xl">
      <div className={`h-1.5 bg-gradient-to-r ${theme.topBorder}`} />
      
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-3 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className={`size-2.5 rounded-full ${theme.accent}`} />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">{STATUS_LABELS[status]}</h2>
        </div>
        <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${theme.badgeBg} ${theme.badgeText}`}>
          {jobs.length}
        </span>
      </header>

      <div
        ref={setNodeRef}
        className={`min-h-0 flex-1 space-y-3 overflow-y-auto p-3 transition-colors ${
          isOver ? "bg-indigo-500/10 ring-2 ring-indigo-500/30 ring-inset" : ""
        }`}
      >
        <SortableContext items={jobs.map((j) => j.id)} strategy={verticalListSortingStrategy}>
          {jobs.map((job) => (
            <SortableJobCard key={job.id} job={job} onOpen={onOpen} />
          ))}
        </SortableContext>
      </div>

      <footer className="border-t border-white/5 p-3 bg-white/[0.01]">
        {adding ? (
          <form onSubmit={submit} className="space-y-2">
            <input
              autoFocus
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs font-medium text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition-all"
            />
            <input
              placeholder="Job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs font-medium text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition-all"
            />
            {formError && (
              <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-2 text-xs font-medium text-rose-400">
                {formError}
              </p>
            )}
            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={busy}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl gradient-primary px-3 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all disabled:opacity-50"
              >
                <Plus size={14} strokeWidth={2.5} />
                {busy ? "…" : "Add"}
              </button>
              <button
                type="button"
                onClick={() => setAdding(false)}
                disabled={busy}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
              >
                <X size={14} strokeWidth={2.5} />
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className={`flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed py-2 text-xs font-semibold transition-all ${
              isOver
                ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                : "border-white/10 text-slate-400 hover:border-indigo-500/40 hover:bg-white/5 hover:text-slate-200"
            }`}
          >
            <Plus size={14} strokeWidth={2.5} />
            Add job
          </button>
        )}
      </footer>
    </section>
  );
}
