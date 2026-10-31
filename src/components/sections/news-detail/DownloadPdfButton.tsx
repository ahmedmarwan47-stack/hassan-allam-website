"use client";

import ActionButton from "@/components/ActionButton";

/**
 * "Download PDF" for a news article. There are no prepared PDFs, so it opens
 * the browser's print dialog, where the article can be saved as a PDF.
 */
export default function DownloadPdfButton() {
  return <ActionButton label="Download PDF" look="download" tone="light" onClick={() => window.print()} />;
}
