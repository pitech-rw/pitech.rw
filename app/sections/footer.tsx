import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-deep)]">
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-2">
            <p className="text-lg font-semibold text-[var(--text-primary)]">Pi Tech</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
              Software development and consultancy from Kigali — web platforms,
              cloud systems, and data tools for teams that need engineering done
              right.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Navigate
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]">
                  Company
                </Link>
              </li>
              <li>
                <a href="#services" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]">
                  Services
                </a>
              </li>
              <li>
                <a href="#process" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]">
                  Process
                </a>
              </li>
              <li>
                <a href="#work" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]">
                  Work
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="mailto:info@pitech.rw"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
                >
                  info@pitech.rw
                </a>
              </li>
              <li>
                <a
                  href="tel:+250787799082"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
                >
                  +250 787 779 082
                </a>
              </li>
              <li>
                <Link href="/book" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]">
                  Book an intro call
                </Link>
              </li>
              <li>
                <a href="/#contact" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]">
                  Project inquiry
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--border-subtle)] pt-8 text-sm text-[var(--text-muted)] md:flex-row md:items-center">
          <p>© {year} Pi Tech Ltd · All rights reserved.</p>
          <p className="text-xs">Kigali, Rwanda</p>
        </div>
      </div>
    </footer>
  );
}
