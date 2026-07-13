import { Hono } from "hono";
import auth from "./routes/auth";
import jobs from "./routes/jobs";
import stats from "./routes/stats";
import { contacts, activities, reminders } from "./routes/items";
import { requireAuth, type AppEnv } from "./lib/auth";

const app = new Hono<AppEnv>();

const api = new Hono<AppEnv>();
api.route("/auth", auth);
api.use("*", requireAuth);
api.route("/jobs", jobs);
api.route("/contacts", contacts);
api.route("/activities", activities);
api.route("/reminders", reminders);
api.route("/stats", stats);

app.route("/api", api);
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
