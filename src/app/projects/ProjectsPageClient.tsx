"use client";

import { useEffect, useState } from "react";
import ProjectsHero from "@/components/sections/ProjectsHero";
import AllProjects from "@/components/sections/AllProjects";
import ProjectsCta from "@/components/sections/ProjectsCta";
import Footer from "@/components/Footer";
import { MAP_FILTERS, type FilterValue } from "@/data/mapProjects";

export default function ProjectsPageClient({
  initialFilter = "all",
}: {
  initialFilter?: FilterValue;
}) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>(initialFilter);

  // Apply `?filter=<Category>` from the URL once on mount. Done with plain
  // location.search (not useSearchParams) so the route stays fully static.
  useEffect(() => {
    const f = new URLSearchParams(window.location.search).get("filter");
    if (f && MAP_FILTERS.some((x) => x.value === f)) {
      setActiveFilter(f as FilterValue);
    }
  }, []);

  return (
    <main>
      <ProjectsHero activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <AllProjects activeFilter={activeFilter} />
      <ProjectsCta />
      <Footer />
    </main>
  );
}
