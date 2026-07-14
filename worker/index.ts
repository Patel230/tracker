import { Hono } from "hono";
import auth from "./routes/auth";
import jobs from "./routes/jobs";
import stats from "./routes/stats";
import { contacts, activities, reminders } from "./routes/items";
import { requireAuth, type AppEnv } from "./lib/auth";

const app = new Hono<AppEnv>();

// public/_headers only decorates static asset responses — /api/* is generated
// here and inherits none of it. JSON has no script context, so the CSP is a
// lockdown rather than the page policy; nosniff is the one that actually
// matters, stopping a JSON body from being re-interpreted as something else.
app.use("/api/*", async (c, next) => {
  // finally, not just after next(): a handler that throws skips straight to
  // app.onError, and headers set only after a successful next() would never
  // reach the 500 response it builds from this same context.
  try {
    await next();
  } finally {
    c.header("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'");
    c.header("X-Content-Type-Options", "nosniff");
    c.header("Referrer-Policy", "strict-origin-when-cross-origin");
    c.header("X-Frame-Options", "DENY");
  }
});

// Two routers, so which routes are public is decided by the router a route is
// mounted on rather than by where the line happens to sit. Previously /auth was
// public only because it was written above `api.use("*", requireAuth)`, and a
// route added one line too high would have been silently unauthenticated.
//
// Adding a route to `protectedApi` puts it behind requireAuth wherever the line
// goes; making something public takes a deliberate move to `publicApi`.
//
// One ordering dependency remains: publicApi must be mounted first, because
// protectedApi's "*" middleware also matches /api/auth/*, and only stops there
// because the public handler has already returned a response. Getting that
// wrong 401s every request including login — loudly broken rather than quietly
// open, which is the failure mode we want. The test below pins it.
const publicApi = new Hono<AppEnv>();
publicApi.route("/auth", auth);

const protectedApi = new Hono<AppEnv>();
protectedApi.use("*", requireAuth);
protectedApi.route("/jobs", jobs);
protectedApi.route("/contacts", contacts);
protectedApi.route("/activities", activities);
protectedApi.route("/reminders", reminders);
protectedApi.route("/stats", stats);

app.route("/api", publicApi);
app.route("/api", protectedApi);
app.notFound((c) => {
  if (new URL(c.req.url).pathname.startsWith("/api/")) {
    return c.json({ error: "Not found" }, 404);
  }
  // Non-API requests that reach the Worker fall back to the SPA assets.
  return c.env.ASSETS.fetch(c.req.raw);
});
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal error" }, 500);
});

export default app;
