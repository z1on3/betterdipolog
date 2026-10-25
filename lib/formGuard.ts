import { env } from "cloudflare:workers";
import { headers } from "next/headers";

// Abuse protection shared by every public form (contribution, report-an-issue,
// Bangon board + hazard reports). BetterGov.ph requires CAPTCHA plus rate
// limiting on citizen intake forms before a community Discord webhook is
// granted — see https://lgu.bettergov.ph/GUIDE.

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60_000;

// Fallback for when the FORM_RATE_LIMITER binding is absent (e.g. `vinext dev`).
// Per-isolate only, so it just stops rapid-fire loops within one instance.
const memoryLimits = new Map<string, { count: number; timestamp: number }>();

function memoryRateLimit(key: string): boolean {
  const now = Date.now();
  const status = memoryLimits.get(key) ?? { count: 0, timestamp: now };
  if (now - status.timestamp > RATE_LIMIT_WINDOW_MS) {
    status.count = 1;
    status.timestamp = now;
  } else {
    status.count++;
  }
  memoryLimits.set(key, status);
  return status.count <= RATE_LIMIT_MAX;
}

// Cloudflare sets cf-connecting-ip at the edge and clients can't override it;
// x-forwarded-for is only trusted as a local-dev fallback.
export async function getClientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("cf-connecting-ip") ||
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

// Returns true if the request is within limits. `scope` keeps separate budgets
// per form so a board post doesn't eat into a hazard report's allowance.
export async function checkRateLimit(
  ip: string,
  scope: string,
): Promise<boolean> {
  if (ip === "unknown") return true;
  const key = `${scope}:${ip}`;
  const limiter = (env as Partial<CloudflareEnv>).FORM_RATE_LIMITER;
  if (!limiter) return memoryRateLimit(key);
  try {
    const { success } = await limiter.limit({ key });
    return success;
  } catch (err) {
    console.error("Rate limiter error:", err);
    return memoryRateLimit(key);
  }
}

// Verifies a reCAPTCHA token server-side. Fails closed: without a configured
// RECAPTCHA_SECRET_KEY only `vinext dev` lets submissions through.
export async function verifyCaptcha(
  token: string | null | undefined,
  ip: string,
): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === "development") return true;
    console.error("RECAPTCHA_SECRET_KEY is not set; rejecting submission.");
    return false;
  }
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") body.append("remoteip", ip);
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("reCAPTCHA verification error:", err);
    return false;
  }
}
