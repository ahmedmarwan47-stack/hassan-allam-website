"use client";

import Image from "@/components/ProgressiveImage";
import Link from "@/components/LocaleLink";
import { useState } from "react";
import ActionButton from "@/components/ActionButton";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";
import { FACTS } from "@/data/facts";
import { useT } from "@/i18n/LocaleProvider";

function StoryCta() {
  const t = useT();
  return (
    <Link
      href="/story"
      aria-label={t("Discover the story")}
      className="group relative block aspect-square w-full max-w-[454px] overflow-hidden"
    >
      <GrowReveal axis="height" className="absolute inset-0">
        <Image
          src="/images/story-hands.jpg"
          alt={t("Hands joining together")}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 90vw, 454px"
        />
        <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/30" />
      </GrowReveal>
    </Link>
  );
}

export function FactRow({
  label,
  value,
  unit,
  image,
}: {
  label: string;
  value: string;
  /** Small unit set beside the figure's top (e.g. "Sqm"). */
  unit?: string;
  image: string;
}) {
  // Desktop: hovering the row inverts it to black and slides the photo in.
  // Phones (no hover): a compact row — a small square photo, then the
  // figure with the label under it.
  const [hovered, setHovered] = useState(false);
  const t = useT();

  return (
    <div
      // Taps fire mouseenter too — only real hover pointers invert the row.
      onMouseEnter={() => setHovered(window.matchMedia("(hover: hover) and (min-width: 768px)").matches)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: hovered ? "#000" : "#fff" }}
    >
      <div className="h-px w-full bg-grey-300" />

      {/* Phones */}
      <div className="flex items-center gap-5 py-5 md:hidden">
        <GrowReveal axis="height" className="relative size-[76px] shrink-0 overflow-hidden rounded-[2px]">
          <Image src={image} alt="" fill sizes="76px" className="object-cover" />
        </GrowReveal>
        <div className="flex min-w-0 flex-col gap-1.5">
          <p className="flex items-start gap-1.5 font-serif text-[2.25rem] font-light leading-none tracking-[-0.02em] text-brand-black">
            {value}
            {unit && <span className="pt-1 font-sans text-xs font-medium tracking-normal">{t(unit)}</span>}
          </p>
          <p className="font-sans text-sm font-medium leading-[1.3] text-brand-black/70">{t(label)}</p>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden w-full items-center justify-between gap-4 md:flex">
        <div className="flex items-center">
          {/* Photo — slides in from the start edge on hover. */}
          <div
            className="relative shrink-0 overflow-hidden transition-all duration-500 ease-in-out"
            style={{ width: hovered ? 200 : 0, height: 200, opacity: hovered ? 1 : 0 }}
          >
            <Image src={image} alt={t(label)} fill className="object-cover" sizes="200px" />
          </div>
          <div className="transition-all duration-500 ease-in-out" style={{ paddingInlineStart: hovered ? 60 : 0 }}>
            <p
              className="w-[280px] whitespace-pre-line font-sans text-[1.25rem] font-medium leading-[1.25] transition-colors duration-500"
              style={{ color: hovered ? "#fff" : "#000" }}
            >
              {t(label)}
            </p>
          </div>
        </div>

        <div className="flex h-[112px] w-[645px] flex-col justify-center">
          <p
            className="flex items-start gap-4 font-serif text-[7rem] font-light leading-none tracking-[-0.02em] transition-colors duration-500"
            style={{ color: hovered ? "#fff" : "#000" }}
          >
            {value}
            {unit && <span className="pt-3 font-sans text-xl font-medium tracking-normal">{t(unit)}</span>}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FactsFigures() {
  const t = useT();
  return (
    <section
      id="facts"
      data-nav-theme="light"
      className="bg-brand-white text-brand-black"
    >
      <div className="flex flex-col items-center gap-20 px-6 py-20 md:gap-[200px] md:px-16 md:py-[180px]">
        {/* ── CEO Quote ── */}
        <Reveal className="flex w-full max-w-[1110px] flex-col items-start gap-6 text-start md:items-center md:gap-[58px] md:text-center">
          <p className="font-serif font-normal leading-[1.1] tracking-[-0.02em] [font-size:clamp(1.75rem,4.3vw,3.875rem)]">
            {t("“There is no greater pleasure than crafting {a} communities where harmony and {b} translate into everyday life.”")
              .split(/(\{a\}|\{b\})/)
              .map((part, i) =>
                part === "{a}" ? (
                  <em key={i} className="italic">{t("family-centric")}</em>
                ) : part === "{b}" ? (
                  <em key={i} className="italic">{t("exclusivity")}</em>
                ) : (
                  part
                ),
              )}
          </p>
          <p className="font-sans text-base font-medium leading-[1.4]">
            {t("Mohamed Allam — CEO")}
          </p>
        </Reveal>

        {/* ── The Story ── */}
        <div className="flex w-full max-w-[1211px] flex-col items-start gap-8 md:items-center md:gap-14">
          <div className="flex w-full flex-col items-start gap-5 md:items-center">
            <Reveal>
              <h2 className="font-serif font-light uppercase leading-none tracking-[-0.02em] [font-size:clamp(3rem,14vw,12.625rem)]">
                {t("The Story")}
              </h2>
            </Reveal>

            <StoryCta />
          </div>

          <Reveal delay={0.1}>
            <p className="max-w-[543px] text-start font-serif font-light uppercase leading-[1.2] tracking-[-0.02em] [font-size:clamp(1rem,1.5vw,1.375rem)] md:text-center md:leading-none">
              {t(
                "Since its inception in the 1990's, Hassan Allam Properties has carved an enviable niche for itself as an exclusive boutique developer, building intimate communities where families always come first.",
              )}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ActionButton label={t("Discover the story")} href="/story" look="plain" />
          </Reveal>
        </div>

        {/* ── Facts and Figures ── */}
        <div className="flex w-full flex-col items-start gap-10 md:items-center md:gap-[70px]">
          <Reveal className="w-full">
            <h2 className="w-full text-start font-serif font-light uppercase leading-none tracking-[-0.02em] [font-size:clamp(2.75rem,9.2vw,8.25rem)] md:text-center">
              {t("Facts and Figures")}
            </h2>
          </Reveal>

          <div className="flex w-full flex-col">
            {FACTS.map((fact, i) => (
              <FactRow key={i} {...fact} />
            ))}
            <div className="h-px w-full bg-grey-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
