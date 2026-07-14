import type { JobStatus } from "../../shared/types";

// CVD-validated (Okabe-Ito derived) — see palette check in project history.
// Order matches JOB_STATUSES; adjacent pairs pass deutan/tritan separation.
export const STATUS_HEX: Record<JobStatus, string> = {
  wishlist: "#E69F00",
  applied: "#0072B2",
  interview: "#009E73",
  offer: "#CC79A7",
  rejected: "#D55E00",
};

export const STATUS_BG: Record<JobStatus, string> = {
  wishlist: "bg-brut-wishlist",
  applied: "bg-brut-applied",
  interview: "bg-brut-interview",
  offer: "bg-brut-offer",
  rejected: "bg-brut-rejected",
};

export const STATUS_TEXT: Record<JobStatus, string> = {
  wishlist: "text-white",
  applied: "text-white",
  interview: "text-white",
  offer: "text-white",
  rejected: "text-white",
};

export const INK_HEX = "#1a1a1a";
