import Image from "next/image";
import { Reveal } from "@/components/Reveal";

// Same treatment as ContactHero — the site's shared "light hero" pattern.
export default function FaqsHero() {
  return (
    <section
      data-nav-theme="light"
      className="relative flex min-h-[340px] flex-col items-center justify-center gap-5 overflow-hidden bg-brand-white px-6 pb-14 pt-28 text-center md:min-h-[440px] md:px-16 md:pt-32"
    >
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
        <h1 className="font-serif font-light capitalize leading-none tracking-[-0.02em] text-brand-black [font-size:clamp(2.5rem,7vw,5.75rem)]">
          FAQs
        </h1>
        <p className="max-w-[700px] font-sans text-lg leading-[1.4] text-brand-black md:text-xl">
          Everything you need to know about finding, buying and living in a
          Hassan Allam Properties community.
        </p>
      </Reveal>
    </section>
  );
}
