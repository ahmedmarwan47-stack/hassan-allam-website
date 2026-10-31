import type { ProjectDetailData } from "@/data/projectDetail";
import GrowImagePair from "./GrowImagePair";
import { Reveal } from "@/components/Reveal";
import ActionButton, { RequestInterest } from "@/components/ActionButton";

export default function ProjectIntro({ data }: { data: ProjectDetailData }) {
  return (
    <section
      data-nav-theme="light"
      className="relative flex flex-col gap-16 bg-brand-white px-6 py-16 text-brand-black md:gap-20 md:px-16 md:py-20"
    >
      {/* Scroll label + description — paragraphs sit in the right 868 column
          (x=444 of the 1312 grid), split 372/424 with a 72px gutter (Figma
          Frame 1092). */}
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-start">
        <Reveal className="flex shrink-0 items-center gap-3">
          <span className="size-3 shrink-0 rounded-full border border-brand-black/40" />
          <p className="font-sans text-base text-brand-black">{data.scrollLabel}</p>
        </Reveal>
        <div className="grid gap-8 font-sans text-base leading-[1.4] text-brand-black md:ml-auto md:w-[66.16%] md:grid-cols-[372fr_424fr] md:gap-x-[72px]">
          <Reveal delay={0.1}>
            <p>{data.introParagraphs[0]}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <p>{data.introParagraphs[1]}</p>
          </Reveal>
        </div>
      </div>

      {/* Image pair — equal heights + scroll-driven grow (height then width). */}
      <GrowImagePair narrow={data.introImages[0]} wide={data.introImages[1]} />

      {/* Tag + community heading + brochure — right block is the exact 868
          column (Figma Frame 1097). */}
      <div className="flex flex-col gap-10 md:flex-row md:items-stretch md:justify-between">
        <div className="flex shrink-0 flex-col items-start justify-between gap-10 md:w-[284px] md:gap-0">
          <Reveal>
            <span className="flex h-[54px] items-center justify-center rounded-[2px] border border-brand-black/20 px-4 font-sans text-lg font-medium text-brand-black">
              {data.tag}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[284px] font-sans text-base leading-[1.4] text-brand-black">
              {data.tagline}
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col items-start gap-8 md:w-[66.16%] md:gap-8">
          <Reveal>
            <p className="font-sans text-xl font-medium text-success-dark md:text-2xl">
              {data.communityLabel}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-serif font-light leading-[1.1] tracking-[-0.02em] text-brand-black [font-size:clamp(1.75rem,4.3vw,3.875rem)]">
            {data.communityHeading.map((segment, i) =>
              segment.link ? (
                <a
                  key={i}
                  href="#"
                  className="text-grey-500 underline decoration-1 underline-offset-2 transition-colors duration-200 hover:text-brand-black"
                >
                  {segment.text}
                </a>
              ) : (
                <span key={i}>{segment.text}</span>
              ),
            )}
          </p>
          </Reveal>
          <Reveal delay={0.2} className="flex flex-wrap gap-3">
            <RequestInterest />
            <ActionButton label={data.brochureLabel} icon="download" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
