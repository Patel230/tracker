import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from "../lib/api";
import type { Reminder } from "../../shared/types";

interface RemindersState {
  reminders: Reminder[];
  overdue: Reminder[];
  loading: boolean;
  complete: (id: string) => Promise<void>;
  refresh: () => void;
}

const RemindersContext = createContext<RemindersState | null>(null);

const isOverdue = (r: Reminder) => !r.completed_at && new Date(r.due_at) <= new Date();

export function RemindersProvider({ children }: { children: ReactNode }) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    api
      .get<Reminder[]>("/reminders/upcoming")
      .then((all) => setReminders(all))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(t);
  }, [load]);

  const complete = useCallback(async (id: string) => {
    await api.patch(`/reminders/${id}/complete`);
    setReminders((rs) => rs.filter((r) => r.id !== id));
  }, []);

  const overdue = reminders.filter(isOverdue);

  return (
    <RemindersContext.Provider value={{ reminders, overdue, loading, complete, refresh: load }}>
      {children}
    </RemindersContext.Provider>
  );
}

export function useReminders() {
  const ctx = useContext(RemindersContext);
  if (!ctx) throw new Error("useReminders outside RemindersProvider");
  return ctx;
}
