import { NextResponse } from "next/server";
import { Resend } from "resend";
import { profile } from "@/lib/data";
import { contactSchema } from "@/lib/validations/contact";

// Falls back to a placeholder so module evaluation (and `next build`'s route
// data collection) never throws when the env var isn't set yet — the runtime
// check below refuses to actually send until a real key is configured.
const resend = new Resend(process.env.RESEND_API_KEY || "re_not_configured");

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const { name, email, message, company } = parsed.data;

  // Honeypot tripped — silently report success so bots don't learn anything.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: [profile.email],
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
