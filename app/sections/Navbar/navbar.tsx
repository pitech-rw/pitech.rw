'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import logo from '../../public/assets/logo.jpg';
import styles from './Navbar.module.css'

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Initial call to handleResize
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {!isMobile && (
          <Link
            href="/"
            className="">
            <span>
              PiTech
            </span>
          </Link>
        )}

        <div
          className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}
          id="navbar-sticky"
        >
          <ul className="">
            <li>
              <Link
                href={'/'}
                className= {styles.navLink}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={'#about'}
                className= {styles.navLink}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href={'#projects'}
                className= {styles.navLink}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href={'#contact'}
                className= {styles.navLink}
              >
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>
        {isMobile && (
          <div className="">
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className=""
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={handleMenuToggle}
            >
              <span className="sr-only">Open main menu</span>
              <svg 
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
