// Arabic route — the English page rendered under the "ar" locale.
import type { Metadata } from "next";
export { default } from "@/app/(en)/page";

// Homepage meta, word for word from the client's SEO document (Home "/").
export const metadata: Metadata = {
  title: "حسن علام للعقارات: مجتمعات سكنية واستثمارية متكاملة",
  description:
    "اكتشف مشروعات حسن علام للعقارات في مصر وتعرّف على أرقى المجتمعات السكنية والساحلية والتجارية المصممة لأسلوب حياة مستدام ومتكامل.",
};
