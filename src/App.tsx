import { useRef, useState } from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { Kanban, KeyRound, LayoutDashboard, LogOut, Rows3, Trash2, ChevronDown } from "lucide-react";
import { useAuth } from "./lib/auth";
import Logo from "./components/Logo";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Board from "./pages/Board";
import TableView from "./pages/TableView";
import Dashboard from "./pages/Dashboard";
import RemindersBanner from "./components/RemindersBanner";
import { RemindersProvider } from "./components/RemindersProvider";
import ChangePasswordModal from "./components/ChangePasswordModal";
import DeleteAccountModal from "./components/DeleteAccountModal";
import { useClickOutside } from "./lib/useClickOutside";

const TAB_COLORS = [
  { border: "border-brut-wishlist", bg: "bg-brut-wishlist" },
  { border: "border-brut-applied", bg: "bg-brut-applied" },
  { border: "border-brut-interview", bg: "bg-brut-interview" },
];

const tabs = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/board", label: "Board", icon: Kanban },
  { to: "/table", label: "Table", icon: Rows3 },
];

const AVATAR_COLORS = [
  "bg-brut-wishlist",
  "bg-brut-applied",
  "bg-brut-interview",
  "bg-brut-offer",
  "bg-brut-rejected",
  "bg-brut-yellow",
];

export default function App() {
  const { user, loading, logout } = useAuth();
  const [changingPassword, setChangingPassword] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setMenuOpen(false));

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-brut-paper text-sm font-bold uppercase tracking-wide text-brut-ink/50">
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
    <div className="flex h-full flex-col bg-brut-paper">
      <header className="flex items-center gap-6 border-b-2 border-brut-ink bg-brut-surface px-6 py-3">
        <Logo size={22} />
        <nav className="flex gap-2">
          {tabs.map((t, i) => {
            const c = TAB_COLORS[i];
            return (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 border-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-all ${
                    isActive
                      ? `${c.border} ${c.bg} text-white shadow-[2px_2px_0_var(--color-brut-ink)]`
                      : "border-brut-ink bg-brut-surface text-brut-ink hover:bg-brut-paper"
                  }`
                }
              >
                <t.icon size={14} strokeWidth={2.5} />
                {t.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="ml-auto relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 border-2 border-brut-ink bg-brut-surface px-2 py-1.5 text-xs font-bold uppercase tracking-wide text-brut-ink hover:bg-brut-paper transition-colors"
          >
            <span className={`flex size-7 items-center justify-center border-2 border-brut-ink text-sm font-extrabold text-brut-ink ${AVATAR_COLORS[colorIndex]}`}>
              {initial}
            </span>
            <ChevronDown size={12} strokeWidth={3} className={`transition-transform ${menuOpen ? "rotate-180" : ""}`} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-52 border-2 border-brut-ink bg-brut-surface shadow-[4px_4px_0_var(--color-brut-ink)] z-50">
              <div className="border-b-2 border-brut-ink bg-brut-yellow/30 px-4 py-2.5">
                <p className="text-xs font-bold uppercase tracking-wide text-brut-ink/50">Signed in as</p>
                <p className="text-sm font-bold text-brut-ink truncate">{user.email}</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => { setChangingPassword(true); setMenuOpen(false); }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-brut-applied hover:bg-brut-paper transition-colors"
                >
                  <KeyRound size={14} strokeWidth={2.5} />
                  Change password
                </button>
                <button
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-brut-rejected hover:bg-brut-paper transition-colors"
                >
                  <LogOut size={14} strokeWidth={2.5} />
                  Log out
                </button>
                <div className="mx-3 my-1 border-t-2 border-brut-ink/10" />
                <button
                  onClick={() => { setDeletingAccount(true); setMenuOpen(false); }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-brut-rejected hover:bg-brut-paper transition-colors"
                >
                  <Trash2 size={14} strokeWidth={2.5} />
                  Delete account
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
      {changingPassword && <ChangePasswordModal onClose={() => setChangingPassword(false)} />}
      {deletingAccount && <DeleteAccountModal onClose={() => setDeletingAccount(false)} />}
      <RemindersBanner />
      <main className="min-h-0 flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/board" element={<Board />} />
          <Route path="/table" element={<TableView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
    </RemindersProvider>
  );
}
