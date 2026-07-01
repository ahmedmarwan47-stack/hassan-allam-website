import Hero from "@/components/sections/Hero";
import AssetClasses from "@/components/sections/AssetClasses";
import PortfolioStatement from "@/components/sections/PortfolioStatement";
import ProjectGallery from "@/components/sections/ProjectGallery";
import DiscoverProjects from "@/components/sections/DiscoverProjects";
import FactsFigures from "@/components/sections/FactsFigures";
import AppCta from "@/components/sections/AppCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <AssetClasses />
      <PortfolioStatement />
      <ProjectGallery />
      <DiscoverProjects />
      <FactsFigures />
      <AppCta />
      <Footer />
    </main>
  );
}
