"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSeenOnce } from "@/hooks/useSeenOnce";
import { Reveal } from "@/components/Reveal";
import Image from "@/components/ProgressiveImage";
import SectionEyebrow from "@/components/SectionEyebrow";
import WritingText from "@/components/WritingText";
import RiseWords from "@/components/RiseWords";
import { useT } from "@/i18n/LocaleProvider";

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

// The headline quote, as lines of (roman | italic) runs.
const HEADLINE: { text: string; italic?: boolean }[][] = [
  [{ text: "“Legacy isn’t just what we build," }],
  [{ text: "it’s " }, { text: "who we build it for.”", italic: true }],
];
const CHAR_MS = 38; // pace of the writing, per letter
const WORD_MS = 150; // Arabic pace, per word
const HAS_ARABIC = /[\u0600-\u06FF]/;

// Each word with the index of its first letter, so letters write in order.
// Arabic is written in word by word instead (splitting it into per-letter
// inline-blocks would break the joined script), so `start` counts words.
function tokenize(lines: { text: string; italic?: boolean }[][], byWord: boolean) {
  let n = 0;
  return lines.map((line) =>
    line.map((run) => ({
      italic: run.italic,
      words: run.text.split(/(\s+)/).map((word) => {
        const space = /^\s+$/.test(word);
        const start = n;
        if (byWord) {
          if (!space && word) n += 1;
        } else n += word.length;
        return { word, start, space };
      }),
    })),
  );
}

const reveal = (on: boolean, reduce: boolean, at: number) => ({
  opacity: on ? 1 : 0,
  filter: on ? "blur(0px)" : "blur(10px)",
  transform: on ? "none" : "translateY(0.45em)",
  transition: reduce
    ? "none"
    : `opacity 0.7s ease-out ${at}ms, filter 0.7s ease-out ${at}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${at}ms`,
});

function WrittenQuote() {
  const t = useT();
  const ref = useRef<HTMLHeadingElement>(null);
  const seen = useSeenOnce(ref);
  const reduce = !!useReducedMotion();
  const on = seen || reduce;
  const lines = HEADLINE.map((line) => line.map((r) => ({ ...r, text: t(r.text) })));
  const label = lines.map((line) => line.map((r) => r.text).join("")).join(" ");
  const byWord = HAS_ARABIC.test(label);
  const tokens = tokenize(lines, byWord);
  return (
    <h2
      ref={ref}
      aria-label={label}
      className="font-serif font-light leading-[1.05] tracking-[-0.02em] [font-size:clamp(2rem,3.8vw,4.5rem)]"
    >
      {tokens.map((line, l) => (
        <span key={l} aria-hidden className="md:block">
          {line.map((run, r) => {
            const body = run.words.map(({ word, start, space }, w) =>
              space ? (
                <span key={w}>{word}</span>
              ) : byWord ? (
                <span key={w} className="inline-block whitespace-nowrap" style={reveal(on, reduce, 150 + start * WORD_MS)}>
                  {word}
                </span>
              ) : (
                <span key={w} className="inline-block whitespace-nowrap">
                  {[...word].map((ch, c) => (
                    <span key={c} className="inline-block" style={reveal(on, reduce, 150 + (start + c) * CHAR_MS)}>
                      {ch}
                    </span>
                  ))}
                </span>
              ),
            );
            return run.italic ? (
              <em key={r} className="italic rtl:not-italic">
                {body}
              </em>
            ) : (
              <span key={r}>{body}</span>
            );
          })}
          {l < tokens.length - 1 && " "}
        </span>
      ))}
    </h2>
  );
}

/** Letter-by-letter writing for English; Arabic rises word by word so its
 *  letters stay joined. */
function Words({ text, delay }: { text: string; delay?: number }) {
  return HAS_ARABIC.test(text) ? (
    <p>
      <RiseWords text={text} delay={delay ?? 250} stagger={18} duration={900} />
    </p>
  ) : (
    <WritingText text={text} delay={delay} />
  );
}

