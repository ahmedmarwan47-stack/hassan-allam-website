import Image from "@/components/ProgressiveImage";
import { Reveal } from "@/components/Reveal";

export default function StoryHero() {
  return (
    <section
      data-nav-theme="light"
      className="relative flex min-h-[720px] items-center justify-center overflow-hidden bg-brand-white px-6 py-32 md:min-h-screen md:px-16"
    >
      {/* Light window-light backdrop whose white bottom fades into the white
          intro section below (desktop + mobile). */}
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

      <Reveal className="relative z-10">
        {/* Phones: two lines (INSIDE THE WORLD / OF HAP), sized so the first
            (~8.7em wide) fits. From tablet up: three lines (INSIDE THE /
            WORLD OF / HAP) at the full display size. */}
        <h1 className="text-center font-serif font-light leading-[0.95] tracking-[-0.02em] text-brand-black [font-size:clamp(2rem,9.8vw,6rem)] md:[font-size:clamp(2.75rem,11vw,12rem)]">
          <span className="block whitespace-nowrap">
            INSIDE THE<span className="md:hidden"> WORLD</span>
          </span>
          <span className="block">
            <span className="hidden md:inline">WORLD </span>OF<span className="md:hidden"> HAP</span>
          </span>
          <span className="hidden md:block">HAP</span>
        </h1>
      </Reveal>
    </section>
  );
}
