"use client";

import Link from "@/components/LocaleLink";
import RollText from "@/components/RollText";
import { LIVE_PROJECTS } from "@/data/hapLive";
import { projectHref } from "@/data/projectDetail";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useT } from "@/i18n/LocaleProvider";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "The Story", href: "/story" },
  { label: "Media Center", href: "/news" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
  { label: "Careers", href: "/careers" },
];

// Every live project (src/data/hapLive.ts), each linking to its own page.
type FooterProject = { name: string; id: string };
const byGroup = (group: "city" | "sea"): FooterProject[] =>
  LIVE_PROJECTS.filter((p) => p.group === group).map((p) => ({ name: p.name, id: p.slug }));
const IN_THE_CITY = byGroup("city");
const BY_THE_SEA = byGroup("sea");

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 6L12 13L22 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CallIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14.0993 20.763 10.4202 19.1065 7.65683 16.3432C4.8935 13.5798 3.23705 9.90074 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Figma icon library "location-01" (17043:31753) — same 1.5px outline set as
// the mail/call icons beside it.
function LocationIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="shrink-0">
      <path d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z" stroke="white" strokeWidth="1.5"/>
      <path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z" stroke="white" strokeWidth="1.5"/>
    </svg>
  );
}

// Solid social marks (white, 22px) — the Instagram glyph is cut out of
// its rounded square with a mask so the page shows through.
function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <mask id="ig-cut">
        <rect width="24" height="24" fill="white" />
        <circle cx="12" cy="12" r="4.6" fill="none" stroke="black" strokeWidth="1.9" />
        <circle cx="17.6" cy="6.4" r="1.25" fill="black" />
      </mask>
      <rect x="1" y="1" width="22" height="22" rx="6.5" fill="white" mask="url(#ig-cut)" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/**
 * Newsletter subscribe field with real interaction states:
 * default → hover (desktop) → focus/active → filled → error → success.
 * On mobile the button drops to full width (site-wide button rule).
 */
function NewsletterField() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const t = useT();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    setStatus(valid ? "success" : "error");
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 border border-field-success bg-field-success/10 px-4 py-4">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="shrink-0 text-field-success">
          <path d="M4 10.5l3.5 3.5L16 5.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="font-sans text-base font-medium leading-[1.4] text-white">
          {t("You’re subscribed — welcome to HAP.")}
        </p>
      </div>
    );
  }

  const borderState =
    status === "error"
      ? "border-error"
      : `focus-within:border-white ${value ? "border-white/70" : "border-white/40 hover:border-white/70"}`;

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* One line on every breakpoint — input + button side by side. */}
      <div
        className={`flex items-center gap-3 border py-2 ps-4 pe-2 transition-colors duration-200 ${borderState}`}
      >
        <input
          type="email"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder={t("Your Email")}
          aria-label={t("Email address")}
          className="min-w-0 flex-1 bg-transparent font-sans text-base font-medium leading-[1.4] text-white placeholder:text-white/50 focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 bg-white/80 px-4 py-3 font-serif text-sm font-medium uppercase leading-[1.4] text-black transition-colors duration-300 hover:bg-white sm:px-5"
        >
          {t("Subscribe")}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 font-sans text-sm font-medium leading-[1.4] text-error">
          {t("Please enter a valid email address.")}
        </p>
      )}
    </form>
  );
}

function ProjectLinks({ items }: { items: FooterProject[] }) {
  const t = useT();
  return (
    <div className="flex flex-col gap-3 text-base leading-[1.4]">
      {items.map((project) => (
        <Link
          key={project.id}
          href={projectHref(project.id)}
          className="text-white/75 transition-colors duration-300 hover:text-white"
        >
          {t(project.name)}
        </Link>
      ))}
    </div>
  );
}

