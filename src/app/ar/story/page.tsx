// Arabic route — the English page rendered under the "ar" locale.
import type { Metadata } from "next";
import { arMetadata } from "@/i18n/metadata";
export { default } from "@/app/(en)/story/page";

// Page-specific SEO title/description from the client's document win (META_TITLE@<page>).
export const metadata: Metadata = arMetadata({}, "/story");
