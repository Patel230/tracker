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
  wishlist: { accent: "bg-yellow-400 shadow-yellow-500/50", badgeBg: "bg-yellow-500/15 border-yellow-500/30", badgeText: "text-yellow-300", topBorder: "from-yellow-400 via-amber-500 to-orange-500" },
  applied: { accent: "bg-cyan-400 shadow-cyan-500/50", badgeBg: "bg-cyan-500/15 border-cyan-500/30", badgeText: "text-cyan-300", topBorder: "from-cyan-400 via-sky-500 to-blue-500" },
  interview: { accent: "bg-lime-400 shadow-lime-500/50", badgeBg: "bg-lime-500/15 border-lime-500/30", badgeText: "text-lime-300", topBorder: "from-lime-400 via-emerald-500 to-teal-500" },
  offer: { accent: "bg-fuchsia-400 shadow-fuchsia-500/50", badgeBg: "bg-fuchsia-500/15 border-fuchsia-500/30", badgeText: "text-fuchsia-300", topBorder: "from-fuchsia-400 via-pink-500 to-rose-500" },
  rejected: { accent: "bg-red-400 shadow-red-500/50", badgeBg: "bg-red-500/15 border-red-500/30", badgeText: "text-red-300", topBorder: "from-red-400 via-rose-500 to-red-600" },
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
    <section className="flex h-full w-80 flex-col rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-xl overflow-hidden shadow-xl">
      <div className={`h-1.5 bg-gradient-to-r ${theme.topBorder}`} />
      
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <span className={`size-2.5 rounded-full ${theme.accent} shadow-sm`} />
          <h2 className="text-xs font-bold uppercase tracking-wider text-white">{STATUS_LABELS[status]}</h2>
        </div>
        <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${theme.badgeBg} ${theme.badgeText}`}>
          {jobs.length}
        </span>
      </header>

      <div
        ref={setNodeRef}
        className={`min-h-0 flex-1 space-y-3 overflow-y-auto p-3 transition-colors ${
          isOver ? "bg-lime-500/10 ring-2 ring-lime-500/30 ring-inset" : ""
        }`}
      >
        <SortableContext items={jobs.map((j) => j.id)} strategy={verticalListSortingStrategy}>
          {jobs.map((job) => (
            <SortableJobCard key={job.id} job={job} onOpen={onOpen} />
          ))}
        </SortableContext>
      </div>

      <footer className="border-t border-white/10 p-3 bg-white/[0.01]">
        {adding ? (
          <form onSubmit={submit} className="space-y-2">
            <input
              autoFocus
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs font-semibold text-white placeholder:text-slate-500 focus:border-lime-500 focus:outline-none transition-all"
            />
            <input
              placeholder="Job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs font-semibold text-white placeholder:text-slate-500 focus:border-lime-500 focus:outline-none transition-all"
            />
            {formError && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-xs font-semibold text-red-400">
                {formError}
              </p>
            )}
            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={busy}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl gradient-lime px-3 py-2 text-xs font-extrabold text-slate-950 shadow-lg shadow-lime-500/20 hover:shadow-lime-500/40 transition-all disabled:opacity-50"
              >
                <Plus size={14} strokeWidth={2.5} />
                {busy ? "…" : "Add"}
              </button>
              <button
                type="button"
                onClick={() => setAdding(false)}
                disabled={busy}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
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
                ? "border-lime-500 bg-lime-500/10 text-lime-400"
                : "border-white/10 text-slate-400 hover:border-lime-500/40 hover:bg-white/5 hover:text-slate-200"
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
