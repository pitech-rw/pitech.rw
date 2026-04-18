import Link from 'next/link';

const highlights = [
  {
    title: 'Mission-driven delivery',
    body: 'We help businesses realize their potential through dependable IT solutions and products built for real-world operations.',
  },
  {
    title: 'Regional & global experience',
    body: 'From public-sector platforms to high-growth startups, we bring lessons learned across Rwanda and international engagements.',
  },
  {
    title: 'Long-term reliability',
    body: 'We design for maintainability and availability — so your systems stay fast, observable, and easy to evolve.',
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 py-24 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-start">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
              About Pi Tech
            </h2>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
              Engineering discipline, without the attitude
            </p>
            <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              Pi Tech Ltd. is a Kigali-registered software consultancy. We build
              and operate modern web platforms, cloud systems, and data tools —
              from greenfield products to hardening and extending systems
              already in market.
            </p>
            <Link
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-primary)] transition hover:text-[var(--accent-hover)]"
            >
              Discuss your roadmap
              <span aria-hidden>→</span>
            </Link>
          </div>
          <ul className="flex flex-col gap-6">
            {highlights.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[var(--text-secondary)] leading-relaxed">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
