import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyTurnstile } from "@/lib/turnstile/verify";
import { sendStudyNotification } from "@/lib/email/study-notification";

const studySchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().regex(/^[6-9]\d{8}$/),
  email: z.email(),
  province: z.string().min(2).max(80),
  debt: z.string().min(1),
  debtType: z.string().min(1),
  situation: z.string().min(1),
  message: z.string().max(2000).optional().or(z.literal("")),
  gdprConsent: z.literal(true),
  turnstileToken: z.string().min(1),
});

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || now > b.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (b.count >= MAX_REQUESTS) return false;
  b.count++;
  return true;
}

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = studySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: z.treeifyError(parsed.error) },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const leadId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Server misconfigured: missing Turnstile secret" },
      { status: 500 }
    );
  }
  const turnstile = await verifyTurnstile(data.turnstileToken, secretKey, {
    remoteIp: ip,
  });
  if (!turnstile.success) {
    return NextResponse.json(
      { error: "Bot verification failed", codes: turnstile.errorCodes },
      { status: 403 }
    );
  }
  const { gdprConsent: _gdpr, turnstileToken: _t, ...lead } = data;
  void _gdpr;
  void _t;

  const email = await sendStudyNotification(lead, leadId);
  if (!email.ok) {
    return NextResponse.json(
      { error: "Failed to send notification", detail: email.error, id: leadId },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, id: leadId, messageId: email.messageId });
}
