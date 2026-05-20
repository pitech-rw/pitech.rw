import { NextResponse } from 'next/server';
import { Resend } from 'resend';

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'Email service is not configured' },
      { status: 503 },
    );
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required' },
      { status: 400 },
    );
  }

  const notifyTo =
    process.env.CONTACT_NOTIFY_EMAIL ?? 'info@pitech.rw';
  const from =
    process.env.RESEND_FROM_EMAIL ??
    'Pi Tech Contact <onboarding@resend.dev>';

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from,
    to: notifyTo,
    replyTo: email,
    subject: `New contact form: ${name}`,
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json(
      { error: 'Failed to send notification email' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
