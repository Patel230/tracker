import { beforeAll, afterAll, describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { getPlatformProxy } from "wrangler";
import app from "./index";
import type { Job, Activity, Stats } from "../shared/types";

// Real (miniflare) D1 via wrangler's platform proxy, isolated from dev state.
let env: Env;
let dispose: () => Promise<void>;

beforeAll(async () => {
  const proxy = await getPlatformProxy<Env>({ persist: false });
  env = { ...proxy.env, JWT_SECRET: "test-secret", ALLOW_REGISTRATION: "true" };
  dispose = proxy.dispose;

  const statements = (
    readFileSync(new URL("../migrations/0001_init.sql", import.meta.url), "utf8") +
    "\n" +
    readFileSync(new URL("../migrations/0002_salary_currency_period.sql", import.meta.url), "utf8")
  )
    .split(";")
    .map((s) => s.replace(/--.*$/gm, "").trim())
    .filter(Boolean);
  for (const stmt of statements) await env.DB.prepare(stmt).run();
});

afterAll(async () => {
  await dispose();
});

function client(): { fetch: (path: string, init?: RequestInit) => Promise<Response> } {
  let cookie = "";
  return {
    fetch: async (path, init = {}) => {
      const res = await app.request(
        path,
        { ...init, headers: { "Content-Type": "application/json", Cookie: cookie, ...init.headers } },
        env
      );
      const setCookie = res.headers.get("set-cookie");
      if (setCookie) cookie = setCookie.split(";")[0];
      return res;
    },
  };
}

const json = (body: unknown): RequestInit => ({ method: "POST", body: JSON.stringify(body) });

describe("auth", () => {
  it("registers, reads /me, logs out", async () => {
    const c = client();
    const reg = await c.fetch("/api/auth/register", json({ email: "a@test.dev", password: "password1" }));
    expect(reg.status).toBe(201);

    const me = await c.fetch("/api/auth/me");
    expect(me.status).toBe(200);
    expect(((await me.json()) as { email: string }).email).toBe("a@test.dev");

    await c.fetch("/api/auth/logout", { method: "POST" });
    expect((await c.fetch("/api/auth/me")).status).toBe(401);
  });

  it("rejects registration when closed", async () => {
    const closed = { ...env, ALLOW_REGISTRATION: "false" };
    const res = await app.request(
      "/api/auth/register",
      { ...json({ email: "b@test.dev", password: "password1" }), headers: { "Content-Type": "application/json" } },
      closed
    );
    expect(res.status).toBe(403);
  });

  it("rejects bad credentials and unauthenticated API access", async () => {
    const c = client();
    const bad = await c.fetch("/api/auth/login", json({ email: "a@test.dev", password: "wrongpass1" }));
    expect(bad.status).toBe(401);
    expect((await client().fetch("/api/jobs")).status).toBe(401);
  });

  it("deletes the account and all data, then blocks further access", async () => {
    const c = client();
    await c.fetch("/api/auth/register", json({ email: "del@test.dev", password: "password1" }));
    const job = (await (await c.fetch("/api/jobs", json({ company: "Temp", title: "Role" }))).json()) as Job;

    const del = await c.fetch("/api/auth/account", { method: "DELETE" });
    expect(del.status).toBe(200);

    // Session wiped → /me is unauthorized.
    expect((await c.fetch("/api/auth/me")).status).toBe(401);
    // The job is gone with the user.
    expect((await c.fetch(`/api/jobs/${job.id}`)).status).toBe(401);

    // Re-registering the same email is allowed again (it was fully deleted).
    expect(
      (await client().fetch("/api/auth/register", json({ email: "del@test.dev", password: "password1" }))).status
    ).toBe(201);
  });

  it("changes password: rejects wrong current password, applies correct change, old password stops working", async () => {
    const c = client();
    await c.fetch("/api/auth/register", json({ email: "pw@test.dev", password: "originalpw1" }));

    const wrong = await c.fetch(
      "/api/auth/change-password",
      json({ currentPassword: "notright1", newPassword: "brandnew12" })
    );
    expect(wrong.status).toBe(401);

    const ok = await c.fetch(
      "/api/auth/change-password",
      json({ currentPassword: "originalpw1", newPassword: "brandnew12" })
    );
    expect(ok.status).toBe(200);

    const oldLogin = await client().fetch("/api/auth/login", json({ email: "pw@test.dev", password: "originalpw1" }));
    expect(oldLogin.status).toBe(401);

    const newLogin = await client().fetch("/api/auth/login", json({ email: "pw@test.dev", password: "brandnew12" }));
    expect(newLogin.status).toBe(200);
  });

  it("requires auth for change-password and validates the new password length", async () => {
    expect(
      (await client().fetch("/api/auth/change-password", json({ currentPassword: "x", newPassword: "brandnew12" })))
        .status
    ).toBe(401);

    const c = client();
    await c.fetch("/api/auth/register", json({ email: "pw2@test.dev", password: "originalpw1" }));
    expect(
      (await c.fetch("/api/auth/change-password", json({ currentPassword: "originalpw1", newPassword: "short" })))
        .status
    ).toBe(400);
  });
});

describe("jobs", () => {
  it("full lifecycle: create, move (logs activity, stamps applied_at), stats, delete", async () => {
    const c = client();
    await c.fetch("/api/auth/register", json({ email: "jobs@test.dev", password: "password1" }));

    const created = await c.fetch("/api/jobs", json({ company: "Acme", title: "Engineer" }));
    expect(created.status).toBe(201);
    const job = (await created.json()) as Job;
    expect(job.status).toBe("wishlist");
    expect(job.applied_at).toBeNull();

    const moved = await c.fetch(`/api/jobs/${job.id}/move`, {
      method: "PATCH",
      body: JSON.stringify({ status: "applied", index: 0 }),
    });
    expect(moved.status).toBe(200);
    const movedRows = (await moved.json()) as Job[];
    const movedJob = movedRows.find((j) => j.id === job.id);
    expect(movedJob).toBeDefined();
    expect(movedJob!.status).toBe("applied");
    expect(movedJob!.applied_at).not.toBeNull();
    // /move returns the whole renumbered column, rebuilt on integers.
    expect(movedRows.every((j) => Number.isInteger(j.sort_order))).toBe(true);

    const acts = (await (await c.fetch(`/api/jobs/${job.id}/activities`)).json()) as Activity[];
    expect(acts).toHaveLength(1);
    expect(acts[0].type).toBe("status_change");
    expect(acts[0].title).toBe("Moved to Applied");

    const stats = (await (await c.fetch("/api/stats")).json()) as Stats;
    expect(stats.funnel.applied).toBe(1);
    expect(stats.totalActive).toBe(1);

    const del = await c.fetch(`/api/jobs/${job.id}`, { method: "DELETE" });
    expect(del.status).toBe(200);
    expect((await c.fetch(`/api/jobs/${job.id}`)).status).toBe(404);
  });

  it("validates input", async () => {
    const c = client();
    await c.fetch("/api/auth/register", json({ email: "val@test.dev", password: "password1" }));
    expect((await c.fetch("/api/jobs", json({ company: "" }))).status).toBe(400);
    expect((await c.fetch("/api/jobs", json({ company: "X", title: "Y", status: "nope" }))).status).toBe(400);
  });

  it("isolates users from each other", async () => {
    const alice = client();
    await alice.fetch("/api/auth/register", json({ email: "alice@test.dev", password: "password1" }));
    const job = (await (await alice.fetch("/api/jobs", json({ company: "Secret", title: "Role" }))).json()) as Job;

    const mallory = client();
    await mallory.fetch("/api/auth/register", json({ email: "mallory@test.dev", password: "password1" }));
    expect((await mallory.fetch(`/api/jobs/${job.id}`)).status).toBe(404);
    expect(
      (await mallory.fetch(`/api/jobs/${job.id}`, { method: "PATCH", body: JSON.stringify({ company: "Hacked" }) }))
        .status
    ).toBe(404);
    expect((await mallory.fetch(`/api/jobs/${job.id}`, { method: "DELETE" })).status).toBe(404);

    const list = (await (await mallory.fetch("/api/jobs")).json()) as Job[];
    expect(list.find((j) => j.id === job.id)).toBeUndefined();
  });
});

describe("child resources", () => {
  it("contacts and reminders round-trip with ownership checks", async () => {
    const c = client();
    await c.fetch("/api/auth/register", json({ email: "child@test.dev", password: "password1" }));
    const job = (await (await c.fetch("/api/jobs", json({ company: "Beta", title: "Dev" }))).json()) as Job;

    const contact = await c.fetch(`/api/jobs/${job.id}/contacts`, json({ name: "Recruiter Rae", email: "rae@beta.co" }));
    expect(contact.status).toBe(201);
    const contactId = ((await contact.json()) as { id: string }).id;

    const patched = await c.fetch(`/api/contacts/${contactId}`, {
      method: "PATCH",
      body: JSON.stringify({ role: "Recruiter" }),
    });
    expect(patched.status).toBe(200);

    const due = new Date(Date.now() + 3 * 86400000).toISOString();
    const rem = await c.fetch(`/api/jobs/${job.id}/reminders`, json({ note: "Follow up", due_at: due }));
    expect(rem.status).toBe(201);
    const remId = ((await rem.json()) as { id: string }).id;

    const upcoming = (await (await c.fetch("/api/reminders/upcoming")).json()) as { id: string }[];
    expect(upcoming.some((r) => r.id === remId)).toBe(true);

    expect((await c.fetch(`/api/reminders/${remId}/complete`, { method: "PATCH" })).status).toBe(200);
    // completing twice is a 404 (already completed)
    expect((await c.fetch(`/api/reminders/${remId}/complete`, { method: "PATCH" })).status).toBe(404);

    const after = (await (await c.fetch("/api/reminders/upcoming")).json()) as { id: string }[];
    expect(after.some((r) => r.id === remId)).toBe(false);

    // another user can't delete the contact
    const other = client();
    await other.fetch("/api/auth/register", json({ email: "other@test.dev", password: "password1" }));
    expect((await other.fetch(`/api/contacts/${contactId}`, { method: "DELETE" })).status).toBe(404);

    // a malformed email is rejected rather than stored
    const bad = await c.fetch(`/api/jobs/${job.id}/contacts`, json({ name: "Bad", email: "not-an-email" }));
    expect(bad.status).toBe(400);
  });
});
