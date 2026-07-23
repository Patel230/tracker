import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { api } from "../lib/api";
import type { Reminder } from "../../shared/types";

interface RemindersState {
  reminders: Reminder[];
  overdue: Reminder[];
  loading: boolean;
  error: string | null;
  complete: (id: string) => Promise<void>;
  refresh: () => void;
}

const RemindersContext = createContext<RemindersState | null>(null);

const isOverdue = (r: Reminder) => !r.completed_at && new Date(r.due_at) <= new Date();

export function RemindersProvider({ children }: { children: ReactNode }) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Mirrors the latest reminders value so the optimistic rollback in
  // complete() can read current state without depending on it — keeping
  // complete's identity stable across renders.
  const remindersRef = useRef<Reminder[]>(reminders);
  useEffect(() => {
    remindersRef.current = reminders;
  }, [reminders]);
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
      .then((all) => {
        setReminders(all);
        setError(null);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError("Couldn't load reminders.");
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
    setError(null);
    const snapshot = remindersRef.current;
    setReminders((prev) => prev.filter((r) => r.id !== id));
    try {
      await api.patch(`/reminders/${id}/complete`);
    } catch {
      setReminders(snapshot);
      setError("Couldn't mark reminder done.");
    }
  }, []);

  const overdue = reminders.filter(isOverdue);

  return (
    <RemindersContext.Provider value={{ reminders, overdue, loading, error, complete, refresh: load }}>
      {children}
    </RemindersContext.Provider>
  );
}

export function useReminders() {
  const ctx = useContext(RemindersContext);
  if (!ctx) throw new Error("useReminders outside RemindersProvider");
  return ctx;
}
