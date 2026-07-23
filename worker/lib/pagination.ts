// Shared pagination guard. A personal tracker won't approach these ceilings,
// but unbounded SELECTs over a long-lived account (or a runaway client loop)
// had no limit. The default fits a full list comfortably; ?limit can't exceed
// the cap, so a malicious value can't be used to exhaust memory.
export const DEFAULT_LIMIT = 100;
export const MAX_LIMIT = 500;

export function limitParam(q: string | undefined, def = DEFAULT_LIMIT, max = MAX_LIMIT): number {
  const n = Number(q);
  if (!Number.isInteger(n) || n < 1) return def;
  return Math.min(n, max);
}
