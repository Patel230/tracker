import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Plus, X } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { api } from "../lib/api";
import { STATUS_LABELS, type Job, type JobStatus } from "../../shared/types";
import { STATUS_BG } from "../lib/theme";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { SortableJobCard } from "./JobCard";

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
  const [official_website, setOfficial_website] = useState("");
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !title.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const job = await api.post<Job>("/jobs", { company: company.trim(), official_website: official_website.trim() || null, title: title.trim(), status });
      onCreated(job);
      setSaved(true);
      setTimeout(() => {
        setCompany("");
        setOfficial_website("");
        setTitle("");
        setAdding(false);
        setSaved(false);
      }, 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add job");
    } finally {
      setBusy(false);
    }
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
            <SortableJobCard key={job.id} job={job} onOpen={onOpen} />
          ))}
        </SortableContext>
      </div>

      <footer className="border-t-[3px] border-brut-ink p-2">
        {adding ? (
              <form onSubmit={submit} className="space-y-2">
            <Input
              autoFocus
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={busy || saved}
            />
            <Input
              placeholder="Official website"
              value={official_website}
              onChange={(e) => setOfficial_website(e.target.value)}
              disabled={busy || saved}
              type="url"
            />
            <Input
              placeholder="Job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={busy || saved}
            />
            {saved ? (
              <p className="flex items-center gap-1 border-[3px] border-brut-interview bg-brut-interview/10 px-2 py-1.5 text-xs font-bold text-brut-interview">
                <CheckCircle2 size={13} strokeWidth={2.5} />
                Added
              </p>
            ) : error ? (
              <p className="flex items-center gap-1 border-[3px] border-destructive bg-destructive/20 px-2 py-1.5 text-xs font-bold text-destructive">
                <AlertCircle size={13} strokeWidth={2.5} />
                {error}
              </p>
            ) : null}
            <div className="flex gap-2">
              <Button type="submit" size="sm" disabled={busy || saved}>
                {busy ? "Adding…" : <><Plus size={13} strokeWidth={2.5} />Add</>}
              </Button>
              <Button type="button" variant="secondary" size="sm" onClick={() => { setAdding(false); setOfficial_website(""); }} disabled={busy || saved}>
                <X size={13} strokeWidth={2.5} />
                Cancel
              </Button>
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
