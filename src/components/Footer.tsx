"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "The Story", href: "/story" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const IN_THE_CITY = [
  "Swanlake Katameya",
  "Seasons Residences",
  "Parkview Katameya",
  "Swanlake Residences - New Cairo",
  "Swanlake October",
  "Swanlake West",
  "Haptown - Mostakbal City",
  "The Valleys - Mostakbal City",
  "Park Central – Mostakbal City",
  "Keys|52",
];

const BY_THE_SEA = [
  "Swanlake Northcoast",
  "Swanlake El Gouna",
  "Little Venice",
  "Encore",
];

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

function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382C17.178 14.233 15.752 13.533 15.482 13.433C15.212 13.333 15.012 13.283 14.812 13.583C14.612 13.883 14.062 14.533 13.892 14.733C13.722 14.933 13.552 14.958 13.258 14.808C12.964 14.658 12.032 14.358 10.932 13.383C10.072 12.618 9.492 11.683 9.322 11.383C9.152 11.083 9.302 10.923 9.452 10.773C9.582 10.643 9.752 10.433 9.902 10.258C10.052 10.083 10.102 9.958 10.202 9.758C10.302 9.558 10.252 9.383 10.177 9.233C10.102 9.083 9.502 7.658 9.252 7.058C9.012 6.478 8.762 6.558 8.582 6.548L8.012 6.533C7.812 6.533 7.492 6.608 7.222 6.908C6.952 7.208 6.202 7.908 6.202 9.333C6.202 10.758 7.252 12.133 7.402 12.333C7.552 12.533 9.492 15.523 12.452 16.758C13.152 17.058 13.702 17.233 14.132 17.368C14.832 17.583 15.472 17.553 15.982 17.478C16.552 17.393 17.722 16.783 17.972 16.108C18.222 15.433 18.222 14.858 18.147 14.733C18.072 14.608 17.872 14.533 17.572 14.383L17.472 14.382ZM12.052 21.788H12.047C10.2438 21.7884 8.47283 21.3059 6.907 20.388L6.547 20.173L2.847 21.143L3.837 17.543L3.597 17.168C2.58912 15.5458 2.05689 13.6834 2.057 11.782C2.06 6.272 6.547 1.788 12.057 1.788C14.722 1.788 17.227 2.828 19.107 4.708C20.987 6.588 22.027 9.093 22.027 11.788C22.023 17.298 17.537 21.788 12.052 21.788ZM20.527 3.288C18.267 1.028 15.257 -0.212 12.052 -0.212C5.462 -0.212 0.072 5.178 0.067 11.778C0.067 13.878 0.617 15.928 1.667 17.738L0 24L6.407 22.368C8.147 23.328 10.082 23.828 12.047 23.828H12.052C18.642 23.828 24.032 18.438 24.037 11.838C24.037 8.608 22.787 5.548 20.527 3.288Z" fill="white"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="17.5" cy="6.5" r="1" fill="white"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82072 5.55057 1.57879 5.98541 1.46 6.46C1.14521 8.20556 0.991235 9.97631 1 11.75C0.988787 13.537 1.14277 15.3213 1.46 17.08C1.59096 17.5398 1.83831 17.9581 2.17817 18.2945C2.51803 18.6308 2.93882 18.8738 3.4 19C5.12 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0708 18.8668 21.498 18.6118 21.8387 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 23.0063 13.5103 23 11.75C23.0112 9.96295 22.8573 8.1787 22.54 6.42Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.75 15.02L15.5 11.75L9.75 8.48V15.02Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="2" y="9" width="4" height="12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="4" cy="4" r="2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
          You&apos;re subscribed — welcome to HAP.
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
      <div
        className={`flex items-center gap-3 border py-2 pl-4 pr-2 transition-colors duration-200 ${borderState}`}
      >
        <input
          type="email"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Your Email"
          aria-label="Email address"
          className="min-w-0 flex-1 bg-transparent font-sans text-base font-medium leading-[1.4] text-white placeholder:text-white/50 focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 bg-white/80 px-5 py-3 font-serif text-sm font-medium uppercase leading-[1.4] text-black transition-colors duration-300 hover:bg-white"
        >
          Subscribe now
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 font-sans text-sm font-medium leading-[1.4] text-error">
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}

function ProjectLinks({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-1 text-base leading-[1.4]">
      {items.map((project) => (
        <a
          key={project}
          href="#"
          className="transition-colors duration-300 hover:text-white/70"
        >
          {project}
        </a>
      ))}
    </div>
  );
}

