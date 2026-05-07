'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
] as const;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    const preferredTheme =
      storedTheme === 'light' || storedTheme === 'dark'
        ? storedTheme
        : window.matchMedia('(prefers-color-scheme: light)').matches
          ? 'light'
          : 'dark';

    document.documentElement.setAttribute('data-theme', preferredTheme);
    setTheme(preferredTheme);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onResize = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMenuOpen]);

  const handleThemeToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    window.localStorage.setItem('theme', nextTheme);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
          <Image src="/assets/logo.png" alt="Pi Tech" width={100} height={100} className="w-10 h-10" />
        </Link>

        <div
          className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}
          id="navbar-sticky"
        >
          <ul className={styles.navList}>
            {navLinks.map(({ href, label }) => (
              <li key={href + label}>
                <Link
                  href={href}
                  className={styles.navLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className={styles.ctaWrap}>
              <Link
                href="#contact"
                className={styles.ctaButton}
                onClick={() => setIsMenuOpen(false)}
              >
                Let&apos;s talk
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.themeToggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={handleThemeToggle}
          >
            {theme === 'dark' ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25M12 18.75V21M4.636 4.636l1.591 1.591M17.773 17.773l1.591 1.591M3 12h2.25M18.75 12H21M4.636 19.364l1.591-1.591M17.773 6.227l1.591-1.591M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3c-.005.145-.008.29-.008.436a7.5 7.5 0 009.798 7.146z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            className={styles.mobileMenuButton}
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((o) => !o)}
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
