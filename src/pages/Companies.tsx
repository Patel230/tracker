import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Building2, ExternalLink, Pencil, Plus, Save, Trash2, X, RotateCcw, Search, Sparkles, Globe, Flame, Plane, MapPin, Code2, Bot, Rocket } from "lucide-react";
import { api, ApiError } from "../lib/api";
import { useFetch } from "../lib/useFetch";
import { STATUS_LABELS, safeExternalUrl, type Company, type Job } from "../../shared/types";
import { TOP_COMPANIES } from "../../shared/topCompaniesData";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import JobDrawer from "../components/JobDrawer";

function portalHref(url: string | null): string | null {
  return safeExternalUrl(url);
}

const CATEGORY_TAGS: Record<string, { label: string; bg: string; text: string; border: string }> = {
  ai_yc: { label: "AI & YC Startup", bg: "bg-purple-500/15", text: "text-purple-300", border: "border-purple-500/30" },
  company: { label: "Tech Giant", bg: "bg-amber-500/15", text: "text-amber-300", border: "border-amber-500/30" },
  startup: { label: "Startup", bg: "bg-fuchsia-500/15", text: "text-fuchsia-300", border: "border-fuchsia-500/30" },
  remote: { label: "Remote-First", bg: "bg-teal-500/15", text: "text-teal-300", border: "border-teal-500/30" },
  visa_remote: { label: "Visa Sponsor", bg: "bg-cyan-500/15", text: "text-cyan-300", border: "border-cyan-500/30" },
  india_tech: { label: "India Hub", bg: "bg-lime-500/15", text: "text-lime-300", border: "border-lime-500/30" },
};

function normalizeName(s: string): string {
  return s.toLowerCase().replace(/\s*\([^)]*\)/g, "").replace(/[^a-z0-9]/g, "").trim();
}

