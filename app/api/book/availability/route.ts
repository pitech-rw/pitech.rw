import { NextResponse } from 'next/server';
import { isGoogleBookingConfigured } from '../../../../lib/booking/config';
import { getBusyIntervals } from '../../../../lib/booking/google';
import {
  filterAvailableSlots,
  generateDaySlots,
  listBookableDateKeys,
} from '../../../../lib/booking/slots';
import { kigaliLocalToUtc, parseDateKey } from '../../../../lib/booking/time';

export async function GET(request: Request) {
  if (!isGoogleBookingConfigured()) {
    return NextResponse.json(
      {
        error:
          'Booking is not configured yet. Set Google Calendar OAuth env vars.',
      },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const dateKey = searchParams.get('date');

  try {
    if (!dateKey) {
      return NextResponse.json({ dates: listBookableDateKeys() });
    }

    const parsed = parseDateKey(dateKey);
    if (!parsed) {
      return NextResponse.json({ error: 'Invalid date' }, { status: 400 });
    }

    const candidates = generateDaySlots(dateKey);
    if (candidates.length === 0) {
      return NextResponse.json({ date: dateKey, slots: [] });
    }

    const dayStart = kigaliLocalToUtc(
      parsed.year,
      parsed.monthIndex,
      parsed.day,
      0,
      0,
    );
    const dayEnd = kigaliLocalToUtc(
      parsed.year,
      parsed.monthIndex,
      parsed.day + 1,
      0,
      0,
    );

    const busy = await getBusyIntervals(dayStart, dayEnd);
    const slots = filterAvailableSlots(candidates, busy);

    return NextResponse.json({ date: dateKey, slots });
  } catch (err) {
    console.error('Availability error:', err);
    return NextResponse.json(
      { error: 'Could not load availability' },
      { status: 500 },
    );
  }
}
