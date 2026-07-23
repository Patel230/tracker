import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Building2, ExternalLink, Pencil, Plus, Save, Trash2, X, RotateCcw, Search, Sparkles, Rocket, Globe } from "lucide-react";
import { api, ApiError } from "../lib/api";
import { useFetch } from "../lib/useFetch";
import { STATUS_LABELS, safeExternalUrl, type Company, type Job } from "../../shared/types";
import { STATUS_BG, STATUS_TEXT } from "../lib/theme";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import JobDrawer from "../components/JobDrawer";

function portalHref(url: string | null): string | null {
  return safeExternalUrl(url);
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

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPortal, setEditPortal] = useState("");

  const [jobsByCompany, setJobsByCompany] = useState<Record<string, Job[]>>({});
  const [openJobId, setOpenJobId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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

  const seedTopCompanies = async (category: "all" | "company" | "startup" | "remote") => {
    if (seeding) return;
    setSeeding(true);
    setFormError(null);
    try {
      await api.post("/companies/seed", { category });
      await reload();
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

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const matchesSearch =
        !search.trim() ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        (c.portal_url && c.portal_url.toLowerCase().includes(search.toLowerCase()));
      return matchesSearch;
    });
  }, [companies, search]);

  const totalJobs = useMemo(() => companies.reduce((sum, c) => sum + (c.job_count ?? 0), 0), [companies]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-sm font-bold uppercase tracking-wider text-muted-foreground">
        Loading…
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-destructive">Couldn't load companies.</p>
        <Button variant="outline" size="sm" onClick={reload}>
          <RotateCcw size={14} strokeWidth={2.5} />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h1 className="text-lg font-black uppercase tracking-tight text-foreground">Companies & Startup Directory</h1>
          <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {companies.length} {companies.length === 1 ? "company" : "companies"} · {totalJobs} Backend & Tech jobs tracked
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={seeding}
            onClick={() => seedTopCompanies("company")}
            className="border-[3px] border-brut-ink bg-card text-xs font-bold"
          >
            <Sparkles size={13} className="text-amber-500" strokeWidth={2.5} />
            {seeding ? "Importing…" : "+ Top 100 Tech Companies"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={seeding}
            onClick={() => seedTopCompanies("startup")}
            className="border-[3px] border-brut-ink bg-card text-xs font-bold"
          >
            <Rocket size={13} className="text-indigo-500" strokeWidth={2.5} />
            {seeding ? "Importing…" : "+ Top 100 Startups"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={seeding}
            onClick={() => seedTopCompanies("remote")}
            className="border-[3px] border-brut-ink bg-card text-xs font-bold"
          >
            <Globe size={13} className="text-emerald-500" strokeWidth={2.5} />
            {seeding ? "Importing…" : "+ Top 100 Remote Companies"}
          </Button>
        </div>
      </div>

      <form onSubmit={add} className="mb-4 grid grid-cols-[1fr_1fr_auto] gap-2 border-[3px] border-brut-ink bg-card p-3">
        <Input
          required
          placeholder="Company name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="url"
          placeholder="Official career portal URL (https://…)"
          value={portalUrl}
          onChange={(e) => setPortalUrl(e.target.value)}
        />
        <Button type="submit" size="sm" disabled={busy} className="shrink-0">
          <Plus size={14} strokeWidth={2.5} />
          {busy ? "…" : "Add"}
        </Button>
        {formError && (
          <p className="col-span-3 border-[3px] border-destructive bg-destructive/5 px-2 py-1 text-xs font-bold text-destructive" role="alert">
            {formError}
          </p>
        )}
      </form>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search companies or career links…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {filteredCompanies.length === 0 ? (
        <div className="border-[3px] border-dashed border-brut-ink/40 p-10 text-center">
          <Building2 size={28} strokeWidth={1.5} className="mx-auto text-muted-foreground" />
          <p className="mt-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            No matching companies found.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <Button size="sm" onClick={() => seedTopCompanies("all")} disabled={seeding}>
              <Sparkles size={14} strokeWidth={2.5} />
              Import All 200 Top Companies & Startups
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredCompanies.map((c) => {
            const href = portalHref(c.portal_url);
            const expanded = expandedId === c.id;
            return (
              <div key={c.id} className="border-[3px] border-brut-ink bg-card">
                <div className="flex items-center gap-3 p-3">
                  {editingId === c.id ? (
                    <>
                      <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="max-w-[18rem]" />
                      <Input
                        type="url"
                        placeholder="https://…"
                        value={editPortal}
                        onChange={(e) => setEditPortal(e.target.value)}
                        className="max-w-[18rem]"
                      />
                      <Button size="sm" onClick={() => saveEdit(c.id)}>
                        <Save size={13} strokeWidth={2.5} />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                        <X size={13} strokeWidth={2.5} />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleExpand(c.id)}
                        className="flex flex-1 items-center gap-3 text-left min-w-0"
                        aria-expanded={expanded}
                      >
                        <span className="flex size-9 shrink-0 items-center justify-center border-[3px] border-brut-ink bg-primary">
                          <Building2 size={16} strokeWidth={2.5} className="text-primary-foreground" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-black text-foreground truncate">{c.name}</span>
                          <span className="block text-xs font-bold text-muted-foreground">
                            {c.job_count ?? 0} {c.job_count === 1 ? "job" : "jobs"}
                          </span>
                        </span>
                        {href && (
                          <span className="ml-auto flex shrink-0 items-center gap-1 border-[3px] border-brut-ink bg-brut-applied px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                            <ExternalLink size={12} strokeWidth={2.5} />
                            Career Page
                          </span>
                        )}
                      </button>
                      <div className="flex shrink-0 items-center gap-1.5">
                        {href && (
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="border-[3px] border-brut-ink bg-card px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-brut-paper transition-colors flex items-center gap-1"
                            title="Open official career portal"
                          >
                            <ExternalLink size={12} strokeWidth={2.5} />
                            Open
                          </a>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => startEdit(c)} aria-label={`Edit ${c.name}`}>
                          <Pencil size={13} strokeWidth={2.5} />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => remove(c)} aria-label={`Delete ${c.name}`}>
                          <Trash2 size={13} strokeWidth={2.5} className="text-destructive" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                {expanded && !editingId && (
                  <div className="border-t-[3px] border-brut-ink bg-background/30 p-3">
                    {expandedJobs === null ? (
                      <p className="py-4 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">Loading…</p>
                    ) : expandedJobs.length === 0 ? (
                      <p className="py-4 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        No jobs at {c.name} yet.
                      </p>
                    ) : (
                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {expandedJobs.map((j) => (
                          <button
                            key={j.id}
                            onClick={() => setOpenJobId(j.id)}
                            className="border-[3px] border-brut-ink bg-card p-3 text-left transition-colors hover:bg-brut-paper"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="truncate font-black text-foreground">{j.title}</span>
                              <Badge variant="outline" className={`${STATUS_BG[j.status]} ${STATUS_TEXT[j.status]} border-brut-ink shrink-0`}>
                                {STATUS_LABELS[j.status]}
                              </Badge>
                            </div>
                            {j.location && (
                              <p className="mt-1 truncate text-xs font-medium text-muted-foreground">{j.location}</p>
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
  );
}
