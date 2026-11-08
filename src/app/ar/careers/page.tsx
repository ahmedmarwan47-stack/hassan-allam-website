// Arabic route — the English page rendered under the "ar" locale.
import { arMetadata } from "@/i18n/metadata";
import { metadata as enMetadata } from "@/app/(en)/careers/page";
export { default } from "@/app/(en)/careers/page";

export const metadata = arMetadata(enMetadata);
