import { BOOKING } from './constants';

const OFFSET_MS = BOOKING.utcOffsetMinutes * 60 * 1000;

/** Local Kigali wall-clock parts → UTC Date. */
export function kigaliLocalToUtc(
  year: number,
  monthIndex: number,
  day: number,
  hour = 0,
  minute = 0,
  second = 0,
): Date {
  return new Date(
    Date.UTC(year, monthIndex, day, hour, minute, second) - OFFSET_MS,
  );
}

/** UTC instant → Kigali calendar/time parts. */
export function utcToKigaliParts(date: Date): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  weekday: number;
} {
  const shifted = new Date(date.getTime() + OFFSET_MS);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth(),
    day: shifted.getUTCDate(),
    hour: shifted.getUTCHours(),
    minute: shifted.getUTCMinutes(),
    weekday: shifted.getUTCDay(),
  };
}

/** YYYY-MM-DD in Africa/Kigali. */
export function toKigaliDateKey(date: Date): string {
  const { year, month, day } = utcToKigaliParts(date);
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function parseDateKey(dateKey: string): {
  year: number;
  monthIndex: number;
  day: number;
} | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey);
  if (!match) return null;
  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const day = Number(match[3]);
  const probe = kigaliLocalToUtc(year, monthIndex, day);
  const parts = utcToKigaliParts(probe);
  if (parts.year !== year || parts.month !== monthIndex || parts.day !== day) {
    return null;
  }
  return { year, monthIndex, day };
}

export function formatTimeLabel(hour: number, minute: number): string {
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const ampm = hour < 12 ? 'AM' : 'PM';
  return `${h12}:${String(minute).padStart(2, '0')} ${ampm}`;
}

export function formatSlotRange(start: Date, end: Date): string {
  const s = utcToKigaliParts(start);
  const e = utcToKigaliParts(end);
  return `${formatTimeLabel(s.hour, s.minute)} – ${formatTimeLabel(e.hour, e.minute)}`;
}

export function formatFriendlyDate(dateKey: string): string {
  const parsed = parseDateKey(dateKey);
  if (!parsed) return dateKey;
  const utc = kigaliLocalToUtc(parsed.year, parsed.monthIndex, parsed.day, 12);
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: BOOKING.timezone,
  }).format(utc);
}
