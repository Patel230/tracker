import { forwardRef, type ComponentPropsWithRef, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Clock, MapPin, Wallet } from "lucide-react";
import { PERIOD_LABELS, type Job, type JobStatus } from "../../shared/types";

const STATUS_PILLS: Record<JobStatus, { border: string; bg: string; text: string }> = {
  wishlist: { border: "border-amber-500/30", bg: "bg-amber-500/10", text: "text-amber-400" },
  applied: { border: "border-sky-500/30", bg: "bg-sky-500/10", text: "text-sky-400" },
  interview: { border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400" },
  offer: { border: "border-pink-500/30", bg: "bg-pink-500/10", text: "text-pink-400" },
  rejected: { border: "border-rose-500/30", bg: "bg-rose-500/10", text: "text-rose-400" },
};

const COMPANY_AVATAR_COLORS = [
  "from-indigo-500 to-purple-600",
  "from-sky-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-pink-500 to-rose-600",
];

export function salaryLabel(job: Job): string | null {
  const fmt = (n: number) => (n >= 1000 ? `${Math.round(n / 1000)}k` : String(n));
  let range: string | null = null;
  if (job.salary_min != null && job.salary_max != null) range = `${fmt(job.salary_min)}–${fmt(job.salary_max)}`;
  else if (job.salary_min != null) range = `${fmt(job.salary_min)}+`;
  else if (job.salary_max != null) range = `up to ${fmt(job.salary_max)}`;
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

export interface JobCardProps extends ComponentPropsWithRef<"div"> {
  job: Job;
  onOpen?: (id: string) => void;
  overlay?: boolean;
}

export const JobCard = forwardRef<HTMLDivElement, JobCardProps>(function JobCard(
  { job, onOpen, overlay, style, className = "", ...rest },
  ref
) {
  const salary = salaryLabel(job);
  const pill = STATUS_PILLS[job.status];
  const avatarIndex = Math.abs(job.company.charCodeAt(0)) % COMPANY_AVATAR_COLORS.length;

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen?.(job.id);
    }
  };

  return (
    <div
      {...rest}
      ref={ref}
      style={style}
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onClick={() => onOpen?.(job.id)}
      onKeyDown={onOpen ? onKeyDown : undefined}
      aria-label={onOpen ? `Open ${job.company} — ${job.title}` : undefined}
      className={`relative group rounded-2xl border border-white/10 bg-slate-900/80 p-4 transition-all duration-200 cursor-grab ${
        overlay
          ? "rotate-2 shadow-2xl scale-105 border-indigo-500/50 bg-slate-900"
          : "hover:border-indigo-500/40 hover:bg-slate-900 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-0.5"
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${COMPANY_AVATAR_COLORS[avatarIndex]} text-white font-bold text-xs shadow-md shadow-black/20`}>
          {job.company.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-slate-100 group-hover:text-indigo-400 transition-colors truncate">
            {job.company}
          </h3>
          <p className="text-xs font-semibold text-slate-300 truncate mt-0.5">
            {job.title}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
        {job.location && (
          <span className="flex items-center gap-1 rounded-lg bg-slate-800/80 border border-white/5 px-2 py-1 text-[11px] font-medium text-slate-300">
            <MapPin size={11} className="text-slate-400" strokeWidth={2} />
            {job.location}
          </span>
        )}
        {salary && (
          <span className={`flex items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-semibold ${pill.border} ${pill.bg} ${pill.text}`}>
            <Wallet size={11} strokeWidth={2} />
            {salary}
          </span>
        )}
        <span
          title={exactTimestamp(job.applied_at ?? job.created_at)}
          className="ml-auto flex items-center gap-1 text-[11px] font-medium text-slate-400"
        >
          <Clock size={11} strokeWidth={2} />
          {daysAgo(job.applied_at ?? job.created_at)}
        </span>
      </div>
    </div>
  );
});

interface SortableJobCardProps {
  job: Job;
  onOpen?: (id: string) => void;
}

export function SortableJobCard({ job, onOpen }: SortableJobCardProps) {
  const sortable = useSortable({ id: job.id });
  return (
    <JobCard
      ref={sortable.setNodeRef}
      job={job}
      onOpen={onOpen}
      style={{
        transform: CSS.Transform.toString(sortable.transform),
        transition: sortable.transition,
        opacity: sortable.isDragging ? 0.3 : 1,
      }}
      {...sortable.attributes}
      {...sortable.listeners}
    />
  );
}
