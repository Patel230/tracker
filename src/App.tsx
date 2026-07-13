import { useState } from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { KeyRound, Kanban, LayoutDashboard, LogOut, Rows3, Trash2 } from "lucide-react";
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

const tabs = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/board", label: "Board", icon: Kanban },
  { to: "/table", label: "Table", icon: Rows3 },
];

export default function App() {
  const { user, loading, logout } = useAuth();
  const [changingPassword, setChangingPassword] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

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

  return (
    <RemindersProvider>
    <div className="flex h-full flex-col bg-brut-paper">
      <header className="flex items-center gap-6 border-b-2 border-brut-ink bg-brut-surface px-6 py-3">
        <Logo size={22} />
        <nav className="flex gap-2">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-1.5 border-2 border-brut-ink px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                  isActive ? "bg-brut-yellow text-brut-ink" : "bg-brut-surface text-brut-ink hover:bg-brut-paper"
                }`
              }
            >
              <t.icon size={14} strokeWidth={2.5} />
              {t.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 text-sm">
          <span className="hidden font-bold text-brut-ink/70 sm:inline">{user.email}</span>
          <button onClick={() => setChangingPassword(true)} className="btn-brut-sm">
            <KeyRound size={13} strokeWidth={2.5} />
            Change password
          </button>
          <button onClick={logout} className="btn-brut-sm">
            <LogOut size={13} strokeWidth={2.5} />
            Log out
          </button>
          <button onClick={() => setDeletingAccount(true)} className="btn-brut-sm">
            <Trash2 size={13} strokeWidth={2.5} />
            Delete account
          </button>
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
