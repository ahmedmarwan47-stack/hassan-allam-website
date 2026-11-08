"use client";

import ActionButton from "@/components/ActionButton";
import { useT } from "@/i18n/LocaleProvider";

/**
 * Small client hooks between project-page sections, via window events:
 * a neighborhood name in the intro opens that neighborhood's master plan
 * drawer, and the brochure button pre-fills the interest form.
 */
export const OPEN_NEIGHBORHOOD = "hap:open-neighborhood";
export const PREFILL_INTEREST = "hap:prefill-interest";
/** Ticks a unit type (event detail) in the form's "Interested in" field. */
export const PREFILL_UNIT = "hap:prefill-unit";

export function NeighborhoodLink({ name }: { name: string }) {
  const t = useT();
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_NEIGHBORHOOD, { detail: name }))}
      className="text-grey-500 underline decoration-1 underline-offset-2 transition-colors duration-200 hover:text-brand-black"
    >
      {t(name)}
    </button>
  );
}

/** No brochure file yet: request it through the interest form instead. */
/** Opens the project's brochure (the live hap.com.eg file) when there is
 *  one; otherwise asks for it through the interest form. */
export function BrochureButton({ label, url }: { label: string; url?: string }) {
  const t = useT();
  return (
    <ActionButton
      label={t(label)}
      look="download"
      onClick={() => {
        if (url) {
          window.open(url, "_blank", "noopener");
          return;
        }
        window.dispatchEvent(
          new CustomEvent(PREFILL_INTEREST, { detail: t("Please send me the project brochure.") }),
        );
        document.getElementById("request-interest")?.scrollIntoView({ behavior: "smooth" });
      }}
    />
  );
}
