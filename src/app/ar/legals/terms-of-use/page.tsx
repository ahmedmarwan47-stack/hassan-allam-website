// Arabic route — the English page rendered under the "ar" locale. The legal
// text itself has no Arabic translation yet, so it shows in English.
import { arMetadata } from "@/i18n/metadata";
import { metadata as enMetadata } from "@/app/(en)/legals/terms-of-use/page";
export { default } from "@/app/(en)/legals/terms-of-use/page";

export const metadata = arMetadata(enMetadata);
