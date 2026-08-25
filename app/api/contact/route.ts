import { NextResponse } from "next/server";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

/**
 * Project enquiry handler.
 *
 * The rule here is that an enquiry must never be lost. Email is best-effort —
 * an API key can be missing, a provider can be down, a domain can fall out of
 * verification — so every valid submission is written to durable storage FIRST
 * and emailed second. The previous version returned success and dropped the
 * enquiry on the floor whenever email was not configured, which is the worst
 * possible failure for a form whose entire job is capturing leads.
 *
 * Configure with:
 *   RESEND_API_KEY   enables email delivery
 *   CONTACT_TO       comma-separated recipients; defaults to both inboxes
 *   CONTACT_FROM     must be on a domain verified in Resend
 */

/** Naive per-IP limiter. Per instance, so it slows floods rather than stopping
 *  a distributed one — which, with the honeypot, is proportionate for a
 *  marketing form. A shared store would be the next step if it is ever abused. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude bound on memory
  return recent.length > MAX_PER_WINDOW;
}

async function persist(data: ContactInput, ip: string): Promise<boolean> {
  try {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore("enquiries");
    const id = `${new Date().toISOString()}-${Math.random().toString(36).slice(2, 8)}`;
    await store.setJSON(id, { ...data, ip, receivedAt: new Date().toISOString() });
    return true;
  } catch (err) {
    // Outside Netlify (local dev) there is no blob store; that is expected.
    console.warn("[contact] could not persist enquiry:", err);
    return false;
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Honeypot: accept silently so the bot sees success and moves on.
  if (data.website) return NextResponse.json({ ok: true });

  const ip =
    req.headers.get("x-nf-client-connection-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again shortly." },
      { status: 429 }
    );
  }

  // Durable first. Everything after this can fail without losing the enquiry.
  const stored = await persist(data, ip);

  const apiKey = process.env.RESEND_API_KEY;
  const to = (process.env.CONTACT_TO || "enquire@zeizzlabs.com,zeizzlabs@gmail.com")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
  const from = process.env.CONTACT_FROM || "ZeizzLabs <onboarding@resend.dev>";

  let emailed = false;
  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from,
        to,
        replyTo: data.email,
        subject: `New enquiry — ${data.name}${data.company ? ` (${data.company})` : ""}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone || "—"}`,
          `Business: ${data.company || "—"}`,
          `Service: ${data.service || "—"}`,
          `Budget: ${data.budget || "—"}`,
          `Timeline: ${data.timeline || "—"}`,
          "",
          data.message,
          "",
          `— sent from zeizzlabs.com at ${new Date().toISOString()}`,
        ].join("\n"),
      });
      // The SDK reports delivery failures in `error` rather than by throwing.
      if (error) throw new Error(error.message);
      emailed = true;
    } catch (err) {
      console.error("[contact] EMAIL FAILED — enquiry is in blob storage:", err);
    }
  } else {
    console.warn("[contact] RESEND_API_KEY not set — enquiry stored, not emailed.");
  }

  // Only claim success if the enquiry survives somewhere. If neither the store
  // nor email worked, say so rather than pretending it was received.
  if (!stored && !emailed) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not receive your message. Please WhatsApp or email us directly.",
      },
      { status: 502 }
    );
  }

  // `delivered` distinguishes "it is already in your inbox" from "it is safe in
  // storage but the mail did not go out" — the caller and I both need to tell
  // those apart, and a bare ok:true hides a half-failure.
  return NextResponse.json({ ok: true, delivered: emailed, stored });
}
