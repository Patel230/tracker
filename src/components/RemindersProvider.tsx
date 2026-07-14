import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
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
  // Tracks whichever request is currently in flight (initial load or an
  // interval tick) so unmount can abort it even though setInterval invokes
  // load() with no arguments of its own.
  const controllerRef = useRef<AbortController | null>(null);

  const load = useCallback(() => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    api
      .get<Reminder[]>("/reminders/upcoming", controller.signal)
      .then((all) => setReminders(all))
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 5 * 60 * 1000);
    return () => {
      clearInterval(t);
      controllerRef.current?.abort();
    };
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
