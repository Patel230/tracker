import { useRef, useState, type FormEvent } from "react";
import { AlertCircle, Trash2, X } from "lucide-react";
import { useAuth } from "../lib/auth";
import { useFocusTrap } from "../lib/useFocusTrap";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function DeleteAccountModal({ onClose }: { onClose: () => void }) {
  const { deleteAccount } = useAuth();
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, true, onClose);
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (confirm !== "DELETE") {
      setError('Type DELETE to confirm.');
      return;
    }
    setError(null);
    setBusy(true);
    try {
      await deleteAccount();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete account");
      setBusy(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-foreground/40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div ref={panelRef} tabIndex={-1} className="border-2 border-brut-ink bg-card p-6 w-full max-w-sm focus:outline-none">
          <div className="flex items-start justify-between">
            <h2 className="text-lg font-extrabold uppercase tracking-tight text-destructive">
              Delete account
            </h2>
            <button
              onClick={onClose}
              className="border-2 border-brut-ink px-2 py-1 text-foreground hover:bg-brut-paper transition-colors"
              aria-label="Close"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>

          <p className="mt-4 text-sm font-medium text-muted-foreground">
            This permanently removes your account and every job, contact, timeline
            entry, and reminder. This can't be undone.
          </p>

          <form onSubmit={submit} className="mt-4 space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Type DELETE to confirm
              <Input
                autoFocus
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="mt-1"
              />
            </label>

            {error && (
              <p className="flex items-center gap-1.5 border-2 border-destructive bg-destructive/5 px-2 py-1 text-sm font-bold text-destructive">
                <AlertCircle size={14} strokeWidth={2.5} />
                {error}
              </p>
            )}

            <div className="flex items-center gap-2">
              <Button type="submit" disabled={busy} variant="destructive">
                <Trash2 size={14} strokeWidth={2.5} />
                {busy ? "Deleting…" : "Delete my account"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
