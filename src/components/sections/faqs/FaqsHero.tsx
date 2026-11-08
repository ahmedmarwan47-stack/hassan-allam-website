"use client";

import PageHero from "@/components/PageHero";
import { useT } from "@/i18n/LocaleProvider";

export default function FaqsHero() {
  const t = useT();
  return <PageHero eyebrow={t("Need Help?")} lines={[t("Frequently Asked"), t("Questions")]} size="md" />;
}
