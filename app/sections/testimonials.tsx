import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    name: 'Igenagaciro',
    blurb: 'Public-sector digital services',
    href: 'https://igenagaciro.irpv.rw/',
    image: '/irpv.svg',
    isSvg: true,
  },
  {
    name: 'Feru Energy',
    blurb: 'Safari Charger — EV charging experience',
    href: 'https://www.safaricharger.com/',
    image: '/safari.png',
    isSvg: false,
  },
  {
    name: 'PlayGorilla Games',
    blurb: 'Interactive gaming platform',
    href: 'https://www.playgorillagames.com/',
    image: '/gorillagames.png',
    isSvg: false,
  },
] as const;

export default function SelectedWork() {
  return (
    <section
      id="work"
      className="scroll-mt-24 border-t border-[var(--border-subtle)] py-24 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
              Selected work
            </h2>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
              Outcomes you can visit in the wild
            </p>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              A few public products and platforms where we&apos;ve contributed
              engineering, delivery, or ongoing support — from digital services
              to consumer experiences.
            </p>
          </div>
        </div>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {projects.map((p) => (
            <li key={p.name}>
              <Link
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] transition hover:border-[var(--accent-primary)]/30"
              >
                <div className="relative flex h-36 items-center justify-center border-b border-[var(--border-subtle)] bg-[var(--bg-deep)]/80 p-6">
                  {p.isSvg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt=""
                      className="max-h-12 w-auto object-contain opacity-90 transition group-hover:opacity-100"
                    />
                  ) : (
                    <Image
                      src={p.image}
                      alt=""
                      width={160}
                      height={48}
                      className="max-h-12 w-auto object-contain opacity-90 transition group-hover:opacity-100"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">
                    {p.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-[var(--text-secondary)]">
                    {p.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-primary)]">
                    Visit site
                    <span aria-hidden className="transition group-hover:translate-x-0.5">↗</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
