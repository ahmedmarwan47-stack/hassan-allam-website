// Arabic route — the English page rendered under the "ar" locale.
import type { Metadata } from "next";
import { arMetadata } from "@/i18n/metadata";
import { generateMetadata as enMetadata } from "@/app/(en)/projects/[slug]/neighborhoods/[neighborhood]/page";
export { default, generateStaticParams } from "@/app/(en)/projects/[slug]/neighborhoods/[neighborhood]/page";

// Page-specific SEO title/description from the client's document win (META_TITLE@<page>).
export async function generateMetadata(props: { params: Promise<{ slug: string; neighborhood: string }> }): Promise<Metadata> {
  const p = await props.params;
  return arMetadata(await enMetadata(props), `/projects/${p.slug}/neighborhoods/${p.neighborhood}`);
}
