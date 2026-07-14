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

// All five --color-brut-* backgrounds are bright/saturated enough that black
// text clears WCAG AA (4.5:1) against every one of them; white does not clear
// it against any of them. Verified by computing relative luminance per color.
export const STATUS_TEXT: Record<JobStatus, string> = {
  wishlist: "text-black",
  applied: "text-black",
  interview: "text-black",
  offer: "text-black",
  rejected: "text-black",
};

export const INK_HEX = "#ffffff";
