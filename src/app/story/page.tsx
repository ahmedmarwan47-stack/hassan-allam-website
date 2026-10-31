import Footer from "@/components/Footer";
import ContactUsSection from "@/components/ContactUsSection";
import SectionNav from "@/components/SectionNav";
import StoryHero from "@/components/sections/story/StoryHero";
import StoryIntro from "@/components/sections/story/StoryIntro";
import ConstructionUpdates from "@/components/sections/story/ConstructionUpdates";
import CeoQuote from "@/components/sections/story/CeoQuote";
import VisionSection from "@/components/sections/story/VisionSection";
import FactsList from "@/components/sections/story/FactsList";
import LegacySection from "@/components/sections/story/LegacySection";
import OurTeam from "@/components/sections/story/OurTeam";

// Sections listed in the bottom navigation bar (ids match the sections).
const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "our-history", label: "Our History" },
  { id: "chairman-message", label: "Chairman Message" },
  { id: "facts-and-figures", label: "Facts and Figures" },
  { id: "our-legacy", label: "Our Legacy" },
  { id: "people-behind-hap", label: "People Behind HAP" },
];

export default function StoryPage() {
  return (
    <main>
      <StoryHero />
      <StoryIntro id="overview" />
      <ConstructionUpdates id="our-history" />
      <CeoQuote id="chairman-message" />
      <VisionSection />
      <FactsList id="facts-and-figures" />
      <LegacySection id="our-legacy" />
      <OurTeam id="people-behind-hap" />
      <ContactUsSection />
      <Footer />
      <SectionNav items={SECTIONS} />
    </main>
  );
}
