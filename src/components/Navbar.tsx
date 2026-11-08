"use client";

import Image from "@/components/ProgressiveImage";
import ActionButton from "@/components/ActionButton";
import Link from "@/components/LocaleLink";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSectionTheme } from "@/hooks/useSectionTheme";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import { switchHref } from "@/i18n";
import { withBasePath } from "@/lib/basePath";

// FAQs and Careers live in the footer only.
const NAV_LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "The Story", href: "/story" },
  { label: "Media Center", href: "/news" },
];

// Large serif links for the mobile menu overlay (matches Figma 991:520).
const MOBILE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "The Story", href: "/story" },
  { label: "Media Center", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const TRANSITION = "transition-[color,background-color,opacity] duration-500 ease-out";

export default function Navbar() {
  // `theme` describes the section *behind* the navbar.
  // dark section  -> show the white "on-dark" navbar
  // light section -> show the black "on-light" navbar
  const theme = useSectionTheme(40);
  const t = useT();
  const [menuOpen, setMenuOpen] = useState(false);

  // Once the page scrolls past the top, the header compacts (80 → 64px) and
  // turns solid white with dark ink. Its height is shared as --nav-h so
  // bars pinned under it (Projects' communities bar, the careers Apply bar)
  // follow it.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => setScrolled(window.scrollY > 40);
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  useEffect(() => {
    document.documentElement.style.setProperty("--nav-h", scrolled ? "64px" : "80px");
  }, [scrolled]);

  // White ink only over a dark section at the very top.
  const onDark = theme === "dark" && !scrolled;

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    // Always fixed at the top — it no longer hides while scrolling.
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[height,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        scrolled && !menuOpen ? "h-16 shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "h-20"
      }`}
    >
      {/* Solid white once scrolled. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-white transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
      />
      {/* Progressive background blur — three stacked backdrop-blur layers with
          successively shorter gradient masks, so the blur is strongest at the
          very top and dissolves smoothly into the page. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-28 transition-opacity duration-500 ${scrolled ? "opacity-0" : "opacity-100"}`}
      >
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
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-white/65 to-transparent transition-opacity duration-500 ${onDark || scrolled || menuOpen ? "opacity-0" : "opacity-100"}`}
      />

      <nav className="relative flex h-full w-full items-center justify-between px-6 md:px-12 lg:px-16">
        {/* Logo — both variants stacked and cross-faded. */}
        <Link
          href="/"
          aria-label={t("Hassan Allam Properties — home")}
          className={`relative z-10 block shrink-0 transition-[width,height] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled && !menuOpen ? "h-7 w-[120px]" : "h-9 w-[150px]"
          }`}
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/logo-on-light.svg"
            alt={t("Hassan Allam Properties")}
            fill
            priority
            sizes="150px"
            className={`object-contain object-left rtl:object-right ${TRANSITION} ${onDark && !menuOpen ? "opacity-0" : "opacity-100"}`}
          />
          <Image
            src="/logo-on-dark.svg"
            alt=""
            aria-hidden
            fill
            priority
            sizes="150px"
            className={`object-contain object-left rtl:object-right ${TRANSITION} ${onDark && !menuOpen ? "opacity-100" : "opacity-0"}`}
          />
        </Link>

        {/* Primary links (desktop) — pinned to the exact centre of the bar,
            whatever the widths of the logo and the hotline/CTA group. */}
        <ul
          className={`hidden items-center gap-7 lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2 xl:gap-[42px] ${TRANSITION} ${onDark ? "text-white" : "text-black"}`}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="font-sans text-[15px] font-medium uppercase opacity-70 transition-opacity duration-300 hover:opacity-100 lg:text-base"
              >
                {t(link.label)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hotline + CTA (desktop) — the hotline styled like the links,
            the CTA the site's shared button, compact. */}
        <span className={`relative z-10 hidden items-center gap-6 lg:flex ${TRANSITION} ${onDark ? "text-white" : "text-black"}`}>
          <LanguageSwitch />
          <a
            href="tel:19172"
            aria-label={t("Call our hotline 19172")}
            className="flex items-center gap-1 font-sans text-base font-medium tabular-nums opacity-70 transition-opacity duration-300 hover:opacity-100"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14.0993 20.763 10.4202 19.1065 7.65683 16.3432C4.8935 13.5798 3.23705 9.90074 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            19172
          </a>
          <ActionButton
            label={t("Contact us")}
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
          aria-label={menuOpen ? t("Close menu") : t("Open menu")}
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
                  className={`block transition-[translate,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-2 rtl:hover:-translate-x-2 ${
                    menuOpen ? "translate-y-0 opacity-100 duration-700" : "translate-y-full opacity-0 duration-300"
                  }`}
                >
                  {t(link.label)}
                </Link>
              </span>
            ))}
          </nav>
          <a
            href="tel:19172"
            style={{ transitionDelay: menuOpen ? "700ms" : "0ms" }}
            className={`mt-auto font-sans text-base font-medium text-black transition-opacity duration-500 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          >
            {t("Call our hotline 19172")}
          </a>
        </div>
      </div>
    </header>
  );
}

/** The other language, small, beside the hotline: "العربية" (in Alexandria)
 *  on the English site, "English" on the Arabic one. A full page load, since
 *  each language has its own root layout. */
function LanguageSwitch({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const toAr = locale === "en";
  return (
    <a
      href={withBasePath(switchHref(locale, pathname))}
      lang={toAr ? "ar" : "en"}
      hrefLang={toAr ? "ar" : "en"}
      className={`text-sm opacity-70 transition-opacity duration-300 hover:opacity-100 ${
        toAr ? "font-[family-name:var(--font-alexandria),sans-serif] font-light" : "font-sans font-medium"
      } ${className}`}
    >
      {toAr ? "العربية" : "English"}
    </a>
  );
}
