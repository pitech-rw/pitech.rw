const services = [
  {
    title: 'Product engineering',
    description:
      'Web applications, APIs, and integrations — structured for clarity, performance, and a codebase your team can own.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: 'Cloud & platforms',
    description:
      'Serverless and cloud-native architectures, environments, and pipelines your operators can reason about.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
  {
    title: 'Data & insights',
    description:
      'Dashboards, reporting, and pipelines that connect operational data to decisions — without fragile one-offs.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: 'Technical advisory',
    description:
      'Architecture reviews, roadmap sanity checks, and senior support so technical debt does not become a surprise tax.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75.002v-.006c0-.23-.05-.45-.138-.662M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function Services() {
  const [primary, ...rest] = services;

  return (
    <section
      id="services"
      className="scroll-mt-24 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 py-24 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
              Services
            </h2>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
              From first prototype to production traffic
            </p>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Engage us for a focused workstream or a broader program — we match
              seniority and pace to the risk profile of what you are shipping.
            </p>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--text-muted)] lg:text-right">
            Typical engagements blend delivery with advisory so decisions stay
            traceable and your internal team levels up along the way.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <li
            key={primary.title}
            className="group relative overflow-hidden rounded-2xl border border-[var(--accent-primary)]/20 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-deep)]/90 p-8 backdrop-blur-sm lg:row-span-3 lg:flex lg:flex-col lg:justify-between lg:p-10"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--accent-primary)]/10 blur-3xl transition group-hover:bg-[var(--accent-primary)]/15" aria-hidden />
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-primary)]/15 text-[var(--accent-primary)]">
                {primary.icon}
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-[var(--text-primary)]">
                {primary.title}
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--text-secondary)]">
                {primary.description}
              </p>
            </div>
            <p className="relative mt-8 text-sm font-medium text-[var(--accent-primary)] lg:mt-10">
              Core offering — most projects start here
            </p>
          </li>
          {rest.map((s) => (
            <li
              key={s.title}
              className="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 backdrop-blur-sm transition hover:border-[var(--accent-primary)]/25"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] transition group-hover:bg-[var(--accent-primary)]/20">
                {s.icon}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[var(--text-primary)]">
                {s.title}
              </h3>
              <p className="mt-2 leading-relaxed text-[var(--text-secondary)]">
                {s.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
