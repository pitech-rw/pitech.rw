'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { BOOKING } from '../../lib/booking/constants';
import {
  formatFriendlyDate,
  formatSlotRange,
  formatTimeLabel,
  parseDateKey,
  utcToKigaliParts,
} from '../../lib/booking/time';

type Slot = { start: string; end: string };

type Step = 'datetime' | 'details' | 'done';

type Confirmation = {
  when: string;
  meetLink: string | null;
};

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function monthMatrix(year: number, monthIndex: number): (number | null)[][] {
  const first = new Date(Date.UTC(year, monthIndex, 1));
  // Convert Sunday=0 … to Monday-first index
  const startPad = (first.getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  const cells: (number | null)[] = [
    ...Array(startPad).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }
  return rows;
}

function dateKeyFromParts(year: number, monthIndex: number, day: number): string {
  return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function BookingWizard() {
  const nowParts = utcToKigaliParts(new Date());
  const [viewYear, setViewYear] = useState(nowParts.year);
  const [viewMonth, setViewMonth] = useState(nowParts.month);
  const [bookableDates, setBookableDates] = useState<Set<string>>(new Set());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [step, setStep] = useState<Step>('datetime');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [loadingDates, setLoadingDates] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const loadDates = useCallback(async () => {
    setLoadingDates(true);
    setConfigError(null);
    try {
      const res = await fetch('/api/book/availability');
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setConfigError(
          (data as { error?: string }).error ??
            'Booking is temporarily unavailable.',
        );
        setBookableDates(new Set());
        return;
      }
      setBookableDates(new Set((data as { dates: string[] }).dates ?? []));
    } catch {
      setConfigError('Could not load availability. Please try again later.');
    } finally {
      setLoadingDates(false);
    }
  }, []);

  useEffect(() => {
    void loadDates();
  }, [loadDates]);

  useEffect(() => {
    if (!selectedDate) {
      setSlots([]);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoadingSlots(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/book/availability?date=${encodeURIComponent(selectedDate)}`,
        );
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (!res.ok) {
          setError(
            (data as { error?: string }).error ?? 'Could not load time slots.',
          );
          setSlots([]);
          return;
        }
        setSlots((data as { slots: Slot[] }).slots ?? []);
      } catch {
        if (!cancelled) {
          setError('Could not load time slots.');
          setSlots([]);
        }
      } finally {
        if (!cancelled) setLoadingSlots(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedDate]);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat('en-GB', {
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(new Date(Date.UTC(viewYear, viewMonth, 1))),
    [viewYear, viewMonth],
  );

  const matrix = useMemo(
    () => monthMatrix(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const shiftMonth = (delta: number) => {
    const d = new Date(Date.UTC(viewYear, viewMonth + delta, 1));
    setViewYear(d.getUTCFullYear());
    setViewMonth(d.getUTCMonth());
  };

  const selectDate = (day: number) => {
    const key = dateKeyFromParts(viewYear, viewMonth, day);
    if (!bookableDates.has(key)) return;
    setSelectedDate(key);
    setSelectedSlot(null);
    setStep('datetime');
  };

  const continueToDetails = () => {
    if (!selectedSlot) return;
    setStep('details');
    setError(null);
  };

  const submitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          notes,
          start: selectedSlot.start,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          (data as { error?: string }).error ?? 'Booking failed.',
        );
      }
      setConfirmation({
        when: (data as { when: string }).when,
        meetLink: (data as { meetLink: string | null }).meetLink ?? null,
      });
      setStep('done');
      void loadDates();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking failed.');
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 'done' && confirmation) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 text-center backdrop-blur-sm md:p-10">
        <div
          className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-primary)]/15 text-[var(--accent-primary)]"
          aria-hidden
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          You&apos;re booked
        </h2>
        <p className="mt-3 text-[var(--text-secondary)]">{confirmation.when}</p>
        {confirmation.meetLink && (
          <a
            href={confirmation.meetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[var(--accent-primary)] px-5 py-3 text-sm font-semibold text-[var(--bg-deep)] transition hover:bg-[var(--accent-hover)]"
          >
            Open Google Meet
          </a>
        )}
        <p className="mt-6 text-sm text-[var(--text-muted)]">
          Check your inbox for a Google Calendar invite with the Meet link.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block text-sm font-medium text-[var(--accent-primary)] hover:underline"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl shadow-black/20 backdrop-blur-sm">
      <div className="grid lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
        <aside className="border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 p-6 md:p-8 lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
            Pi Tech
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            Intro call
          </h1>
          <ul className="mt-6 space-y-3 text-sm text-[var(--text-secondary)]">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-[var(--text-muted)]" aria-hidden>
                <ClockIcon />
              </span>
              <span>{BOOKING.durationMinutes} minutes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-[var(--text-muted)]" aria-hidden>
                <VideoIcon />
              </span>
              <span>Google Meet</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-[var(--text-muted)]" aria-hidden>
                <GlobeIcon />
              </span>
              <span>
                {BOOKING.startHour}:00–{BOOKING.endHour}:00 · Mon–Fri ·{' '}
                {BOOKING.timezone}
              </span>
            </li>
          </ul>
          {selectedDate && (
            <p className="mt-8 text-sm font-medium text-[var(--text-primary)]">
              {formatFriendlyDate(selectedDate)}
              {selectedSlot && (
                <>
                  <br />
                  <span className="text-[var(--accent-primary)]">
                    {formatSlotRange(
                      new Date(selectedSlot.start),
                      new Date(selectedSlot.end),
                    )}
                  </span>
                </>
              )}
            </p>
          )}
        </aside>

        <div className="p-6 md:p-8">
          {configError ? (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              {configError}
            </div>
          ) : step === 'details' && selectedSlot ? (
            <form onSubmit={submitBooking} className="mx-auto max-w-md space-y-5">
              <button
                type="button"
                onClick={() => setStep('datetime')}
                className="text-sm text-[var(--accent-primary)] hover:underline"
              >
                ← Change time
              </button>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                Enter your details
              </h2>
              <div>
                <label htmlFor="book-name" className="block text-sm font-medium text-[var(--text-secondary)]">
                  Name
                </label>
                <input
                  id="book-name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--input-bg)] px-4 py-3 focus:border-[var(--accent-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
                />
              </div>
              <div>
                <label htmlFor="book-email" className="block text-sm font-medium text-[var(--text-secondary)]">
                  Email
                </label>
                <input
                  id="book-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--input-bg)] px-4 py-3 focus:border-[var(--accent-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
                />
              </div>
              <div>
                <label htmlFor="book-notes" className="block text-sm font-medium text-[var(--text-secondary)]">
                  What would you like to discuss? <span className="text-[var(--text-muted)]">(optional)</span>
                </label>
                <textarea
                  id="book-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-2 block w-full resize-y rounded-lg border border-[var(--border-subtle)] bg-[var(--input-bg)] px-4 py-3 focus:border-[var(--accent-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-[var(--accent-primary)] py-3.5 text-sm font-semibold text-[var(--bg-deep)] transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Scheduling…' : 'Confirm booking'}
              </button>
              {error && (
                <p className="text-center text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}
            </form>
          ) : (
            <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                    Select a date
                  </h2>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="Previous month"
                      onClick={() => shiftMonth(-1)}
                      className="rounded-lg p-2 text-[var(--text-secondary)] transition hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                    >
                      ‹
                    </button>
                    <span className="min-w-[9rem] text-center text-sm font-medium text-[var(--text-primary)]">
                      {monthLabel}
                    </span>
                    <button
                      type="button"
                      aria-label="Next month"
                      onClick={() => shiftMonth(1)}
                      className="rounded-lg p-2 text-[var(--text-secondary)] transition hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                    >
                      ›
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-[var(--text-muted)]">
                  {WEEKDAY_LABELS.map((d) => (
                    <div key={d} className="py-2">
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {matrix.flatMap((row, ri) =>
                    row.map((day, ci) => {
                      if (day === null) {
                        return <div key={`${ri}-${ci}`} className="aspect-square" />;
                      }
                      const key = dateKeyFromParts(viewYear, viewMonth, day);
                      const available = bookableDates.has(key);
                      const selected = selectedDate === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          disabled={!available || loadingDates}
                          onClick={() => selectDate(day)}
                          className={`aspect-square rounded-lg text-sm transition ${
                            selected
                              ? 'bg-[var(--accent-primary)] font-semibold text-[var(--bg-deep)]'
                              : available
                                ? 'text-[var(--text-primary)] hover:bg-[var(--accent-primary)]/15'
                                : 'cursor-default text-[var(--text-muted)] opacity-40'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    }),
                  )}
                </div>
                {loadingDates && (
                  <p className="mt-3 text-sm text-[var(--text-muted)]">
                    Loading availability…
                  </p>
                )}
              </div>

              <div>
                <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
                  {selectedDate
                    ? `Times · ${(() => {
                        const p = parseDateKey(selectedDate);
                        if (!p) return selectedDate;
                        return new Intl.DateTimeFormat('en-GB', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          timeZone: BOOKING.timezone,
                        }).format(
                          new Date(Date.UTC(p.year, p.monthIndex, p.day, 12)),
                        );
                      })()}`
                    : 'Select a time'}
                </h2>
                {!selectedDate ? (
                  <p className="text-sm text-[var(--text-muted)]">
                    Choose an available weekday on the calendar.
                  </p>
                ) : loadingSlots ? (
                  <p className="text-sm text-[var(--text-muted)]">Loading times…</p>
                ) : slots.length === 0 ? (
                  <p className="text-sm text-[var(--text-muted)]">
                    No open slots this day. Try another date.
                  </p>
                ) : (
                  <div className="flex max-h-[22rem] flex-col gap-2 overflow-y-auto pr-1">
                    {slots.map((slot) => {
                      const parts = utcToKigaliParts(new Date(slot.start));
                      const label = formatTimeLabel(parts.hour, parts.minute);
                      const active = selectedSlot?.start === slot.start;
                      return (
                        <button
                          key={slot.start}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                            active
                              ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/15 text-[var(--accent-primary)]'
                              : 'border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-primary)]/40'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                )}
                {selectedSlot && (
                  <button
                    type="button"
                    onClick={continueToDetails}
                    className="mt-4 w-full rounded-lg bg-[var(--accent-primary)] py-3 text-sm font-semibold text-[var(--bg-deep)] transition hover:bg-[var(--accent-hover)]"
                  >
                    Continue
                  </button>
                )}
                {error && (
                  <p className="mt-3 text-sm text-red-400" role="alert">
                    {error}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.5-2.5 4-5.7 4-9s-1.5-6.5-4-9m0 18c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9m-7.5 9h15" />
    </svg>
  );
}
