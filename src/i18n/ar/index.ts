// The Arabic dictionary, merged from one file per area of the site.
import shell from "./shell";
import home from "./home";
import project from "./project";
import story from "./story";
import dataLive from "./data-live";
import dataContent from "./data-content";

const AR: Record<string, string> = { ...dataLive, ...dataContent, ...home, ...project, ...story, ...shell };
export default AR;
