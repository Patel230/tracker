import { useState, type FormEvent, useRef } from "react";
import { Plus, X } from "lucide-react";
import { api, ApiError } from "../lib/api";
import { useFocusTrap } from "../lib/useFocusTrap";
import { CURRENCIES, JOB_STATUSES, PERIODS, STATUS_LABELS, type Job, type JobStatus, type Currency, type Period } from "../../shared/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
  onClose: () => void;
  onCreated?: (job: Job) => void;
  initialStatus?: JobStatus;
}

export default function CreateJobModal({ onClose, onCreated, initialStatus = "wishlist" }: Props) {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [location, setLocation] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [salaryCurrency, setSalaryCurrency] = useState<Currency>("USD");
  const [salaryPeriod, setSalaryPeriod] = useState<Period>("year");
  const [status, setStatus] = useState<JobStatus>(initialStatus);
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, true, onClose);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !title.trim() || busy) return;
    setBusy(true);
    setError(null);

    try {
      const created = await api.post<Job>("/jobs", {
        company: company.trim(),
        title: title.trim(),
        url: url.trim() || null,
        location: location.trim() || null,
        salary_min: salaryMin ? Number(salaryMin) : null,
        salary_max: salaryMax ? Number(salaryMax) : null,
        salary_currency: salaryCurrency,
        salary_period: salaryPeriod,
        status,
        description: description.trim() || null,
        notes: notes.trim() || null,
      });

      onCreated?.(created);
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't create job.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Add new job application"
        className="w-full max-w-xl rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl text-white"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-md">
              +
            </span>
            <h2 className="text-base font-bold text-white">Add New Application</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close modal" className="rounded-xl text-slate-400 hover:text-white">
            <X size={16} strokeWidth={2} />
          </Button>
        </div>

        <form onSubmit={submit} className="mt-5 space-y-4">
          {error && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs font-semibold text-rose-400">
              {error}
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs font-semibold text-slate-300">
              Company *
              <Input
                required
                placeholder="Google, Stripe, etc."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-1.5 rounded-xl border-white/10 bg-slate-950 text-white placeholder:text-slate-500 text-xs"
              />
            </label>

            <label className="block text-xs font-semibold text-slate-300">
              Job Title *
              <Input
                required
                placeholder="Backend Engineer, etc."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1.5 rounded-xl border-white/10 bg-slate-950 text-white placeholder:text-slate-500 text-xs"
              />
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs font-semibold text-slate-300">
              Status
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as JobStatus)}
                className="mt-1.5 flex w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
              >
                {JOB_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-xs font-semibold text-slate-300">
              Location
              <Input
                placeholder="San Francisco, CA / Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1.5 rounded-xl border-white/10 bg-slate-950 text-white placeholder:text-slate-500 text-xs"
              />
            </label>
          </div>

          <label className="block text-xs font-semibold text-slate-300">
            Job Posting / Portal URL
            <Input
              type="url"
              placeholder="https://careers.google.com/jobs/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1.5 rounded-xl border-white/10 bg-slate-950 text-white placeholder:text-slate-500 text-xs"
            />
          </label>

          <div className="grid grid-cols-4 gap-2">
            <label className="block text-xs font-semibold text-slate-300">
              Min Salary
              <Input
                type="number"
                placeholder="120000"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                className="mt-1.5 rounded-xl border-white/10 bg-slate-950 text-white text-xs"
              />
            </label>
            <label className="block text-xs font-semibold text-slate-300">
              Max Salary
              <Input
                type="number"
                placeholder="160000"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                className="mt-1.5 rounded-xl border-white/10 bg-slate-950 text-white text-xs"
              />
            </label>
            <label className="block text-xs font-semibold text-slate-300">
              Currency
              <select
                value={salaryCurrency}
                onChange={(e) => setSalaryCurrency(e.target.value as Currency)}
                className="mt-1.5 flex w-full rounded-xl border border-white/10 bg-slate-950 px-2 py-2 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-semibold text-slate-300">
              Period
              <select
                value={salaryPeriod}
                onChange={(e) => setSalaryPeriod(e.target.value as Period)}
                className="mt-1.5 flex w-full rounded-xl border border-white/10 bg-slate-950 px-2 py-2 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
              >
                {PERIODS.map((p) => (
                  <option key={p} value={p}>/{p}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs font-semibold text-slate-300">
              Job Description
              <textarea
                rows={3}
                placeholder="Key requirements, tech stack..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </label>
            <label className="block text-xs font-semibold text-slate-300">
              Personal Notes
              <textarea
                rows={3}
                placeholder="Referral name, interview prep notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl border-white/10 text-xs">
              Cancel
            </Button>
            <Button type="submit" disabled={busy} className="rounded-xl gradient-primary text-white font-bold text-xs px-5 shadow-lg shadow-indigo-500/25">
              <Plus size={14} strokeWidth={2.5} />
              {busy ? "Saving…" : "Create Job"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
