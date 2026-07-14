import { useEffect, useRef, useState } from "react";
import { api } from "./api";

interface State<T> {
  data: T | null;
  error: boolean;
  loading: boolean;
}

// One loading/error/abort lifecycle for a GET. Every data-fetch effect in the
// app was previously `api.get(...).then(setX)` with no catch and no abort — a
// failed or hanging request froze the screen on "Loading…" and setState'd on
// unmounted components. Call `reload()` (or change `deps`) to re-run.
export function useFetch<T>(path: string, deps: unknown[] = []): State<T> & { reload: () => void } {
  const [state, setState] = useState<State<T>>({ data: null, error: false, loading: true });
  // An incrementing token kills stale resolves: if a new run starts before the
  // old one settles, the old response is discarded. Also read by reload() so a
  // manual refresh restarts even when the path hasn't changed.
  const gen = useRef(0);

  useEffect(() => {
    const controller = new AbortController();
    const mine = ++gen.current;
    setState({ data: null, error: false, loading: true });
    api
      .get<T>(path, controller.signal)
      .then((data) => {
        if (mine !== gen.current) return; // superseded
        setState({ data, error: false, loading: false });
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (mine !== gen.current) return;
        setState({ data: null, error: true, loading: false });
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ...state, reload: () => setState({ data: null, error: false, loading: true }) };
}
