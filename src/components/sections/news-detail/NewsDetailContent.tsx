import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";
import type { NewsDetail } from "@/data/newsDetail";

export default function NewsDetailContent({ detail }: { detail: NewsDetail }) {
  return (
    <section
      data-nav-theme="dark"
      className="flex flex-col gap-10 bg-brand-black px-6 py-16 text-brand-white md:gap-20 md:px-16 md:py-20"
    >
      {/* ── Full-width hero image ────────────────────────────────────────── */}
      <GrowReveal
        axis="width"
        className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px] md:aspect-[1312/820]"
      >
        <Image
          src={detail.heroImage}
          alt=""
          fill
          sizes="100vw"
          quality={90}
          priority
          className="object-cover"
        />
      </GrowReveal>

      {/* ── Body block ───────────────────────────────────────────────────── */}
      <div className="flex justify-end">
        <div className="flex w-full flex-col gap-8 md:w-[66.16%] md:gap-14">
          {/* Big uppercase serif intro paragraph */}
          <Reveal>
            <p className="font-serif font-light uppercase leading-[1.2] tracking-[-0.02em] text-brand-white [font-size:clamp(1.375rem,2.8vw,2.625rem)]">
              {detail.bigIntroParagraph}
            </p>
          </Reveal>

          {/* Download PDF button (mirrors the "Download brochure" button on
              the project detail template, but on-dark). */}
          <Reveal delay={0.05}>
            <button
              type="button"
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-[4px] border border-grey-500/60 p-2 transition-colors duration-500 hover:border-brand-white md:w-auto md:justify-start"
            >
              {/* Premium sweep — white fill glides in; icon well + label invert. */}
              <span
                aria-hidden
                className="absolute inset-0 translate-y-full bg-brand-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0"
              />
              <span className="relative z-10 flex size-10 items-center justify-center rounded-[2px] bg-brand-white transition-colors duration-500 group-hover:bg-brand-black">
                <svg width="10" height="15" viewBox="0 0 10 15" fill="none" aria-hidden className="transition-transform duration-500 group-hover:translate-y-0.5">
                  <path
                    d="M5 0v10m0 0L1 6m4 4 4-4M0.5 13h9"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-brand-black transition-colors duration-500 group-hover:text-brand-white"
                  />
                </svg>
              </span>
              <span className="relative z-10 font-sans text-lg font-medium text-brand-white transition-colors duration-500 group-hover:text-brand-black md:text-2xl">
                Download PDF
              </span>
            </button>
          </Reveal>

          {/* Two-column body copy */}
          <Reveal
            delay={0.1}
            className="grid gap-8 font-sans text-base leading-[1.4] text-brand-white md:grid-cols-2 md:gap-16"
          >
            <p>{detail.body[0]}</p>
            <p>{detail.body[1]}</p>
          </Reveal>
        </div>
      </div>

      {/* ── Side-by-side image duo ───────────────────────────────────────── */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <GrowReveal
          axis="height"
          className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-[2px] md:aspect-[646/812]"
        >
          <Image
            src={detail.bodyImages[0]}
            alt=""
            fill
            sizes="(min-width: 768px) 46vw, 100vw"
            quality={90}
            className="object-cover"
          />
        </GrowReveal>
        <GrowReveal
          axis="width"
          delay={0.12}
          className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-[2px] md:aspect-[646/812]"
        >
          <Image
            src={detail.bodyImages[1]}
            alt=""
            fill
            sizes="(min-width: 768px) 46vw, 100vw"
            quality={90}
            className="object-cover"
          />
        </GrowReveal>
      </div>
    </section>
  );
}
