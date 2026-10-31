import Image from "@/components/ProgressiveImage";
import { Reveal } from "@/components/Reveal";

/**
 * PageHero — the full-viewport light hero shared by the inner pages (same
 * treatment as StoryHero): the window-light backdrop fading into the white
 * section below, a small uppercase eyebrow and a huge display headline, one
 * entry of `lines` per line. `size="md"` scales the headline down for longer
 * lines so each still fits on one line.
 */
const SIZES = {
  // Phones get a larger share of the width so short lines fill the screen.
  lg: "[font-size:clamp(2.75rem,20vw,7rem)] md:[font-size:clamp(2.75rem,11vw,12rem)]",
  md: "[font-size:clamp(2.25rem,7.5vw,8.5rem)]",
};

export default function PageHero({
  eyebrow,
  lines,
  size = "lg",
}: {
  eyebrow: string;
  lines: React.ReactNode[];
  size?: keyof typeof SIZES;
}) {
  return (
    <section
      data-nav-theme="light"
      className="relative flex min-h-[720px] items-center justify-center overflow-hidden bg-brand-white px-6 py-32 md:min-h-screen md:px-16"
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

      <Reveal className="relative z-10 flex flex-col items-center gap-6 text-center md:gap-8">
        <p className="font-sans text-sm font-medium uppercase leading-[1.4] tracking-[0.12em] text-brand-black/60 md:text-base">
          {eyebrow}
        </p>
        <h1 className={`font-serif font-light uppercase leading-[0.95] tracking-[-0.02em] text-brand-black ${SIZES[size]}`}>
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
      </Reveal>
    </section>
  );
}
