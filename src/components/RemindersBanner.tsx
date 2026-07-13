import { AlertTriangle, Bell, Check } from "lucide-react";
import { useReminders } from "./RemindersProvider";

const COLORS = ["bg-brut-wishlist", "bg-brut-applied", "bg-brut-interview", "bg-brut-offer", "bg-brut-rejected"];

export default function RemindersBanner() {
  const { overdue, complete } = useReminders();
  if (!overdue.length) return null;

  return (
    <div className="border-b border-brut-ink/10 bg-gradient-to-r from-brut-yellow/80 via-brut-yellow/50 to-brut-wishlist/20 px-6 py-2.5">
      <div className="flex items-center gap-2 mb-1">
        <Bell size={13} strokeWidth={2.5} className="text-brut-rejected" />
        <span className="text-xs font-bold uppercase tracking-wider text-brut-ink">Overdue reminders</span>
      </div>
      <div className="space-y-1">
        {overdue.map((r, i) => (
          <div key={r.id} className="flex items-center gap-2 py-0.5">
            <span className={`flex items-center gap-1 border-2 border-brut-ink px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${COLORS[i % COLORS.length]} text-white`}>
              <AlertTriangle size={11} strokeWidth={2.5} />
              Overdue
            </span>
            <span className="font-bold text-sm text-brut-ink">{r.note}</span>
            <span className="font-medium text-sm text-brut-ink/50">— {r.company} · {r.job_title}</span>
            <button onClick={() => complete(r.id)} className="btn-brut-sm ml-auto">
              <Check size={13} strokeWidth={2.5} />
              Done
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
