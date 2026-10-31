import Image from "@/components/ProgressiveImage";
import { Reveal } from "@/components/Reveal";
import type { ProjectDetailData } from "@/data/projectDetail";
import { RequestInterest } from "@/components/ActionButton";

export default function ProjectHero({ data }: { data: ProjectDetailData }) {
  return (
    <section
      data-nav-theme="light"
      className="relative flex min-h-[760px] items-center justify-center overflow-hidden bg-brand-white px-6 py-32 md:min-h-screen md:px-16"
    >
      {/* Soft window-light backdrop (light variant, from the project folder).
          Its bottom is plain white, so it fades seamlessly into the white
          ProjectIntro section below — on both desktop and mobile. */}
      <Image
        src="/images/bg-light.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover"
      />
      {/* Fade the image's bottom into the next section's white. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-brand-white"
      />

      <Reveal className="relative z-10 flex flex-col items-center gap-6 text-center md:gap-8">
        {/* Eyebrow — the site's plain uppercase label (no box). */}
        <p className="font-sans text-sm font-medium uppercase leading-[1.4] tracking-[0.12em] text-brand-black/60 md:text-base">
          {data.badgeMain} {data.badgeScript.replace(/\.$/, "")}
        </p>
        {/* Phones: two lines, sized so the longer one ("Residences New
            Cairo") fits the width. From tablet up a narrower measure wraps
            the name to 3 lines (SwanLake / Residences / New Cairo). */}
        <h1 className="mx-auto whitespace-nowrap font-serif md:max-w-[7.5em] md:whitespace-normal font-light leading-[0.95] tracking-[-0.02em] text-brand-black [font-size:clamp(1.75rem,9.4vw,4.5rem)] md:[font-size:clamp(2.75rem,8vw,8.25rem)]">
          <span className="block">{data.name[0]}</span>
          <span className="block">{data.name[1]}</span>
        </h1>
        <RequestInterest className="mt-2" />
      </Reveal>
    </section>
  );
}
