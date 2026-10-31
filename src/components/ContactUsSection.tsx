import Image from "@/components/ProgressiveImage";
import { Reveal } from "@/components/Reveal";
import ActionButton from "@/components/ActionButton";

/**
 * ContactUsSection — the closing invitation before the footer on Home, Our
 * Story and FAQs: the soft window-light backdrop, a large "Contact us" and
 * a short line, then the site's solid "Get in touch" button.
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
          <ActionButton label="Get in touch" href="/contact" variant="solid" look="arrow" />
        </Reveal>
      </div>
    </section>
  );
}
