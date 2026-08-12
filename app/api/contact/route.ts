import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

/**
 * "Start a Project" inquiry handler.
 *
 * Structured so a backend can be connected later with a single env var:
 *  - Set RESEND_API_KEY (+ optional CONTACT_TO / CONTACT_FROM) to email leads.
 *  - Without a key it validates, logs server-side, and returns 200 so the form
 *    is fully functional in development and never leaks that email isn't wired.
 *
 * Swap the delivery block for a CRM, database, or webhook without touching the
 * client — the request/response contract stays the same.
 */
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

  // Honeypot: silently accept bots without doing anything.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "hello@zeizzlabs.com";
  const from = process.env.CONTACT_FROM || "ZeizzLabs <onboarding@resend.dev>";

  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from,
        to,
        replyTo: data.email,
        subject: `New project inquiry — ${data.name}${data.company ? ` (${data.company})` : ""}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Company/Brand: ${data.company || "—"}`,
          `Building: ${data.building}`,
          `Budget: ${data.budget || "—"}`,
          `Timeline: ${data.timeline || "—"}`,
          "",
          data.message,
        ].join("\n"),
      });
    } catch (err) {
      console.error("[contact] email delivery failed:", err);
      return NextResponse.json(
        { ok: false, error: "Delivery failed. Please email us directly." },
        { status: 502 }
      );
    }
  } else {
    // No provider configured — log for local dev.
    console.info("[contact] inquiry received (email not configured):", {
      name: data.name,
      email: data.email,
      building: data.building,
    });
  }

  return NextResponse.json({ ok: true });
}
