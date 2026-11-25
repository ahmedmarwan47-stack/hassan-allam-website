// Arabic route — the English page rendered under the "ar" locale.
import type { Metadata } from "next";
import { arMetadata } from "@/i18n/metadata";
import { metadata as enMetadata } from "@/app/(en)/legals/terms-of-use/page";
export { default } from "@/app/(en)/legals/terms-of-use/page";

// Page-specific SEO title/description from the client's document win (META_TITLE@<page>).
export const metadata: Metadata = arMetadata(enMetadata, "/legals/terms-of-use");
