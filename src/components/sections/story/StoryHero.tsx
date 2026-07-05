import Image from "next/image";
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
        <h1 className="text-center font-serif font-light leading-[0.95] tracking-[-0.02em] text-brand-black [font-size:clamp(2.75rem,8vw,8.25rem)]">
          <span className="block">HAP At</span>
          <span className="block">A Glance</span>
        </h1>
      </Reveal>
    </section>
  );
}
