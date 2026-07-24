import { useState } from "react";
import { Award, Bell, Briefcase, Percent, Timer, RotateCcw, Sparkles, Kanban, Building2, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useFetch } from "../lib/useFetch";
import { STATUS_LABELS, JOB_STATUSES, type Stats } from "../../shared/types";
import { useReminders } from "../components/RemindersProvider";
import { Button } from "../components/ui/button";

const TILE_STYLES = [
  { border: "border-amber-500/30", bg: "bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-950", text: "text-amber-400", iconBg: "bg-amber-500/20" },
  { border: "border-sky-500/30", bg: "bg-gradient-to-br from-sky-500/15 via-slate-900 to-slate-950", text: "text-sky-400", iconBg: "bg-sky-500/20" },
  { border: "border-emerald-500/30", bg: "bg-gradient-to-br from-emerald-500/15 via-slate-900 to-slate-950", text: "text-emerald-400", iconBg: "bg-emerald-500/20" },
  { border: "border-pink-500/30", bg: "bg-gradient-to-br from-pink-500/15 via-slate-900 to-slate-950", text: "text-pink-400", iconBg: "bg-pink-500/20" },
];

export default function Dashboard() {
  const { data: stats, error, reload } = useFetch<Stats>("/stats");
  const { reminders, complete } = useReminders();

  if (error || !stats) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-sm font-semibold text-rose-400">
          Couldn't load your stats.
        </p>
        <Button variant="outline" size="sm" onClick={reload} className="rounded-xl border-white/10">
          <RotateCcw size={14} strokeWidth={2} />
          Retry
        </Button>
      </div>
    );
  }

  const tiles: { label: string; value: string; hint?: string; icon: LucideIcon }[] = [
    { label: "Active applications", value: String(stats.totalActive), icon: Briefcase },
    {
      label: "Response rate",
      value: stats.responseRate === null ? "—" : `${Math.round(stats.responseRate * 100)}%`,
      hint: "of applied jobs that reached an interview",
      icon: Percent,
    },
    { label: "Offers", value: String(stats.offers), icon: Award },
    {
      label: "Avg days to interview",
      value: stats.avgDaysToInterview === null ? "—" : stats.avgDaysToInterview.toFixed(1),
      hint: "from application to first interview",
      icon: Timer,
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Quick Action Navigation Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/board"
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-xl hover:border-indigo-500/40 hover:bg-slate-900 hover:shadow-indigo-500/10 transition-all duration-200"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
              <Kanban size={22} strokeWidth={2} />
            </span>
            <div>
              <div className="text-sm font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                Kanban Pipeline
              </div>
              <div className="text-xs font-medium text-slate-400">Drag & drop application cards</div>
            </div>
          </Link>

          <Link
            to="/companies"
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-xl hover:border-sky-500/40 hover:bg-slate-900 hover:shadow-sky-500/10 transition-all duration-200"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 group-hover:scale-110 transition-transform">
              <Building2 size={22} strokeWidth={2} />
            </span>
            <div>
              <div className="text-sm font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
                Companies Directory
              </div>
              <div className="text-xs font-medium text-slate-400">380+ Verified Career Portals</div>
            </div>
          </Link>

          <Link
            to="/table"
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-xl hover:border-emerald-500/40 hover:bg-slate-900 hover:shadow-emerald-500/10 transition-all duration-200"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
              <Sparkles size={22} strokeWidth={2} />
            </span>
            <div>
              <div className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                Data & Table View
              </div>
              <div className="text-xs font-medium text-slate-400">Sort, filter, and export applications</div>
            </div>
          </Link>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {tiles.map((t, i) => {
            const style = TILE_STYLES[i];
            return (
              <div key={t.label} className={`rounded-2xl border p-5 shadow-xl ${style.border} ${style.bg}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.label}</span>
                  <span className={`p-2 rounded-xl ${style.iconBg} ${style.text}`}>
                    <t.icon size={16} strokeWidth={2} />
                  </span>
                </div>
                <div className={`mt-3 text-3xl font-extrabold tabular-nums ${style.text}`}>{t.value}</div>
                {t.hint && <div className="mt-1.5 text-xs font-medium text-slate-400">{t.hint}</div>}
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
            <h2 className="flex items-center gap-2 text-sm font-bold text-slate-100">
              <Briefcase size={16} strokeWidth={2} className="text-sky-400" />
              Applications per week
            </h2>
            <p className="text-xs font-medium text-slate-400 mt-0.5">last 12 weeks activity</p>
            <WeeklyBars weekly={stats.weekly} />
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
            <h2 className="flex items-center gap-2 text-sm font-bold text-slate-100">
              <Timer size={16} strokeWidth={2} className="text-emerald-400" />
              Pipeline Funnel
            </h2>
            <p className="text-xs font-medium text-slate-400 mt-0.5">jobs grouped by current stage</p>
            <Funnel funnel={stats.funnel} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
          <h2 className="flex items-center gap-2 text-sm font-bold text-slate-100">
            <Bell size={16} strokeWidth={2} className="text-amber-400" />
            Upcoming Reminders
          </h2>
          {reminders.length === 0 ? (
            <p className="mt-3 text-xs font-semibold text-slate-400">
              Nothing due in the next 7 days.
            </p>
          ) : (
            <ul className="mt-4 space-y-2.5">
              {reminders.map((r) => {
                const overdue = new Date(r.due_at) <= new Date();
                return (
                  <li key={r.id} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs">
                    <span
                      title={new Date(r.due_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                      className={`font-semibold shrink-0 px-2 py-1 rounded-lg ${
                        overdue ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {new Date(r.due_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </span>
                    <span className="font-semibold text-slate-100">{r.note}</span>
                    <span className="font-medium text-slate-400">
                      {r.company} · {r.job_title}
                    </span>
                    <Button size="sm" variant="outline" onClick={() => complete(r.id)} className="ml-auto rounded-lg text-xs h-7">
                      Done
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function WeeklyBars({ weekly }: { weekly: Stats["weekly"] }) {
  const [hover, setHover] = useState<number | null>(null);

  const W = 480;
  const H = 160;
  const pad = { top: 16, right: 8, bottom: 24, left: 26 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;
  const max = Math.max(4, ...weekly.map((w) => w.count));
  const step = plotW / weekly.length;
  const barW = Math.min(20, step - 6);
  const y = (v: number) => pad.top + plotH * (1 - v / max);
  const ticks = [0, Math.ceil(max / 2), max];

  const weekLabel = (iso: string) =>
    new Date(iso + "T00:00:00Z").toLocaleDateString(undefined, { month: "short", day: "numeric" });

  return (
    <div className="relative mt-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Applications per week, last 12 weeks">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.left} x2={W - pad.right} y1={y(t)} y2={y(t)} stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
            <text x={pad.left - 6} y={y(t) + 3.5} textAnchor="end" fontSize="10" fontWeight="600" fill="#94a3b8">
              {t}
            </text>
          </g>
        ))}
        {weekly.map((w, i) => {
          const x = pad.left + i * step + (step - barW) / 2;
          const barH = plotH * (w.count / max);
          return (
            <g key={w.weekStart}>
              {w.count > 0 && (
                <rect
                  x={x}
                  y={y(w.count)}
                  width={barW}
                  height={barH}
                  rx="4"
                  fill="#6366f1"
                  opacity={hover === null || hover === i ? 1 : 0.4}
                  className="transition-opacity duration-150"
                />
              )}
              {(i === 0 || i === weekly.length - 1 || i === 6) && (
                <text x={x + barW / 2} y={H - 6} textAnchor="middle" fontSize="10" fontWeight="600" fill="#94a3b8">
                  {weekLabel(w.weekStart)}
                </text>
              )}
              <rect
                x={pad.left + i * step}
                y={pad.top}
                width={step}
                height={plotH}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              />
            </g>
          );
        })}
      </svg>
      {hover !== null && (
        <div
          className="pointer-events-none absolute -top-2 rounded-xl border border-white/10 bg-slate-900 px-3 py-1.5 text-xs shadow-xl backdrop-blur-md"
          style={{ left: `${((pad.left + hover * step + step / 2) / W) * 100}%`, transform: "translateX(-50%)" }}
        >
          <span className="font-bold text-indigo-400">{weekly[hover].count}</span>{" "}
          <span className="font-medium text-slate-300">
            application{weekly[hover].count === 1 ? "" : "s"} · wk of {weekLabel(weekly[hover].weekStart)}
          </span>
        </div>
      )}
    </div>
  );
}

function Funnel({ funnel }: { funnel: Stats["funnel"] }) {
  const max = Math.max(1, ...JOB_STATUSES.map((s) => funnel[s]));
  const COLORS: Record<string, string> = {
    wishlist: "bg-amber-500",
    applied: "bg-sky-500",
    interview: "bg-emerald-500",
    offer: "bg-pink-500",
    rejected: "bg-rose-500",
  };

  return (
    <div className="mt-4 space-y-3">
      {JOB_STATUSES.map((s) => (
        <div key={s} className="flex items-center gap-3">
          <span className="w-24 shrink-0 text-right text-xs font-bold capitalize text-slate-300">
            {STATUS_LABELS[s]}
          </span>
          <div className="h-3 flex-1 rounded-full bg-slate-800/80 overflow-hidden border border-white/5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${COLORS[s]}`}
              style={{ width: `${(funnel[s] / max) * 100}%`, minWidth: funnel[s] ? "6px" : 0 }}
            />
          </div>
          <span className="w-8 text-right text-xs font-bold tabular-nums text-slate-100">{funnel[s]}</span>
        </div>
      ))}
    </div>
  );
}
