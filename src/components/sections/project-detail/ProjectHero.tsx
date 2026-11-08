"use client";

import Image from "@/components/ProgressiveImage";
import { Reveal } from "@/components/Reveal";
import type { ProjectDetailData } from "@/data/projectDetail";
import { RequestInterest } from "@/components/ActionButton";
import { CATEGORY_LABEL } from "@/data/mapProjects";
import { useRtl, useT } from "@/i18n/LocaleProvider";

export default function ProjectHero({ data }: { data: ProjectDetailData }) {
  const t = useT();
  const rtl = useRtl();
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
        {/* Phones: two uppercase lines, sized (for Eirlys) so the longer one ("RESIDENCES NEW
            Cairo") fits the width. From tablet up a narrower measure wraps
            the name to 3 lines (SwanLake / Residences / New Cairo). */}
        <h1 className="mx-auto whitespace-nowrap font-serif uppercase md:max-w-[7.5em] md:whitespace-normal font-light leading-[0.95] tracking-[-0.02em] text-brand-black [font-size:clamp(1.375rem,6.9vw,4.5rem)] md:[font-size:clamp(2.75rem,8vw,8.25rem)]">
          {/* Arabic: the full name in Arabic script on one flowing line;
              English: the two designed lines. */}
          {rtl ? (
            <span className="block">{t(data.name.join(" ").trim())}</span>
          ) : (
            <>
              <span className="block">{data.name[0]}</span>
              <span className="block">{data.name[1]}</span>
            </>
          )}
        </h1>
        {/* Asset classes, compact: a single line with thin dividers (as on
            the project cards); only phones too narrow for it wrap. */}
        <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 whitespace-nowrap font-sans text-[10px] font-medium uppercase tracking-[0.08em] text-brand-black/60 md:flex-nowrap md:text-xs">
          {data.tags.map((tag, i) => (
            <li key={tag} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="h-2.5 w-px bg-brand-black/25" />}
              {t(CATEGORY_LABEL[tag])}
            </li>
          ))}
        </ul>
        <RequestInterest className="mt-2" />
      </Reveal>
    </section>
  );
}
