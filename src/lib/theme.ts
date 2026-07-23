import type { ActivityType, JobStatus } from "../../shared/types";

// Source of truth for the pipeline stage palette. The CSS tokens in
// src/index.css (--color-brut-*) mirror these exact hexes — keep them in
// sync. Okabe-Ito colorblind-safe; `applied` uses Okabe-Ito sky-blue #56B4E9
// rather than blue #0072B2 because the darker blue fails WCAG 4.5:1 with black
// text on it AND as text on the dark background. Every status uses one text
// rule: black on the color (badges/fields), the color as text on the dark bg
// (the Dashboard funnel labels). Verified ≥4.5:1 in both directions.
export const STATUS_HEX: Record<JobStatus, string> = {
  wishlist: "#E69F00",
  applied: "#56B4E9",
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
  wishlist: "text-primary-foreground",
  applied: "text-primary-foreground",
  interview: "text-primary-foreground",
  offer: "text-primary-foreground",
  rejected: "text-primary-foreground",
};

// Activity-timeline badge colors. Where an activity type names an actual
// pipeline stage (applied/interview/offer/rejected), it reuses that exact
// status color — same real-world event, same color, not a new one. Interview
// process sub-steps (phone_screen, onsite) group under `interview` for the
// same reason. Freeform user entries (note, follow_up) and system-logged
// entries (status_change) aren't tied to any stage, so they get their own
// two mid-tone colors instead of borrowing a status color that would imply
// stage meaning they don't have.
export const ACTIVITY_BG: Record<ActivityType, string> = {
  applied: "bg-brut-applied",
  phone_screen: "bg-brut-interview",
  interview: "bg-brut-interview",
  onsite: "bg-brut-interview",
  offer: "bg-brut-offer",
  rejected: "bg-brut-rejected",
  note: "bg-brut-note",
  follow_up: "bg-brut-note",
  status_change: "bg-brut-system",
};

// brut-note/brut-system are mid-tone, not bright like the status colors, so
// they pair with the standard white `foreground` text instead of black
// `primary-foreground` — verified ≥4.5:1 for both, unlike the bright tier.
export const ACTIVITY_TEXT: Record<ActivityType, string> = {
  applied: "text-primary-foreground",
  phone_screen: "text-primary-foreground",
  interview: "text-primary-foreground",
  onsite: "text-primary-foreground",
  offer: "text-primary-foreground",
  rejected: "text-primary-foreground",
  note: "text-foreground",
  follow_up: "text-foreground",
  status_change: "text-foreground",
};

export const INK_HEX = "#ffffff";
export const PRIMARY_HEX = "#ffd23f";
