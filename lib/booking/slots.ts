import { BOOKING } from './constants';
import {
  kigaliLocalToUtc,
  parseDateKey,
  toKigaliDateKey,
  utcToKigaliParts,
} from './time';

export type TimeSlot = {
  start: string; // ISO UTC
  end: string;
};

function isWeekday(weekday: number): boolean {
  return (BOOKING.weekdays as readonly number[]).includes(weekday);
}

/** All theoretical 30-min slots for a Kigali calendar day (no busy filtering). */
export function generateDaySlots(dateKey: string, now = new Date()): TimeSlot[] {
  const parsed = parseDateKey(dateKey);
  if (!parsed) return [];

  const noon = kigaliLocalToUtc(
    parsed.year,
    parsed.monthIndex,
    parsed.day,
    12,
  );
  const weekday = utcToKigaliParts(noon).weekday;
  if (!isWeekday(weekday)) return [];

  const todayKey = toKigaliDateKey(now);
  const windowEnd = new Date(
    now.getTime() + BOOKING.bookingWindowDays * 24 * 60 * 60 * 1000,
  );
  if (dateKey < todayKey || noon > windowEnd) return [];

  const slots: TimeSlot[] = [];
  const endMinuteOfDay = BOOKING.endHour * 60;

  for (
    let minuteOfDay = BOOKING.startHour * 60;
    minuteOfDay + BOOKING.durationMinutes <= endMinuteOfDay;
    minuteOfDay += BOOKING.durationMinutes
  ) {
    const hour = Math.floor(minuteOfDay / 60);
    const minute = minuteOfDay % 60;
    const start = kigaliLocalToUtc(
      parsed.year,
      parsed.monthIndex,
      parsed.day,
      hour,
      minute,
    );
    const end = new Date(start.getTime() + BOOKING.durationMinutes * 60 * 1000);

    if (start.getTime() - now.getTime() < BOOKING.minNoticeMs) continue;

    slots.push({ start: start.toISOString(), end: end.toISOString() });
  }

  return slots;
}

export function overlaps(
  slotStart: Date,
  slotEnd: Date,
  busyStart: Date,
  busyEnd: Date,
): boolean {
  return slotStart < busyEnd && slotEnd > busyStart;
}

export function filterAvailableSlots(
  slots: TimeSlot[],
  busy: { start: Date; end: Date }[],
): TimeSlot[] {
  return slots.filter((slot) => {
    const start = new Date(slot.start);
    const end = new Date(slot.end);
    return !busy.some((b) => overlaps(start, end, b.start, b.end));
  });
}

/** Date keys (YYYY-MM-DD) that are bookable weekdays within the window. */
export function listBookableDateKeys(now = new Date()): string[] {
  const keys: string[] = [];
  const startParts = utcToKigaliParts(now);

  for (let i = 0; i <= BOOKING.bookingWindowDays; i++) {
    const day = kigaliLocalToUtc(
      startParts.year,
      startParts.month,
      startParts.day + i,
      12,
    );
    const parts = utcToKigaliParts(day);
    if (!isWeekday(parts.weekday)) continue;
    const key = toKigaliDateKey(day);
    if (generateDaySlots(key, now).length === 0) continue;
    keys.push(key);
  }

  return keys;
}
