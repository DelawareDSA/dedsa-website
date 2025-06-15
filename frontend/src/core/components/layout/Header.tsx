'use client';

import hJson from '@/core/content/layout/header.json';
import { HeaderContent } from '@/core/types/layout';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const h = hJson as HeaderContent;

export default function Header() {
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  const p = usePathname();

  useEffect(() => {
    const onScroll = () => setSc(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const home = p === '/';

  return (
    <header
      className={`fixed w-full z-50 transition ${
        sc ? 'bg-white bg-opacity-95 shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="flex items-center justify-between space-x-6 container-page">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/dedsa-logo.png"
            alt="DSA logo featuring clasped black and white hands shaking in front of a red rose"
            width={40}
            height={40}
            className={`transition ${sc ? 'scale-90' : 'scale-100'}`}
          />
          <span
            className={`text-xl font-bold ${
              sc ? 'text-heading' : home ? 'text-on-accent' : 'text-heading'
            }`}
          >
            {h.siteName}
          </span>
        </Link>

        {/* Desktop nav, now centered */}
        <div className="items-center justify-center flex-1 hidden space-x-6 md:flex">
          {h.navItems.map((i: { name: string; href: string }) => (
            <Link
              key={i.name}
              href={i.href}
              className={`font-medium hover:text-dsa-red text-center transition ${
                sc ? 'text-nav' : home ? 'text-on-accent' : 'text-nav'
              }`}
            >
              {i.name}
            </Link>
          ))}
        </div>

        {/* Join button */}
        <div className="hidden md:flex">
          <Link
            href="/join"
            className={`btn ${
              sc
                ? 'btn-primary'
                : home
                  ? 'bg-white text-dsa-red'
                  : 'btn-primary'
            }`}
          >
            {h.joinButtonText}
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen(!open)}
        >
          <svg
            className={`h-6 w-6 ${
              sc ? 'text-heading' : home ? 'text-on-accent' : 'text-heading'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav, text-centered */}
      {open && (
        <nav className="flex flex-col items-center p-4 space-y-2 bg-white shadow-md md:hidden">
          {h.navItems.map((i: { name: string; href: string }) => (
            <Link
              key={i.name}
              href={i.href}
              className="block w-full px-2 py-1 text-center"
              onClick={() => setOpen(false)}
            >
              {i.name}
            </Link>
          ))}
          <Link
            href="/join"
            className="block w-full px-2 py-1 mt-2 text-center text-white bg-dsa-red"
            onClick={() => setOpen(false)}
          >
            {h.joinButtonText}
          </Link>
        </nav>
      )}
    </header>
  );
}
