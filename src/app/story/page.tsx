import Footer from "@/components/Footer";
import StoryHero from "@/components/sections/story/StoryHero";
import StoryIntro from "@/components/sections/story/StoryIntro";
import ConstructionUpdates from "@/components/sections/story/ConstructionUpdates";
import CeoQuote from "@/components/sections/story/CeoQuote";
import VisionSection from "@/components/sections/story/VisionSection";
import FactsList from "@/components/sections/story/FactsList";
import OurTeam from "@/components/sections/story/OurTeam";

export default function StoryPage() {
  return (
    <main>
      <StoryHero />
      <StoryIntro />
      <ConstructionUpdates />
      <CeoQuote />
      <VisionSection />
      <FactsList />
      <OurTeam />
      <Footer />
    </main>
  );
}
