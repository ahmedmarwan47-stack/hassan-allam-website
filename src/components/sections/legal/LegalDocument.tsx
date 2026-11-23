"use client";

import { useEffect, useState } from "react";
import type { LegalBlock, LegalDoc } from "@/data/legal";
import { useRtl, useT } from "@/i18n/LocaleProvider";

/**
 * LegalDocument — the body of the Privacy Policy and Terms of Use pages.
 * Desktop (lg+): a sticky contents list on the left that follows the
 * section in view, the text on the right at a reading width. Below lg the
 * contents list is hidden and the text runs full width.
 * Type: body 16/24 (18/28 from md), section headings 24/32 (32/36 from md).
 * No entrance animation: the text is visible as soon as the page loads.
 */
export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  const t = useT();
  const rtl = useRtl();
  // No Arabic translation of the legal text yet: on /ar it stays English,
  // so it runs left to right (the page layout itself stays mirrored).
  const english = !rtl || t(doc.sections[0].heading) === doc.sections[0].heading;
  const textDir = rtl && english ? { dir: "ltr" as const, lang: "en" } : {};
  const [active, setActive] = useState(doc.sections[0]?.id);

  // Contents list follows the section crossing the upper third of the screen.
  useEffect(() => {
    const els = doc.sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [doc]);

  return (
    <section data-nav-theme="light" className="bg-brand-white px-6 pb-20 text-brand-black md:px-16 md:pb-24">
      <div className="mx-auto grid max-w-[1312px] gap-16 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Contents */}
        <nav aria-label={t("Contents")} className="hidden lg:block" {...textDir}>
          <div className="sticky top-28 flex flex-col gap-4">
            <p className="font-sans text-xs font-medium uppercase leading-4 tracking-[0.12em] text-brand-black/60">
              {t("Contents")}
            </p>
            <ol className="flex flex-col gap-3 border-s border-grey-300">
              {doc.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`-ms-px block border-s ps-4 font-sans text-sm leading-5 transition-colors duration-300 ${
                      active === s.id
                        ? "border-brand-black text-brand-black"
                        : "border-transparent text-grey-500 hover:text-brand-black"
                    }`}
                  >
                    {t(s.heading)}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {/* Text */}
        <article className="flex max-w-[760px] flex-col gap-12 md:gap-16" {...textDir}>
          {(doc.docTitle || doc.updated || doc.intro) && (
            <header className="flex flex-col gap-6">
              {doc.docTitle && (
                <h2 className="font-serif text-2xl font-light leading-8 md:text-[32px] md:leading-9">{t(doc.docTitle)}</h2>
              )}
              {doc.updated && (
                <p className="font-sans text-sm leading-5 text-brand-black/60">{t(doc.updated)}</p>
              )}
              {doc.intro && <Blocks blocks={doc.intro} />}
            </header>
          )}

          {doc.sections.map((s) => (
            <section key={s.id} id={s.id} className="flex scroll-mt-28 flex-col gap-6 border-t border-grey-300 pt-8 md:pt-10">
              <h2 className="font-serif text-2xl font-light leading-8 md:text-[32px] md:leading-9">{t(s.heading)}</h2>
              <Blocks blocks={s.blocks} />
            </section>
          ))}
        </article>
      </div>
    </section>
  );
}

const BODY = "font-sans text-base leading-6 text-brand-black/80 md:text-lg md:leading-7";

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  const t = useT();
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((b, i) => {
        if (typeof b === "string") return <p key={i} className={BODY}>{t(b)}</p>;
        if ("list" in b)
          return (
            <ul key={i} className={`flex list-disc flex-col gap-2 ps-5 marker:text-grey-500 ${BODY}`}>
              {b.list.map((item) => (
                <li key={item}>{t(item)}</li>
              ))}
            </ul>
          );
        return (
          <ul key={i} className="flex flex-col gap-3">
            {b.terms.map(({ lead, text }) => (
              <li key={lead + text} className={BODY}>
                {lead && <strong className="font-medium text-brand-black">{t(lead)} </strong>}
                <Contactable text={t(text)} />
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}

/** The contact details become links; everything else stays plain text. */
function Contactable({ text }: { text: string }) {
  const cls = "underline decoration-1 underline-offset-2 hover:text-brand-black";
  if (/^\S+@\S+$/.test(text)) return <a href={`mailto:${text}`} className={cls}>{text}</a>;
  if (/^\d{5}$/.test(text)) return <a href={`tel:${text}`} className={cls}>{text}</a>;
  if (/^www\./.test(text)) return <a href={`https://${text}`} className={cls}>{text}</a>;
  return <>{text}</>;
}
