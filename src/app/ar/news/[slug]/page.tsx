// Arabic route — the English page rendered under the "ar" locale.
import type { Metadata } from "next";
import { arMetadata } from "@/i18n/metadata";
export { default, generateStaticParams } from "@/app/(en)/news/[slug]/page";

// Page-specific SEO title/description from the client's document win (META_TITLE@<page>).
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await props.params;
  return arMetadata({}, `/news/${p.slug}`);
}
