"use client";

import { Reveal } from "@/components/Reveal";
import { FeatureIcon } from "./icons";
import type { FeatureItem } from "@/data/projectDetail";
import { RequestInterest } from "@/components/ActionButton";
import { useT } from "@/i18n/LocaleProvider";

export default function FeatureGrid({
  heading,
  intro,
  items,
}: {
  heading: string[];
  /** Optional short paragraph under the heading. */
  intro?: string;
  items: FeatureItem[];
}) {
  const t = useT();
  return (
    // 66.16% = the 868px "exceeding" column of the 1312 grid — keeps the text
    // left-aligned with the wide photo's left edge at every viewport width.
    <div className="@container flex w-full flex-col items-start gap-10 md:ms-auto md:w-[66.16%] md:gap-10">
      {/* Each heading line stays on one line from tablet up; the size also
          follows the column's width (≈14em per line) so the lines always fit. */}
      <Reveal className="w-full">
        <h2 className="font-serif font-light uppercase leading-[1.05] tracking-[-0.02em] text-brand-black [font-size:clamp(2rem,4.4vw,4.25rem)] md:[font-size:min(4.25rem,6.8cqw)]">
          {heading.map((line, i) => (
            <span key={i} className="block md:whitespace-nowrap">
              {t(line)}
            </span>
          ))}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.06}>
          <p className="max-w-[640px] font-sans text-base leading-[1.6] text-brand-black/75 md:text-lg">{t(intro)}</p>
        </Reveal>
      )}
      {/* Two columns only where the 66.16% block is wide enough (≥lg);
          at md the block is ~424px so pairs would cram. */}
      <div className="grid w-full grid-cols-1 gap-x-[70px] gap-y-0 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {items.map((item, i) => (
          <Reveal
            key={item.title}
            delay={(i % 2) * 0.05}
            className="flex gap-6 border-t border-brand-black/10 px-2 py-10 md:gap-[60px]"
          >
            <FeatureIcon name={item.icon} />
            <div className="flex flex-col gap-3 text-brand-black">
              <p className="font-sans text-lg font-medium leading-[1.3] md:text-xl">
                {t(item.title)}
              </p>
              <p className="font-sans text-base leading-[1.4]">
                {t(item.description)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
      {/* Centred on phones; aligned with the column from tablet up. */}
      <Reveal className="flex w-full justify-center md:block">
        <RequestInterest />
      </Reveal>
    </div>
  );
}
