import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import Logo from "../components/Logo";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function Login() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const passwordsMatch = mode !== "register" || password === confirmPassword;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (mode === "register" && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
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
    <div className="flex min-h-full bg-background">
      {/* Left panel */}
      <div className="hidden flex-1 flex-col justify-between border-r-[3px] border-brut-ink bg-primary p-12 lg:flex">
        <Link to="/">
          <Logo />
        </Link>
        <div>
          <blockquote className="text-2xl font-black uppercase leading-[0.95] tracking-tight text-foreground">
            "The best time to organize your job search
            <br />
            <span className="text-destructive">was yesterday.</span>
            <br />
            The second best time is now."
          </blockquote>
          <div className="mt-4 h-1 w-20 bg-foreground" />
          <p className="mt-4 text-sm font-bold uppercase tracking-wider text-foreground/60">
            Free for students · No time limit
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex lg:hidden">
            <Logo />
          </Link>

          <div className="border-[3px] border-brut-ink bg-card p-8">
            {/* Mode tabs */}
            <div className="flex border-[3px] border-brut-ink">
              <button
                type="button"
                onClick={() => { setMode("login"); setConfirmPassword(""); setError(null); }}
                className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  mode === "login"
                    ? "bg-foreground text-primary"
                    : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => { setMode("register"); setConfirmPassword(""); setError(null); }}
                className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  mode === "register"
                    ? "bg-foreground text-primary"
                    : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                Create account
              </button>
            </div>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</label>
                <div className="mt-1.5 relative">
                  <Mail size={14} strokeWidth={2.5} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</label>
                <div className="mt-1.5 relative">
                  <Lock size={14} strokeWidth={2.5} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPw ? "text" : "password"}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === "register" ? "Min 8 characters" : "Your password"}
                    className="pl-9 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPw ? <EyeOff size={14} strokeWidth={2.5} /> : <Eye size={14} strokeWidth={2.5} />}
                  </button>
                </div>
              </div>

              {mode === "register" && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Confirm password</label>
                  <div className="mt-1.5 relative">
                    <Lock size={14} strokeWidth={2.5} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type={showConfirmPw ? "text" : "password"}
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat your password"
                      className={`pl-9 pr-9 ${!passwordsMatch && confirmPassword ? "border-destructive" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPw(!showConfirmPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmPw ? <EyeOff size={14} strokeWidth={2.5} /> : <Eye size={14} strokeWidth={2.5} />}
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="border-[3px] border-destructive bg-destructive/20 px-4 py-3">
                  <p className="text-sm font-bold leading-snug text-destructive">{error}</p>
                  {error.includes("private") && (
                    <a
                      href="https://github.com/Patel230/tracker"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1 border-[3px] border-brut-ink bg-foreground px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-background"
                    >
                      Fork on GitHub →
                    </a>
                  )}
                </div>
              )}

              <Button type="submit" disabled={busy} className="w-full">
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
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
