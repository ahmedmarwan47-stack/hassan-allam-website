import ProjectsPageClient from "./ProjectsPageClient";

// `/projects?filter=Residential` (etc.) preselects a category filter — linked
// from the homepage Asset Classes cards and the map sidebar. The filter is
// read from location.search on mount inside ProjectsPageClient (no
// useSearchParams/Suspense), which keeps the page a plain static route.
export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
