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
      <div className="flex h-full items-center justify-center bg-brut-paper text-sm font-bold uppercase tracking-wider text-brut-ink/50">
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
      <header className="flex items-center gap-5 border-b border-brut-ink/10 bg-brut-surface/90 backdrop-blur-sm px-5 py-2.5">
        <Logo size={20} />
        <nav className="flex gap-1">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "text-brut-ink border-b-2 border-brut-ink"
                    : "text-brut-ink/50 hover:text-brut-ink border-b-2 border-transparent"
                }`
              }
            >
              <t.icon size={14} strokeWidth={2} />
              {t.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-brut-ink/60 hover:text-brut-ink transition-colors"
          >
            <span className={`flex size-7 items-center justify-center text-sm font-bold text-white ${AVATAR_COLORS[colorIndex]}`}>
              {initial}
            </span>
            <ChevronDown size={12} strokeWidth={2} className={`transition-transform duration-150 ${menuOpen ? "rotate-180" : ""}`} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-brut-surface border border-brut-ink/10 shadow-lg z-50">
              <div className="px-4 py-3 border-b border-brut-ink/5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-brut-ink/40">Signed in as</p>
                <p className="text-sm font-semibold text-brut-ink mt-0.5 truncate">{user.email}</p>
              </div>
              <div className="py-1">
                <button onClick={() => { setChangingPassword(true); setMenuOpen(false); }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-semibold text-brut-ink/70 hover:text-brut-ink hover:bg-brut-paper transition-colors">
                  <KeyRound size={14} strokeWidth={2} />
                  Change password
                </button>
                <button onClick={() => { logout(); setMenuOpen(false); }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-semibold text-brut-ink/70 hover:text-brut-ink hover:bg-brut-paper transition-colors">
                  <LogOut size={14} strokeWidth={2} />
                  Sign out
                </button>
                <div className="mx-3 my-1 border-t border-brut-ink/5" />
                <button onClick={() => { setDeletingAccount(true); setMenuOpen(false); }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-semibold text-brut-rejected/70 hover:text-brut-rejected hover:bg-brut-paper transition-colors">
                  <Trash2 size={14} strokeWidth={2} />
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
