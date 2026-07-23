import { useEffect, useRef, useState } from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { Building2, Kanban, KeyRound, LayoutDashboard, LogOut, Rows3, Trash2, ChevronDown, Plus } from "lucide-react";
import { useAuth } from "./lib/auth";
import Logo from "./components/Logo";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Board from "./pages/Board";
import TableView from "./pages/TableView";
import Companies from "./pages/Companies";
import Dashboard from "./pages/Dashboard";
import RemindersBanner from "./components/RemindersBanner";
import { RemindersProvider } from "./components/RemindersProvider";
import ChangePasswordModal from "./components/ChangePasswordModal";
import DeleteAccountModal from "./components/DeleteAccountModal";
import CreateJobModal from "./components/CreateJobModal";
import { useClickOutside } from "./lib/useClickOutside";
import { Button } from "./components/ui/button";

const tabs = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/board", label: "Board", icon: Kanban },
  { to: "/table", label: "Table", icon: Rows3 },
  { to: "/companies", label: "Companies", icon: Building2 },
];

const AVATAR_COLORS = [
  "bg-brut-wishlist",
  "bg-brut-applied",
  "bg-brut-interview",
  "bg-brut-offer",
  "bg-brut-rejected",
  "bg-primary",
];

export default function App() {
  const { user, loading, logout } = useAuth();
  const [changingPassword, setChangingPassword] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [creatingJob, setCreatingJob] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useClickOutside(menuRef, () => setMenuOpen(false));

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-background text-sm font-bold uppercase tracking-wider text-muted-foreground">
        Loading…
      </div>
    );
  }
  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  const initial = user.email.charAt(0).toUpperCase();
  const colorIndex = initial.charCodeAt(0) % AVATAR_COLORS.length;

  return (
    <RemindersProvider>
      <div className="flex h-full flex-col bg-background">
        <header className="flex items-center gap-5 border-b-[3px] border-brut-ink bg-background/90 backdrop-blur-sm px-5 py-2.5">
          <Logo size={20} />
          <nav className="flex gap-1">
            {tabs.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? "text-foreground border-b-[3px] border-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground border-b-[3px] border-transparent hover:bg-card"
                  }`
                }
              >
                <t.icon size={14} strokeWidth={2.5} />
                {t.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <Button
              size="sm"
              onClick={() => setCreatingJob(true)}
              className="border-[3px] border-brut-ink bg-primary text-primary-foreground font-black text-xs uppercase tracking-wider shadow-[3px_3px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <Plus size={14} strokeWidth={3} />
              Add Job
            </Button>

            <div className="relative" ref={menuRef}>
              <button
                ref={triggerRef}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-label="Account menu"
                className="flex items-center gap-2 px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors border-[2px] border-transparent hover:border-brut-ink bg-card"
              >
                <span className={`flex size-7 items-center justify-center text-sm font-black text-primary-foreground ${AVATAR_COLORS[colorIndex]} border-[2px] border-brut-ink`}>
                  {initial}
                </span>
                <ChevronDown size={12} strokeWidth={2.5} className={`transition-transform duration-150 ${menuOpen ? "rotate-180" : ""}`} />
              </button>

              {menuOpen && (
                <div role="menu" aria-label="Account" className="absolute right-0 top-full mt-2 w-56 border-[3px] border-brut-ink bg-card shadow-xl z-50">
                  <div className="px-4 py-3 border-b-[3px] border-brut-ink/10 bg-background/40">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Signed in as</p>
                    <p className="text-sm font-black text-foreground mt-0.5 truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      role="menuitem"
                      onClick={() => { setChangingPassword(true); setMenuOpen(false); }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-background/40 transition-colors"
                    >
                      <KeyRound size={14} strokeWidth={2.5} />
                      Change password
                    </button>
                    <button
                      role="menuitem"
                      onClick={() => { logout(); setMenuOpen(false); }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-background/40 transition-colors"
                    >
                      <LogOut size={14} strokeWidth={2.5} />
                      Sign out
                    </button>
                    <div className="mx-3 my-1 border-t-[3px] border-brut-ink/10" />
                    <button
                      role="menuitem"
                      onClick={() => { setDeletingAccount(true); setMenuOpen(false); }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-bold text-destructive/80 hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 size={14} strokeWidth={2.5} />
                      Delete account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {changingPassword && <ChangePasswordModal onClose={() => setChangingPassword(false)} />}
        {deletingAccount && <DeleteAccountModal onClose={() => setDeletingAccount(false)} />}
        {creatingJob && (
          <CreateJobModal
            onClose={() => setCreatingJob(false)}
            onCreated={() => {
              // Trigger window reload or navigation update if on board/table
              window.dispatchEvent(new Event("job-created"));
            }}
          />
        )}
        <RemindersBanner />
        <main className="min-h-0 flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/board" element={<Board />} />
            <Route path="/table" element={<TableView />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </RemindersProvider>
  );
}
