"use client";

import Image from "@/components/ProgressiveImage";
import ActionButton from "@/components/ActionButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSectionTheme } from "@/hooks/useSectionTheme";
import RollText from "@/components/RollText";

const NAV_LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "Our Story", href: "/story" },
  { label: "Media Center", href: "/news" },
  { label: "FAQs", href: "/faqs" },
  { label: "Careers", href: "/careers" },
];

// Large serif links for the mobile menu overlay (matches Figma 991:520).
const MOBILE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "The Story", href: "/story" },
  { label: "News", href: "/news" },
  { label: "FAQs", href: "/faqs" },
  { label: "Careers", href: "/careers" },
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

  // Hide on scroll down, reveal on scroll up. Always shown near the top of the
  // page and while the mobile menu is open. Small jitters are ignored.
  const [scrollHidden, setScrollHidden] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (y < 80) setScrollHidden(false);
        else if (delta > 6) setScrollHidden(true);
        else if (delta < -6) setScrollHidden(false);
        if (Math.abs(delta) > 6 || y < 80) lastY = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  const hidden = scrollHidden && !menuOpen;

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      // Slides up while scrolling down and back in on scroll up. A page
      // section can also take over the top edge (e.g. the sticky "Our
      // Communities" bar on /projects) by setting data-nav-hidden on <html>;
      // the navbar then stays out of the way until it's cleared.
      className={`fixed inset-x-0 top-0 z-50 h-20 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] [[data-nav-hidden]_&]:-translate-y-full ${hidden ? "-translate-y-full" : ""}`}
    >
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
          className={`hidden items-center gap-7 lg:flex xl:gap-[42px] ${TRANSITION} ${onDark ? "text-white" : "text-black"}`}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="group font-sans text-[15px] font-medium uppercase opacity-90 lg:text-base transition-opacity duration-300 hover:opacity-100"
              >
                <RollText>{link.label}</RollText>
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA (desktop) — the site's shared button, compact. */}
        <span className="relative z-10 hidden lg:block">
          <ActionButton
            label="Contact us"
            href="/contact"
            size="sm"
            look="arrow"
            variant="solid"
            tone={onDark ? "light" : "dark"}
          />
        </span>

        {/* Hamburger / close (mobile) — the three bars morph into the X in
            place: the top and bottom bars meet in the middle and turn, the
            middle one fades out. */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className={`relative z-10 flex size-11 items-center justify-center lg:hidden ${
            menuOpen ? "text-black" : onDark ? "text-white" : "text-black"
          } transition-colors duration-300`}
        >
          <span aria-hidden className="relative block h-3 w-[18px]">
            {[
              menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
              `top-1/2 -translate-y-1/2 ${menuOpen ? "scale-x-0 opacity-0" : ""}`,
              menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-full -translate-y-full",
            ].map((pos, n) => (
              <span
                key={n}
                className={`absolute inset-x-0 h-[1.5px] bg-current transition-[top,translate,rotate,scale,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${pos}`}
              />
            ))}
          </span>
        </button>
      </nav>

      {/* Mobile menu overlay — the white panel unrolls from the top, then
          the links rise in one after another; it rolls back up on close. */}
      <div
        className={`fixed inset-0 -z-0 bg-white transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] lg:hidden ${
          menuOpen
            ? "pointer-events-auto [clip-path:inset(0_0_0_0)]"
            : "pointer-events-none [clip-path:inset(0_0_100%_0)] delay-150"
        }`}
      >
        <div className="flex h-full flex-col px-6 pb-10 pt-28">
          <nav className="flex flex-col font-serif font-light uppercase leading-[1.05] tracking-[-0.02em] text-black [font-size:clamp(2.75rem,14vw,3.5rem)]">
            {MOBILE_LINKS.map((link, i) => (
              <span key={link.label} className="block overflow-hidden py-[0.06em]">
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ transitionDelay: menuOpen ? `${280 + i * 55}ms` : "0ms" }}
                  className={`block transition-[translate,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-60 ${
                    menuOpen ? "translate-y-0 opacity-100 duration-700" : "translate-y-full opacity-0 duration-300"
                  }`}
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>
          <a
            href="tel:19172"
            style={{ transitionDelay: menuOpen ? "700ms" : "0ms" }}
            className={`mt-auto font-sans text-base font-medium text-black transition-opacity duration-500 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          >
            Call our hotline 19172
          </a>
        </div>
      </div>
    </header>
  );
}
