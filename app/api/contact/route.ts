import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations/contact";

const CONTACT_RECIPIENT = "jakir.devbd@gmail.com";

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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Portfolio Contact Form <onboarding@resend.dev>",
    to: CONTACT_RECIPIENT,
    replyTo: email,
    subject: `New message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