/** Collapsible project list — used on mobile only. */
function FooterAccordion({ title, items }: { title: string; items: FooterProject[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/16">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-start"
      >
        <span className="font-sans text-[1.625rem] font-medium leading-[1.3]">
          {title}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
          className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <ProjectLinks items={items} />
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const t = useT();
  const pathname = usePathname() ?? "/";
  // Only the link whose pathname matches the current route is active.
  // On "/", only "Home" lights up — section anchors (/#story etc.) stay dim
  // because we don't track which section is in view here.
  const isActive = (href: string) => {
    const target = href.split("#")[0] || "/";
    const hasHash = href.includes("#");
    if (target === "/") return pathname === "/" && !hasHash;
    return pathname === target || pathname.startsWith(`${target}/`);
  };
  return (
    <footer
      id="contact"
      data-nav-theme="dark"
      className="bg-black text-white"
    >
      <div className="flex flex-col gap-10 p-6 md:p-16">
        {/* ── Top section: nav (left) + projects/contact/newsletter (right) ── */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          {/* Left column: Nav — Figma Footer 17099:2537: 567px of 1312 (43.2%),
              78px display serif, one line per link from lg up. Both scale down
              below 1440. Below lg the nav stacks above the columns so tablets
              don't overflow; phones may wrap a long link. */}
          <nav className="flex w-full flex-col font-serif font-light uppercase leading-none tracking-[-0.02em] text-[2.5rem] lg:w-auto lg:shrink-0 md:[font-size:clamp(2.75rem,5.42vw,4.875rem)] lg:whitespace-nowrap">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                // Hover: the dim → white lift.
                <Link
                  key={link.label}
                  href={link.href}
                  className={`group self-start transition-colors duration-300 hover:text-white ${
                    active ? "text-white" : "text-white/30"
                  }`}
                >
                  <RollText>{t(link.label)}</RollText>
                </Link>
              );
            })}
          </nav>

          {/* Right column: Projects + Get In Touch, then Newsletter below */}
          <div className="flex w-full min-w-0 flex-col gap-12 md:gap-[52px] lg:flex-1">
            {/* Project listings — accordions on mobile, three columns on desktop */}
            <div className="font-sans font-medium">
              <div className="flex flex-col md:hidden">
                <FooterAccordion title={t("In the City")} items={IN_THE_CITY} />
                <FooterAccordion title={t("By the Sea")} items={BY_THE_SEA} />
              </div>
              <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-[66px]">
                <div className="hidden flex-1 flex-col gap-7 md:flex">
                  <p className="text-[1.375rem] leading-[1.3] md:text-[1.625rem]">{t("In the City")}</p>
                  <ProjectLinks items={IN_THE_CITY} />
                </div>
                <div className="hidden flex-1 flex-col gap-7 md:flex">
                  <p className="text-[1.375rem] leading-[1.3] md:text-[1.625rem]">{t("By the Sea")}</p>
                  <ProjectLinks items={BY_THE_SEA} />
                </div>

                {/* Get In Touch — contact rows + socials in one stack */}
                <div className="flex flex-1 flex-col gap-7 pt-10 md:pt-0">
                  <p className="text-[1.375rem] leading-[1.3] md:text-[1.625rem]">{t("Get In Touch")}</p>
                  <div className="flex flex-col gap-3">
                    <a href="mailto:info@hap.com.eg" className="flex items-center gap-3 text-base leading-[1.4] text-white/75 transition-colors duration-300 hover:text-white">
                      <MailIcon />
                      info@hap.com.eg
                    </a>
                    <a href="tel:19172" className="flex items-center gap-3 text-base leading-[1.4] text-white/75 transition-colors duration-300 hover:text-white">
                      <CallIcon />
                      19172
                    </a>
                    {/* Opens the head office in Google Maps. */}
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Hassan+Allam+Properties+Head+Office%2C+Building+67%2C+Southern+Road+90%2C+New+Cairo%2C+Egypt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/map flex items-start gap-3 text-base leading-[1.4]"
                    >
                      <span className="mt-px shrink-0"><LocationIcon /></span>
                      <span className="flex flex-col gap-0.5">
                        <span className="decoration-1 underline-offset-4 group-hover/map:underline">{t("HAP Head Office")}</span>
                        <span className="text-white/75 transition-colors duration-300 group-hover/map:text-white">{t("Building 67 - Southern Road 90 - New Cairo - Egypt")}</span>
                      </span>
                    </a>
                    <div className="flex gap-4 pt-1">
                      <a href="https://www.instagram.com/hassanallamproperties/" target="_blank" rel="noopener noreferrer" className="opacity-70 transition-opacity duration-300 hover:opacity-100" aria-label="Instagram">
                        <InstagramIcon />
                      </a>
                      <a href="https://www.facebook.com/HassanAllamProperties/" target="_blank" rel="noopener noreferrer" className="opacity-70 transition-opacity duration-300 hover:opacity-100" aria-label="Facebook">
                        <FacebookIcon />
                      </a>
                      <a href="https://www.youtube.com/@hassanallamproperties" target="_blank" rel="noopener noreferrer" className="opacity-70 transition-opacity duration-300 hover:opacity-100" aria-label="YouTube">
                        <YouTubeIcon />
                      </a>
                      <a href="https://www.linkedin.com/company/hassan-allam-properties/" target="_blank" rel="noopener noreferrer" className="opacity-70 transition-opacity duration-300 hover:opacity-100" aria-label="LinkedIn">
                        <LinkedInIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter — title with the field beside it on wide screens,
                stacked below that. */}
            <div className="flex w-full flex-col gap-5 min-[1440px]:flex-row min-[1440px]:items-center min-[1440px]:justify-between min-[1440px]:gap-10">
              <div className="flex flex-col gap-1">
                <p className="font-serif text-[1.625rem] font-normal uppercase leading-none tracking-[-0.02em] min-[1440px]:whitespace-nowrap">
                  {t("Join our Newsletter")}
                </p>
                <p className="font-sans text-base font-medium leading-[1.4]">
                  {t("Stay in the know of all the HAP properties")}
                </p>
              </div>
              <div className="w-full max-w-[600px] min-[1440px]:min-w-[320px] min-[1440px]:flex-1">
                <NewsletterField />
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px w-full bg-white/16" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col gap-4 font-sans text-xs font-normal leading-[1.4] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-7">
            <p>&copy; {new Date().getFullYear()} HAP</p>
            <a href="https://www.hap.com.eg/legals/terms-of-use/" target="_blank" rel="noopener noreferrer" className="text-white/75 transition-colors duration-300 hover:text-white">{t("Terms of Use")}</a>
            <a href="https://www.hap.com.eg/legals/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-white/75 transition-colors duration-300 hover:text-white">{t("Privacy policy")}</a>
          </div>
          <p className="uppercase">{t("Web Design & Development by MitchDesigns")}</p>
        </div>
      </div>
    </footer>
  );
}
