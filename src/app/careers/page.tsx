import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CareersHero from "@/components/sections/careers/CareersHero";
import CareersList from "@/components/sections/careers/CareersList";

export const metadata: Metadata = {
  title: "Careers — Hassan Allam Properties",
  description:
    "Open roles at Hassan Allam Properties across sales, engineering, marketing, finance and customer experience.",
};

export default function CareersPage() {
  return (
    <main>
      <CareersHero />
      <CareersList />
      <Footer />
    </main>
  );
}
