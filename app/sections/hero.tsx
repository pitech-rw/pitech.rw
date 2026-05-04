import Link from 'next/link';

const pillars = [
  { label: 'Discovery → delivery', value: 'One accountable team' },
  { label: 'Cloud-native', value: 'Operate with confidence' },
  { label: 'Outcomes', value: 'Measurable reliability' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="hero-mesh relative min-h-[88vh] scroll-mt-20"
    >
      <div className="relative z-10 mx-auto grid max-w-6xl gap-14 px-6 pb-24 pt-28 md:px-8 md:pt-32 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-28">
        <div className="lg:col-span-7">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-1.5 text-sm text-[var(--text-secondary)] backdrop-blur-sm">
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent-primary)]"
              aria-hidden
            />
            Independent software consultancy · Kigali
          </p>
          <h1 className="text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-[3.25rem] xl:text-6xl xl:leading-[1.04]">
            Software that holds up in the real world.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl md:leading-relaxed">
            We help institutions and product teams ship dependable web platforms,
            cloud systems, and data tools — with clear scope, pragmatic
            architecture, and engineering you can maintain.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--accent-primary)] px-6 py-3.5 text-sm font-semibold text-[var(--bg-deep)] shadow-lg shadow-sky-500/10 transition hover:bg-[var(--accent-hover)]"
            >
              Book an intro call
            </Link>
            <Link
              href="#work"
              className="inline-flex items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-6 py-3.5 text-sm font-semibold text-[var(--text-primary)] backdrop-blur-sm transition hover:border-[var(--accent-primary)]/35"
            >
              See case studies
            </Link>
          </div>
          <ul className="mt-14 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-4">
            {pillars.map((p) => (
              <li key={p.label} className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  {p.label}
                </p>
                <p className="mt-1 text-base font-medium text-[var(--text-primary)]">
                  {p.value}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-5">
          <div
            className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-[var(--accent-primary)]/20 via-transparent to-[var(--accent-secondary)]/15 blur-2xl"
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl shadow-black/40 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
              <div className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-medium text-[var(--text-muted)]">
                Delivery snapshot
              </span>
              <span className="w-10" aria-hidden />
            </div>
            <div className="space-y-4 p-5 font-mono text-[13px] leading-relaxed text-[var(--text-secondary)] md:p-6">
              <p>
                <span className="text-[var(--accent-primary)]">→</span>{' '}
                <span className="text-[var(--text-primary)]">Scope</span> web
                platform + integrations
              </p>
              <p>
                <span className="text-[var(--accent-primary)]">→</span>{' '}
                <span className="text-[var(--text-primary)]">Stack</span>{' '}
                TypeScript, APIs, cloud-native deploy
              </p>
              <p>
                <span className="text-[var(--accent-primary)]">→</span>{' '}
                <span className="text-[var(--text-primary)]">Cadence</span>{' '}
                weekly demos, shared roadmap
              </p>
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-deep)]/80 p-4">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[var(--text-muted)]">Reliability target</span>
                  <span className="text-[var(--accent-primary)]">99.9%+</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--border-subtle)]">
                  <div
                    className="h-full w-[92%] rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
                    aria-hidden
                  />
                </div>
                <p className="mt-2 text-xs text-[var(--text-muted)]">
                  Observability, runbooks, and on-call readiness baked in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="glow-line relative z-10 mx-auto w-full max-w-6xl px-6 opacity-80 md:px-8" />
    </section>
  );
}
