"use client";

import { FactRow } from "@/components/sections/FactsFigures";
import { Reveal } from "@/components/Reveal";
import { FACTS } from "@/data/facts";
import { useT } from "@/i18n/LocaleProvider";

// Reuses the homepage Facts & Figures hover/scroll photo-reveal effect and
// the same figures (src/data/facts.ts).
export default function FactsList({ id }: { id?: string }) {
  const t = useT();
  return (
    <section
      id={id}
      data-nav-theme="light"
      className="flex flex-col items-start gap-10 bg-brand-white px-6 py-20 text-brand-black md:items-center md:gap-[70px] md:px-16 md:py-24"
    >
      <Reveal className="w-full">
        <h2 className="w-full text-start font-serif font-light uppercase leading-none tracking-[-0.02em] text-brand-black [font-size:clamp(2.75rem,9.2vw,8.25rem)] md:text-center">
          {t("Facts and Figures")}
        </h2>
      </Reveal>

      <div className="flex w-full flex-col">
        {FACTS.map((fact) => (
          <FactRow key={fact.label} {...fact} />
        ))}
        <div className="h-px w-full bg-grey-300" />
      </div>
    </section>
  );
}
