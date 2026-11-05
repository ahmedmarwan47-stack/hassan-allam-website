"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "@/components/ProgressiveImage";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";
import ActionButton from "@/components/ActionButton";
import MobileCarousel from "@/components/MobileCarousel";
import SectionEyebrow from "@/components/SectionEyebrow";
import { SelectField } from "@/components/FormField";
import { unitHref, type UnitType } from "@/data/units";
import { PREFILL_UNIT } from "./ProjectActions";

const ALL = "all";

/**
 * Unit types — the homes on offer as image cards (type, name, bedrooms and
 * bathrooms, total area), each opening its own unit page; "Inquire now"
 * ticks the unit's type in the interest form and glides to it. Type and
 * Bedrooms filters above (only shown when there's a choice to make).
 * Phones get the cards as the shared swipe carousel.
 */
export default function UnitTypesSection({
  id,
  projectId,
  heading,
  intro,
  units,
  from,
}: {
  id?: string;
  projectId: string;
  heading: string;
  intro?: string;
  units: UnitType[];
  /** The neighborhood these cards sit in, so the unit page links back to it. */
  from?: string;
}) {
  const [type, setType] = useState(ALL);
  const [beds, setBeds] = useState(ALL);
  const types = [...new Set(units.map((u) => u.category))];
  const bedCounts = [...new Set(units.map((u) => u.bedrooms))].sort((a, b) => a - b);
  const visible = units.filter(
    (u) => (type === ALL || u.category === type) && (beds === ALL || String(u.bedrooms) === beds),
  );

  const cards = visible.map((unit) => <UnitCard key={unit.slug} unit={unit} href={unitHref(projectId, unit.slug) + (from ? `?from=${from}` : "")} />);

  return (
    <section
      id={id}
      data-nav-theme="light"
      className="flex flex-col gap-8 bg-grey-100 px-6 py-16 text-brand-black md:gap-10 md:px-16 md:py-16"
    >
      <SectionEyebrow>Unit Types</SectionEyebrow>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
        <Reveal className="flex min-w-0 flex-col gap-5 md:flex-1">
          <h2 className="font-serif font-light uppercase leading-[1.05] tracking-[-0.02em] [font-size:clamp(2rem,4.4vw,4.25rem)]">
            {heading}
          </h2>
          {intro && <p className="font-sans text-base leading-[1.5] text-brand-black/75">{intro}</p>}
        </Reveal>
        {(types.length > 1 || bedCounts.length > 1) && (
          <Reveal delay={0.08} className="grid w-full grid-cols-2 gap-x-5 md:w-[420px] md:shrink-0 md:gap-x-8">
            <SelectField
              size="md"
              label="Type"
              value={type}
              onValueChange={setType}
              options={[{ value: ALL, label: "All" }, ...types.map((t) => ({ value: t, label: t }))]}
            />
            <SelectField
              size="md"
              label="Bedrooms"
              value={beds}
              onValueChange={setBeds}
              options={[{ value: ALL, label: "All" }, ...bedCounts.map((b) => ({ value: String(b), label: `${b} Bedrooms` }))]}
            />
          </Reveal>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="border-t border-brand-black/15 py-10 font-sans text-base text-brand-black/60">
          No unit types match these filters — try another type or number of bedrooms.
        </p>
      ) : (
        <div key={`${type}|${beds}`}>
          <MobileCarousel label="unit types" slideClassName="w-[90%]" className="md:hidden">
            {cards}
          </MobileCarousel>
          <div className="hidden grid-cols-2 gap-5 md:grid lg:grid-cols-3">{cards}</div>
        </div>
      )}
    </section>
  );
}

/** A unit as a compact white card: photo, type, name, one specs line, then
 *  "Request interest" (primary) and a "Discover more" link. */
function UnitCard({ unit, href }: { unit: UnitType; href: string }) {
  const inquire = () => {
    window.dispatchEvent(
      new CustomEvent(PREFILL_UNIT, { detail: unit.category }),
    );
    document.getElementById("request-interest")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md bg-brand-white">
      <Link href={href} className="block" aria-label={`${unit.name} — discover more`}>
        {/* Landscape, and capped by the screen height on desktop so the
            filters and a row of cards fit in one view. */}
        <GrowReveal axis="height" className="relative aspect-[16/10] w-full overflow-hidden md:max-h-[max(220px,calc(100svh-560px))]">
          <Image
            src={unit.image}
            alt={unit.name}
            fill
            sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 82vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </GrowReveal>
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 p-4 md:p-5">
        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-brand-black/50">
          {unit.category}
        </span>
        <Link href={href}>
          <h3 className="font-serif text-[1.5rem] font-light uppercase leading-none tracking-[-0.02em] md:text-[1.625rem]">
            {unit.name}
          </h3>
        </Link>
        <p className="mt-1 font-sans text-sm text-brand-black/65">
          {unit.bedrooms} Bedrooms · {unit.bathrooms} Bathrooms · {unit.area} m²
        </p>
        <div className="mt-auto flex items-center gap-2 pt-4 md:gap-5">
          <ActionButton label="Request interest" onClick={inquire} variant="solid" size="sm" className="shrink-0" />
          <Link
            href={href}
            className="group/link flex shrink-0 items-center gap-1 whitespace-nowrap font-sans text-[13px] font-medium md:gap-1.5 md:text-sm text-brand-black/75 transition-colors duration-300 hover:text-brand-black hover:underline decoration-1 underline-offset-4"
          >
            Discover more
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
              className="transition-[rotate] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/link:rotate-45"
            >
              <path d="M3 11 11 3M11 3H4M11 3v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
