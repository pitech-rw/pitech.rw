const highlights = [
  {
    title: 'Public & regulated',
    body: 'Experience with national platforms and sector dashboards where stability and clarity matter.',
  },
  {
    title: 'Product & SaaS',
    body: 'Hands-on work with teams shipping customer-facing software and long-lived codebases.',
  },
  {
    title: 'Global collaboration',
    body: 'Engineering partnerships spanning Rwanda, Africa, and international institutions.',
  },
];

export default function Credibility() {
  return (
    <section
      aria-label="How clients work with Pi Tech"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <p className="text-center text-sm font-medium text-[var(--text-muted)]">
          Trusted for delivery where stakes are high
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {highlights.map((h) => (
            <li
              key={h.title}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/80 px-6 py-7 text-center backdrop-blur-sm md:text-left"
            >
              <h2 className="text-base font-semibold text-[var(--text-primary)]">
                {h.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {h.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