export default function Companies() {
  const { data, error, loading, reload } = useFetch<Company[]>("/companies");
  const [companies, setCompanies] = useState<Company[]>([]);
  useEffect(() => {
    if (data) setCompanies(data);
  }, [data]);

  const [name, setName] = useState("");
  const [portalUrl, setPortalUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "actively_hiring" | "ai_yc" | "company" | "startup" | "remote" | "visa_remote" | "india_tech">("all");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPortal, setEditPortal] = useState("");

  const [jobsByCompany, setJobsByCompany] = useState<Record<string, Job[]>>({});
  const [openJobId, setOpenJobId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const topCompanyMap = useMemo(() => {
    const map = new Map<string, { category: string; actively_hiring?: boolean; location?: string; portal_url: string }>();
    for (const c of TOP_COMPANIES) {
      map.set(normalizeName(c.name), c);
      map.set(c.name.toLowerCase().trim(), c);
    }
    return map;
  }, []);

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const info = topCompanyMap.get(normalizeName(c.name)) || topCompanyMap.get(c.name.toLowerCase().trim());
      
      if (categoryFilter === "actively_hiring") {
        if (!info?.actively_hiring) return false;
      } else if (categoryFilter !== "all") {
        const cat = info?.category;
        if (!cat) return false;
        if (categoryFilter === "startup" && (cat === "startup" || cat === "ai_yc")) {
          // match
        } else if (categoryFilter === "remote" && (cat === "remote" || cat === "visa_remote" || cat === "ai_yc")) {
          // match
        } else if (cat !== categoryFilter) {
          return false;
        }
      }

      const matchesSearch =
        !search.trim() ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        (c.portal_url && c.portal_url.toLowerCase().includes(search.toLowerCase()));
      return matchesSearch;
    });
  }, [companies, search, categoryFilter, topCompanyMap]);

  const add = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || busy) return;
    setBusy(true);
    setFormError(null);
    try {
      const company = await api.post<Company>("/companies", {
        name: name.trim(),
        portal_url: portalUrl.trim() || null,
      });
      setCompanies((cs) => [...cs, company].sort((a, b) => a.name.localeCompare(b.name)));
      setName("");
      setPortalUrl("");
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Couldn't add company.");
    } finally {
      setBusy(false);
    }
  };

  const seedTopCompanies = async (category: "all" | "company" | "startup" | "remote" | "actively_hiring" | "visa_remote" | "india_tech" | "ai_yc") => {
    if (seeding) return;
    setSeeding(true);
    setFormError(null);
    try {
      await api.post("/companies/seed", { category });
      await reload();
      if (category !== "all") {
        setCategoryFilter(category);
      }
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Couldn't seed companies.");
    } finally {
      setSeeding(false);
    }
  };

  const startEdit = (c: Company) => {
    setEditingId(c.id);
    setEditName(c.name);
    setEditPortal(c.portal_url ?? "");
  };

  const saveEdit = async (id: string) => {
    if (!editName.trim()) return;
    try {
      const updated = await api.patch<Company>(`/companies/${id}`, {
        name: editName.trim(),
        portal_url: editPortal.trim() || null,
      });
      setCompanies((cs) => cs.map((c) => (c.id === id ? updated : c)));
      setEditingId(null);
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Couldn't save.");
    }
  };

  const remove = async (c: Company) => {
    try {
      await api.delete(`/companies/${c.id}`);
      setCompanies((cs) => cs.filter((x) => x.id !== c.id));
      if (expandedId === c.id) setExpandedId(null);
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Couldn't delete.");
    }
  };

  const toggleExpand = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(id);
    if (!jobsByCompany[id]) {
      const all = await api.get<Job[]>("/jobs");
      setJobsByCompany((m) => ({ ...m, [id]: all.filter((j) => j.company_id === id) }));
    }
  };

  const expandedJobs = expandedId ? jobsByCompany[expandedId] ?? null : null;
  const openJob = openJobId ? (expandedJobs?.find((j) => j.id === openJobId) ?? null) : null;

  const totalJobs = useMemo(() => companies.reduce((sum, c) => sum + (c.job_count ?? 0), 0), [companies]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-sm font-semibold text-slate-400">
        Loading…
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-sm font-semibold text-red-400">Couldn't load companies.</p>
        <Button variant="outline" size="sm" onClick={reload} className="rounded-xl border-white/10">
          <RotateCcw size={14} strokeWidth={2} />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white">Companies & Startup Directory</h1>
            <p className="mt-1 text-xs font-semibold text-slate-400">
              {companies.length} verified companies · {totalJobs} Backend & Tech jobs tracked
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={seeding}
              onClick={() => seedTopCompanies("ai_yc")}
              className="rounded-xl border border-purple-500/30 bg-purple-500/15 text-purple-300 text-xs font-bold hover:bg-purple-500/25 gap-1.5"
            >
              <Bot size={14} className="text-purple-300" strokeWidth={2} />
              {seeding ? "Importing…" : "100+ AI & YC Startups"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={seeding}
              onClick={() => seedTopCompanies("actively_hiring")}
              className="rounded-xl border border-red-500/30 bg-red-500/15 text-red-300 text-xs font-bold hover:bg-red-500/25 gap-1.5"
            >
              <Flame size={14} className="text-red-400 fill-red-400" strokeWidth={2} />
              {seeding ? "Importing…" : "Top 10 Actively Hiring"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={seeding}
              onClick={() => seedTopCompanies("company")}
              className="rounded-xl border border-amber-500/30 bg-amber-500/15 text-amber-300 text-xs font-bold hover:bg-amber-500/25 gap-1.5"
            >
              <Sparkles size={14} className="text-amber-300" strokeWidth={2} />
              {seeding ? "Importing…" : "Top 100 Tech Giants"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={seeding}
              onClick={() => seedTopCompanies("remote")}
              className="rounded-xl border border-teal-500/30 bg-teal-500/15 text-teal-300 text-xs font-bold hover:bg-teal-500/25 gap-1.5"
            >
              <Globe size={14} className="text-teal-300" strokeWidth={2} />
              {seeding ? "Importing…" : "Top 100 Remote"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={seeding}
              onClick={() => seedTopCompanies("visa_remote")}
              className="rounded-xl border border-cyan-500/30 bg-cyan-500/15 text-cyan-300 text-xs font-bold hover:bg-cyan-500/25 gap-1.5"
            >
              <Plane size={14} className="text-cyan-300" strokeWidth={2} />
              {seeding ? "Importing…" : "Visa & Relocation"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={seeding}
              onClick={() => seedTopCompanies("india_tech")}
              className="rounded-xl border border-lime-500/30 bg-lime-500/15 text-lime-300 text-xs font-bold hover:bg-lime-500/25 gap-1.5"
            >
              <MapPin size={14} className="text-lime-300" strokeWidth={2} />
              {seeding ? "Importing…" : "India Tech Hubs"}
            </Button>
            <Button
              size="sm"
              disabled={seeding}
              onClick={() => seedTopCompanies("all")}
              className="rounded-xl gradient-lime text-slate-950 text-xs font-extrabold gap-1.5 shadow-lg shadow-lime-500/25"
            >
              <Code2 size={14} strokeWidth={2.5} />
              {seeding ? "Importing…" : "Import All 1,000+ Companies"}
            </Button>
          </div>
        </div>

        <form onSubmit={add} className="grid grid-cols-[1fr_1fr_auto] gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-xl">
          <Input
            required
            placeholder="Company name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl border-white/10 bg-slate-950 text-white placeholder:text-slate-500 text-xs"
          />
          <Input
            type="url"
            placeholder="Official career portal URL (https://…)"
            value={portalUrl}
            onChange={(e) => setPortalUrl(e.target.value)}
            className="rounded-xl border-white/10 bg-slate-950 text-white placeholder:text-slate-500 text-xs"
          />
          <Button type="submit" size="sm" disabled={busy} className="rounded-xl gradient-lime text-slate-950 font-extrabold text-xs shrink-0 px-4">
            <Plus size={14} strokeWidth={2.5} />
            {busy ? "…" : "Add Company"}
          </Button>
          {formError && (
            <p className="col-span-3 rounded-xl border border-red-500/30 bg-red-500/10 p-2 text-xs font-semibold text-red-400" role="alert">
              {formError}
            </p>
          )}
        </form>

        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/60 p-2">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search companies or career links…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-xl border-white/5 bg-slate-950 text-white placeholder:text-slate-500 text-xs h-9"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "all", label: "All", Icon: Building2, iconClass: "text-slate-400", activeBg: "bg-slate-800 border-white/20 text-white" },
              { id: "ai_yc", label: "AI & YC", Icon: Bot, iconClass: "text-purple-400", activeBg: "bg-purple-500/20 border-purple-500/40 text-purple-300" },
              { id: "actively_hiring", label: "Actively Hiring", Icon: Flame, iconClass: "text-red-400 fill-red-400", activeBg: "bg-red-500/20 border-red-500/40 text-red-300" },
              { id: "company", label: "Tech Giants", Icon: Sparkles, iconClass: "text-amber-400", activeBg: "bg-amber-500/20 border-amber-500/40 text-amber-300" },
              { id: "startup", label: "Startups", Icon: Rocket, iconClass: "text-fuchsia-400", activeBg: "bg-fuchsia-500/20 border-fuchsia-500/40 text-fuchsia-300" },
              { id: "remote", label: "Remote", Icon: Globe, iconClass: "text-teal-400", activeBg: "bg-teal-500/20 border-teal-500/40 text-teal-300" },
              { id: "visa_remote", label: "Visa & Relocation", Icon: Plane, iconClass: "text-cyan-400", activeBg: "bg-cyan-500/20 border-cyan-500/40 text-cyan-300" },
              { id: "india_tech", label: "India Tech", Icon: MapPin, iconClass: "text-lime-400", activeBg: "bg-lime-500/20 border-lime-500/40 text-lime-300" },
            ].map(({ id, label, Icon, iconClass, activeBg }) => (
              <Button
                key={id}
                size="sm"
                variant={categoryFilter === id ? "default" : "outline"}
                onClick={() => setCategoryFilter(id as any)}
                className={`text-xs font-bold rounded-xl border border-white/10 gap-1.5 h-9 ${
                  categoryFilter === id ? `${activeBg} shadow-md` : "bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon size={14} className={iconClass} strokeWidth={2} />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {filteredCompanies.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center bg-slate-900/40">
            <Building2 size={32} strokeWidth={1.5} className="mx-auto text-slate-500" />
            <p className="mt-3 text-xs font-semibold text-slate-400">
              No matching companies found.
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <Button size="sm" onClick={() => seedTopCompanies("ai_yc")} disabled={seeding} className="rounded-xl gradient-lime text-slate-950 text-xs font-extrabold">
                <Bot size={14} strokeWidth={2} />
                Import 100+ AI & YC Startups
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filteredCompanies.map((c) => {
              const href = portalHref(c.portal_url);
              const expanded = expandedId === c.id;
              const info = topCompanyMap.get(normalizeName(c.name)) || topCompanyMap.get(c.name.toLowerCase().trim());
              const catTag = info?.category ? CATEGORY_TAGS[info.category] : null;

              return (
                <div key={c.id} className="rounded-2xl border border-white/10 bg-slate-900/80 shadow-xl overflow-hidden transition-all duration-200 hover:border-white/20">
                  <div className="flex items-center gap-4 p-4">
                    {editingId === c.id ? (
                      <div className="flex flex-wrap items-center gap-2 w-full">
                        <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="max-w-xs rounded-xl border-white/10 bg-slate-950 text-white text-xs" />
                        <Input
                          type="url"
                          placeholder="https://…"
                          value={editPortal}
                          onChange={(e) => setEditPortal(e.target.value)}
                          className="max-w-xs rounded-xl border-white/10 bg-slate-950 text-white text-xs"
                        />
                        <Button size="sm" onClick={() => saveEdit(c.id)} className="rounded-xl gradient-lime text-slate-950 text-xs font-bold">
                          <Save size={14} strokeWidth={2} />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="rounded-xl border-white/10 text-xs">
                          <X size={14} strokeWidth={2} />
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => toggleExpand(c.id)}
                          className="flex flex-1 items-center gap-3.5 text-left min-w-0"
                          aria-expanded={expanded}
                        >
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-lime-400 to-emerald-600 text-slate-950 font-extrabold text-sm shadow-md">
                            {c.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-sm text-white truncate">{c.name}</h3>
                              {info?.actively_hiring && (
                                <span className="flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/15 px-2 py-0.5 text-[10px] font-bold text-red-300">
                                  <Flame size={10} className="fill-red-400" />
                                  Hiring
                                </span>
                              )}
                              {catTag && (
                                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${catTag.bg} ${catTag.text} ${catTag.border}`}>
                                  {catTag.label}
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-medium text-slate-400 mt-0.5">
                              {c.job_count ?? 0} {c.job_count === 1 ? "job tracked" : "jobs tracked"} {info?.location ? `· ${info.location}` : ""}
                            </p>
                          </div>
                        </button>

                        <div className="flex shrink-0 items-center gap-2">
                          {href && (
                            <a
                              href={href}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-xl border border-cyan-500/30 bg-cyan-500/15 px-3 py-1.5 text-xs font-bold text-cyan-300 hover:bg-cyan-500/25 transition-all flex items-center gap-1.5"
                              title="Open official career portal"
                            >
                              <ExternalLink size={13} strokeWidth={2} />
                              Career Portal
                            </a>
                          )}
                          <Button size="sm" variant="ghost" onClick={() => startEdit(c)} className="rounded-xl text-slate-400 hover:text-white" aria-label={`Edit ${c.name}`}>
                            <Pencil size={14} strokeWidth={2} />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => remove(c)} className="rounded-xl text-red-400 hover:bg-red-500/10" aria-label={`Delete ${c.name}`}>
                            <Trash2 size={14} strokeWidth={2} />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>

                  {expanded && !editingId && (
                    <div className="border-t border-white/5 bg-white/[0.01] p-4">
                      {expandedJobs === null ? (
                        <p className="py-4 text-center text-xs font-medium text-slate-400">Loading open roles…</p>
                      ) : expandedJobs.length === 0 ? (
                        <p className="py-4 text-center text-xs font-medium text-slate-400">
                          No jobs tracked for {c.name} yet.
                        </p>
                      ) : (
                        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                          {expandedJobs.map((j) => (
                            <button
                              key={j.id}
                              onClick={() => setOpenJobId(j.id)}
                              className="rounded-xl border border-white/5 bg-slate-950/60 p-3 text-left transition-all hover:border-lime-500/30 hover:bg-slate-900"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="truncate font-bold text-xs text-white">{j.title}</span>
                                <Badge variant="outline" className="text-[10px] rounded-lg border-white/10 bg-slate-800 text-slate-200 shrink-0">
                                  {STATUS_LABELS[j.status]}
                                </Badge>
                              </div>
                              {j.location && (
                                <p className="mt-1 truncate text-[11px] font-medium text-slate-400">{j.location}</p>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {openJob && (
          <JobDrawer
            key={openJob.id}
            job={openJob}
            onClose={() => setOpenJobId(null)}
            onChange={(_updated) => {
              if (expandedId) {
                setJobsByCompany((m) => ({ ...m, [expandedId]: [] }));
                api.get<Job[]>("/jobs").then((all) =>
                  setJobsByCompany((m) => ({ ...m, [expandedId]: all.filter((j) => j.company_id === expandedId) }))
                );
              }
            }}
            onDelete={(id) => {
              if (expandedId) {
                setJobsByCompany((m) => ({ ...m, [expandedId]: (m[expandedId] ?? []).filter((j) => j.id !== id) }));
                setCompanies((cs) => cs.map((c) => (c.id === expandedId ? { ...c, job_count: (c.job_count ?? 0) - 1 } : c)));
              }
              setOpenJobId(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
