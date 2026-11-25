import type { Metadata } from "next";
import { arOnPage, translate } from "./index";

// Page titles are built as "Part — Part — Hassan Allam Properties"; each
// part is translated on its own.
const tr = (s: string) => s.split(" — ").map((p) => translate("ar", p)).join(" — ");

/** Arabic version of an English page's metadata. A page's own SEO title and
 *  description ("META_TITLE@/projects", "META_DESC@/projects") win. */
export function arMetadata(m: Metadata, page?: string): Metadata {
  const title = page ? arOnPage("META_TITLE", page) : undefined;
  const description = page ? arOnPage("META_DESC", page) : undefined;
  return {
    ...m,
    ...(title ? { title } : typeof m.title === "string" ? { title: tr(m.title) } : {}),
    ...(description
      ? { description }
      : typeof m.description === "string"
        ? { description: translate("ar", m.description) }
        : {}),
  };
}
