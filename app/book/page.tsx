import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../sections/Navbar/navbar';
import Footer from '../sections/footer';
import BookingWizard from './BookingWizard';

export const metadata: Metadata = {
  title: 'Book an intro call — Pi Tech',
  description:
    'Schedule a free 30-minute intro call with Pi Tech via Google Meet. Available weekdays 9 AM–5 PM (Africa/Kigali).',
};

export default function BookPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="hero-mesh relative border-b border-[var(--border-subtle)] pb-20 pt-28 md:pb-28 md:pt-32">
        <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-8">
          <p className="mb-3 text-sm text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--accent-primary)]">
              Home
            </Link>
            <span className="mx-2" aria-hidden>
              /
            </span>
            Book a call
          </p>
          <p className="max-w-2xl text-lg text-[var(--text-secondary)]">
            Pick a 30-minute slot for a Google Meet intro. We&apos;ll talk through
            your goals, timeline, and how we can help.
          </p>
          <div className="mt-10">
            <BookingWizard />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
