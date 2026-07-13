import { beforeAll, afterAll, describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import bcrypt from "bcryptjs";
import { getPlatformProxy } from "wrangler";
import app from "./index";
import type { Job, Activity, Stats } from "../shared/types";

// Real (miniflare) D1 via wrangler's platform proxy, isolated from dev state.
let env: Env;
let dispose: () => Promise<void>;

// Must clear the 32-char floor enforced by secretKey().
const TEST_SECRET = "test-secret-that-is-long-enough-to-pass";

beforeAll(async () => {
  const proxy = await getPlatformProxy<Env>({ persist: false });
  // getPlatformProxy DOES hand back a real AUTH_RATE_LIMITER because
  // wrangler.jsonc declares one, and the suite makes far more than 10 login
  // calls from a single (absent → "unknown") IP. Drop it by default so the
  // limiter can't throttle unrelated tests; the rate-limit test injects a stub.
  env = { ...proxy.env, AUTH_RATE_LIMITER: undefined, JWT_SECRET: TEST_SECRET, ALLOW_REGISTRATION: "true" };
  dispose = proxy.dispose;

  // Read the whole directory in order rather than naming files: a new migration
  // must not be able to land without the test schema picking it up.
  const dir = new URL("../migrations/", import.meta.url);
  const statements = readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort()
    .map((f) => readFileSync(new URL(f, dir), "utf8"))
    .join("\n")
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

  it("returns 409, not 500, when the same email registers twice or races itself", async () => {
    const register = () =>
      app.request(
        "/api/auth/register",
        { ...json({ email: "dupe@test.dev", password: "password1" }), headers: { "Content-Type": "application/json" } },
        env
      );

    // Sequential: the second is a plain duplicate.
    expect((await register()).status).toBe(201);
    expect((await register()).status).toBe(409);

    // Concurrent: both pass a check-then-insert, and the loser used to hit the
    // UNIQUE constraint and fall through to onError as a 500.
    const raced = await Promise.all([
      app.request(
        "/api/auth/register",
        { ...json({ email: "race@test.dev", password: "password1" }), headers: { "Content-Type": "application/json" } },
        env
      ),
      app.request(
        "/api/auth/register",
        { ...json({ email: "race@test.dev", password: "password1" }), headers: { "Content-Type": "application/json" } },
        env
      ),
    ]);
    const codes = raced.map((r) => r.status).sort();
    expect(codes).toEqual([201, 409]);
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

  it("refuses to issue a session when JWT_SECRET is missing or too short", async () => {
    // A zero-length key is one jose will sign and verify with, so a deploy that
    // forgot the secret would accept forged sessions. It must fail loudly.
    // Distinct emails: the row is inserted before createSession throws, so
    // reusing one address would make the second case a 409 rather than a 500.
    for (const [i, secret] of [undefined, "too-short"].entries()) {
      const res = await app.request(
        "/api/auth/register",
        {
          ...json({ email: `weak${i}@test.dev`, password: "password1" }),
          headers: { "Content-Type": "application/json" },
        },
        { ...env, JWT_SECRET: secret } as Env
      );
      expect(res.status).toBe(500);
    }
  });

  it("verifies a legacy bcrypt hash and upgrades it to pbkdf2 on login", async () => {
    // Simulates an account created before the PBKDF2 switch.
    const legacy = bcrypt.hashSync("legacypw1", 10);
    await env.DB.prepare("INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)")
      .bind(crypto.randomUUID(), "legacy@test.dev", legacy)
      .run();

    const c = client();
    expect((await c.fetch("/api/auth/login", json({ email: "legacy@test.dev", password: "legacypw1" }))).status).toBe(
      200
    );

    const stored = await env.DB.prepare("SELECT password_hash FROM users WHERE email = ?")
      .bind("legacy@test.dev")
      .first<{ password_hash: string }>();
    expect(stored!.password_hash.startsWith("pbkdf2$")).toBe(true);

    // The upgraded hash still authenticates the same password, and only that one.
    expect((await client().fetch("/api/auth/login", json({ email: "legacy@test.dev", password: "legacypw1" }))).status)
      .toBe(200);
    expect((await client().fetch("/api/auth/login", json({ email: "legacy@test.dev", password: "wrongpw123" }))).status)
      .toBe(401);
  });

  it("takes comparable time for an unknown email as for a wrong password", async () => {
    await client().fetch("/api/auth/register", json({ email: "timing@test.dev", password: "originalpw1" }));

    const median = async (email: string) => {
      const runs: number[] = [];
      for (let i = 0; i < 7; i++) {
        const t = performance.now();
        await client().fetch("/api/auth/login", json({ email, password: "wrongpassword" }));
        runs.push(performance.now() - t);
      }
      return runs.sort((a, b) => a - b)[3];
    };

    // Warm the lazily-built dummy hash so it isn't charged to the first sample.
    await client().fetch("/api/auth/login", json({ email: "nobody@test.dev", password: "wrongpassword" }));

    const known = await median("timing@test.dev");
    const unknown = await median("nobody@test.dev");

    // Before the fix an unknown email skipped hashing entirely and returned in
    // a fraction of the time. They should now be within the same ballpark;
    // the bound is loose because CI timing is noisy, but a regression would
    // show up as unknown being many times faster, not marginally so.
    expect(unknown).toBeGreaterThan(known * 0.5);
  });

  it("rate limits login attempts when the binding is present, and works without it", async () => {
    let calls = 0;
    const limited: Env = {
      ...env,
      AUTH_RATE_LIMITER: {
        limit: async ({ key }) => {
          expect(key).toBe("login:203.0.113.7"); // bucket + client IP
          return { success: ++calls <= 2 };
        },
      },
    };

    const attempt = (e: Env) =>
      app.request(
        "/api/auth/login",
        {
          ...json({ email: "nobody@test.dev", password: "wrongpassword" }),
          headers: { "Content-Type": "application/json", "CF-Connecting-IP": "203.0.113.7" },
        },
        e
      );

    expect((await attempt(limited)).status).toBe(401); // 1st: allowed, bad creds
    expect((await attempt(limited)).status).toBe(401); // 2nd: allowed, bad creds
    expect((await attempt(limited)).status).toBe(429); // 3rd: throttled

    // Absent binding (tests, local dev) must not break the endpoint.
    expect((await attempt(env)).status).toBe(401);
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

  it("revokes sessions issued before a password change, but not the one that made it", async () => {
    const changer = client();
    await changer.fetch("/api/auth/register", json({ email: "revoke@test.dev", password: "originalpw1" }));

    // A second device logged in with the same account, before the change.
    const other = client();
    await other.fetch("/api/auth/login", json({ email: "revoke@test.dev", password: "originalpw1" }));
    expect((await other.fetch("/api/auth/me")).status).toBe(200);

    await changer.fetch(
      "/api/auth/change-password",
      json({ currentPassword: "originalpw1", newPassword: "brandnew12" })
    );

    // The other device's cookie is still a validly-signed JWT, but its token
    // version is stale — it must no longer authenticate.
    expect((await other.fetch("/api/auth/me")).status).toBe(401);
    expect((await other.fetch("/api/jobs")).status).toBe(401);

    // The device that changed the password stays signed in.
    expect((await changer.fetch("/api/auth/me")).status).toBe(200);
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

  it("rejects non-http(s) URLs on job.url and contact.linkedin", async () => {
    const c = client();
    await c.fetch("/api/auth/register", json({ email: "urls@test.dev", password: "password1" }));

    // These all satisfy `new URL()`, which is the only thing zod's .url()
    // checks, and all become executable script in an <a href>.
    const dangerous = ["javascript:alert(document.cookie)", "data:text/html,<script>alert(1)</script>", "vbscript:msgbox"];

    for (const url of dangerous) {
      expect((await c.fetch("/api/jobs", json({ company: "X", title: "Y", url }))).status).toBe(400);
    }

    const job = (await (await c.fetch("/api/jobs", json({ company: "Ok", title: "Role" }))).json()) as Job;
    for (const linkedin of dangerous) {
      expect((await c.fetch(`/api/jobs/${job.id}/contacts`, json({ name: "N", linkedin }))).status).toBe(400);
    }

    // Genuine URLs still go through, and PATCH is guarded too.
    expect((await c.fetch("/api/jobs", json({ company: "X", title: "Y", url: "https://ok.dev/job" }))).status).toBe(201);
    expect(
      (await c.fetch(`/api/jobs/${job.id}`, { method: "PATCH", body: JSON.stringify({ url: dangerous[0] }) })).status
    ).toBe(400);
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
