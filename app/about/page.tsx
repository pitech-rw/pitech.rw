import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pi Tech - About',
  description:
    'Pi Tech Ltd. delivers custom software, cloud solutions, and technical advisory for companies in Rwanda and beyond.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <section className="hero-mesh relative border-b border-[var(--border-subtle)] py-24 md:py-28">
        <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
            About Pi Tech
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-[var(--text-primary)] md:text-5xl">
            Kigali-based software consultancy for teams that need dependable
            delivery.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
            We partner with institutions and companies to design, build, and
            evolve software systems that stay stable under real-world pressure.
          </p>
          <div className="mt-8">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-5 py-3 text-sm font-semibold text-[var(--bg-deep)] transition hover:bg-[var(--accent-hover)]"
            >
              Discuss your roadmap
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border-subtle)] py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {[
            {
              title: 'Mission',
              body: 'Enable organizations to realize their full potential through practical software and IT solutions.',
            },
            {
              title: 'Vision',
              body: 'Build seamless digital experiences with resilient architecture and 99.9%+ availability goals.',
            },
            {
              title: 'Focus',
              body: 'Web platforms, cloud systems, and data-informed products designed for maintainability.',
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 backdrop-blur-sm"
            >
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                {item.title}
              </h2>
              <p className="mt-2 leading-relaxed text-[var(--text-secondary)]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
            Experience across public institutions and global teams
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-[var(--text-secondary)]">
            <p>
              Our work includes collaboration with government institutions,
              including Rwanda Utilities Regulatory Authority (RURA), where we
              contributed to transport-sector dashboards and digital service
              delivery.
            </p>
            <p>
              We have also supported private-sector products such as Ishyiga
              (by Algorithm Ltd), working directly in production codebases to
              add capabilities, improve quality, and resolve issues.
            </p>
            <p>
              Internationally, we have contributed to initiatives with partners
              like Carnegie Mellon University Africa, Andela, and the World
              Bank, bringing practical engineering standards to diverse teams.
            </p>
          </div>
        </div>
      </section>
       <footer className="text-center text-sm text-[var(--text-muted)]">
        <p>&copy; {new Date().getFullYear()} Pi Tech Ltd · All rights reserved.</p>
      </footer>
    </main>
  );
}
