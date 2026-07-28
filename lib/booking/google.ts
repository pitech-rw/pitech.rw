import { google } from 'googleapis';
import { BOOKING, getCalendarId, isGoogleBookingConfigured } from './config';

function getOAuthClient() {
  if (!isGoogleBookingConfigured()) {
    throw new Error('Google Calendar is not configured');
  }

  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );
  client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
  return client;
}

function getCalendar() {
  return google.calendar({ version: 'v3', auth: getOAuthClient() });
}

export type BusyInterval = { start: Date; end: Date };

export async function getBusyIntervals(
  timeMin: Date,
  timeMax: Date,
): Promise<BusyInterval[]> {
  const calendar = getCalendar();
  const calendarId = getCalendarId();

  const { data } = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      timeZone: BOOKING.timezone,
      items: [{ id: calendarId }],
    },
  });

  const periods = data.calendars?.[calendarId]?.busy ?? [];
  return periods
    .filter((p): p is { start: string; end: string } => Boolean(p.start && p.end))
    .map((p) => ({ start: new Date(p.start), end: new Date(p.end) }));
}

export type CreateMeetBookingInput = {
  start: Date;
  end: Date;
  attendeeName: string;
  attendeeEmail: string;
  notes?: string;
};

export type CreateMeetBookingResult = {
  eventId: string;
  hangoutLink: string | null;
  htmlLink: string | null;
};

export async function createMeetBooking(
  input: CreateMeetBookingInput,
): Promise<CreateMeetBookingResult> {
  const calendar = getCalendar();
  const calendarId = getCalendarId();
  const requestId = `pitech-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  const descriptionParts = [
    BOOKING.eventDescription,
    '',
    `Guest: ${input.attendeeName} <${input.attendeeEmail}>`,
  ];
  if (input.notes?.trim()) {
    descriptionParts.push('', `Notes: ${input.notes.trim()}`);
  }

  const { data } = await calendar.events.insert({
    calendarId,
    conferenceDataVersion: 1,
    sendUpdates: 'all',
    requestBody: {
      summary: BOOKING.eventTitle,
      description: descriptionParts.join('\n'),
      start: {
        dateTime: input.start.toISOString(),
        timeZone: BOOKING.timezone,
      },
      end: {
        dateTime: input.end.toISOString(),
        timeZone: BOOKING.timezone,
      },
      attendees: [
        {
          email: input.attendeeEmail,
          displayName: input.attendeeName,
        },
      ],
      conferenceData: {
        createRequest: {
          requestId,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      reminders: {
        useDefault: true,
      },
    },
  });

  const hangoutLink =
    data.hangoutLink ??
    data.conferenceData?.entryPoints?.find((e) => e.entryPointType === 'video')
      ?.uri ??
    null;

  return {
    eventId: data.id ?? requestId,
    hangoutLink,
    htmlLink: data.htmlLink ?? null,
  };
}
