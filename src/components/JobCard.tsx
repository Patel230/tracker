import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Clock, MapPin, Wallet } from "lucide-react";
import { PERIOD_LABELS, type Job } from "../../shared/types";

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
        opacity: sortable.isDragging ? 0.4 : 1,
      };

  const salary = salaryLabel(job);

  return (
    <div
      ref={overlay ? undefined : sortable.setNodeRef}
      style={style}
      {...(overlay ? {} : { ...sortable.attributes, ...sortable.listeners })}
      onClick={() => onOpen?.(job.id)}
      className={`card-brut cursor-grab p-3 hover:shadow-[2px_2px_0_var(--color-brut-ink)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${
        overlay ? "rotate-2 shadow-[6px_6px_0_var(--color-brut-ink)]" : ""
      }`}
    >
      <div className="text-sm font-extrabold text-brut-ink">{job.company}</div>
      <div className="mt-0.5 text-sm font-medium text-brut-ink/80">{job.title}</div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {job.location && (
          <span className="badge-brut flex items-center gap-1 border-brut-ink/40 text-brut-ink/70">
            <MapPin size={10} strokeWidth={2.5} />
            {job.location}
          </span>
        )}
        {salary && (
          <span className="badge-brut flex items-center gap-1 border-brut-offer bg-brut-offer/15 text-brut-ink">
            <Wallet size={10} strokeWidth={2.5} />
            {salary}
          </span>
        )}
        <span
          title={exactTimestamp(job.applied_at ?? job.created_at)}
          className="ml-auto flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-brut-ink/40"
        >
          <Clock size={10} strokeWidth={2.5} />
          {daysAgo(job.applied_at ?? job.created_at)}
        </span>
      </div>
    </div>
  );
}
