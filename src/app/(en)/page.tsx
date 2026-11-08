import Hero from "@/components/sections/Hero";
import AssetClasses from "@/components/sections/AssetClasses";
import PortfolioStatement from "@/components/sections/PortfolioStatement";
import ProjectGallery from "@/components/sections/ProjectGallery";
import DiscoverProjects from "@/components/sections/DiscoverProjects";
import FactsFigures from "@/components/sections/FactsFigures";
import HomeMediaCenter from "@/components/sections/HomeMediaCenter";
import AppCta from "@/components/sections/AppCta";
import Footer from "@/components/Footer";
import ContactUsSection from "@/components/ContactUsSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <AssetClasses />
      <PortfolioStatement />
      <ProjectGallery />
      <DiscoverProjects />
      <FactsFigures />
      <HomeMediaCenter />
      <AppCta />
      <ContactUsSection />
      <Footer />
    </main>
  );
}
