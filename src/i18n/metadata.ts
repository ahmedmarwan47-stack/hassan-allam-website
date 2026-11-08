import type { Metadata } from "next";
import { translate } from "./index";

// Page titles are built as "Part — Part — Hassan Allam Properties"; each
// part is translated on its own.
const tr = (s: string) => s.split(" — ").map((p) => translate("ar", p)).join(" — ");

/** Arabic version of an English page's metadata. */
export function arMetadata(m: Metadata): Metadata {
  return {
    ...m,
    ...(typeof m.title === "string" ? { title: tr(m.title) } : {}),
    ...(typeof m.description === "string" ? { description: translate("ar", m.description) } : {}),
  };
}
