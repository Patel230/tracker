import { ArrowRight, Bell, Kanban, LayoutDashboard, PlusCircle, Rows3, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

// These 6 cards are decorative feature callouts, not tied to job status, so
// they all get the same accent instead of borrowing 5 different status
// colors + ink by position (which implied a status meaning none of them has).
const FEATURES = [
  {
    title: "Kanban pipeline",
    body: "Drag jobs through Wishlist, Applied, Interview, Offer, Rejected. Every move logs itself to the timeline automatically.",
    icon: Kanban,
  },
  {
    title: "Contacts & timeline",
    body: "Every job gets its own contact list and activity log — recruiter calls, phone screens, onsites — so the history lives with it.",
    icon: Users,
  },
  {
    title: "Follow-up reminders",
    body: "Set a due date on any job. Overdue items surface the moment you log in so nothing goes cold silently.",
    icon: Bell,
  },
  {
    title: "Dashboard & analytics",
    body: "Response rate, weekly volume, days-to-interview, and a funnel across all five stages — computed from your own data.",
    icon: LayoutDashboard,
  },
  {
    title: "Table view & search",
    body: "Every job in a sortable, filterable table when the board gets big. Search by company, title, or location.",
    icon: Rows3,
  },
  {
    title: "Free, stays free",
    body: "No tier that hides the board behind a paywall. Sign up, add every application, keep every contact and reminder on the house.",
    icon: Sparkles,
  },
];

const STEPS = [
  {
    n: "01",
    title: "Drop roles on your board",
    body: "Add applications as you find them. One field for the company, one for the title.",
    icon: PlusCircle,
  },
  {
    n: "02",
    title: "Track every touchpoint",
    body: "Log calls, interviews, contacts, and follow-ups. The timeline keeps the full story with the job.",
    icon: Rows3,
  },
  {
    n: "03",
    title: "Watch your numbers grow",
    body: "Response rate, pipeline shape, days to interview — see what's actually working.",
    icon: LayoutDashboard,
  },
];

const STACK = [
  "React 19", "Vite", "Tailwind CSS v4", "dnd-kit",
  "Hono", "Cloudflare Workers", "D1 (SQLite)", "TypeScript",
];

export default function Landing() {
  return (
    <div className="min-h-full bg-background">
      {/* Header — defolio-style */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b-[3px] border-brut-ink bg-background/90 backdrop-blur-sm px-6 py-3">
        <Logo size={20} />
        <nav className="hidden items-center gap-6 text-xs font-bold uppercase tracking-wider text-muted-foreground sm:flex">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#stack" className="hover:text-foreground transition-colors">Stack</a>
          <span className="text-muted-foreground/30">v0.1</span>
        </nav>
        <Link to="/login">
          <Button variant="default" size="sm">
            Get started <ArrowRight size={13} strokeWidth={2.5} />
          </Button>
        </Link>
      </header>

      {/* Hero — defolio-inspired */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          <div className="max-w-2xl">
            <Badge variant="default" className="mb-6">
              Free job tracker for students
            </Badge>

            <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-tighter text-foreground sm:text-7xl">
              Run your job hunt
              <br />
              <span className="text-primary">like a pipeline.</span>
            </h2>

            <div className="mt-4 h-1 w-24 bg-primary" />

            <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-muted-foreground">
              One board for every application. Drag jobs through stages, log contacts and calls,
              set reminders, and watch your response rate — all in a dashboard built for one job
              search: yours.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/login">
                <Button variant="default" size="lg">
                  Get started free <ArrowRight size={18} strokeWidth={2.5} />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg">See features</Button>
              </a>
            </div>
          </div>

          {/* Decorative — defolio-style visual */}
          <div className="mt-10 lg:mt-0 shrink-0">
            <div className="border-[3px] border-brut-ink bg-primary shadow-[8px_8px_0_0_#000] p-8">
              <div className="grid grid-cols-5 gap-2">
                {["Wishlist", "Applied", "Interview", "Offer", "Rejected"].map((s, i) => {
                  const colors = [
                    "bg-brut-wishlist", "bg-brut-applied", "bg-brut-interview",
                    "bg-brut-offer", "bg-brut-rejected",
                  ];
                  return (
                    <div key={s} className="flex flex-col items-center gap-1.5">
                      <div className={`size-10 border-[3px] border-brut-ink ${colors[i]}`} />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground text-center leading-tight">
                        {s}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Pipeline stages", value: "5" },
            { label: "Technologies", value: "8" },
            { label: "Zero cost", value: "Free" },
            { label: "Setup time", value: "2 min" },
          ].map((s) => (
            <div key={s.label} className="border-[3px] border-brut-ink bg-card p-5 text-center">
              <div className="text-3xl font-black text-foreground">{s.value}</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-16">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">What it does</span>
          <div className="h-[3px] flex-1 bg-primary" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tight text-foreground">Features</h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="border-[3px] border-brut-ink bg-card border-l-[6px] border-l-primary transition-all hover:-translate-y-1 hover:shadow-[7px_7px_0_0_#000]">
              <div className="p-5">
                <div className="flex size-9 items-center justify-center border-[3px] border-brut-ink bg-primary">
                  <f.icon size={16} strokeWidth={2.5} />
                </div>
                <h3 className="mt-3 text-sm font-black uppercase tracking-wider text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-16">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">How it works</span>
          <div className="h-[3px] flex-1 bg-primary" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tight text-foreground">Three simple steps</h2>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="border-[3px] border-brut-ink bg-card p-5">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center border-[3px] border-brut-ink bg-primary text-sm font-black">
                  {s.n}
                </span>
                <h3 className="text-sm font-black uppercase tracking-wider text-foreground">{s.title}</h3>
              </div>
              <p className="mt-3 text-sm font-medium leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLI snippet */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="border-[3px] border-brut-ink bg-card">
          <div className="flex items-center justify-between border-b-[3px] border-brut-ink bg-primary px-4 py-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-foreground">Quick start</span>
            <div className="flex gap-1.5">
              <span className="size-2.5 border-[3px] border-brut-ink bg-destructive" />
              <span className="size-2.5 border-[3px] border-brut-ink bg-primary" />
              {/* Green traffic-light dot intentionally reuses bg-brut-interview:
                  a real macOS window-chrome convention, purely decorative, not
                  worth a dedicated color for one 10px dot. */}
              <span className="size-2.5 border-[3px] border-brut-ink bg-brut-interview" />
            </div>
          </div>
          <div className="bg-foreground px-5 py-4 font-mono text-sm leading-relaxed text-background">
            {/* This panel inverts the page's palette (light bg, dark text), so
                the usual dark-theme tokens (text-primary, muted-foreground)
                read as low-contrast here — brut-terminal is a dedicated token
                chosen for contrast against the white background. */}
            <p><span className="font-bold text-brut-terminal">$</span> git clone https://github.com/Patel230/tracker</p>
            <p><span className="font-bold text-brut-terminal">$</span> cd tracker</p>
            <p><span className="font-bold text-brut-terminal">$</span> npm install</p>
            <p><span className="font-bold text-brut-terminal">$</span> npm run dev</p>
            <p className="mt-2 text-background/70"># → http://localhost:5173</p>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section id="stack" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-16">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Built with</span>
          <div className="h-[3px] flex-1 bg-primary" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tight text-foreground">Stack</h2>
        <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-muted-foreground">
          A single Cloudflare Worker serves both the API and the SPA — one deploy, no separate backend to babysit.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {STACK.map((s) => (
            <span key={s} className="border-[3px] border-brut-ink bg-foreground px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-background">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-[3px] border-brut-ink bg-primary">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 py-12 sm:flex-row">
          <div>
            {/* This section sits on bg-primary (yellow), not the page's dark
                background, so it needs primary-foreground's dark text rather
                than the usual light-on-dark foreground/muted tokens. */}
            <h2 className="text-2xl font-black uppercase tracking-tight text-primary-foreground">
              Ready to track your search?
            </h2>
            <p className="mt-1 text-sm font-medium text-primary-foreground/70">
              Free while you look. No credit card. No time limit.
            </p>
          </div>
          <Link to="/login">
            <Button variant="default" size="lg" className="shadow-none">
              Get started free <ArrowRight size={16} strokeWidth={2.5} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-[3px] border-brut-ink bg-background px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size={16} showText={false} />
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Tracker — one board, one job search.
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <a href="https://github.com/Patel230/tracker" className="hover:text-foreground transition-colors">GitHub</a>
            <span className="text-muted-foreground/40">MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
