interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  JWT_SECRET: string;
  ALLOW_REGISTRATION?: string;
}
