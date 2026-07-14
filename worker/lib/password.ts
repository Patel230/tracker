import bcrypt from "bcryptjs";

// bcryptjs is pure JavaScript, so a cost-10 hash burns ~74ms of CPU — 7x the
// Workers Free plan's 10ms per-request cap, which made login hard-fail with
// "exceeded resource limits" on any fork deployed there. PBKDF2 through
// WebCrypto runs natively, so the same CPU budget buys far more work. See
// ITERATIONS below for the strength/cost trade-off we picked and why.
//
// Stored format: pbkdf2$sha256$<iterations>$<b64 salt>$<b64 derived key>
// Legacy bcrypt hashes (they start with "$2") are still verified, then
// transparently upgraded on the next successful login.

// 50k is a deliberate compromise, not an oversight. The Workers Free plan caps
// CPU at 10ms per request, and no password hash is both OWASP-grade and that
// cheap — slowness is the point of a password hash. Measured cost per login:
//
//   bcrypt cost-10 (previous)   74ms  — 7x over the free cap, login 1102s
//   PBKDF2 600k (OWASP 2024)    72ms  — same problem
//   PBKDF2 50k                   7ms  — fits, at ~12x below OWASP guidance
//
// We optimise for "anyone can fork this and deploy it for free", and accept the
// weaker factor. The iteration count is stored inside each hash, so raising it
// later costs nothing: verification reads the stored value, and any account can
// be re-hashed on its next successful login.
export const DEFAULT_ITERATIONS = 50_000;
const SALT_BYTES = 16;
const KEY_BITS = 256;

// Raise the work factor without touching code: set PBKDF2_ITERATIONS. Worth
// doing on the Workers Paid plan, where the 10ms cap doesn't apply and OWASP's
// 600_000 costs ~72ms — comfortably inside the 30s budget there.
//
// Existing hashes keep working: each one stores the iteration count it was made
// with, verification reads that value, and an account is re-hashed at the
// current setting on its next successful login.
export function configuredIterations(env: Env): number {
  const n = Number(env.PBKDF2_ITERATIONS);
  // Below the default is never an improvement, so treat it as unset.
  return Number.isInteger(n) && n > DEFAULT_ITERATIONS ? n : DEFAULT_ITERATIONS;
}

const b64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes));
const unb64 = (s: string) => Uint8Array.from(atob(s), (ch) => ch.charCodeAt(0));

async function derive(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    key,
    KEY_BITS
  );
  return new Uint8Array(bits);
}

// Compares in time proportional to length only, never short-circuiting on the
// first differing byte. crypto.subtle.timingSafeEqual exists in workerd but not
// in Node, where the tests run, so this stays hand-rolled and portable.
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function hashPassword(password: string, iterations = DEFAULT_ITERATIONS): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const derived = await derive(password, salt, iterations);
  return `pbkdf2$sha256$${iterations}$${b64(salt)}$${b64(derived)}`;
}

export function isLegacyHash(stored: string): boolean {
  return stored.startsWith("$2");
}

// True for a bcrypt hash, or a PBKDF2 hash weaker than the current setting.
// Lets a raised PBKDF2_ITERATIONS roll out across accounts as they log in,
// rather than only applying to new ones.
export function needsRehash(stored: string, iterations: number): boolean {
  if (isLegacyHash(stored)) return true;
  const stored_iters = Number(stored.split("$")[2]);
  return !Number.isInteger(stored_iters) || stored_iters < iterations;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  if (isLegacyHash(stored)) return bcrypt.compare(password, stored);

  const [scheme, hash, iterations, salt, derived] = stored.split("$");
  if (scheme !== "pbkdf2" || hash !== "sha256" || !salt || !derived) return false;

  const iters = Number(iterations);
  if (!Number.isInteger(iters) || iters < 1) return false;

  const actual = await derive(password, unb64(salt), iters);
  return timingSafeEqual(actual, unb64(derived));
}

// A precomputed hash of an unguessable value. Verifying against it lets login
// spend the same CPU on an unknown email as on a real one, so response time
// stops revealing which addresses are registered.
let dummyHash: string | undefined;
export async function dummyVerify(password: string): Promise<false> {
  dummyHash ??= await hashPassword(crypto.randomUUID());
  await verifyPassword(password, dummyHash);
  return false;
}
