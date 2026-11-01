/**
 * FilterButton — the site's one filter button (FAQs, Careers, Media Center):
 * white with a thin border and a brand-black hover; the active one inverts
 * to black/white.
 */
export default function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-[46px] shrink-0 whitespace-nowrap rounded-[2px] border px-5 font-sans text-sm font-medium transition-[background-color,border-color,color] duration-300 ease-out md:h-[54px] md:px-6 md:text-base ${
        active
          ? "border-brand-black bg-brand-black text-brand-white"
          : "border-brand-black/20 bg-transparent text-brand-black hover:border-brand-black"
      }`}
    >
      {label}
    </button>
  );
}
