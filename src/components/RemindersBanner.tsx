import { AlertTriangle, Check } from "lucide-react";
import { useReminders } from "./RemindersProvider";

export default function RemindersBanner() {
  const { overdue, complete } = useReminders();
  if (!overdue.length) return null;

  return (
    <div className="border-b-2 border-brut-ink bg-brut-yellow px-6 py-2 text-sm text-brut-ink">
      {overdue.map((r) => (
        <div key={r.id} className="flex items-center gap-2 py-0.5">
          <span className="badge-brut flex items-center gap-1 border-brut-ink bg-brut-ink text-white">
            <AlertTriangle size={11} strokeWidth={2.5} />
            Overdue
          </span>
          <span className="font-bold">
            {r.note} — {r.company} · {r.job_title}
          </span>
          <button onClick={() => complete(r.id)} className="btn-brut-sm ml-auto">
            <Check size={13} strokeWidth={2.5} />
            Done
          </button>
        </div>
      ))}
    </div>
  );
}
