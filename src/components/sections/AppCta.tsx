"use client";

import Image from "@/components/ProgressiveImage";
import { Reveal } from "@/components/Reveal";
import ActionButton from "@/components/ActionButton";
import { withBasePath } from "@/lib/basePath";
import { useT } from "@/i18n/LocaleProvider";

// Where "Scan to download" (desktop QR) and "Download app" (mobile) lead.
// Placeholder until the store link is ready — regenerate the QR with
// `npm run qr -- "<url>"` when this changes.
const APP_DOWNLOAD_URL = "https://google.com";

const KEY_BENEFITS = [
  "Effortlessly explore your community",
  "Instantly request home services with ease",
  "Pay your utility bills anytime, anywhere",
];

function StoreBadges() {
  const t = useT();
  return (
    <div className="flex items-center gap-[11px]">
      <a
        href="https://apps.apple.com/us/app/hassan-allam-properties-app/id1511697597"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("Download on the App Store")}
        className="flex h-[47px] items-center gap-2 bg-white px-4 transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.14)]"
      >
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.94 11.66C14.96 9.94 15.84 8.33 17.28 7.38C16.36 6.08 14.88 5.26 13.32 5.18C11.68 5.01 10.09 6.15 9.25 6.15C8.4 6.15 7.09 5.2 5.71 5.23C3.88 5.29 2.22 6.31 1.34 7.9C-0.52 11.16 0.87 16.01 2.64 18.65C3.53 19.95 4.57 21.39 5.94 21.34C7.29 21.28 7.8 20.47 9.42 20.47C11.03 20.47 11.51 21.34 12.92 21.31C14.37 21.28 15.27 19.99 16.13 18.68C16.78 17.75 17.27 16.72 17.6 15.63C15.87 14.9 14.94 13.32 14.94 11.66Z" fill="black"/>
          <path d="M12.27 3.52C13.04 2.59 13.42 1.41 13.35 0.21C12.18 0.33 11.1 0.89 10.32 1.78C9.56 2.65 9.16 3.79 9.22 4.95C10.39 4.96 11.5 4.44 12.27 3.52Z" fill="black"/>
        </svg>
        <div className="flex flex-col">
          <span className="font-sans text-[8px] font-medium leading-none text-black">{t("Download on the")}</span>
          <span className="font-sans text-[16px] font-semibold leading-tight text-black">App Store</span>
        </div>
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=com.moonshot.hap"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("Get it on Google Play")}
        className="flex h-[47px] items-center gap-2 bg-white px-4 transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.14)]"
      >
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.22 0.447L11.35 5.92L8.53 8.87L0.57 0.657C0.73 0.477 0.96 0.417 1.22 0.447Z" fill="#00C853"/>
          <path d="M0.12 1.14C0.04 1.38 0 1.65 0 1.95V20.05C0 20.35 0.04 20.62 0.12 20.86L8.01 12.97L0.12 1.14Z" fill="#2196F3"/>
          <path d="M1.22 21.55C0.96 21.58 0.73 21.52 0.57 21.34L8.53 13.13L11.35 16.08L1.22 21.55Z" fill="#F44336"/>
          <path d="M18.4 10.04L14.73 7.97L11.62 11L14.73 14.03L18.4 11.96C19.12 11.56 19.12 10.44 18.4 10.04Z" fill="#FFC107"/>
        </svg>
        <div className="flex flex-col">
          <span className="font-sans text-[8px] font-medium uppercase leading-none tracking-wider text-black">{t("Get it on")}</span>
          <span className="font-sans text-[16px] font-semibold leading-tight text-black">Google Play</span>
        </div>
      </a>
    </div>
  );
}

function KeyBenefits() {
  const t = useT();
  return (
    <div className="flex w-full flex-col gap-5">
      <p className="font-sans text-[1.25rem] font-medium uppercase leading-[1.1] text-brand-black">
        {t("Key Benefits")}
      </p>
      <div className="h-px w-full bg-black/10" />
      {KEY_BENEFITS.map((benefit) => (
        <div key={benefit} className="flex flex-col gap-5">
          <p className="font-sans text-[1.25rem] font-medium leading-[1.1] text-brand-black">
            {t(benefit)}
          </p>
          <div className="h-px w-full bg-black/10" />
        </div>
      ))}
    </div>
  );
}

