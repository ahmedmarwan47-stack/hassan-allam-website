"use client";

import { MAP_FILTERS, type FilterValue } from "@/data/mapProjects";
import { useDragScroll } from "@/hooks/useDragScroll";

/**
 * The mobile filter bar under the interactive map. No "Filters" label (to free
 * up space), filters start from the left, and the row is drag-scrollable so all
 * categories are reachable on a narrow screen.
 */
export default function MapFilterBarMobile({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: FilterValue;
  onFilterChange: (v: FilterValue) => void;
}) {
  const { ref, dragProps, wasDragged } = useDragScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      {...dragProps}
      className="absolute inset-x-0 bottom-0 flex cursor-grab items-center gap-6 overflow-x-auto bg-brand-white px-6 py-3 active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {MAP_FILTERS.map(({ label, value }) => (
        <button
          key={value}
          type="button"
          onClick={() => {
            // Swallow the click that ends a drag so dragging doesn't select a filter.
            if (wasDragged()) return;
            onFilterChange(value);
          }}
          className={[
            "relative shrink-0 whitespace-nowrap py-1 font-sans text-sm font-medium transition-colors duration-200",
            activeFilter === value
              ? "text-brand-black after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-px after:bg-brand-black"
              : "text-grey-500",
          ].join(" ")}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
