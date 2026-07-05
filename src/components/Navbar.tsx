"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSectionTheme } from "@/hooks/useSectionTheme";

const NAV_LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "Our Story", href: "/story" },
  { label: "Media Center", href: "/news" },
  { label: "FAQs", href: "/faqs" },
];

// Large serif links for the mobile menu overlay (matches Figma 991:520).
const MOBILE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "The Story", href: "/story" },
  { label: "News", href: "/news" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

const TRANSITION = "transition-[color,background-color,opacity] duration-500 ease-out";

export default function Navbar() {
  // `theme` describes the section *behind* the navbar.
  // dark section  -> show the white "on-dark" navbar
  // light section -> show the black "on-light" navbar
  const theme = useSectionTheme(40);
  const onDark = theme === "dark";
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-20">
      {/* Progressive background blur — three stacked backdrop-blur layers with
          successively shorter gradient masks, so the blur is strongest at the
          very top and dissolves smoothly into the page. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-28">
        <div className="absolute inset-0 backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,black_0%,black_40%,transparent_78%)]" />
        <div className="absolute inset-0 backdrop-blur-[5px] [mask-image:linear-gradient(to_bottom,black_0%,black_28%,transparent_58%)]" />
        <div className="absolute inset-0 backdrop-blur-[12px] [mask-image:linear-gradient(to_bottom,black_0%,transparent_38%)]" />
      </div>

      {/* Legibility scrims, cross-faded so text stays readable over any section. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 to-transparent transition-opacity duration-500 ${onDark && !menuOpen ? "opacity-100" : "opacity-0"}`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-white/65 to-transparent transition-opacity duration-500 ${onDark && !menuOpen ? "opacity-0" : "opacity-100"}`}
      />

      <nav className="relative flex h-full w-full items-center justify-between px-6 md:px-12 lg:px-16">
        {/* Logo — both variants stacked and cross-faded. */}
        <Link
          href="/"
          aria-label="Hassan Allam Properties — home"
          className="relative z-10 block h-9 w-[150px] shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/logo-on-light.svg"
            alt="Hassan Allam Properties"
            fill
            priority
            sizes="150px"
            className={`object-contain object-left ${TRANSITION} ${onDark && !menuOpen ? "opacity-0" : "opacity-100"}`}
          />
          <Image
            src="/logo-on-dark.svg"
            alt=""
            aria-hidden
            fill
            priority
            sizes="150px"
            className={`object-contain object-left ${TRANSITION} ${onDark && !menuOpen ? "opacity-100" : "opacity-0"}`}
          />
        </Link>

        {/* Primary links (desktop) */}
        <ul
          className={`hidden items-center gap-9 md:flex lg:gap-10 ${TRANSITION} ${onDark ? "text-white" : "text-black"}`}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="font-sans text-[18px] font-medium opacity-90 transition-opacity duration-300 hover:opacity-100"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA (desktop) — inverse fill sweeps up from the bottom edge. */}
        <Link
          href="/contact"
          className={`group relative hidden h-[52px] items-center justify-center overflow-hidden px-6 font-serif text-[18px] uppercase tracking-[0.06em] md:flex ${TRANSITION} ${
            onDark
              ? "bg-white/90 text-black hover:text-white"
              : "bg-black/90 text-white hover:text-black"
          }`}
        >
          <span
            aria-hidden
            className={`absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0 ${
              onDark ? "bg-black" : "bg-white"
            }`}
          />
          <span className="relative z-10">Contact us</span>
        </Link>

        {/* Hamburger / close (mobile) */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className={`relative z-10 flex size-11 items-center justify-center md:hidden ${
            menuOpen ? "bg-black text-white" : onDark ? "text-white" : "text-black"
          } transition-colors duration-300`}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 -z-0 bg-white transition-opacity duration-300 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-6 pb-10 pt-28">
          <nav className="flex flex-col font-serif font-light uppercase leading-[1.05] tracking-[-0.02em] text-black [font-size:clamp(2.75rem,14vw,3.5rem)]">
            {MOBILE_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="transition-opacity duration-200 hover:opacity-60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href="#"
            className="mt-auto font-sans text-base font-medium text-black"
          >
            Hap in WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
