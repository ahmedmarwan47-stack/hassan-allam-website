"use client";

import PageHero from "@/components/PageHero";
import { useT } from "@/i18n/LocaleProvider";

export default function CareersHero() {
  const t = useT();
  return <PageHero eyebrow={t("Careers")} lines={[t("Be Part"), t("of HAP")]} />;
}
