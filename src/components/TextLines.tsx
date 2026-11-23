import { Fragment } from "react";

/**
 * Text copied from hap.com.eg marks its line breaks with "<br />". Rendered
 * as a plain string, that shows on screen as code; this turns each one into
 * a real line break. The data keeps the markers, so the Arabic dictionary,
 * keyed by the exact English text, still matches.
 */
export default function TextLines({ text }: { text: string }) {
  const lines = text.split(/\s*<br\s*\/?>\s*/i);
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}
