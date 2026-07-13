import { useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, KeyRound, X } from "lucide-react";
import { useAuth } from "../lib/auth";
import { useFocusTrap } from "../lib/useFocusTrap";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
      <div className="fixed inset-0 z-40 bg-foreground/40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div ref={panelRef} tabIndex={-1} className="border-[3px] border-brut-ink bg-card p-6 w-full max-w-sm focus:outline-none">
          <div className="flex items-start justify-between">
            <h2 className="text-lg font-black uppercase tracking-tight text-foreground">Change password</h2>
            <button
              onClick={onClose}
              className="border-[3px] border-brut-ink px-2 py-1 text-foreground hover:bg-brut-paper transition-colors"
              aria-label="Close"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>

          {done ? (
            <>
              <p className="mt-4 flex w-fit items-center gap-1.5 border-[3px] border-brut-interview bg-brut-interview/10 px-2 py-1 text-xs font-bold uppercase tracking-wider text-brut-interview">
                <CheckCircle2 size={12} strokeWidth={2.5} />
                Password updated.
              </p>
              <Button onClick={onClose} className="mt-6 w-full">
                Done
              </Button>
            </>
          ) : (
            <form onSubmit={submit} className="mt-4 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Current password
                <Input
                  type="password"
                  required
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  className="mt-1"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                New password
                <Input
                  type="password"
                  required
                  minLength={8}
                  value={next}
                  onChange={(e) => setNext(e.target.value)}
                  className="mt-1"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Confirm new password
                <Input
                  type="password"
                  required
                  minLength={8}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="mt-1"
                />
              </label>

              {error && (
                <p className="flex items-center gap-1.5 border-[3px] border-destructive bg-destructive/5 px-2 py-1 text-sm font-bold text-destructive">
                  <AlertCircle size={14} strokeWidth={2.5} />
                  {error}
                </p>
              )}

              <Button type="submit" disabled={busy} className="mt-2 w-full">
                {busy ? "…" : (
                  <>
                    <KeyRound size={14} strokeWidth={2.5} />
                    Update password
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
