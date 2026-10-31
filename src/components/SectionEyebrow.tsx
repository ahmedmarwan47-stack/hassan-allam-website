import { Reveal } from "@/components/Reveal";

/**
 * SectionEyebrow — the small uppercase sans label that names a section
 * ("Overview", "Our History", …). Always sits top-left at the section's
 * page margin, so every section on a page reads with the same rhythm.
 * Inherits the section's text colour (works on light and dark sections).
 */
export default function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`w-full ${className ?? ""}`}>
      <p className="text-left font-sans text-sm font-medium uppercase leading-[1.4] tracking-[0.12em] opacity-60 md:text-base">
        {children}
      </p>
    </Reveal>
  );
}
