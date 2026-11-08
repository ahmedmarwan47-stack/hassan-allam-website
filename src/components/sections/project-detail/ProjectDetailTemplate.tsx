"use client";

import Footer from "@/components/Footer";
import SectionNav from "@/components/SectionNav";
import type { ProjectDetailData } from "@/data/projectDetail";
import ProjectHero from "./ProjectHero";
import ProjectIntro from "./ProjectIntro";
import MasterPlan from "./MasterPlan";
import ImageShowcase from "./ImageShowcase";
import AmenitiesSection from "./AmenitiesSection";
import ProjectStory from "./ProjectStory";
import UnitTypesSection from "./UnitTypesSection";
import { UNIT_TYPES } from "@/data/units";
import ConstructionTimeline from "./ConstructionTimeline";
import RequestInterestForm from "./RequestInterestForm";
import { useT } from "@/i18n/LocaleProvider";

/**
 * Shared project detail template. The Master Plan section only renders when
 * `data.masterPlan` is present — "By The Sea" projects omit it entirely,
 * "In The City" projects (e.g. Swanlake Residences New Cairo) include it.
 * Every "Request interest" button on the page jumps to the closing form.
 */
export default function ProjectDetailTemplate({ data }: { data: ProjectDetailData }) {
  const t = useT();
  // In-page navigation (same bar as Our Story); Master Plan only when present.
  const sections = [
    { id: "overview", label: "Overview" },
    ...(data.masterPlan ? [{ id: "master-plan", label: "Master Plan" }] : []),
    { id: "gallery", label: "Gallery" },
    { id: "amenities", label: "Amenities" },
    { id: "the-story", label: "The Story" },
    { id: "homes", label: "Homes" },
    { id: "construction-updates", label: "Construction Updates" },
    { id: "request-interest", label: "Request Interest" },
  ].map((s) => ({ ...s, label: t(s.label) }));

  return (
    <main>
      <ProjectHero data={data} />
      <ProjectIntro id="overview" data={data} />
      {data.masterPlan && (
        <MasterPlan
          id="master-plan"
          projectId={data.id}
          projectName={data.name.join(" ")}
          items={data.masterPlan.items}
          mapImage={data.masterPlan.mapImage}
          aspect={data.masterPlan.aspect}
        />
      )}
      <ImageShowcase id="gallery" {...data.showcase} />
      <AmenitiesSection id="amenities" heading={data.amenitiesHeading} items={data.amenities} />
      <ProjectStory
        id="the-story"
        images={data.storyImages}
        heading={data.storyHeading}
        paragraphs={data.storyParagraphs}
      />
      <UnitTypesSection
        id="homes"
        projectId={data.id}
        heading={data.productsHeading}
        intro={t("From garden apartments to standalone villas — every home is designed around light, privacy and outdoor living.")}
        units={UNIT_TYPES}
      />
      <ConstructionTimeline data={data.construction} />
      <RequestInterestForm projectName={data.name.join(" ")} image={data.showcase.full} />
      <Footer />
      <SectionNav items={sections} />
    </main>
  );
}
