import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Clock, MapPin, Wallet } from "lucide-react";
import { PERIOD_LABELS, type Job, type JobStatus } from "../../shared/types";
import { STATUS_BG } from "../lib/theme";

const BORDER_COLORS: Record<JobStatus, string> = {
  wishlist: "border-l-brut-wishlist",
  applied: "border-l-brut-applied",
  interview: "border-l-brut-interview",
  offer: "border-l-brut-offer",
  rejected: "border-l-brut-rejected",
};

export function salaryLabel(job: Job): string | null {
  const fmt = (n: number) => (n >= 1000 ? `${Math.round(n / 1000)}k` : String(n));
  let range: string | null = null;
  if (job.salary_min && job.salary_max) range = `${fmt(job.salary_min)}–${fmt(job.salary_max)}`;
  else if (job.salary_min) range = `${fmt(job.salary_min)}+`;
  else if (job.salary_max) range = `up to ${fmt(job.salary_max)}`;
  if (!range) return null;
  const unit = job.salary_period ? PERIOD_LABELS[job.salary_period] : "";
  return `${job.salary_currency ?? ""}${range}${unit}`;
}

export function daysAgo(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "1d ago";
  return `${days}d ago`;
}

export function exactTimestamp(iso: string): string {
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

interface Props {
  job: Job;
  onOpen?: (id: string) => void;
  overlay?: boolean;
}

export default function JobCard({ job, onOpen, overlay }: Props) {
  const sortable = useSortable({ id: job.id, disabled: overlay });
  const style = overlay
    ? undefined
    : {
        transform: CSS.Transform.toString(sortable.transform),
        transition: sortable.transition,
        opacity: sortable.isDragging ? 0.3 : 1,
      };

  const salary = salaryLabel(job);
  const borderColor = BORDER_COLORS[job.status];

  return (
    <div
      ref={overlay ? undefined : sortable.setNodeRef}
      style={style}
      {...(overlay ? {} : { ...sortable.attributes, ...sortable.listeners })}
      onClick={() => onOpen?.(job.id)}
      className={`border-2 border-brut-ink border-l-4 bg-card cursor-grab p-3 transition-all ${borderColor} ${
        overlay ? "rotate-2 shadow-[6px_6px_0_0_hsl(0_0%_0%)]" : "hover:shadow-[2px_2px_0_0_hsl(0_0%_0%)] hover:-translate-y-0.5"
      }`}
    >
      <div className="text-sm font-extrabold text-foreground">{job.company}</div>
      <div className="mt-0.5 text-sm font-medium text-foreground/70">{job.title}</div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {job.location && (
          <span className="flex items-center gap-1 border-2 border-brut-ink/30 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <MapPin size={10} strokeWidth={2.5} />
            {job.location}
          </span>
        )}
        {salary && (
          <span className={`flex items-center gap-1 border-2 border-brut-ink px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${STATUS_BG[job.status]} text-white`}>
            <Wallet size={10} strokeWidth={2.5} />
            {salary}
          </span>
        )}
        <span
          title={exactTimestamp(job.applied_at ?? job.created_at)}
          className="ml-auto flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
        >
          <Clock size={10} strokeWidth={2.5} />
          {daysAgo(job.applied_at ?? job.created_at)}
        </span>
      </div>
    </div>
  );
}
