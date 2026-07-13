import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  Code2,
  Kanban,
  LayoutDashboard,
  PlusCircle,
  Rows3,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { JOB_STATUSES, STATUS_LABELS } from "../../shared/types";
import { STATUS_BG, STATUS_TEXT } from "../lib/theme";

const FEATURES: { title: string; body: string; accent: string; icon: LucideIcon }[] = [
  {
    title: "Kanban pipeline",
    body: "Drag jobs through Wishlist, Applied, Interview, Offer, Rejected. Column order persists, and every move logs itself to the job's timeline automatically.",
    accent: "bg-brut-applied",
    icon: Kanban,
  },
  {
    title: "Contacts + timeline",
    body: "Every job gets its own contact list and activity log — recruiter calls, phone screens, onsites, notes — so the history of an application lives with it.",
    accent: "bg-brut-interview",
    icon: Users,
  },
  {
    title: "Follow-up reminders",
    body: "Set a due date on any job. Overdue items surface the moment you log in and again on the dashboard, so nothing goes cold silently.",
    accent: "bg-brut-offer",
    icon: Bell,
  },
  {
    title: "Dashboard & analytics",
    body: "Response rate, applications per week, days-to-interview, and a funnel across all five stages — computed straight from your own data.",
    accent: "bg-brut-wishlist",
    icon: LayoutDashboard,
  },
  {
    title: "Table view & search",
    body: "Every job in a sortable, filterable table when the board gets big — search by company, title, or location, filter by stage, include archived roles.",
    accent: "bg-brut-rejected",
    icon: Rows3,
  },
  {
    title: "Free, and it stays free",
    body: "No tier that hides the board behind a paywall. Sign up, add every application you like, and keep every contact and reminder on the house.",
    accent: "bg-brut-applied",
    icon: Sparkles,
  },
];

const STEPS: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Add every application",
    body: "Drop roles onto your board as you find them. Paste the post, set the company and stage, and you're already organized.",
    icon: PlusCircle,
  },
  {
    title: "Track every touchpoint",
    body: "Log who you talked to, what round you're on, and when to follow up. The timeline keeps the full story with the job.",
    icon: Rows3,
  },
  {
    title: "Know your numbers",
    body: "Watch your response rate, pipeline shape, and how fast you reach interviews — so you can see what's actually working.",
    icon: LayoutDashboard,
  },
];

const STACK = [
  "React 19",
  "Vite",
  "Tailwind CSS v4",
  "dnd-kit",
  "Hono",
  "Cloudflare Workers",
  "D1 (SQLite)",
  "TypeScript",
];

export default function Landing() {
  return (
    <div className="min-h-full bg-brut-paper">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-brut-ink bg-brut-surface px-6 py-3">
        <h1 className="text-lg font-extrabold uppercase tracking-tight text-brut-ink">
          Tracker<span className="text-brut-rejected">.</span>
        </h1>
        <nav className="hidden items-center gap-5 text-xs font-bold uppercase tracking-wide text-brut-ink/60 sm:flex">
          <a href="#features" className="hover:text-brut-ink">
            Features
          </a>
          <a href="#how" className="hover:text-brut-ink">
            How it works
          </a>
          <a href="#stack" className="hover:text-brut-ink">
            Stack
          </a>
        </nav>
        <Link to="/login" className="btn-brut-sm">
          Get started free
          <ArrowRight size={13} strokeWidth={2.5} />
        </Link>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="max-w-2xl">
          <span className="badge-brut border-brut-ink bg-brut-yellow text-brut-ink">
            Free job tracker for students
          </span>
          <h2 className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-brut-ink sm:text-5xl">
            Run your job hunt like a pipeline, not a pile of tabs.
          </h2>
          <div className="mt-4 h-2 w-24 bg-brut-yellow" />
          <p className="mt-6 text-lg font-medium text-brut-ink/70">
            One board for every application. Drag jobs through the stages, log every contact and
            call, set follow-up reminders, and watch your response rate in a dashboard built for
            one job search: yours. Free while you look.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/login" className="btn-brut">
              Get started free
              <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
            <a href="#features" className="btn-brut-ghost">
              See the features
            </a>
          </div>
        </div>

        <div className="mt-12 card-brut p-4">
          <div className="flex flex-wrap gap-3">
            {JOB_STATUSES.map((s) => (
              <span key={s} className={`badge-brut border-brut-ink ${STATUS_BG[s]} ${STATUS_TEXT[s]}`}>
                {STATUS_LABELS[s]}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs font-bold uppercase tracking-wide text-brut-ink/40">
            Every stage, colorblind-safe, always labeled.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-5xl scroll-mt-16 px-6 py-12">
        <h3 className="text-2xl font-extrabold uppercase tracking-tight text-brut-ink">What it does</h3>
        <div className="mt-2 h-2 w-16 bg-brut-yellow" />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="card-brut">
              <div className={`h-2 ${f.accent}`} />
              <div className="p-4">
                <h4 className="flex items-center gap-1.5 text-sm font-extrabold uppercase tracking-wide text-brut-ink">
                  <f.icon size={15} strokeWidth={2.5} />
                  {f.title}
                </h4>
                <p className="mt-2 text-sm font-medium text-brut-ink/60">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-5xl scroll-mt-16 px-6 py-12">
        <h3 className="text-2xl font-extrabold uppercase tracking-tight text-brut-ink">How it works</h3>
        <div className="mt-2 h-2 w-16 bg-brut-yellow" />
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.title} className="card-brut p-4">
              <span className="badge-brut border-brut-ink bg-brut-ink text-brut-paper">Step {i + 1}</span>
              <h4 className="mt-3 flex items-center gap-1.5 text-sm font-extrabold uppercase tracking-wide text-brut-ink">
                <s.icon size={15} strokeWidth={2.5} />
                {s.title}
              </h4>
              <p className="mt-2 text-sm font-medium text-brut-ink/60">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section id="stack" className="mx-auto max-w-5xl scroll-mt-16 px-6 py-12">
        <h3 className="flex items-center gap-2 text-2xl font-extrabold uppercase tracking-tight text-brut-ink">
          <Code2 size={22} strokeWidth={2.5} />
          Built with
        </h3>
        <div className="mt-2 h-2 w-16 bg-brut-yellow" />
        <p className="mt-4 max-w-2xl text-sm font-medium text-brut-ink/60">
          A single Cloudflare Worker serves both the API and the app — one deploy, no separate
          backend to babysit.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {STACK.map((s) => (
            <span key={s} className="badge-brut border-brut-ink bg-brut-surface text-brut-ink">
              {s}
            </span>
          ))}
        </div>
      </section>

      <footer className="border-t-2 border-brut-ink bg-brut-surface px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-wide text-brut-ink/40">
            Tracker — one board, one job search. Free while you look.
          </span>
          <Link to="/login" className="btn-brut-sm">
            Get started free
            <ArrowRight size={13} strokeWidth={2.5} />
          </Link>
        </div>
      </footer>
    </div>
  );
}