export default function CeoQuote({ id }: { id?: string }) {
  const t = useT();
  const reduce = useReducedMotion();
  // The band's entrance is keyed to the band itself being seen (its
  // background starts collapsed, so it can't be the trigger).
  const bandRef = useRef<HTMLDivElement>(null);
  const bandSeen = useSeenOnce(bandRef);
  const show = bandSeen || !!reduce;
  return (
    <section
      id={id}
      data-nav-theme="light"
      // --rise: the white area above the band, which the portrait climbs
      // into. The portrait is sized from it (rise ÷ 0.36) so the band's top
      // edge falls a little below his shoulders; the rest runs past the
      // band's bottom, which crops it. Capped by the screen's height as well
      // as its width, so on wide-but-short screens headline, portrait,
      // words and name still fit one view.
      className="flex flex-col bg-brand-white text-brand-black [--rise:clamp(15rem,min(25vw,40svh),30rem)]"
    >
      {/* Eyebrow + headline quote, left, beside the portrait's head. */}
      <div className="flex flex-col items-start gap-6 px-6 pb-14 pt-16 text-start md:min-h-[var(--rise)] md:justify-center md:gap-7 md:px-16 md:py-[clamp(2.5rem,3vw,3.5rem)]">
        <SectionEyebrow>{t("Chairman Message")}</SectionEyebrow>
        {/* Written in letter by letter, each letter rising out of a soft
            blur — the italic half follows straight on. */}
        <WrittenQuote />
      </div>

      {/* Dark band — words left, portrait right. Black at the top, so his
          dark suit melts into it, easing to dark grey at the bottom so the
          band reads apart from the black section after it. The band
          clips only its bottom, so the portrait can climb out of the top.
          Entrance: the black rises up from the bottom edge, then he rises
          into place and his words write in. */}
      <div ref={bandRef} className="relative isolate flex flex-col overflow-hidden text-brand-white md:min-h-[clamp(24rem,min(30vw,50svh),36rem)] md:flex-row md:overflow-visible md:[clip-path:inset(-100vh_0_0_0)]">
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-10 origin-bottom bg-[linear-gradient(180deg,#000_0%,#0b0b0b_40%,#2a2a2a_100%)]"
          initial={false}
          animate={{ scaleY: show ? 1 : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        />
        <div className="relative z-10 flex flex-col gap-10 px-6 py-16 md:w-[54%] md:justify-center md:gap-8 md:px-16 md:py-[clamp(3.75rem,4.5vw,5rem)]">
          <div className="flex max-w-[860px] flex-col gap-6 font-sans text-base leading-[1.55] md:text-[clamp(1rem,0.95vw,1.125rem)]">
            <Words text={t(QUOTE)} />
            <Words text={t(PORTFOLIO)} delay={650} />
          </div>
          <Reveal delay={0.2}>
            <p className="flex flex-col gap-2">
              <span className="font-serif font-light uppercase leading-none tracking-[-0.01em] [font-size:clamp(1.75rem,2.2vw,2.625rem)]">
                {t("Mohamed Allam")}
              </span>
              <span className="font-sans text-xs uppercase tracking-[0.12em] text-white/55 md:text-sm">
                {t("CEO and Vice Chairman")}
              </span>
            </p>
          </Reveal>
        </div>

        {/* Full-length cut-out, large, cropped by the band's bottom edge. */}
        <motion.div
          initial={false}
          animate={show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 140, scale: 1.04 }}
          transition={reduce ? { duration: 0 } : { duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          className="relative mx-auto origin-bottom aspect-[969/2000] w-[64%] md:absolute md:end-[6%] md:top-[calc(-1*var(--rise))] md:mx-0 md:h-[calc(var(--rise)/0.36)] md:w-auto"
        >
          <Image
            src="/images/team/chairman-full-cutout.webp"
            alt={t("Mohamed Allam, CEO and Vice Chairman")}
            fill
            sizes="(min-width: 768px) 36vw, 64vw"
            quality={90}
            className="object-contain object-bottom grayscale"
          />
        </motion.div>
      </div>
    </section>
  );
}