export default function AppCta() {
  const t = useT();
  const intro = (
    <>
      <span>{t("HAP Family App ")}</span>
      <strong className="font-bold">{t("enables homeowners")}</strong>
      <span>{t(" to seamlessly manage their properties from their phones.")}</span>
    </>
  );
  return (
    <section id="app" data-nav-theme="light" className="relative bg-warm-50">
      {/* ── Mobile layout: the drapery photo (light, leaf-shadowed top; the
           phone at the bottom) fills the whole section, with the copy over
           its light upper part and room below for the phone. ── */}
      <div className="relative overflow-hidden md:hidden">
        <Image
          src="/images/app-bg.jpg"
          alt={t("Hand holding phone with the HAP Family App")}
          fill
          className="-z-0 object-cover"
          style={{ objectPosition: "53% 100%" }}
          sizes="100vw"
        />
        <div className="relative z-10 flex flex-col gap-8 px-6 pb-10 pt-28">
          <Reveal>
            <h2 className="font-serif text-[2.5rem] font-light uppercase leading-[1.1] tracking-[-0.02em] text-brand-black">
              {t("Manage your home anytime with HAP Family App")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <StoreBadges />
          </Reveal>
          <Reveal delay={0.15} className="flex flex-col items-stretch gap-6">
            <p className="font-serif text-[1.375rem] font-medium capitalize leading-[1.2] tracking-[-0.02em] text-brand-black">
              {intro}
            </p>
            <ActionButton label={t("Download app")} href={APP_DOWNLOAD_URL} variant="solid" look="arrow" className="w-full justify-center" />
          </Reveal>
          <Reveal delay={0.2}>
            <KeyBenefits />
          </Reveal>
        </div>
        {/* Room for the phone in the photo below the copy. */}
        <div aria-hidden className="h-[820px]" />
      </div>

      {/* ── Desktop layout: viewport-ratio composition ── */}
      <div className="relative hidden aspect-[1440/1632] overflow-hidden md:block">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/app-bg.jpg"
            alt={t("Hand holding phone with HAP Family App")}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Heading + badges — right side */}
        <Reveal
          className="absolute flex flex-col items-start gap-[38px]"
          style={{ left: "50.7%", top: "17.95%", width: "35.35%" }}
        >
          <h2 className="font-serif font-light uppercase leading-[1.1] tracking-[-0.02em] text-brand-black [font-size:clamp(2rem,4.3vw,3.875rem)]">
            {t("Manage your home anytime with HAP Family App")}
          </h2>
          <StoreBadges />
        </Reveal>

        {/* Description — left side */}
        <Reveal
          delay={0.1}
          className="absolute"
          style={{ left: "4rem", top: "38.73%", width: "27.85%" }}
        >
          <p className="font-serif text-[1.625rem] font-medium capitalize leading-[1.2] tracking-[-0.02em] text-brand-black">
            {intro}
          </p>
        </Reveal>

        {/* Soft black gradient in the bottom-right corner, so the white QR
            reads over the photo. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_100%_100%,rgba(0,0,0,0.7),rgba(0,0,0,0.35)_45%,transparent_100%)]"
        />

        {/* Bottom row — key benefits on the left and "Scan to download" on
            the right, bottom-aligned with each other. The photo isn't
            mirrored, so on /ar the QR stays on the dark bottom-right corner. */}
        <div
          className="absolute flex items-end justify-between rtl:flex-row-reverse"
          style={{ left: "4rem", right: "4rem", top: "79.23%" }}
        >
          <Reveal delay={0.15} style={{ width: "30.9vw" }}>
            <KeyBenefits />
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href={APP_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-max flex-col items-stretch gap-4"
              aria-label={t("Scan to download the HAP Family App")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBasePath("/app-qr.svg")}
                alt=""
                width={160}
                height={160}
                className="aspect-square h-auto w-0 min-w-full transition-transform duration-500 group-hover:scale-105"
              />
              {/* Sets the block's width, so the QR spans exactly the label;
                  the negative margin drops the last letter's tracking. */}
              <span className="-me-[0.12em] whitespace-nowrap rtl:me-0 font-sans text-sm font-medium uppercase leading-none tracking-[0.12em] text-white">
                {t("Scan to download")}
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
