// Arabic route — the English page rendered under the "ar" locale.
import { arMetadata } from "@/i18n/metadata";
import { generateMetadata as enMetadata } from "@/app/(en)/projects/[slug]/units/[unit]/page";
export { default, generateStaticParams } from "@/app/(en)/projects/[slug]/units/[unit]/page";

export async function generateMetadata(props: Parameters<typeof enMetadata>[0]) {
  return arMetadata(await enMetadata(props));
}
