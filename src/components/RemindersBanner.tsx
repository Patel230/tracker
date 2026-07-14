import { AlertTriangle, Bell, Check } from "lucide-react";
import { useReminders } from "./RemindersProvider";

export default function RemindersBanner() {
  const { overdue, complete } = useReminders();
  if (!overdue.length) return null;

  return (
    <div className="border-b-[3px] border-brut-ink bg-card px-6 py-2.5">
      <div className="flex items-center gap-2 mb-1">
        <Bell size={13} strokeWidth={2.5} className="text-destructive" />
        <span className="text-xs font-bold uppercase tracking-wider text-foreground">Overdue reminders</span>
      </div>
      <div className="space-y-1">
        {overdue.map((r) => (
          <div key={r.id} className="flex items-center gap-2 py-0.5">
            <span className="flex items-center gap-1 border-[3px] border-brut-ink px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-destructive text-primary-foreground">
              <AlertTriangle size={11} strokeWidth={2.5} />
              Overdue
            </span>
            <span className="font-bold text-sm text-foreground">{r.note}</span>
            <span className="font-medium text-sm text-foreground/60">— {r.company} · {r.job_title}</span>
            <button onClick={() => complete(r.id)} className="ml-auto inline-flex items-center justify-center gap-1.5 border-[3px] border-brut-ink bg-card px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground shadow-[3px_3px_0_0_#000] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_0_#000] transition-all duration-150">
              <Check size={13} strokeWidth={2.5} />
              Done
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
