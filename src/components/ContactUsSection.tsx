"use client";

import Image from "@/components/ProgressiveImage";
import { useT } from "@/i18n/LocaleProvider";
import { Reveal } from "@/components/Reveal";
import ActionButton from "@/components/ActionButton";

/**
 * ContactUsSection — the closing invitation before the footer on Home, Our
 * Story and FAQs: the soft window-light backdrop, a large "Contact us" and
 * a short line, then the site's solid "Get in touch" button.
 */
export default function ContactUsSection() {
  const t = useT();
  return (
    <section
      data-nav-theme="light"
      className="relative flex min-h-[560px] items-center overflow-hidden bg-brand-white px-6 py-24 text-start text-brand-black md:justify-center md:text-center md:min-h-[86vh] md:px-16"
    >
      <Image
        src="/images/bg-light.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="pointer-events-none select-none object-cover"
      />

      <div className="relative z-10 flex flex-col items-start gap-8 md:items-center md:gap-14">
        <Reveal>
          <h2 className="font-serif font-light uppercase leading-none tracking-[-0.02em] [font-size:clamp(2.75rem,7.5vw,8.5rem)]">
            {t("Contact Us")}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-[900px] font-serif font-light leading-[1.35] [font-size:clamp(1.125rem,1.9vw,2rem)]">
            {t(
              "Whether you’re interested in one of our projects, exploring resale opportunities or looking to work with us, tell us how we can help and the right team will get back to you.",
            )}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <ActionButton label={t("Get in touch")} href="/contact" variant="solid" look="arrow" />
        </Reveal>
      </div>
    </section>
  );
}
