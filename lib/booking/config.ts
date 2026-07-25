import { BOOKING } from './constants';

export { BOOKING };

export function isGoogleBookingConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN,
  );
}

export function getCalendarId(): string {
  return process.env.GOOGLE_CALENDAR_ID?.trim() || 'primary';
}