/** Collapsible project list — used on mobile only. */
function FooterAccordion({ title, items }: { title: string; items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/16">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-left"
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
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-16 px-6 py-12 md:min-h-[912px] md:gap-0 md:p-16">
        {/* ── Top section ── */}
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Left column: Nav + Newsletter */}
          <div className="flex w-full flex-col gap-12 md:w-[468px] md:justify-between md:gap-0 md:self-stretch">
            <Reveal>
            <nav className="flex flex-col font-serif font-light uppercase leading-none tracking-[-0.02em] text-[3.25rem] md:text-[5.125rem]">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`transition-colors duration-300 hover:text-white ${
                      active ? "text-white" : "text-white/30"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-7">
              <div className="flex flex-col gap-1">
                <p className="font-serif text-[1.625rem] font-normal uppercase leading-none tracking-[-0.02em]">
                  Subscribe to our newsletter
                </p>
                <p className="font-sans text-base font-medium leading-[1.4]">
                  Stay in the know of all the HAP properties
                </p>
              </div>
              <NewsletterField />
            </Reveal>
          </div>

          {/* Right column: Projects + Contact */}
          <Reveal delay={0.05} className="flex w-full flex-col gap-[52px] md:w-[685px]">
            <div className="flex flex-col gap-[66px]">
              {/* Project listings — accordions on mobile, two columns on desktop */}
              <div className="font-sans font-medium">
                <div className="flex flex-col md:hidden">
                  <FooterAccordion title="In the City" items={IN_THE_CITY} />
                  <FooterAccordion title="By the Sea" items={BY_THE_SEA} />
                </div>
                <div className="hidden items-start justify-between md:flex">
                  <div className="flex flex-1 flex-col gap-7">
                    <p className="text-[1.625rem] leading-[1.3]">In the City</p>
                    <ProjectLinks items={IN_THE_CITY} />
                  </div>
                  <div className="flex flex-1 flex-col gap-7">
                    <p className="text-[1.625rem] leading-[1.3]">By the Sea</p>
                    <ProjectLinks items={BY_THE_SEA} />
                  </div>
                </div>
              </div>

              {/* Get In Touch + Social Media */}
              <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-1 flex-col gap-7">
                  <p className="font-sans text-[1.625rem] font-medium leading-[1.3]">
                    Get In Touch
                  </p>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <a href="mailto:info@hap.com.eg" className="flex items-center gap-3 font-sans text-base font-medium leading-[1.4] transition-colors duration-300 hover:text-white/70">
                        <MailIcon />
                        info@hap.com.eg
                      </a>
                      <a href="tel:+2019172" className="flex items-center gap-3 font-sans text-base font-medium leading-[1.4] transition-colors duration-300 hover:text-white/70">
                        <CallIcon />
                        +20 19 172
                      </a>
                      <a href="#" className="flex items-center gap-3 font-sans text-base font-medium leading-[1.4] transition-colors duration-300 hover:text-white/70">
                        <WhatsAppIcon />
                        Hap on WhatsApp
                      </a>
                    </div>
                    <p className="font-sans text-base font-medium leading-[1.4]">
                      Hassan Allam Properties Head Office Building
                      <br />
                      67 - Southern Road 90 - New Cairo - Egypt
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-7">
                  <p className="font-sans text-[1.625rem] font-medium leading-[1.3]">
                    Social Media
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="opacity-100 transition-opacity duration-300 hover:opacity-70" aria-label="Instagram">
                      <InstagramIcon />
                    </a>
                    <a href="#" className="opacity-100 transition-opacity duration-300 hover:opacity-70" aria-label="Facebook">
                      <FacebookIcon />
                    </a>
                    <a href="#" className="opacity-100 transition-opacity duration-300 hover:opacity-70" aria-label="YouTube">
                      <YouTubeIcon />
                    </a>
                    <a href="#" className="opacity-100 transition-opacity duration-300 hover:opacity-70" aria-label="LinkedIn">
                      <LinkedInIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-white/16" />
          </Reveal>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 flex flex-col gap-4 font-sans text-sm font-medium leading-[1.4] md:mt-0 md:flex-row md:items-center md:justify-between md:text-base">
          <div className="flex items-center gap-7">
            <p>&copy; {new Date().getFullYear()} HAP</p>
            <a href="#" className="transition-colors duration-300 hover:text-white/70">Terms of Use</a>
            <a href="#" className="transition-colors duration-300 hover:text-white/70">Privacy policy</a>
          </div>
          <p className="uppercase">Web Design &amp; Development by MitchDesigns</p>
        </div>
      </div>
    </footer>
  );
}
