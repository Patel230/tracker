export const JOB_STATUSES = ["wishlist", "applied", "interview", "offer", "rejected"] as const;
export type JobStatus = (typeof JOB_STATUSES)[number];

export const STATUS_LABELS: Record<JobStatus, string> = {
  wishlist: "Wishlist",
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};

export const ACTIVITY_TYPES = [
  "applied",
  "phone_screen",
  "interview",
  "onsite",
  "offer",
  "rejected",
  "note",
  "follow_up",
  "status_change",
] as const;
export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export const ACTIVITY_LABELS: Record<ActivityType, string> = {
  applied: "Applied",
  phone_screen: "Phone screen",
  interview: "Interview",
  onsite: "Onsite",
  offer: "Offer",
  rejected: "Rejected",
  note: "Note",
  follow_up: "Follow-up",
  status_change: "Status change",
};

// 42 ISO 4217 codes covers the vast majority of currencies a student job
// search spans; extend this list as needed. Free-form text was rejected so the
// dashboard can aggregate salary without guessing units.
export const CURRENCIES = [
  "AUD", "BRL", "CAD", "CHF", "CNY", "DKK", "EUR", "GBP", "HKD", "ILS", "INR", "JPY",
  "KRW", "MXN", "NOK", "NZD", "PLN", "RON", "SEK", "SGD", "THB", "TRY", "TWD", "USD", "ZAR",
] as const;
export type Currency = (typeof CURRENCIES)[number];

export const PERIODS = ["hour", "day", "week", "month", "year"] as const;
export type Period = (typeof PERIODS)[number];

export const PERIOD_LABELS: Record<Period, string> = {
  hour: "/hr",
  day: "/day",
  week: "/wk",
  month: "/mo",
  year: "/yr",
};

export interface Job {
  id: string;
  user_id: string;
  company: string;
  title: string;
  url: string | null;
  location: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: Currency | null;
  salary_period: Period | null;
  description: string | null;
  notes: string | null;
  status: JobStatus;
  sort_order: number;
  applied_at: string | null;
  archived: number;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  job_id: string;
  name: string;
  role: string | null;
  email: string | null;
  phone: string | null;
  linkedin: string | null;
  notes: string | null;
  created_at: string;
}

export interface Activity {
  id: string;
  job_id: string;
  type: ActivityType;
  title: string;
  notes: string | null;
  happened_at: string;
  created_at: string;
}

export interface Reminder {
  id: string;
  job_id: string;
  due_at: string;
  note: string;
  completed_at: string | null;
  created_at: string;
  // joined for the upcoming list
  company?: string;
  job_title?: string;
}

export interface Stats {
  funnel: Record<JobStatus, number>;
  totalActive: number;
  responseRate: number | null;
  offers: number;
  avgDaysToInterview: number | null;
  weekly: { weekStart: string; count: number }[];
}
