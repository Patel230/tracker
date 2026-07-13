import { ArrowRight, Bell, Kanban, LayoutDashboard, PlusCircle, Rows3, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const FEATURES = [
  {
    title: "Kanban pipeline",
    body: "Drag jobs through Wishlist, Applied, Interview, Offer, Rejected. Every move logs itself to the timeline automatically.",
    accent: "bg-brut-wishlist",
    icon: Kanban,
  },
  {
    title: "Contacts & timeline",
    body: "Every job gets its own contact list and activity log — recruiter calls, phone screens, onsites — so the history lives with it.",
    accent: "bg-brut-interview",
    icon: Users,
  },
  {
    title: "Follow-up reminders",
    body: "Set a due date on any job. Overdue items surface the moment you log in so nothing goes cold silently.",
    accent: "bg-brut-offer",
    icon: Bell,
  },
  {
    title: "Dashboard & analytics",
    body: "Response rate, weekly volume, days-to-interview, and a funnel across all five stages — computed from your own data.",
    accent: "bg-brut-applied",
    icon: LayoutDashboard,
  },
  {
    title: "Table view & search",
    body: "Every job in a sortable, filterable table when the board gets big. Search by company, title, or location.",
    accent: "bg-brut-rejected",
    icon: Rows3,
  },
  {
    title: "Free, stays free",
    body: "No tier that hides the board behind a paywall. Sign up, add every application, keep every contact and reminder on the house.",
    accent: "bg-brut-wishlist",
    icon: Sparkles,
  },
];

const STEPS = [
  {
    n: "01",
    title: "Drop roles on your board",
    body: "Add applications as you find them. One field for the company, one for the title, and you're already organized.",
    icon: PlusCircle,
  },
  {
    n: "02",
    title: "Track every touchpoint",
    body: "Log calls, interviews, contacts, and follow-ups. The timeline keeps the full story with the job — no more digging through email.",
    icon: Rows3,
  },
  {
    n: "03",
    title: "Watch your numbers grow",
    body: "Response rate, pipeline shape, days to interview — see what's actually working and where to focus next.",
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
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-brut-ink/10 bg-brut-surface/80 backdrop-blur-sm px-6 py-3">
        <Logo size={20} />
        <nav className="hidden items-center gap-6 text-xs font-bold uppercase tracking-wider text-brut-ink/50 sm:flex">
          <a href="#features" className="hover:text-brut-ink transition-colors">Features</a>
          <a href="#how" className="hover:text-brut-ink transition-colors">How it works</a>
          <a href="#stack" className="hover:text-brut-ink transition-colors">Stack</a>
          <span className="size-1.5 rounded-sm bg-brut-ink/30" />
          <span className="text-brut-ink/20">v0.1</span>
        </nav>
        <Link to="/login" className="btn-brut-sm">
          Get started <ArrowRight size={13} strokeWidth={2.5} />
        </Link>
      </header>

      {/* ─── Hero ─── */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border-2 border-brut-ink bg-brut-yellow px-3 py-1.5 text-xs font-bold uppercase tracking-wider">
            Free job tracker for students
          </div>

          <h2 className="mt-6 text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-brut-ink sm:text-7xl">
            Run your job hunt like a pipeline.
            <br />
            <span className="text-brut-rejected">Not a pile of tabs.</span>
          </h2>

          <div className="mt-4 h-1 w-24 bg-brut-yellow" />

          <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-brut-ink/60">
            One board for every application. Drag jobs through stages, log contacts and calls,
            set reminders, and watch your response rate — all in a dashboard built for one job
            search: yours.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/login" className="btn-brut">
              Get started free <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <a href="#features" className="btn-brut-ghost">
              See features
            </a>
          </div>
        </div>
      </section>

      {/* ─── Pipeline badges ─── */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="border-2 border-brut-ink bg-brut-surface p-5 flex flex-wrap items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brut-ink/50">
            Pipeline stages
          </span>
          <div className="flex flex-wrap gap-2">
            {["Wishlist", "Applied", "Interview", "Offer", "Rejected"].map((s, i) => {
              const colors = [
                "bg-brut-wishlist text-brut-ink",
                "bg-brut-applied text-white",
                "bg-brut-interview text-white",
                "bg-brut-offer text-brut-ink",
                "bg-brut-rejected text-white",
              ];
              return (
                <span key={s} className={`border-2 border-brut-ink px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${colors[i]}`}>
                  {s}
                </span>
              );
            })}
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-brut-ink/30">
            Colorblind-safe · Okabe-Ito
          </span>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Pipeline stages", value: "5" },
            { label: "Technologies", value: "8" },
            { label: "Zero cost", value: "Free" },
            { label: "Setup time", value: "2 min" },
          ].map((s) => (
            <div key={s.label} className="border-2 border-brut-ink bg-brut-surface p-5 text-center">
              <div className="text-3xl font-extrabold text-brut-ink">{s.value}</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-brut-ink/50">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-16">
        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-brut-ink">What it does</h2>
        <div className="mt-2 h-1 w-20 bg-brut-yellow" />

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="border-2 border-brut-ink bg-brut-surface transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_var(--color-brut-ink)]">
              <div className={`h-1.5 ${f.accent}`} />
              <div className="p-5">
                <div className={`flex size-9 items-center justify-center border-2 border-brut-ink ${f.accent}`}>
                  <f.icon size={16} strokeWidth={2.5} />
                </div>
                <h3 className="mt-3 text-sm font-extrabold uppercase tracking-wide text-brut-ink">{f.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-brut-ink/50">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CLI snippet ─── */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="border-2 border-brut-ink bg-brut-surface">
          <div className="flex items-center justify-between border-b-2 border-brut-ink bg-brut-yellow px-4 py-2.5">
            <span className="text-xs font-bold uppercase tracking-wider">Quick start</span>
            <div className="flex gap-1.5">
              <span className="size-2.5 border-2 border-brut-ink bg-brut-rejected" />
              <span className="size-2.5 border-2 border-brut-ink bg-brut-wishlist" />
              <span className="size-2.5 border-2 border-brut-ink bg-brut-interview" />
            </div>
          </div>
          <div className="bg-brut-ink px-5 py-4 font-mono text-sm leading-relaxed text-brut-paper">
            <p><span className="text-brut-yellow">$</span> git clone https://github.com/Patel230/tracker</p>
            <p><span className="text-brut-yellow">$</span> cd tracker</p>
            <p><span className="text-brut-yellow">$</span> npm install</p>
            <p><span className="text-brut-yellow">$</span> npm run dev</p>
            <p className="mt-2 text-brut-paper/40"># → http://localhost:5173</p>
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-16">
        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-brut-ink">How it works</h2>
        <div className="mt-2 h-1 w-20 bg-brut-yellow" />

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="border-2 border-brut-ink bg-brut-surface p-5">
              <div className="inline-flex items-center gap-2 border-2 border-brut-ink bg-brut-ink px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-brut-yellow">
                Step {s.n}
              </div>
              <div className={`mt-4 flex size-9 items-center justify-center border-2 border-brut-ink bg-brut-yellow`}>
                <s.icon size={16} strokeWidth={2.5} />
              </div>
              <h3 className="mt-3 text-sm font-extrabold uppercase tracking-wide text-brut-ink">{s.title}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-brut-ink/50">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Stack ─── */}
      <section id="stack" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-16">
        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-brut-ink">Built with</h2>
        <div className="mt-2 h-1 w-20 bg-brut-yellow" />
        <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-brut-ink/50">
          A single Cloudflare Worker serves both the API and the SPA — one deploy, no separate
          backend to babysit. The whole stack is designed for a solo developer to ship fast.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {STACK.map((s) => (
            <span key={s} className="border-2 border-brut-ink bg-brut-surface px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-brut-ink">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t-2 border-brut-ink bg-brut-yellow">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 py-12 sm:flex-row">
          <div>
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-brut-ink">
              Ready to track your search?
            </h2>
            <p className="mt-1 text-sm font-medium text-brut-ink/60">
              Free while you look. No credit card. No time limit.
            </p>
          </div>
          <Link to="/login" className="btn-brut-ghost shrink-0">
            Get started free <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-brut-ink/10 bg-brut-surface px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size={16} showText={false} />
            <span className="text-xs font-bold uppercase tracking-wider text-brut-ink/30">
              Tracker — one board, one job search.
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-brut-ink/30">
            <a href="https://github.com/Patel230/tracker" className="hover:text-brut-ink transition-colors">GitHub</a>
            <span className="size-1 rounded-sm bg-brut-ink/20" />
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
