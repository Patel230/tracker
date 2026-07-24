import { useEffect, useRef, useState } from "react";
import { Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { Building2, Kanban, KeyRound, LayoutDashboard, LogOut, Rows3, Trash2, ChevronDown, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
import AnimatedBackground from "./components/AnimatedBackground";
import { useClickOutside } from "./lib/useClickOutside";
import { Button } from "./components/ui/button";

const tabs = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/board", label: "Board", icon: Kanban },
  { to: "/table", label: "Table", icon: Rows3 },
  { to: "/companies", label: "Companies", icon: Building2 },
];

const AVATAR_COLORS = [
  "bg-lime-400 text-slate-950",
  "bg-cyan-400 text-slate-950",
  "bg-emerald-400 text-slate-950",
  "bg-fuchsia-400 text-slate-950",
  "bg-orange-400 text-slate-950",
  "bg-yellow-300 text-slate-950",
];

export default function App() {
  const { user, loading, logout } = useAuth();
  const location = useLocation();
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
      <div className="flex h-full items-center justify-center bg-slate-950 text-sm font-semibold text-slate-400">
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
      <div className="relative flex h-full flex-col bg-slate-950 overflow-hidden">
        <AnimatedBackground />

        <header className="flex items-center gap-6 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl px-6 py-3 sticky top-0 z-40">
          <Logo size={22} />
          
          <nav className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-white/10">
            {tabs.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.to === "/"}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    isActive
                      ? "text-slate-950 font-extrabold"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-lg gradient-lime shadow-lg shadow-lime-500/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <t.icon size={15} strokeWidth={2.5} />
                      {t.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="sm"
                onClick={() => setCreatingJob(true)}
                className="gradient-lime text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-lime-500/20 hover:shadow-lime-500/35 transition-all gap-1.5 px-4"
              >
                <Plus size={15} strokeWidth={3} />
                Add Job
              </Button>
            </motion.div>

            <div className="relative" ref={menuRef}>
              <motion.button
                ref={triggerRef}
                onClick={() => setMenuOpen(!menuOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-label="Account menu"
                className="flex items-center gap-2.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl text-slate-200 hover:text-white transition-all bg-slate-900/80 border border-white/10 hover:border-white/20"
              >
                <span className={`flex size-6 items-center justify-center rounded-lg text-xs font-black ${AVATAR_COLORS[colorIndex]} shadow-sm`}>
                  {initial}
                </span>
                <ChevronDown size={13} strokeWidth={2.5} className={`transition-transform duration-200 text-slate-400 ${menuOpen ? "rotate-180" : ""}`} />
              </motion.button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    role="menu"
                    aria-label="Account"
                    className="absolute right-0 top-full mt-2 w-60 border border-white/10 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                      <p className="text-[11px] font-semibold text-slate-400">Signed in as</p>
                      <p className="text-xs font-bold text-white mt-0.5 truncate">{user.email}</p>
                    </div>
                    <div className="p-1.5">
                      <button
                        role="menuitem"
                        onClick={() => { setChangingPassword(true); setMenuOpen(false); }}
                        className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-300 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <KeyRound size={15} strokeWidth={2} />
                        Change password
                      </button>
                      <button
                        role="menuitem"
                        onClick={() => { logout(); setMenuOpen(false); }}
                        className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-300 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <LogOut size={15} strokeWidth={2} />
                        Sign out
                      </button>
                      <div className="my-1 border-t border-white/10" />
                      <button
                        role="menuitem"
                        onClick={() => { setDeletingAccount(true); setMenuOpen(false); }}
                        className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-400 rounded-lg hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={15} strokeWidth={2} />
                        Delete account
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {changingPassword && <ChangePasswordModal onClose={() => setChangingPassword(false)} />}
        {deletingAccount && <DeleteAccountModal onClose={() => setDeletingAccount(false)} />}
        {creatingJob && (
          <CreateJobModal
            onClose={() => setCreatingJob(false)}
            onCreated={() => {
              window.dispatchEvent(new Event("job-created"));
            }}
          />
        )}
        <RemindersBanner />
        <main className="relative z-10 min-h-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="h-full"
            >
              <Routes location={location}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/board" element={<Board />} />
                <Route path="/table" element={<TableView />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </RemindersProvider>
  );
}
