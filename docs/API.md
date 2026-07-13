# API Reference

All API routes are prefixed with `/api`. Authenticated routes require a valid `tracker_auth` cookie (set automatically on login/register).

Base URL: `https://tracker.lakshmanp230.workers.dev/api` (or your deployed URL).

---

## Authentication

### `POST /api/auth/register`

Create a new account. Gated by `ALLOW_REGISTRATION`.

**Request:**
```json
{ "email": "you@example.com", "password": "your-password" }
```

**Response** `200`:
```json
{ "id": "uuid", "email": "you@example.com" }
```

**Errors:** `403` if registration is disabled, `409` if email taken.

---

### `POST /api/auth/login`

**Request:**
```json
{ "email": "you@example.com", "password": "your-password" }
```

**Response** `200`:
```json
{ "id": "uuid", "email": "you@example.com" }
```

**Errors:** `401` on bad credentials.

---

### `POST /api/auth/logout`

Clears the auth cookie. No body required.

**Response** `200`: `{ "ok": true }`

---

### `GET /api/auth/me`

Returns the current user from the session cookie.

**Response** `200`:
```json
{ "id": "uuid", "email": "you@example.com" }
```

**Errors:** `401` if not authenticated.

---

### `POST /api/auth/change-password`

**Request:**
```json
{ "currentPassword": "...", "newPassword": "..." }
```

**Response** `200`: `{ "ok": true }`

**Errors:** `401` if current password is wrong.

---

### `DELETE /api/auth/account`

Deletes the user and all associated data (jobs, contacts, activities, reminders via cascade).

**Response** `200`: `{ "ok": true }`

---

## Jobs

All job endpoints require authentication.

### `GET /api/jobs`

List all jobs for the logged-in user.

**Query params:** `?archived=1` to include archived jobs (excluded by default).

**Response** `200`:
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "company": "Acme Corp",
    "title": "Software Engineer",
    "url": "https://...",
    "location": "Remote",
    "salary_min": 80000,
    "salary_max": 120000,
    "salary_currency": "USD",
    "salary_period": "year",
    "description": "...",
    "notes": "...",
    "status": "applied",
    "sort_order": 0,
    "applied_at": "2026-07-01T00:00:00.000Z",
    "archived": 0,
    "created_at": "...",
    "updated_at": "..."
  }
]
```

---

### `POST /api/jobs`

Create a new job.

**Request:**
```json
{
  "company": "Acme Corp",
  "title": "Software Engineer",
  "status": "wishlist",
  "url": "https://...",
  "location": "Remote",
  "salary_min": 80000,
  "salary_max": 120000,
  "salary_currency": "USD",
  "salary_period": "year",
  "description": "...",
  "notes": "..."
}
```

Only `company`, `title`, and `status` are required.

**Response** `201`: The created job object.

---

### `GET /api/jobs/:id`

Get a single job.

**Response** `200`: The job object.

**Errors:** `404` if not found or not owned by the user.

---

### `PATCH /api/jobs/:id`

Update job fields. Only send the fields you want to change.

**Request:** Partial job object.

**Response** `200`: The updated job object.

**Note:** Setting `status` to `"applied"` auto-stamps `applied_at` if it was null. Status changes are auto-logged to the activity timeline.

---

### `DELETE /api/jobs/:id`

Delete a job and its child resources (contacts, activities, reminders).

**Response** `200`: `{ "ok": true }`

---

### `PATCH /api/jobs/:id/move`

Move a job to a new position (drag-and-drop).

**Request:**
```json
{ "status": "interview", "index": 2 }
```

`index` is the 0-based position in the destination column.

**Response** `200`: Array of all jobs in the destination column with renumbered `sort_order` values.

---

## Child resources

Contacts, activities, and reminders share identical routing patterns under a job.

### `GET /api/jobs/:jobId/contacts`
### `POST /api/jobs/:jobId/contacts`
### `PATCH /api/contacts/:id`
### `DELETE /api/contacts/:id`

Same pattern for `activities` and `reminders`.

**Contact schema:** `{ name, role?, email?, phone?, linkedin?, notes? }`

**Activity schema:** `{ type, title, notes?, happened_at? }` — valid types: `applied`, `phone_screen`, `interview`, `onsite`, `offer`, `rejected`, `note`, `follow_up`, `status_change`

**Reminder schema:** `{ note, due_at }`

### `PATCH /api/reminders/:id/complete`

Mark a reminder as completed (sets `completed_at`).

### `GET /api/reminders/upcoming`

Returns reminders due within 7 days, joined with job company and title.

---

## Stats

### `GET /api/stats`

Returns computed analytics for the authenticated user.

**Response** `200`:
```json
{
  "funnel": { "wishlist": 5, "applied": 3, "interview": 2, "offer": 1, "rejected": 2 },
  "totalActive": 13,
  "responseRate": 0.4,
  "offers": 1,
  "avgDaysToInterview": 14.5,
  "weekly": [
    { "weekStart": "2026-04-20", "count": 3 }
  ]
}
```
