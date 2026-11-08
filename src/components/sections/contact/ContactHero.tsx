"use client";

import Image from "@/components/ProgressiveImage";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/i18n/LocaleProvider";

export default function ContactHero() {
  const t = useT();
  return (
    <section
      data-nav-theme="light"
      className="relative flex min-h-[340px] flex-col items-center justify-center gap-5 overflow-hidden bg-brand-white px-6 pb-14 pt-28 text-center md:min-h-[440px] md:px-16 md:pt-32"
    >
      {/* Light window-light backdrop fading into the white form section below,
          kept short so the contact details are visible in the first viewport. */}
      <Image
        src="/images/bg-light.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-brand-white"
      />

      <Reveal className="relative z-10 flex flex-col items-center gap-5">
        {/* Same display treatment as the site-wide Contact Us section. */}
        <h1 className="font-serif font-light uppercase leading-none tracking-[-0.02em] text-brand-black [font-size:clamp(3rem,7.5vw,8.5rem)]">
          {t("Contact Us")}
        </h1>
        <p className="max-w-[700px] font-sans text-lg leading-[1.4] text-brand-black md:text-xl">
          {t("Send us a note to get the conversation started, and our team will be in touch shortly.")}
        </p>
        <a
          href="tel:19172"
          className="font-sans text-base font-medium text-brand-black/80 transition-colors duration-200 hover:text-brand-black hover:underline decoration-1 underline-offset-4 md:text-lg"
        >
          {t("Or call our hotline")} <span className="font-semibold">19172</span>
        </a>
      </Reveal>
    </section>
  );
}
