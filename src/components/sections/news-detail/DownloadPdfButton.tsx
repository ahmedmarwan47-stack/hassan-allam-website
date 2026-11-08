"use client";

import ActionButton from "@/components/ActionButton";
import { useT } from "@/i18n/LocaleProvider";

/**
 * "Download PDF" for a news article. There are no prepared PDFs, so it opens
 * the browser's print dialog, where the article can be saved as a PDF.
 */
export default function DownloadPdfButton() {
  const t = useT();
  return <ActionButton label={t("Download PDF")} look="download" tone="light" onClick={() => window.print()} />;
}
