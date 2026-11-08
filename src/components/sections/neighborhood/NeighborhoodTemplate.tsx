"use client";

import Link from "@/components/LocaleLink";
import Footer from "@/components/Footer";
import SectionNav from "@/components/SectionNav";
import ParallaxImage from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import { RequestInterest } from "@/components/ActionButton";
import AmenitiesSection from "@/components/sections/project-detail/AmenitiesSection";
import UnitTypesSection from "@/components/sections/project-detail/UnitTypesSection";
import ConstructionTimeline from "@/components/sections/project-detail/ConstructionTimeline";
import RequestInterestForm from "@/components/sections/project-detail/RequestInterestForm";
import { projectHref } from "@/data/projectDetail";
import type { Neighborhood } from "@/data/neighborhoods";
import { useT } from "@/i18n/LocaleProvider";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * A neighborhood (village) inside a project, opened from the master plan's
 * "Discover more": its own hero, amenities, unit types and construction
 * updates, closing on the interest form — the project page's building
 * blocks, scoped to one neighborhood.
 */
export default function NeighborhoodTemplate({ n }: { n: Neighborhood }) {
  const t = useT();
  const { item, project } = n;
  const projectName = project.name.join(" ");

  const sections = [
    { id: "overview", label: "Overview" },
    ...(n.units.length ? [{ id: "homes", label: "Unit Types" }] : []),
    { id: "amenities", label: "Amenities" },
    { id: "construction-updates", label: "Construction Updates" },
    { id: "request-interest", label: "Request Interest" },
  ].map((s) => ({ ...s, label: t(s.label) }));

  return (
    <main>
      {/* Hero — black, so a neighborhood reads as a secondary page of its
          project (whose hero is light), with the way back above the name. */}
      <section
        data-nav-theme="dark"
        className="relative flex min-h-[560px] items-center justify-center overflow-hidden bg-brand-black px-6 pb-20 pt-28 text-brand-white md:min-h-[86vh] md:px-16"
      >
        <Reveal className="relative z-10 flex max-w-[960px] flex-col items-center gap-6 text-center md:gap-8">
          <Link
            href={`${projectHref(project.id)}#master-plan`}
            className="flex items-center gap-2 font-sans text-sm font-medium uppercase tracking-[0.12em] text-white/60 transition-colors duration-300 hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="rtl:-scale-x-100">
              <path d="M9 2.5 4.5 7 9 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t(projectName)}
          </Link>
          <h1 className="font-serif font-light uppercase leading-[0.95] tracking-[-0.02em] text-brand-white [font-size:clamp(2.75rem,12vw,8.25rem)] md:[font-size:clamp(2.75rem,8vw,8.25rem)]">
            {t(item.name)}
          </h1>
          <p className="font-sans text-sm font-medium uppercase tracking-[0.12em] text-white/50">
            {t("Neighborhood {n}", { n: pad(item.number) })}
          </p>
          <RequestInterest tone="light" className="mt-2" />
        </Reveal>
      </section>

      {/* Overview — the drawer's blurb as the lead, then a wide photo. */}
      <section id="overview" data-nav-theme="light" className="flex flex-col gap-10 bg-brand-white px-6 py-16 md:gap-16 md:px-16 md:py-20">
        <Reveal className="md:ms-auto md:w-[66.16%]">
          <p className="font-serif font-light leading-[1.2] tracking-[-0.02em] [font-size:clamp(1.5rem,3.2vw,3rem)]">
            {t(item.blurb)}
          </p>
        </Reveal>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] md:aspect-[1312/700]">
          <ParallaxImage src={item.image} alt={t(item.name)} sizes="100vw" quality={90} />
        </div>
      </section>

      {n.units.length > 0 && (
        <UnitTypesSection
          id="homes"
          projectId={project.id}
          heading={t("Homes at {name}", { name: t(item.name) })}
          units={n.units}
          from={n.slug}
        />
      )}

      <AmenitiesSection id="amenities" heading={[t("Amenities"), t("at {name}", { name: t(item.name) })]} items={n.amenities} />

      <ConstructionTimeline data={project.construction} />
      <RequestInterestForm projectName={item.name} image={item.image} />
      <Footer />
      <SectionNav items={sections} back={{ label: t(projectName), href: projectHref(project.id) }} />
    </main>
  );
}
