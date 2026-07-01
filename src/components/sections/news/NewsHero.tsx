import { Reveal } from "@/components/Reveal";

export default function NewsHero() {
  return (
    <section
      data-nav-theme="light"
      className="relative flex min-h-[380px] items-end justify-center overflow-hidden bg-warm-50 px-6 pb-10 pt-32 md:min-h-[550px] md:px-16 md:pb-16 md:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-warm-100 via-warm-50 to-white" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 -top-1/4 h-[140%] w-[70%] rotate-12 bg-gradient-to-b from-white/80 via-transparent to-transparent blur-3xl"
      />

      <Reveal className="relative z-10 w-full">
        <h1 className="text-center font-serif font-light leading-none tracking-[-0.02em] text-brand-black [font-size:clamp(3.5rem,15vw,12.625rem)]">
          HAP NEWS
        </h1>
      </Reveal>
    </section>
  );
}
