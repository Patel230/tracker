import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  Archive,
  ArchiveRestore,
  Bell,
  CheckCircle2,
  ExternalLink,
  FileText,
  History,
  Plus,
  Save,
  Trash2,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { api } from "../lib/api";
import { useFocusTrap } from "../lib/useFocusTrap";
import {
  ACTIVITY_LABELS,
  ACTIVITY_TYPES,
  CURRENCIES,
  JOB_STATUSES,
  PERIODS,
  STATUS_LABELS,
  type Activity,
  type Contact,
  type Job,
  type Reminder,
} from "../../shared/types";

type Tab = "details" | "timeline" | "contacts" | "reminders";

const TAB_ICONS: Record<Tab, LucideIcon> = {
  details: FileText,
  timeline: History,
  contacts: Users,
  reminders: Bell,
};

interface Props {
  job: Job;
  onClose: () => void;
  onChange: (job: Job) => void;
  onDelete: (id: string) => void;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-xs font-bold uppercase tracking-wide text-brut-ink/60">
      {label}
      <div className="mt-1">{children}</div>
    </label>
  );
}

export default function JobDrawer({ job, onClose, onChange, onDelete }: Props) {
  const [tab, setTab] = useState<Tab>("details");
  const asideRef = useRef<HTMLDivElement>(null);
  useFocusTrap(asideRef, true, onClose);

  const patch = async (fields: Partial<Job>) => {
    onChange(await api.patch<Job>(`/jobs/${job.id}`, fields));
  };

  const remove = async () => {
    if (!confirm(`Delete ${job.company} — ${job.title}? This also removes its contacts, timeline and reminders.`)) return;
    await api.delete(`/jobs/${job.id}`);
    onDelete(job.id);
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-brut-ink/40" onClick={onClose} />
      <aside ref={asideRef} tabIndex={-1} className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l-4 border-brut-ink bg-brut-surface focus:outline-none">
        <header className="border-b-2 border-brut-ink px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-brut-ink">{job.company}</h2>
              <p className="text-sm font-medium text-brut-ink/70">{job.title}</p>
            </div>
            <button
              onClick={onClose}
              className="border-2 border-brut-ink px-2 py-1 text-brut-ink hover:bg-brut-paper"
              aria-label="Close"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <select
              value={job.status}
              onChange={(e) => patch({ status: e.target.value as Job["status"] })}
              className="input-brut w-auto py-1.5 text-xs font-bold uppercase tracking-wide"
            >
              {JOB_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
            {job.url && (
              <a
                href={job.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-brut-applied underline decoration-2 underline-offset-2"
              >
                Job post
                <ExternalLink size={12} strokeWidth={2.5} />
              </a>
            )}
            <div className="ml-auto flex gap-2">
              <button onClick={() => patch({ archived: job.archived ? 0 : 1 } as Partial<Job>)} className="btn-brut-sm">
                {job.archived ? <ArchiveRestore size={13} strokeWidth={2.5} /> : <Archive size={13} strokeWidth={2.5} />}
                {job.archived ? "Unarchive" : "Archive"}
              </button>
              <button onClick={remove} className="btn-brut-danger">
                <Trash2 size={13} strokeWidth={2.5} />
                Delete
              </button>
            </div>
          </div>
          <nav className="mt-4 flex gap-1.5">
            {(["details", "timeline", "contacts", "reminders"] as Tab[]).map((t) => {
              const Icon = TAB_ICONS[t];
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex items-center gap-1.5 border-2 border-brut-ink px-3 py-1 text-xs font-bold uppercase tracking-wide capitalize transition-colors ${
                    tab === t ? "bg-brut-yellow text-brut-ink" : "bg-brut-surface text-brut-ink/70 hover:bg-brut-paper"
                  }`}
                >
                  <Icon size={13} strokeWidth={2.5} />
                  {t}
                </button>
              );
            })}
          </nav>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          {tab === "details" && <DetailsTab job={job} onSave={patch} />}
          {tab === "timeline" && <TimelineTab jobId={job.id} />}
          {tab === "contacts" && <ContactsTab jobId={job.id} />}
          {tab === "reminders" && <RemindersTab jobId={job.id} />}
        </div>
      </aside>
    </>
  );
}

function DetailsTab({ job, onSave }: { job: Job; onSave: (f: Partial<Job>) => Promise<void> }) {
  const [form, setForm] = useState({
    company: job.company,
    title: job.title,
    url: job.url ?? "",
    location: job.location ?? "",
    salary_min: job.salary_min?.toString() ?? "",
    salary_max: job.salary_max?.toString() ?? "",
    salary_currency: job.salary_currency ?? "",
    salary_period: job.salary_period ?? "",
    description: job.description ?? "",
    notes: job.notes ?? "",
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => setSaved(false), [form]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await onSave({
        company: form.company.trim(),
        title: form.title.trim(),
        url: form.url.trim() || null,
        location: form.location.trim() || null,
        salary_min: form.salary_min ? Number(form.salary_min) : null,
        salary_max: form.salary_max ? Number(form.salary_max) : null,
        salary_currency: (form.salary_currency || null) as Job["salary_currency"],
        salary_period: (form.salary_period || null) as Job["salary_period"],
        description: form.description || null,
        notes: form.notes || null,
      });
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Company">
          <input required value={form.company} onChange={set("company")} className="input-brut" />
        </Field>
        <Field label="Job title">
          <input required value={form.title} onChange={set("title")} className="input-brut" />
        </Field>
        <Field label="Location">
          <input value={form.location} onChange={set("location")} className="input-brut" placeholder="Remote / Bengaluru…" />
        </Field>
        <Field label="Job post URL">
          <input type="url" value={form.url} onChange={set("url")} className="input-brut" placeholder="https://…" />
        </Field>
        <Field label="Salary min">
          <input type="number" min="0" value={form.salary_min} onChange={set("salary_min")} className="input-brut" />
        </Field>
        <Field label="Salary max">
          <input type="number" min="0" value={form.salary_max} onChange={set("salary_max")} className="input-brut" />
        </Field>
        <Field label="Currency">
          <select value={form.salary_currency} onChange={set("salary_currency")} className="input-brut">
            <option value="">—</option>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Per">
          <select value={form.salary_period} onChange={set("salary_period")} className="input-brut">
            <option value="">—</option>
            {PERIODS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Job description">
        <textarea rows={5} value={form.description} onChange={set("description")} className="input-brut" />
      </Field>
      <Field label="Notes">
        <textarea
          rows={4}
          value={form.notes}
          onChange={set("notes")}
          className="input-brut"
          placeholder="Interview prep, impressions, next steps…"
        />
      </Field>
      {error && (
        <p className="border-2 border-brut-rejected bg-brut-rejected/10 px-2 py-1 text-sm font-bold text-brut-rejected">
          {error}
        </p>
      )}
      <div className="flex items-center gap-3">
        <button type="submit" className="btn-brut">
          <Save size={14} strokeWidth={2.5} />
          Save
        </button>
        {saved && (
          <span className="badge-brut flex items-center gap-1 border-brut-interview bg-brut-interview/15 text-brut-interview">
            <CheckCircle2 size={11} strokeWidth={2.5} />
            Saved
          </span>
        )}
      </div>
    </form>
  );
}

function TimelineTab({ jobId }: { jobId: string }) {
  const [items, setItems] = useState<Activity[] | null>(null);
  const [type, setType] = useState<Activity["type"]>("note");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    api.get<Activity[]>(`/jobs/${jobId}/activities`).then(setItems);
  }, [jobId]);

  const add = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const item = await api.post<Activity>(`/jobs/${jobId}/activities`, {
      type,
      title: title.trim(),
      notes: notes.trim() || null,
    });
    setItems((xs) => [item, ...(xs ?? [])]);
    setTitle("");
    setNotes("");
  };

  const remove = async (id: string) => {
    await api.delete(`/activities/${id}`);
    setItems((xs) => (xs ?? []).filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-4">
      <form onSubmit={add} className="card-brut space-y-2 p-3">
        <div className="flex gap-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as Activity["type"])}
            className="input-brut w-auto"
          >
            {ACTIVITY_TYPES.filter((t) => t !== "status_change").map((t) => (
              <option key={t} value={t}>
                {ACTIVITY_LABELS[t]}
              </option>
            ))}
          </select>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What happened?" className="input-brut" />
        </div>
        <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Details (optional)" className="input-brut" />
        <button type="submit" className="btn-brut-sm">
          <Plus size={13} strokeWidth={2.5} />
          Add to timeline
        </button>
      </form>

      {items === null ? (
        <p className="text-sm font-bold uppercase tracking-wide text-brut-ink/40">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm font-bold uppercase tracking-wide text-brut-ink/40">No activity yet.</p>
      ) : (
        <ol className="space-y-3">
          {items.map((a) => (
            <li key={a.id} className="group relative border-l-4 border-brut-ink pl-4">
              <div className="flex items-baseline gap-2">
                <span className="badge-brut border-brut-ink bg-brut-ink text-white">{ACTIVITY_LABELS[a.type]}</span>
                <span className="text-xs font-bold text-brut-ink/40">{new Date(a.happened_at).toLocaleString()}</span>
                <button
                  onClick={() => remove(a.id)}
                  className="ml-auto hidden text-brut-ink/30 hover:text-brut-rejected group-hover:block"
                  aria-label="Delete"
                >
                  <Trash2 size={13} strokeWidth={2.5} />
                </button>
              </div>
              <div className="mt-1 text-sm font-bold text-brut-ink">{a.title}</div>
              {a.notes && <div className="mt-0.5 whitespace-pre-wrap text-sm font-medium text-brut-ink/60">{a.notes}</div>}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function ContactsTab({ jobId }: { jobId: string }) {
  const [items, setItems] = useState<Contact[] | null>(null);
  const [form, setForm] = useState({ name: "", role: "", email: "", linkedin: "" });

  useEffect(() => {
    api.get<Contact[]>(`/jobs/${jobId}/contacts`).then(setItems);
  }, [jobId]);

  const add = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const item = await api.post<Contact>(`/jobs/${jobId}/contacts`, {
      name: form.name.trim(),
      role: form.role.trim() || null,
      email: form.email.trim() || null,
      linkedin: form.linkedin.trim() || null,
    });
    setItems((xs) => [...(xs ?? []), item]);
    setForm({ name: "", role: "", email: "", linkedin: "" });
  };

  const remove = async (id: string) => {
    await api.delete(`/contacts/${id}`);
    setItems((xs) => (xs ?? []).filter((x) => x.id !== id));
  };

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="space-y-4">
      <form onSubmit={add} className="card-brut grid grid-cols-2 gap-2 p-3">
        <input placeholder="Name *" value={form.name} onChange={set("name")} className="input-brut" />
        <input placeholder="Role (recruiter, hiring manager…)" value={form.role} onChange={set("role")} className="input-brut" />
        <input placeholder="Email" type="email" value={form.email} onChange={set("email")} className="input-brut" />
        <input placeholder="LinkedIn URL" value={form.linkedin} onChange={set("linkedin")} className="input-brut" />
        <button type="submit" className="btn-brut-sm col-span-2 justify-self-start">
          <Plus size={13} strokeWidth={2.5} />
          Add contact
        </button>
      </form>

      {items === null ? (
        <p className="text-sm font-bold uppercase tracking-wide text-brut-ink/40">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm font-bold uppercase tracking-wide text-brut-ink/40">No contacts yet.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((ct) => (
            <li key={ct.id} className="card-brut group p-3">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-extrabold text-brut-ink">{ct.name}</span>
                {ct.role && <span className="badge-brut border-brut-ink/40 text-brut-ink/70">{ct.role}</span>}
                <button
                  onClick={() => remove(ct.id)}
                  className="ml-auto hidden text-brut-ink/30 hover:text-brut-rejected group-hover:block"
                  aria-label="Delete"
                >
                  <Trash2 size={13} strokeWidth={2.5} />
                </button>
              </div>
              <div className="mt-1 flex flex-wrap gap-3 text-xs font-bold">
                {ct.email && (
                  <a
                    href={`mailto:${ct.email}`}
                    className="text-brut-applied underline decoration-2 underline-offset-2"
                  >
                    {ct.email}
                  </a>
                )}
                {ct.linkedin && (
                  <a
                    href={ct.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-brut-applied underline decoration-2 underline-offset-2"
                  >
                    LinkedIn
                    <ExternalLink size={11} strokeWidth={2.5} />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function RemindersTab({ jobId }: { jobId: string }) {
  const [items, setItems] = useState<Reminder[] | null>(null);
  const [note, setNote] = useState("");
  const [dueAt, setDueAt] = useState("");

  useEffect(() => {
    api.get<Reminder[]>(`/jobs/${jobId}/reminders`).then(setItems);
  }, [jobId]);

  const add = async (e: FormEvent) => {
    e.preventDefault();
    if (!note.trim() || !dueAt) return;
    const item = await api.post<Reminder>(`/jobs/${jobId}/reminders`, {
      note: note.trim(),
      due_at: new Date(dueAt).toISOString(),
    });
    setItems((xs) => [...(xs ?? []), item].sort((a, b) => a.due_at.localeCompare(b.due_at)));
    setNote("");
    setDueAt("");
  };

  const complete = async (id: string) => {
    await api.patch(`/reminders/${id}/complete`);
    setItems((xs) =>
      (xs ?? []).map((x) => (x.id === id ? { ...x, completed_at: new Date().toISOString() } : x))
    );
  };

  const remove = async (id: string) => {
    await api.delete(`/reminders/${id}`);
    setItems((xs) => (xs ?? []).filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-4">
      <form onSubmit={add} className="card-brut space-y-2 p-3">
        <input placeholder="Follow up with recruiter…" value={note} onChange={(e) => setNote(e.target.value)} className="input-brut" />
        <div className="flex gap-2">
          <input type="datetime-local" value={dueAt} onChange={(e) => setDueAt(e.target.value)} className="input-brut" />
          <button type="submit" className="btn-brut-sm shrink-0">
            <Plus size={13} strokeWidth={2.5} />
            Add
          </button>
        </div>
      </form>

      {items === null ? (
        <p className="text-sm font-bold uppercase tracking-wide text-brut-ink/40">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm font-bold uppercase tracking-wide text-brut-ink/40">No reminders.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((r) => {
            const overdue = !r.completed_at && new Date(r.due_at) <= new Date();
            return (
              <li key={r.id} className="card-brut group flex items-center gap-3 p-3">
                <input
                  type="checkbox"
                  checked={!!r.completed_at}
                  disabled={!!r.completed_at}
                  onChange={() => complete(r.id)}
                  className="size-4 accent-brut-ink"
                />
                <div className={r.completed_at ? "text-sm font-medium text-brut-ink/40 line-through" : "text-sm font-bold text-brut-ink"}>
                  {r.note}
                  <div className={`text-xs font-bold ${overdue ? "text-brut-rejected" : "text-brut-ink/40"}`}>
                    {new Date(r.due_at).toLocaleString()}
                    {overdue && " · overdue"}
                  </div>
                </div>
                <button
                  onClick={() => remove(r.id)}
                  className="ml-auto hidden text-brut-ink/30 hover:text-brut-rejected group-hover:block"
                  aria-label="Delete"
                >
                  <Trash2 size={13} strokeWidth={2.5} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
