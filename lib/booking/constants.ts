/** Booking rules — Africa/Kigali has no DST (UTC+2 year-round). */
export const BOOKING = {
  timezone: 'Africa/Kigali',
  /** Fixed offset minutes east of UTC (Kigali). */
  utcOffsetMinutes: 120,
  durationMinutes: 30,
  /** Inclusive start hour in local time (09:00). */
  startHour: 9,
  /** Exclusive end hour in local time (17:00 → last slot 16:30). */
  endHour: 17,
  /** JS weekday after local conversion: 1=Mon … 5=Fri */
  weekdays: [1, 2, 3, 4, 5] as readonly number[],
  /** How many calendar days ahead visitors can book. */
  bookingWindowDays: 60,
  /** Minimum notice before a slot can be booked (ms). */
  minNoticeMs: 2 * 60 * 60 * 1000,
  eventTitle: 'Intro call with Pi Tech',
  eventDescription:
    '30-minute intro call via Google Meet. Looking forward to learning about what you are building.',
} as const;
