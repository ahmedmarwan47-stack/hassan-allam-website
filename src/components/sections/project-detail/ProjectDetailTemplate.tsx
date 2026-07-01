import Footer from "@/components/Footer";
import type { ProjectDetailData } from "@/data/projectDetail";
import ProjectHero from "./ProjectHero";
import ProjectIntro from "./ProjectIntro";
import MasterPlan from "./MasterPlan";
import ImageShowcase from "./ImageShowcase";
import AmenitiesSection from "./AmenitiesSection";
import ProjectStory from "./ProjectStory";
import ProductsSection from "./ProductsSection";
import ResaleCta from "./ResaleCta";

/**
 * Shared project detail template. The Master Plan section only renders when
 * `data.masterPlan` is present — "By The Sea" projects omit it entirely,
 * "In The City" projects (e.g. Swanlake Residences New Cairo) include it.
 */
export default function ProjectDetailTemplate({ data }: { data: ProjectDetailData }) {
  return (
    <main>
      <ProjectHero data={data} />
      <ProjectIntro data={data} />
      {data.masterPlan && (
        <MasterPlan items={data.masterPlan.items} mapImage={data.masterPlan.mapImage} />
      )}
      <ImageShowcase {...data.showcase} />
      <AmenitiesSection heading={data.amenitiesHeading} items={data.amenities} />
      <ProjectStory
        images={data.storyImages}
        heading={data.storyHeading}
        paragraphs={data.storyParagraphs}
      />
      <ProductsSection
        images={data.productsImages}
        heading={data.productsHeading}
        items={data.products}
      />
      <ResaleCta
        heading={data.ctaHeading}
        paragraph={data.ctaParagraph}
        buttonLabel={data.ctaButtonLabel}
      />
      <Footer />
    </main>
  );
}
