import { AlertTriangle, Bell, Check } from "lucide-react";
import { useReminders } from "./RemindersProvider";

const COLORS = ["bg-brut-wishlist", "bg-brut-applied", "bg-brut-interview", "bg-brut-offer", "bg-brut-rejected"];

export default function RemindersBanner() {
  const { overdue, complete } = useReminders();
  if (!overdue.length) return null;

  return (
    <div className="border-b-2 border-brut-ink bg-gradient-to-r from-brut-yellow via-brut-yellow to-brut-wishlist/30 px-6 py-2 text-sm text-brut-ink">
      <div className="flex items-center gap-2 mb-1">
        <Bell size={13} strokeWidth={2.5} className="text-brut-rejected" />
        <span className="text-xs font-extrabold uppercase tracking-wide">Overdue reminders</span>
      </div>
      {overdue.map((r, i) => (
        <div key={r.id} className="flex items-center gap-2 py-0.5">
          <span className={`badge-brut flex items-center gap-1 border-brut-ink ${COLORS[i % COLORS.length]} text-white`}>
            <AlertTriangle size={11} strokeWidth={2.5} />
            Overdue
          </span>
          <span className="font-bold">{r.note}</span>
          <span className="font-medium text-brut-ink/60">— {r.company} · {r.job_title}</span>
          <button onClick={() => complete(r.id)} className="btn-brut-sm ml-auto">
            <Check size={13} strokeWidth={2.5} />
            Done
          </button>
        </div>
      ))}
    </div>
  );
}
