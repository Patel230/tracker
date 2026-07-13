import { useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, KeyRound, X } from "lucide-react";
import { useAuth } from "../lib/auth";
import { useFocusTrap } from "../lib/useFocusTrap";

export default function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const { changePassword } = useAuth();
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, true, onClose);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (next !== confirm) {
      setError("New passwords don't match");
      return;
    }
    setBusy(true);
    try {
      await changePassword(current, next);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not change password");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-brut-ink/40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div ref={panelRef} tabIndex={-1} className="panel-brut w-full max-w-sm focus:outline-none">
          <div className="flex items-start justify-between">
            <h2 className="text-lg font-extrabold uppercase tracking-tight text-brut-ink">Change password</h2>
            <button
              onClick={onClose}
              className="border-2 border-brut-ink px-2 py-1 text-brut-ink hover:bg-brut-paper"
              aria-label="Close"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>

          {done ? (
            <>
              <p className="mt-4 flex w-fit items-center gap-1.5 badge-brut border-brut-interview bg-brut-interview/15 text-brut-interview">
                <CheckCircle2 size={12} strokeWidth={2.5} />
                Password updated.
              </p>
              <button onClick={onClose} className="btn-brut mt-6 w-full">
                Done
              </button>
            </>
          ) : (
            <form onSubmit={submit} className="mt-4 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wide text-brut-ink/60">
                Current password
                <input
                  type="password"
                  required
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  className="input-brut mt-1"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wide text-brut-ink/60">
                New password
                <input
                  type="password"
                  required
                  minLength={8}
                  value={next}
                  onChange={(e) => setNext(e.target.value)}
                  className="input-brut mt-1"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wide text-brut-ink/60">
                Confirm new password
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="input-brut mt-1"
                />
              </label>

              {error && (
                <p className="flex items-center gap-1.5 border-2 border-brut-rejected bg-brut-rejected/10 px-2 py-1 text-sm font-bold text-brut-rejected">
                  <AlertCircle size={14} strokeWidth={2.5} />
                  {error}
                </p>
              )}

              <button type="submit" disabled={busy} className="btn-brut mt-2 w-full">
                {busy ? (
                  "…"
                ) : (
                  <>
                    <KeyRound size={14} strokeWidth={2.5} />
                    Update password
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
