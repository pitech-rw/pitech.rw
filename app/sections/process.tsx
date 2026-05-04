const steps = [
  {
    phase: '01',
    title: 'Align',
    description:
      'We clarify goals, constraints, and success metrics — so scope matches reality and stakeholders stay in sync.',
  },
  {
    phase: '02',
    title: 'Design & build',
    description:
      'Iterative delivery with visible progress: APIs, UIs, infra, and tests that match how your team actually operates.',
  },
  {
    phase: '03',
    title: 'Launch',
    description:
      'Hardening, observability, and handover documentation — so go-live is boring in the best way.',
  },
  {
    phase: '04',
    title: 'Evolve',
    description:
      'Ongoing improvements, performance work, and advisory as your product and traffic grow.',
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-24 border-t border-[var(--border-subtle)] py-24 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
            How we work
          </h2>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
            A partnership, not a black box
          </p>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            Clear communication and predictable rhythms — so you always know
            what shipped, what is next, and why.
          </p>
        </div>
        <div className="relative mt-16">
          <div
            className="pointer-events-none absolute left-0 right-0 top-[1.125rem] hidden h-px bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent lg:block"
            aria-hidden
          />
          <ol className="relative grid gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-12 lg:grid-cols-4 lg:gap-8">
            {steps.map((s) => (
              <li key={s.phase} className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--accent-primary)]/40 bg-[var(--bg-deep)] text-xs font-bold text-[var(--accent-primary)]">
                  {s.phase}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[var(--text-primary)]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {s.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
