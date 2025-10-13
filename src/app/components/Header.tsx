"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((previous) => !previous);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <Image
            src="/logo.png"
            alt="UniGPA logo"
            width={100}
            height={100}
            className="object-contain rounded"
          />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/calculator"
            className="rounded-2xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Calculator
          </Link>
        </div>
        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:text-blue-600 md:hidden"
          onClick={toggleMenu}
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-0.5 w-5 bg-current before:absolute before:-top-1.5 before:block before:h-0.5 before:w-5 before:bg-current after:absolute after:top-1.5 after:block after:h-0.5 after:w-5 after:bg-current" />
        </button>
      </div>
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-base font-medium text-slate-600">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-xl px-3 py-2 transition hover:bg-blue-50 hover:text-blue-600"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/calculator"
              className="rounded-2xl bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              onClick={closeMenu}
            >
              Calculator
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
