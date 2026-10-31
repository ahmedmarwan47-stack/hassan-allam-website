"use client";

import { Reveal } from "@/components/Reveal";
import Image from "@/components/ProgressiveImage";
import SectionEyebrow from "@/components/SectionEyebrow";
import WritingText from "@/components/WritingText";

/**
 * Chairman Message — per Figma (node 17190:2319): a centred eyebrow and
 * headline quote on white, then a deep black gradient band with the
 * chairman's full-length black-and-white cut-out on the right, rising out
 * of the band over the white. His words write themselves in on the left,
 * signed with his name in the display serif.
 */
const QUOTE =
  "“We build as if we build for our own. There is no greater pleasure than crafting family-centric destinations where harmony and exclusivity translate into everyday life.”";
const PORTFOLIO =
  "Hassan Allam Properties offers a diverse portfolio of high-end mixed-use city and coastal developments, featuring residential communities designed for families seeking exclusivity, comfort, and exceptional living experiences, all in Egypt’s most prime addresses.";

export default function CeoQuote({ id }: { id?: string }) {
  return (
    <section
      id={id}
      data-nav-theme="light"
      // --rise: how far the portrait climbs above the band into the white.
      className="flex flex-col bg-brand-white text-brand-black [--rise:clamp(7rem,9vw,11rem)]"
    >
      {/* Eyebrow + headline quote; the bottom padding leaves room for the
          portrait's head plus breathing space under the headline. */}
      <div className="flex flex-col items-center gap-6 px-6 pb-14 pt-16 text-center md:gap-8 md:px-16 md:pb-[calc(var(--rise)+clamp(3rem,4vw,4.5rem))] md:pt-[clamp(4rem,6vw,7rem)]">
        <SectionEyebrow className="[&_p]:text-center">Chairman Message</SectionEyebrow>
        <Reveal>
          <h2 className="mx-auto max-w-[1200px] font-serif font-light leading-[1.05] tracking-[-0.02em] [font-size:clamp(2.25rem,4.4vw,5rem)]">
            &ldquo;Legacy isn&rsquo;t just what we build,
            <br className="hidden md:block" /> it&rsquo;s <em className="italic">who we build it for.</em>&rdquo;
          </h2>
        </Reveal>
      </div>

      {/* Dark band — words left, portrait right. A soft light behind the
          portrait and a long black-to-charcoal fall give it depth. The band
          clips only its bottom, so the portrait can climb out of the top. */}
      <div className="relative flex flex-col overflow-hidden bg-[radial-gradient(ellipse_45%_60%_at_74%_42%,rgba(255,255,255,0.08),transparent_70%),linear-gradient(180deg,#000_0%,#070707_40%,#1c1c1c_85%,#262626_100%)] text-brand-white md:min-h-[min(48vw,1000px)] md:flex-row md:overflow-visible md:[clip-path:inset(-100vh_0_0_0)]">
        <div className="relative z-10 flex flex-col justify-between gap-14 px-6 py-16 md:w-[54%] md:gap-24 md:px-16 md:py-[clamp(6rem,9vw,10rem)]">
          <div className="flex max-w-[860px] flex-col gap-8 font-sans text-lg leading-[1.45] md:text-[clamp(1.375rem,1.45vw,1.75rem)]">
            <WritingText text={QUOTE} />
            <WritingText text={PORTFOLIO} delay={650} />
          </div>
          <Reveal delay={0.2}>
            <p className="flex flex-col gap-3">
              <span className="font-serif font-light uppercase leading-none tracking-[-0.01em] [font-size:clamp(2.25rem,3vw,3.5rem)]">
                Mohamed Allam
              </span>
              <span className="font-sans text-sm uppercase tracking-[0.12em] text-white/55 md:text-base">
                CEO and Vice Chairman
              </span>
            </p>
          </Reveal>
        </div>

        {/* Full-length cut-out, scaled up so the band crops him at the thigh. */}
        <Reveal
          y={60}
          blur={0}
          delay={0.15}
          className="relative mx-auto aspect-[969/2000] w-[64%] md:absolute md:bottom-[-18%] md:right-[8%] md:mx-0 md:h-[calc(118%+var(--rise))] md:w-auto"
        >
          <Image
            src="/images/team/chairman-full-cutout.webp"
            alt="Mohamed Allam, CEO and Vice Chairman"
            fill
            sizes="(min-width: 768px) 36vw, 64vw"
            quality={90}
            className="object-contain object-bottom grayscale"
          />
        </Reveal>
      </div>
    </section>
  );
}
