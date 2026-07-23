import { useState } from "react";
import { Award, Bell, Briefcase, Percent, Timer, RotateCcw, Sparkles, Kanban, Building2, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useFetch } from "../lib/useFetch";
import { STATUS_LABELS, JOB_STATUSES, type Stats } from "../../shared/types";
import { INK_HEX, PRIMARY_HEX, STATUS_BG } from "../lib/theme";
import { useReminders } from "../components/RemindersProvider";
import { Button } from "../components/ui/button";

const TILE_STYLES = [
  { top: "bg-brut-wishlist" },
  { top: "bg-brut-applied" },
  { top: "bg-brut-interview" },
  { top: "bg-brut-offer" },
];

const TILE_ICONS: Record<string, string> = {
  "Active applications": "text-brut-wishlist",
  "Response rate": "text-brut-applied",
  "Offers": "text-brut-interview",
  "Avg days to interview": "text-brut-offer",
};

export default function Dashboard() {
  const { data: stats, error, reload } = useFetch<Stats>("/stats");
  const { reminders, complete } = useReminders();

  if (error || !stats) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-destructive">
          Couldn't load your stats.
        </p>
        <Button variant="outline" size="sm" onClick={reload}>
          <RotateCcw size={14} strokeWidth={2.5} />
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
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Quick Action Navigation Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            to="/board"
            className="flex items-center gap-3 border-[3px] border-brut-ink bg-card p-3 shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all group"
          >
            <span className="flex size-10 items-center justify-center border-[2px] border-brut-ink bg-primary text-primary-foreground">
              <Kanban size={20} strokeWidth={2.5} />
            </span>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
                Kanban Pipeline
              </div>
              <div className="text-[11px] font-medium text-muted-foreground">Drag & drop application cards</div>
            </div>
          </Link>

          <Link
            to="/companies"
            className="flex items-center gap-3 border-[3px] border-brut-ink bg-card p-3 shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all group"
          >
            <span className="flex size-10 items-center justify-center border-[2px] border-brut-ink bg-brut-applied text-primary-foreground">
              <Building2 size={20} strokeWidth={2.5} />
            </span>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-foreground group-hover:text-brut-applied transition-colors">
                Top 200 Directory
              </div>
              <div className="text-[11px] font-medium text-muted-foreground">100 Companies & 100 Startups</div>
            </div>
          </Link>

          <Link
            to="/table"
            className="flex items-center gap-3 border-[3px] border-brut-ink bg-card p-3 shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all group"
          >
            <span className="flex size-10 items-center justify-center border-[2px] border-brut-ink bg-brut-interview text-primary-foreground">
              <Sparkles size={20} strokeWidth={2.5} />
            </span>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-foreground group-hover:text-brut-interview transition-colors">
                Data & Table View
              </div>
              <div className="text-[11px] font-medium text-muted-foreground">Sort, filter, and export applications</div>
            </div>
          </Link>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {tiles.map((t, i) => {
            const s = TILE_STYLES[i];
            return (
              <div key={t.label} className="border-[3px] border-brut-ink bg-card shadow-[4px_4px_0_0_#000]">
                <div className={`h-1.5 ${s.top}`} />
                <div className="p-4">
                  <div className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-wider ${TILE_ICONS[t.label] || "text-muted-foreground"}`}>
                    <t.icon size={13} strokeWidth={2.5} />
                    {t.label}
                  </div>
                  <div className="mt-2 text-3xl font-black tabular-nums text-foreground">{t.value}</div>
                  {t.hint && <div className="mt-1 text-xs font-medium text-muted-foreground">{t.hint}</div>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="border-[3px] border-brut-ink bg-card shadow-[4px_4px_0_0_#000]">
            <div className="h-1.5 bg-brut-applied" />
            <div className="p-5">
              <h2 className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-foreground">
                <Briefcase size={13} strokeWidth={2.5} className="text-brut-applied" />
                Applications per week
              </h2>
              <p className="text-xs font-medium text-muted-foreground">last 12 weeks</p>
              <WeeklyBars weekly={stats.weekly} />
            </div>
          </div>

          <div className="border-[3px] border-brut-ink bg-card shadow-[4px_4px_0_0_#000]">
            <div className="h-1.5 bg-brut-interview" />
            <div className="p-5">
              <h2 className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-foreground">
                <Timer size={13} strokeWidth={2.5} className="text-brut-interview" />
                Pipeline Stages
              </h2>
              <p className="text-xs font-medium text-muted-foreground">jobs by status</p>
              <Funnel funnel={stats.funnel} />
            </div>
          </div>
        </div>

        <div className="border-[3px] border-brut-ink bg-card shadow-[4px_4px_0_0_#000]">
          <div className="h-1.5 bg-brut-wishlist" />
          <div className="p-5">
            <h2 className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-foreground">
              <Bell size={13} strokeWidth={2.5} className="text-brut-wishlist" />
              Upcoming Reminders
            </h2>
            {reminders.length === 0 ? (
              <p className="mt-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Nothing due in the next 7 days.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {reminders.map((r) => {
                  const overdue = new Date(r.due_at) <= new Date();
                  return (
                    <li key={r.id} className="flex items-center gap-3 py-2 text-sm border-t-[3px] border-brut-ink/10 first:border-0">
                      <span
                        title={new Date(r.due_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                        className={`font-bold shrink-0 ${overdue ? "text-destructive" : "text-muted-foreground"}`}
                      >
                        {new Date(r.due_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </span>
                      <span className="font-bold text-foreground">{r.note}</span>
                      <span className="font-medium text-muted-foreground">
                        {r.company} · {r.job_title}
                      </span>
                      <Button size="sm" variant="outline" onClick={() => complete(r.id)} className="ml-auto">
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
    </div>
  );
}

function WeeklyBars({ weekly }: { weekly: Stats["weekly"] }) {
  const [hover, setHover] = useState<number | null>(null);

  const W = 480;
  const H = 160;
  const pad = { top: 14, right: 8, bottom: 22, left: 26 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;
  const max = Math.max(4, ...weekly.map((w) => w.count));
  const step = plotW / weekly.length;
  const barW = Math.min(22, step - 6);
  const y = (v: number) => pad.top + plotH * (1 - v / max);
  const ticks = [0, Math.ceil(max / 2), max];

  const weekLabel = (iso: string) =>
    new Date(iso + "T00:00:00Z").toLocaleDateString(undefined, { month: "short", day: "numeric" });

  return (
    <div className="relative mt-3">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Applications per week, last 12 weeks">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.left} x2={W - pad.right} y1={y(t)} y2={y(t)} stroke={INK_HEX} strokeOpacity="0.1" strokeWidth="1.5" />
            <text x={pad.left - 6} y={y(t) + 3.5} textAnchor="end" fontSize="10" fontWeight="700" fill={INK_HEX} opacity="0.4">
              {t}
            </text>
          </g>
        ))}
        {weekly.map((w, i) => {
          const x = pad.left + i * step + (step - barW) / 2;
          const barH = plotH * (w.count / max);
          const color = PRIMARY_HEX;
          return (
            <g key={w.weekStart}>
              {w.count > 0 && (
                <rect
                  x={x}
                  y={y(w.count)}
                  width={barW}
                  height={barH}
                  fill={color}
                  stroke={INK_HEX}
                  strokeWidth="2.5"
                  opacity={hover === null || hover === i ? 1 : 0.3}
                />
              )}
              {(i === 0 || i === weekly.length - 1 || i === 6) && (
                <text x={x + barW / 2} y={H - 8} textAnchor="middle" fontSize="10" fontWeight="700" fill={INK_HEX} opacity="0.4">
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
          className="pointer-events-none absolute -top-1 border-[3px] border-brut-ink bg-card px-2.5 py-1.5 text-xs shadow-md"
          style={{ left: `${((pad.left + hover * step + step / 2) / W) * 100}%`, transform: "translateX(-50%)" }}
        >
          <span className="font-black text-foreground">{weekly[hover].count}</span>{" "}
          <span className="font-bold text-muted-foreground">
            application{weekly[hover].count === 1 ? "" : "s"} · wk of {weekLabel(weekly[hover].weekStart)}
          </span>
        </div>
      )}
    </div>
  );
}

function Funnel({ funnel }: { funnel: Stats["funnel"] }) {
  const max = Math.max(1, ...JOB_STATUSES.map((s) => funnel[s]));
  return (
    <div className="mt-4 space-y-2.5">
      {JOB_STATUSES.map((s) => (
        <div key={s} className="flex items-center gap-3">
          <span className="w-20 shrink-0 text-right text-xs font-bold uppercase tracking-wider" style={{ color: `var(--color-brut-${s})` }}>
            {STATUS_LABELS[s]}
          </span>
          <div className="h-4 flex-1 border-[3px] border-brut-ink/10 bg-background">
            <div
              className={`h-full border-r-[3px] border-brut-ink ${STATUS_BG[s]}`}
              style={{ width: `${(funnel[s] / max) * 100}%`, minWidth: funnel[s] ? "4px" : 0 }}
            />
          </div>
          <span className="w-6 text-right text-sm font-black tabular-nums text-foreground">{funnel[s]}</span>
        </div>
      ))}
    </div>
  );
}
