import Link from "next/link";
import Image from "@/components/ProgressiveImage";
import { Reveal } from "@/components/Reveal";
import RollText from "@/components/RollText";

/**
 * ContactUsSection — the closing invitation before the footer on Home, Our
 * Story and FAQs: the soft window-light backdrop, a large "Contact us" and
 * a short line, then a simple text CTA with a trailing arrow (no icon box).
 */
export default function ContactUsSection() {
  return (
    <section
      data-nav-theme="light"
      className="relative flex min-h-[640px] items-center justify-center overflow-hidden bg-brand-white px-6 py-28 text-center text-brand-black md:min-h-[86vh] md:px-16"
    >
      <Image
        src="/images/bg-light.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="pointer-events-none select-none object-cover"
      />

      <div className="relative z-10 flex flex-col items-center gap-10 md:gap-14">
        <Reveal>
          <h2 className="font-serif font-light uppercase leading-none tracking-[-0.02em] [font-size:clamp(3rem,7.5vw,8.5rem)]">
            Contact Us
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-[900px] font-serif font-light leading-[1.35] [font-size:clamp(1.25rem,1.9vw,2rem)]">
            Whether you&rsquo;re interested in one of our projects, exploring
            resale opportunities or looking to work with us, tell us how we can
            help and the right team will get back to you.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 pb-2 font-sans text-2xl font-medium md:text-[2rem]"
          >
            <RollText>Get in touch</RollText>
            <svg
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
              className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-0.5 group-hover:translate-x-1"
            >
              <path d="M3 11 11 3M11 3H4M11 3v7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {/* Underline draws in from the left on hover. */}
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand-black transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-x-100"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
