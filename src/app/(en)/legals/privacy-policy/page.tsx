import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import LegalDocument from "@/components/sections/legal/LegalDocument";
import { PRIVACY_POLICY as DOC } from "@/data/legal";

export const metadata: Metadata = {
  title: `${DOC.metaTitle} — Hassan Allam Properties`,
  description: DOC.description,
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PageHero eyebrow="Legal" lines={DOC.title} size="md" />
      <LegalDocument doc={DOC} />
      <Footer />
    </main>
  );
}
