'use client';

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import storage from '../../service/firebase';

export default function Contactus() {
  const [message, setMessage] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateMessage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMessage((values) => ({ ...values, [name]: value }));
  };

  const saveContactMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setError(null);

    try {
      const emailRes = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });

      if (!emailRes.ok) {
        const data = await emailRes.json().catch(() => ({}));
        throw new Error(
          (data as { error?: string }).error ??
            'Could not send your message. Please try again or email us directly.',
        );
      }

      await addDoc(collection(storage, 'contacts'), message);
      setSent(true);
      setTimeout(() => setSent(false), 5400);
      form.reset();
      setMessage({});
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not send your message. Please try again or email us directly.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 py-24 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
              Contact
            </h2>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
              Tell us what you&apos;re building
            </p>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Share a short note about your goals, timeline, and stack — or{' '}
              <a
                href="/book"
                className="font-medium text-[var(--accent-primary)] hover:underline"
              >
                book a 30-minute intro call
              </a>
              . We read every message and respond as soon as we can.
            </p>
            <div className="mt-10 space-y-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 backdrop-blur-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Email
                </p>
                <a
                  href="mailto:info@pitech.rw"
                  className="mt-1 block text-lg font-medium text-[var(--accent-primary)] hover:underline"
                >
                  info@pitech.rw
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Phone
                </p>
                <a
                  href="tel:+250787799082"
                  className="mt-1 block text-lg font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary)]"
                >
                  +250 787 799 082
                </a>
              </div>
              <p className="text-sm text-[var(--text-muted)]">
                Pi Tech Ltd 
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 backdrop-blur-sm md:p-10">
            <form onSubmit={saveContactMessage} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[var(--text-secondary)]"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  onChange={updateMessage}
                  placeholder="e.g. Jean Nkusi"
                  className="mt-2 block w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--input-bg)] px-4 py-3 focus:border-[var(--accent-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[var(--text-secondary)]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  onChange={updateMessage}
                  placeholder="you@example.com"
                  className="mt-2 block w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--input-bg)] px-4 py-3 focus:border-[var(--accent-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
                />
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  We only use this to reply to you.
                </p>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[var(--text-secondary)]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  onChange={updateMessage}
                  placeholder="What problem are you solving? Any deadlines or constraints?"
                  className="mt-2 block w-full resize-y rounded-lg border border-[var(--border-subtle)] bg-[var(--input-bg)] px-4 py-3 focus:border-[var(--accent-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-[var(--accent-primary)] py-3.5 text-sm font-semibold text-[var(--bg-deep)] transition hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg-elevated)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Send message'}
              </button>
              {error && (
                <p
                  className="text-center text-sm text-red-400"
                  role="alert"
                >
                  {error}
                </p>
              )}
              <p
                className={`text-center text-sm text-[var(--accent-primary)] transition-opacity ${sent ? 'opacity-100' : 'opacity-0'}`}
                aria-live="polite"
              >
                Thanks — your message was sent successfully.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
