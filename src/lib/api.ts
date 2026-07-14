export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const isUnauthorized = (err: unknown): err is ApiError =>
  err instanceof ApiError && err.status === 401;

// A 401 anywhere means the session is dead. Rather than every caller guessing
// what to do, auth.tsx registers one handler here; a 401 clears the user and
// routes back to login. Without this, a response after the cookie expired would
// just hang on "Loading…" forever with no way out.
let onUnauthorized: (() => void) | null = null;
export function setOnUnauthorized(handler: (() => void) | null) {
  onUnauthorized = handler;
}

async function request<T>(method: string, path: string, body?: unknown, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method,
    credentials: "same-origin",
    headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new ApiError(res.status, (data as { error?: string }).error ?? `Request failed (${res.status})`);
    if (res.status === 401) onUnauthorized?.();
    throw err;
  }
  return data as T;
}

export const api = {
  get: <T>(path: string, signal?: AbortSignal) => request<T>("GET", path, undefined, signal),
  post: <T>(path: string, body?: unknown, signal?: AbortSignal) => request<T>("POST", path, body, signal),
  patch: <T>(path: string, body?: unknown, signal?: AbortSignal) =>
    request<T>("PATCH", path, body, signal),
  delete: <T = unknown>(path: string, signal?: AbortSignal) => request<T>("DELETE", path, undefined, signal),
};
