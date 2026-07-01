import type { ProjectDetailData } from "@/data/projectDetail";
import GrowImagePair from "./GrowImagePair";

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
        <div className="flex shrink-0 items-center gap-3">
          <span className="size-3 shrink-0 rounded-full border border-brand-black/40" />
          <p className="font-sans text-base text-brand-black">{data.scrollLabel}</p>
        </div>
        <div className="grid gap-8 font-sans text-base leading-[1.4] text-brand-black md:ml-auto md:w-[66.16%] md:grid-cols-[372fr_424fr] md:gap-x-[72px]">
          <p>{data.introParagraphs[0]}</p>
          <p>{data.introParagraphs[1]}</p>
        </div>
      </div>

      {/* Image pair — equal heights + scroll-driven grow (height then width). */}
      <GrowImagePair narrow={data.introImages[0]} wide={data.introImages[1]} />

      {/* Tag + community heading + brochure — right block is the exact 868
          column (Figma Frame 1097). */}
      <div className="flex flex-col gap-10 md:flex-row md:items-stretch md:justify-between">
        <div className="flex shrink-0 flex-col items-start justify-between gap-10 md:w-[284px] md:gap-0">
          <span className="flex h-[54px] items-center justify-center rounded-[2px] border border-brand-black/20 px-4 font-sans text-lg font-medium text-brand-black">
            {data.tag}
          </span>
          <p className="max-w-[284px] font-sans text-base leading-[1.4] text-brand-black">
            {data.tagline}
          </p>
        </div>

        <div className="flex flex-col items-start gap-8 md:w-[66.16%] md:gap-8">
          <p className="font-sans text-xl font-medium text-success-dark md:text-2xl">
            {data.communityLabel}
          </p>
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
          <button
            type="button"
            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-[4px] border border-grey-500/60 p-2 transition-colors duration-500 hover:border-brand-black md:w-auto md:justify-start"
          >
            {/* Premium sweep — black fill glides in; icon well + label invert. */}
            <span
              aria-hidden
              className="absolute inset-0 translate-y-full bg-brand-black transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0"
            />
            <span className="relative z-10 flex size-10 items-center justify-center rounded-[2px] bg-brand-black transition-colors duration-500 group-hover:bg-brand-white">
              <svg width="10" height="15" viewBox="0 0 10 15" fill="none" aria-hidden className="transition-transform duration-500 group-hover:translate-y-0.5">
                <path
                  d="M5 0v10m0 0L1 6m4 4 4-4M0.5 13h9"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-brand-white transition-colors duration-500 group-hover:text-brand-black"
                />
              </svg>
            </span>
            <span className="relative z-10 font-serif text-lg text-brand-black transition-colors duration-500 group-hover:text-brand-white md:text-2xl">
              {data.brochureLabel}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
