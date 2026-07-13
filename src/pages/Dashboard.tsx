import { useEffect, useState } from "react";
import { Award, Bell, Briefcase, Percent, Timer, type LucideIcon } from "lucide-react";
import { api } from "../lib/api";
import { STATUS_LABELS, JOB_STATUSES, type Stats } from "../../shared/types";
import { INK_HEX, STATUS_BG, STATUS_HEX } from "../lib/theme";
import { useReminders } from "../components/RemindersProvider";

const TILE_STYLES = [
  { bg: "bg-brut-wishlist", border: "border-brut-wishlist", text: "text-brut-ink" },
  { bg: "bg-brut-applied", border: "border-brut-applied", text: "text-white" },
  { bg: "bg-brut-interview", border: "border-brut-interview", text: "text-white" },
  { bg: "bg-brut-offer", border: "border-brut-offer", text: "text-brut-ink" },
];

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const { reminders, complete } = useReminders();

  useEffect(() => {
    api.get<Stats>("/stats").then(setStats);
  }, []);

  if (!stats) {
    return (
      <div className="flex h-full items-center justify-center text-sm font-bold uppercase tracking-wide text-brut-ink/40">
        Loading…
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
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {tiles.map((t, i) => {
            const s = TILE_STYLES[i];
            return (
              <div key={t.label} className={`border-2 ${s.border} ${s.bg} shadow-[4px_4px_0_var(--color-brut-ink)] p-4`}>
                <div className={`flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide ${s.text}/70`}>
                  <t.icon size={13} strokeWidth={2.5} />
                  {t.label}
                </div>
                <div className={`mt-1 text-3xl font-extrabold tabular-nums ${s.text}`}>{t.value}</div>
                {t.hint && <div className={`mt-1 text-xs font-medium ${s.text}/50`}>{t.hint}</div>}
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card-brut p-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wide text-brut-ink">Applications per week</h2>
            <p className="text-xs font-medium text-brut-ink/40">last 12 weeks</p>
            <WeeklyBars weekly={stats.weekly} />
          </div>

          <div className="card-brut p-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wide text-brut-ink">Pipeline</h2>
            <p className="text-xs font-medium text-brut-ink/40">jobs by stage (active)</p>
            <Funnel funnel={stats.funnel} />
          </div>
        </div>

        <div className="card-brut p-4">
          <h2 className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-brut-ink">
            <Bell size={13} strokeWidth={2.5} />
            Upcoming reminders
          </h2>
          {reminders.length === 0 ? (
            <p className="mt-2 text-sm font-bold uppercase tracking-wide text-brut-ink/40">
              Nothing due in the next 7 days.
            </p>
          ) : (
            <ul className="mt-2 divide-y-2 divide-brut-ink/10">
              {reminders.map((r) => {
                const overdue = new Date(r.due_at) <= new Date();
                return (
                  <li key={r.id} className="flex items-center gap-3 py-2 text-sm">
                    <span
                      title={new Date(r.due_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                      className={`font-bold ${overdue ? "text-brut-rejected" : "text-brut-ink/60"}`}
                    >
                      {new Date(r.due_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </span>
                    <span className="font-bold text-brut-ink">{r.note}</span>
                    <span className="font-medium text-brut-ink/40">
                      {r.company} · {r.job_title}
                    </span>
                    <button onClick={() => complete(r.id)} className="btn-brut-sm ml-auto">
                      Done
                    </button>
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

const BAR_FILL = STATUS_HEX.applied;

function WeeklyBars({ weekly }: { weekly: Stats["weekly"] }) {
  const [hover, setHover] = useState<number | null>(null);

  const W = 480;
  const H = 170;
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
            <line x1={pad.left} x2={W - pad.right} y1={y(t)} y2={y(t)} stroke={INK_HEX} strokeOpacity="0.15" strokeWidth="1.5" />
            <text x={pad.left - 6} y={y(t) + 3.5} textAnchor="end" fontSize="10" fontWeight="700" fill={INK_HEX} opacity="0.5">
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
                  fill={BAR_FILL}
                  stroke={INK_HEX}
                  strokeWidth="2"
                  opacity={hover === null || hover === i ? 1 : 0.45}
                />
              )}
              {(i === 0 || i === weekly.length - 1 || i === 6) && (
                <text x={x + barW / 2} y={H - 8} textAnchor="middle" fontSize="10" fontWeight="700" fill={INK_HEX} opacity="0.5">
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
          className="card-brut pointer-events-none absolute -top-1 px-2.5 py-1.5 text-xs"
          style={{ left: `${((pad.left + hover * step + step / 2) / W) * 100}%`, transform: "translateX(-50%)" }}
        >
          <span className="font-extrabold text-brut-ink">{weekly[hover].count}</span>{" "}
          <span className="font-bold text-brut-ink/60">
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
          <span className="w-20 shrink-0 text-right text-xs font-extrabold uppercase tracking-wide text-brut-ink/60">
            {STATUS_LABELS[s]}
          </span>
          <div className="h-4 flex-1 border-2 border-brut-ink/15 bg-brut-paper">
            <div
              className={`h-full border-r-2 border-brut-ink ${STATUS_BG[s]}`}
              style={{ width: `${(funnel[s] / max) * 100}%`, minWidth: funnel[s] ? "4px" : 0 }}
            />
          </div>
          <span className="w-6 text-right text-sm font-extrabold tabular-nums text-brut-ink">{funnel[s]}</span>
        </div>
      ))}
    </div>
  );
}
