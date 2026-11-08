"use client";

import Footer from "@/components/Footer";
import ParallaxImage from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import { RequestInterest } from "@/components/ActionButton";
import RequestInterestForm from "@/components/sections/project-detail/RequestInterestForm";
import UnitBackLink from "./UnitBackLink";
import { NEIGHBORHOODS } from "@/data/neighborhoods";
import { projectHref, type ProjectDetailData } from "@/data/projectDetail";
import { UNIT_CATEGORY_ICON, type UnitType } from "@/data/units";
import type { FeatureIconName } from "@/components/sections/project-detail/icons";
import ImageShowcase from "@/components/sections/project-detail/ImageShowcase";
import AmenitiesSection from "@/components/sections/project-detail/AmenitiesSection";
import { useT } from "@/i18n/LocaleProvider";

// An icon for each feature line, by keyword (falls back to the unit's own
// type icon).
function featureIcon(feature: string, unit: UnitType): FeatureIconName {
  const f = feature.toLowerCase();
  if (/garden|terrace|park|landscap|green/.test(f)) return "leisure";
  if (/pool|lagoon/.test(f)) return "hospitality";
  if (/kitchen|dining/.test(f)) return "dining";
  if (/parking|garage/.test(f)) return "office";
  if (/gym|fitness/.test(f)) return "fitness";
  if (/view|glazing|roof/.test(f)) return "penthouse";
  return UNIT_CATEGORY_ICON[unit.category];
}

/**
 * A single unit type: breadcrumb, name and one-line summary beside a large
 * photo, the key specs (type, bedrooms, area, bathrooms — plus the plot for
 * houses), a gallery, the description with its features, then the interest
 * form and the other unit types.
 */
export default function UnitTemplate({ unit, project }: { unit: UnitType; project: ProjectDetailData }) {
  const t = useT();
  const projectName = project.name.join(" ");
  // Neighborhoods of this project that offer the unit — "Back to" them
  // when the visitor came from one.
  const backTo = Object.fromEntries(
    NEIGHBORHOODS.filter((n) => n.project.id === project.id && n.units.some((u) => u.slug === unit.slug)).map((n) => [
      n.slug,
      { label: n.item.name, href: `/projects/${project.id}/neighborhoods/${n.slug}#homes` },
    ]),
  );
  const specs = [
    { label: "Type", value: t(unit.category) },
    { label: "Bedrooms", value: t("{n} Bedrooms", { n: unit.bedrooms }) },
    { label: "Total built-up area", value: `${unit.area} m²` },
    { label: "Bathrooms", value: t("{n} Bathrooms", { n: unit.bathrooms }) },
    ...(unit.land ? [{ label: "Land area", value: `${unit.land} m²` }] : []),
  ];

  return (
    <main>
      {/* Hero — black, so a unit reads as a secondary page of its project:
          the way back, copy + specs on the left, the unit's photo on the right. */}
      <section
        data-nav-theme="dark"
        className="flex flex-col gap-10 bg-brand-black px-6 pb-16 pt-28 text-brand-white md:flex-row md:items-stretch md:gap-16 md:px-16 md:pb-20 md:pt-36"
      >
        <Reveal className="flex flex-col gap-8 md:w-[42%] md:justify-center">
          <UnitBackLink project={{ label: projectName, href: `${projectHref(project.id)}#homes` }} neighborhoods={backTo} />
          <div className="flex flex-col gap-5">
            <h1 className="font-serif font-light uppercase leading-[0.95] tracking-[-0.02em] [font-size:clamp(2.75rem,6.5vw,6.5rem)]">
              {t(unit.name)}
            </h1>
            <p className="max-w-[520px] font-sans text-base leading-[1.6] text-white/75 md:text-lg">{t(unit.summary)}</p>
          </div>
          <dl className="grid grid-cols-2 border-t border-white/15">
            {specs.map((s) => (
              <div key={s.label} className="flex flex-col gap-1.5 border-b border-white/15 py-4 pe-4">
                <dt className="font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-white/50">{t(s.label)}</dt>
                <dd className="font-sans text-base font-medium md:text-lg">{s.value}</dd>
              </div>
            ))}
          </dl>
          <RequestInterest tone="light" className="self-start" />
        </Reveal>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] md:aspect-auto md:min-h-[640px] md:flex-1">
          <ParallaxImage src={unit.image} alt={t(unit.name)} sizes="(min-width: 768px) 55vw, 100vw" quality={90} />
        </div>
      </section>

      {/* Gallery and amenities — the project page's own sections. */}
      <ImageShowcase full={unit.gallery[0] ?? unit.image} half={unit.gallery[1] ?? unit.image} wide={unit.gallery[2] ?? unit.image} />
      <AmenitiesSection
        heading={[t("Amenities"), t("& Features")]}
        intro={unit.description}
        items={unit.features.map((f) => ({ icon: featureIcon(f, unit), title: f, description: "" }))}
      />

      <RequestInterestForm projectName={t("the {name}", { name: t(unit.name) })} image={unit.gallery[1] ?? unit.image} units={[unit.category]} />
      <Footer />
    </main>
  );
}
