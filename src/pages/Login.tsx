import { useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import Logo from "../components/Logo";

export default function Login() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
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
    <div className="flex min-h-full bg-brut-paper">
      {/* ─── Left panel ─── */}
      <div className="hidden flex-1 flex-col justify-between border-r-2 border-brut-ink bg-brut-yellow p-12 lg:flex">
        <Link to="/">
          <Logo />
        </Link>
        <div>
          <blockquote className="text-2xl font-extrabold uppercase leading-[0.95] tracking-tight text-brut-ink">
            "The best time to organize your job search
            <br />
            <span className="text-brut-rejected">was yesterday.</span>
            <br />
            The second best time is now."
          </blockquote>
          <div className="mt-4 h-1.5 w-20 bg-brut-ink" />
          <p className="mt-4 text-sm font-bold uppercase tracking-wide text-brut-ink/60">
            Free for students · No time limit
          </p>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="size-3 border-2 border-brut-ink"
              style={{ background: i < 3 ? "var(--color-brut-ink)" : "transparent" }}
            />
          ))}
        </div>
      </div>

      {/* ─── Right panel ─── */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link to="/" className="mb-8 flex lg:hidden">
            <Logo />
          </Link>

          <div className="panel-brut p-8">
            {/* Mode tabs */}
            <div className="flex border-2 border-brut-ink">
              <button
                type="button"
                onClick={() => { setMode("login"); setError(null); }}
                className={`flex-1 py-2.5 text-xs font-extrabold uppercase tracking-wide transition-colors ${
                  mode === "login"
                    ? "bg-brut-ink text-brut-yellow"
                    : "bg-brut-surface text-brut-ink/50 hover:text-brut-ink"
                }`}
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => { setMode("register"); setError(null); }}
                className={`flex-1 py-2.5 text-xs font-extrabold uppercase tracking-wide transition-colors ${
                  mode === "register"
                    ? "bg-brut-ink text-brut-yellow"
                    : "bg-brut-surface text-brut-ink/50 hover:text-brut-ink"
                }`}
              >
                Create account
              </button>
            </div>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wide text-brut-ink/60">
                Email
                <div className="mt-1.5 relative">
                  <Mail size={14} strokeWidth={2.5} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brut-ink/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input-brut pl-9"
                  />
                </div>
              </label>

              <label className="block text-xs font-bold uppercase tracking-wide text-brut-ink/60">
                Password
                <div className="mt-1.5 relative">
                  <Lock size={14} strokeWidth={2.5} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brut-ink/40" />
                  <input
                    type={showPw ? "text" : "password"}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === "register" ? "Min 8 characters" : "Your password"}
                    className="input-brut pl-9 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brut-ink/40 hover:text-brut-ink"
                    tabIndex={-1}
                  >
                    {showPw ? <EyeOff size={14} strokeWidth={2.5} /> : <Eye size={14} strokeWidth={2.5} />}
                  </button>
                </div>
              </label>

              {error && (
                <div className="flex items-center gap-2 border-2 border-brut-rejected bg-brut-rejected/10 px-3 py-2">
                  <AlertCircle size={14} strokeWidth={2.5} className="shrink-0 text-brut-rejected" />
                  <span className="text-xs font-bold uppercase tracking-wide text-brut-rejected">{error}</span>
                </div>
              )}

              <button type="submit" disabled={busy} className="btn-brut w-full">
                {busy ? (
                  <Loader2 size={14} strokeWidth={2.5} className="animate-spin" />
                ) : mode === "login" ? (
                  <>
                    Log in <ArrowRight size={14} strokeWidth={2.5} />
                  </>
                ) : (
                  <>
                    <UserPlus size={14} strokeWidth={2.5} />
                    Create account
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-xs font-bold uppercase tracking-wide text-brut-ink/40">
            By continuing, you agree to the terms of use.
          </p>
        </div>
      </div>
    </div>
  );
}
