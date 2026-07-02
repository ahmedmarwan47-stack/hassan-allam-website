import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";
import type { ProjectDetailData } from "@/data/projectDetail";

export default function ProjectHero({ data }: { data: ProjectDetailData }) {
  return (
    <section
      data-nav-theme="light"
      className="relative flex min-h-[520px] items-center justify-center overflow-hidden bg-brand-white px-6 py-24 md:min-h-screen md:px-16 md:py-32"
    >
      {/* Soft window-light backdrop (light variant, from the project folder).
          Its bottom is plain white, so it fades seamlessly into the white
          ProjectIntro section below — on both desktop and mobile. */}
      <GrowReveal axis="width" className="pointer-events-none absolute inset-0">
        <Image
          src="/images/bg-light.webp"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="select-none object-cover"
        />
      </GrowReveal>
      {/* Fade the image's bottom into the next section's white. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-brand-white"
      />

      <Reveal className="relative z-10 flex flex-col items-center gap-6 text-center md:gap-8">
        {/* Tag — matches Figma 991-10797 ("SWANLAKE residences."). */}
        <div className="flex items-baseline gap-1.5 rounded-[4px] border border-brand-black/25 px-5 py-3">
          <span className="font-sans text-sm font-medium uppercase tracking-[0.12em] text-brand-black">
            {data.badgeMain}
          </span>
          <span className="font-serif text-base italic text-brand-black">
            {data.badgeScript}
          </span>
        </div>
        {/* Narrower measure so the name wraps to 3 lines (e.g. SWANLAKE /
            RESIDENCES / NEW CAIRO or … / EL GOUNA). */}
        <h1 className="mx-auto max-w-[7.5em] font-serif font-light uppercase leading-[0.95] tracking-[-0.02em] text-brand-black [font-size:clamp(2.75rem,8vw,8.25rem)]">
          <span className="block">{data.name[0]}</span>
          <span className="block">{data.name[1]}</span>
        </h1>
      </Reveal>
    </section>
  );
}
