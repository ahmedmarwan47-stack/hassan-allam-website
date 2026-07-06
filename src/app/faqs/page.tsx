import type { Metadata } from "next";
import Footer from "@/components/Footer";
import FaqsHero from "@/components/sections/faqs/FaqsHero";
import FaqsList from "@/components/sections/faqs/FaqsList";

export const metadata: Metadata = {
  title: "FAQs — Hassan Allam Properties",
  description:
    "Answers to the most common questions about buying, paying for and living in a Hassan Allam Properties community.",
};

export default function FaqsPage() {
  return (
    <main>
      <FaqsHero />
      <FaqsList />
      <Footer />
    </main>
  );
}
