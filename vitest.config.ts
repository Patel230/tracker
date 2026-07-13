import { defineConfig } from "vitest/config";

// Deliberately NOT reusing vite.config.ts: the Cloudflare plugin would try to
// run tests inside workerd. Tests run in Node and get a real local D1 through
// wrangler's getPlatformProxy instead.
export default defineConfig({
  test: {
    include: ["worker/**/*.test.ts"],
    environment: "node",
  },
});
