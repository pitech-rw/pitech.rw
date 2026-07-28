import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  BOOKING,
  isGoogleBookingConfigured,
} from '../../../lib/booking/config';
import { createMeetBooking, getBusyIntervals } from '../../../lib/booking/google';
import {
  filterAvailableSlots,
  generateDaySlots,
} from '../../../lib/booking/slots';
import {
  formatFriendlyDate,
  formatSlotRange,
  toKigaliDateKey,
} from '../../../lib/booking/time';

type BookPayload = {
  name?: string;
  email?: string;
  notes?: string;
  start?: string;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  if (!isGoogleBookingConfigured()) {
    return NextResponse.json(
      { error: 'Booking is not configured yet' },
      { status: 503 },
    );
  }

  let body: BookPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const notes = body.notes?.trim() ?? '';
  const startIso = body.start?.trim();

  if (!name || !email || !startIso) {
    return NextResponse.json(
      { error: 'Name, email, and start time are required' },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const start = new Date(startIso);
  if (Number.isNaN(start.getTime())) {
    return NextResponse.json({ error: 'Invalid start time' }, { status: 400 });
  }

  const end = new Date(start.getTime() + BOOKING.durationMinutes * 60 * 1000);
  const dateKey = toKigaliDateKey(start);
  const candidates = generateDaySlots(dateKey);
  const match = candidates.find((s) => s.start === start.toISOString());

  if (!match) {
    return NextResponse.json(
      { error: 'That time is outside booking hours' },
      { status: 400 },
    );
  }

  try {
    const dayStart = new Date(start);
    dayStart.setUTCHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart);
    dayEnd.setUTCDate(dayEnd.getUTCDate() + 2);

    const busy = await getBusyIntervals(
      new Date(start.getTime() - 60 * 60 * 1000),
      new Date(end.getTime() + 60 * 60 * 1000),
    );
    const stillOpen = filterAvailableSlots([match], busy);
    if (stillOpen.length === 0) {
      return NextResponse.json(
        { error: 'That slot was just taken. Please pick another time.' },
        { status: 409 },
      );
    }

    const event = await createMeetBooking({
      start,
      end,
      attendeeName: name,
      attendeeEmail: email,
      notes: notes || undefined,
    });

    const whenLabel = `${formatFriendlyDate(dateKey)} · ${formatSlotRange(start, end)} (${BOOKING.timezone})`;
    const meetLine = event.hangoutLink
      ? `<p><strong>Google Meet:</strong> <a href="${escapeHtml(event.hangoutLink)}">${escapeHtml(event.hangoutLink)}</a></p>`
      : '<p>A Google Meet link will appear on your calendar invite.</p>';

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const notifyTo =
        process.env.CONTACT_NOTIFY_EMAIL ?? 'info@pitech.rw';
      const from =
        process.env.RESEND_FROM_EMAIL ??
        'Pi Tech Contact <onboarding@resend.dev>';

      const guestHtml = `
        <h2>Your intro call is booked</h2>
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thanks for booking a ${BOOKING.durationMinutes}-minute intro call with Pi Tech.</p>
        <p><strong>When:</strong> ${escapeHtml(whenLabel)}</p>
        ${meetLine}
        <p>A calendar invite has also been sent to ${escapeHtml(email)}.</p>
        <p>— Pi Tech</p>
      `;

      const hostHtml = `
        <h2>New intro call booked</h2>
        <p><strong>Guest:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>When:</strong> ${escapeHtml(whenLabel)}</p>
        ${meetLine}
        ${notes ? `<p><strong>Notes:</strong></p><p style="white-space: pre-wrap;">${escapeHtml(notes)}</p>` : ''}
      `;

      await Promise.all([
        resend.emails.send({
          from,
          to: email,
          subject: `Confirmed: Intro call with Pi Tech — ${formatFriendlyDate(dateKey)}`,
          html: guestHtml,
        }),
        resend.emails.send({
          from,
          to: notifyTo,
          replyTo: email,
          subject: `New booking: ${name} — ${formatFriendlyDate(dateKey)}`,
          html: hostHtml,
        }),
      ]);
    }

    return NextResponse.json({
      ok: true,
      when: whenLabel,
      meetLink: event.hangoutLink,
      calendarLink: event.htmlLink,
    });
  } catch (err) {
    console.error('Booking error:', err);
    return NextResponse.json(
      { error: 'Could not complete booking. Please try another time.' },
      { status: 500 },
    );
  }
}
