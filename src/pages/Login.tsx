import { useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, Lock, Mail, UserPlus } from "lucide-react";
import { useAuth } from "../lib/auth";

export default function Login() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await (mode === "login" ? login(email, password) : register(email, password));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex h-full items-center justify-center bg-brut-paper px-4">
      <form onSubmit={submit} className="panel-brut w-full max-w-sm p-8">
        <h1 className="text-2xl font-extrabold uppercase tracking-tight text-brut-ink">
          Tracker<span className="text-brut-rejected">.</span>
        </h1>
        <div className="mt-2 h-2 w-16 bg-brut-yellow" />
        <p className="mt-3 text-sm font-medium text-brut-ink/70">Your job search, organized.</p>

        <label className="mt-6 block text-xs font-bold uppercase tracking-wide text-brut-ink">
          <span className="flex items-center gap-1.5">
            <Mail size={12} strokeWidth={2.5} />
            Email
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-brut mt-1"
          />
        </label>
        <label className="mt-4 block text-xs font-bold uppercase tracking-wide text-brut-ink">
          <span className="flex items-center gap-1.5">
            <Lock size={12} strokeWidth={2.5} />
            Password
          </span>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-brut mt-1"
          />
        </label>

        {error && (
          <p className="mt-3 flex items-center gap-1.5 border-2 border-brut-rejected bg-brut-rejected/10 px-2 py-1 text-sm font-bold text-brut-rejected">
            <AlertCircle size={14} strokeWidth={2.5} />
            {error}
          </p>
        )}

        <button type="submit" disabled={busy} className="btn-brut mt-6 w-full">
          {busy ? (
            "…"
          ) : mode === "login" ? (
            <>
              Log in
              <ArrowRight size={14} strokeWidth={2.5} />
            </>
          ) : (
            <>
              <UserPlus size={14} strokeWidth={2.5} />
              Create account
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="mt-4 w-full text-center text-xs font-bold uppercase tracking-wide text-brut-ink/60 underline decoration-2 underline-offset-2 hover:text-brut-ink"
        >
          {mode === "login" ? "First time? Create the account" : "Already set up? Log in"}
        </button>
      </form>
    </div>
  );
}
