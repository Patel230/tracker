import { useEffect, useRef, useState } from "react";
import { api } from "./api";

interface State<T> {
  data: T | null;
  error: boolean;
  loading: boolean;
  // True while any fetch is in flight, including a reload that already has
  // stale data to show. `loading` stays false during a refresh so consumers
  // keep rendering the previous data instead of flashing a blank screen.
  refreshing: boolean;
}

// One loading/error/abort lifecycle for a GET. Every data-fetch effect in the
// app was previously `api.get(...).then(setX)` with no catch and no abort — a
// failed or hanging request froze the screen on "Loading…" and setState'd on
// unmounted components. Call `reload()` (or change `deps`) to re-run.
export function useFetch<T>(path: string, deps: unknown[] = []): State<T> & { reload: () => void } {
  const [state, setState] = useState<State<T>>({ data: null, error: false, loading: true, refreshing: true });
  // An incrementing token kills stale resolves: if a new run starts before the
  // old one settles, the old response is discarded. Also read by reload() so a
  // manual refresh restarts even when the path hasn't changed.
  const gen = useRef(0);
  // reload() bumps this to re-run the effect below even when `deps` is
  // unchanged — it carries no meaning of its own beyond forcing a re-run.
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const mine = ++gen.current;
    // Keep any previously loaded data visible while a reload is in flight
    // (stale-while-revalidate) so a manual refresh doesn't blank the screen.
    setState((s) => ({ data: s.data, error: false, loading: s.data === null, refreshing: true }));
    api
      .get<T>(path, controller.signal)
      .then((data) => {
        if (mine !== gen.current) return; // superseded
        setState({ data, error: false, loading: false, refreshing: false });
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (mine !== gen.current) return;
        setState({ data: null, error: true, loading: false, refreshing: false });
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  return { ...state, reload: () => setNonce((n) => n + 1) };
}
