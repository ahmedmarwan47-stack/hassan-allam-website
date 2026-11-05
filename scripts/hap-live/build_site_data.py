"""Turn the downloaded hap.com.eg archive into site data.

  python3 -I scripts/hap-live/build_site_data.py "../hap-live-assets"

1. Copies every image from the archive into public/images/hap/ (same
   organized folders and names — see the archive's manifest.csv).
2. Writes src/data/hapLive.ts: the live site's projects (names, groups,
   asset classes, GPS, intro copy, galleries, amenity lists, story blocks,
   brochure/video links, master plan with exact pin positions), The Story
   (intro, timeline, CEO message, team) and the homepage copy.

Videos, brochures and other large files stay in the archive only; the site
links to the live CDN copies.
"""
import json, os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ARCH = os.path.abspath(sys.argv[1])
media = json.load(open(os.path.join(ARCH, "manifest.json")))
local_of = {m["url"]: m["local"] for m in media}
IMG_EXT = (".jpg", ".jpeg", ".png", ".webp")

# 1. Images → public/images/hap/
for m in media:
    if m["local"].lower().endswith(IMG_EXT):
        dest = os.path.join(ROOT, "public", "images", "hap", m["local"])
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        src = os.path.join(ARCH, m["local"])
        if not os.path.exists(dest) or os.path.getsize(dest) != os.path.getsize(src):
            shutil.copy2(src, dest)


def content(name):
    d = json.load(open(os.path.join(ARCH, "content", f"{name}.json")))
    return next(iter(d["data"].values()))["data"]


def img(m):
    """Site path for a media object (images only)."""
    if not isinstance(m, dict) or not m.get("url"):
        return None
    local = local_of.get(m["url"])
    return f"/images/hap/{local}" if local and local.lower().endswith(IMG_EXT) else None


def text(blocks):
    """Rich-text blocks → plain paragraphs (empty ones dropped)."""
    out = []
    for b in blocks or []:
        t = "".join(c.get("text", "") for c in b.get("children", [])).strip()
        if t:
            out.append(t)
    return out


TYPE = {
    "residential": "Residential",
    "office-space": "Office Space",
    "retail": "Retail",
    "hospitality-and-leisure": "Hospitality & Leisure",
    "sports-and-wellness": "Sports & Wellness",
}
# Live list icons → our FeatureIcon names.
ICON = {
    "fitness": "fitness", "market": "retail", "culinary": "dining", "restaurant": "dining",
    "cocktail": "hospitality", "parasol": "leisure", "flower": "leisure",
}


def project(slug):
    p = content(f"projects__{slug}")
    out = {
        "slug": p["slug"],
        "name": p["name"].strip(),
        "abbreviation": p.get("abbreviation"),
        "group": "sea" if p["group"]["uid"] == "by-the-sea" else "city",
        "types": [TYPE[t["uid"]] for t in p["types"] if t["uid"] in TYPE],
        "coordinates": p.get("coordinates"),
        "thumbnail": img(p.get("thumbnail")),
        "cover": img((p.get("hero") or {}).get("cover")) or img(p.get("thumbnail")),
        "intro": text((p.get("hero") or {}).get("introduction")),
        "overview": [],
        "galleries": [],
        "lists": [],
        "diptych": None,
        "brochure": None,
        "video": None,
        "masterplan": None,
    }
    for c in p.get("content", []):
        t = c["__typename"]
        if t == "ComponentContentParagraphs":
            out["overview"] += text(c.get("content"))
            a = c.get("attachment")
            if a and a.get("file"):
                out["brochure"] = {"label": a.get("label") or "Download our brochure", "url": a["file"]["url"]}
        elif t == "ComponentContentPlayer" and c.get("video"):
            out["video"] = c["video"]["url"]
        elif t == "ComponentContentGallery":
            g = [x for x in (img(i) for i in c.get("images") or []) if x]
            if g:
                out["galleries"].append(g)
        elif t == "ComponentContentList":
            out["lists"].append({
                "title": c.get("listTitle") or c.get("title") or "",
                "items": [{"label": i["label"].strip(), "description": (i.get("description") or "").strip(),
                           "icon": ICON.get(i.get("icon"), "leisure"), "thumbnail": img(i.get("thumbnail"))}
                          for i in c.get("items") or []],
            })
        elif t == "ComponentContentDiptych":
            out["diptych"] = {"title": c.get("diptychTitle") or c.get("title") or "", "text": text(c.get("text"))}
        elif t == "ComponentProjectMap" and c.get("map"):
            b = c["coordinates"]
            items = []
            for it in c.get("items") or []:
                # The client asked for am:pm to come off the master plan.
                if it["slug"].startswith("ampm"):
                    continue
                ll = it["coordinates"]
                items.append({
                    "slug": it["slug"],
                    "name": it["name"].strip(),
                    "parcel": (re.search(r"parcel(\d+)", it["slug"]) or [None, None])[1],
                    # Exact pin position, % of the map image (GPS → bounds).
                    "left": round((ll["lng"] - b["min-lng"]) / (b["max-lng"] - b["min-lng"]) * 100, 2),
                    "top": round((b["max-lat"] - ll["lat"]) / (b["max-lat"] - b["min-lat"]) * 100, 2),
                    "types": [TYPE[t["uid"]] for t in it.get("types") or [] if t.get("uid") in TYPE],
                })
            out["masterplan"] = {"map": img(c["map"]), "width": c["map"]["width"], "height": c["map"]["height"], "items": items}
    return out


slugs = sorted(f[len("projects__"):-5] for f in os.listdir(os.path.join(ARCH, "content")) if f.startswith("projects__"))
projects = [project(s) for s in slugs]

s = content("the-story")
story = {
    "title": (s.get("hero") or {}).get("title"),
    "intro": text((s.get("introduction") or {}).get("paragraphs")),
    "introImage": img((s.get("introduction") or {}).get("image")),
    "timeline": [{"year": k["date"][:4], "title": re.sub(r"\s*<br>\s*", " ", k["title"]).strip(), "highlight": k.get("highlight", False)}
                 for k in (s.get("timeline") or {}).get("keys", [])],
    "message": {
        "title": (s.get("message") or {}).get("title"),
        "quote": re.sub(r"<[^>]+>|‎", "", ((s.get("message") or {}).get("quote") or {}).get("text") or "").replace("  ", " ").strip(),
        "author": ((s.get("message") or {}).get("quote") or {}).get("author"),
        "paragraphs": text((s.get("message") or {}).get("paragraphs")),
        "image": img((s.get("message") or {}).get("image")),
    },
    "team": [{"name": f"{m.get('firstname', '')} {m.get('lastname', '')}".strip(), "role": (m.get("role") or "").strip(),
              "summary": (m.get("description") or "").strip() if isinstance(m.get("description"), str) else "",
              "bio": text(m.get("paragraphs")), "picture": img(m.get("picture"))}
             for m in (s.get("team") or {}).get("members", [])],
}

news = []
for f in sorted(os.listdir(os.path.join(ARCH, "content"))):
    if not f.startswith("news__"):
        continue
    n = content(f[:-5])
    paragraphs, images = [], []
    for c in n.get("content") or []:
        if c["__typename"] == "ComponentContentParagraphs":
            paragraphs += text(c.get("content"))
        elif c["__typename"] == "ComponentContentGallery":
            images += [x for x in (img(i) for i in c.get("images") or []) if x]
    news.append({
        "slug": n["slug"], "title": n["title"].strip(), "date": n["date"][:10],
        "thumbnail": img(n.get("thumbnail")),
        "intro": text((n.get("hero") or {}).get("introduction")),
        "paragraphs": paragraphs, "images": images,
    })
news.sort(key=lambda a: a["date"], reverse=True)

h = content("home")
about = h.get("about") or {}
home = {
    "heroTitle": (h.get("hero") or {}).get("title", "").replace("_", ""),
    "introduction": (h.get("introduction") or {}).get("title"),
    "portfolio": h.get("portfolio"),
    "map": h.get("map"),
    "about": {"title": about.get("title"), "paragraph": about.get("paragraph"),
              "quote": (about.get("quote") or {}).get("text"), "author": (about.get("quote") or {}).get("author"),
              "image": img(about.get("image"))},
    "facts": [{"label": i["label"].strip(), "value": i["value"], "unit": i.get("units"), "image": img(i.get("thumbnail"))}
              for i in ((about.get("dataList") or {}).get("items") or [])],
    "appMockup": img((h.get("application") or {}).get("mockup")),
}

ts = f"""// GENERATED by scripts/hap-live/build_site_data.py from the hap.com.eg
// archive — do not edit by hand; re-run the script to refresh.
// Every image path points into public/images/hap/ (see the archive's
// manifest.csv for where each file is used on the live site).
import type {{ Category }} from "./mapProjects";
import type {{ FeatureIconName }} from "@/components/sections/project-detail/icons";

export interface LiveMasterplanItem {{
  slug: string;
  name: string;
  /** Parcel number for the generic "Villas/Apartments Residences" plots. */
  parcel: string | null;
  /** Pin position, % of the master plan image (from its GPS). */
  left: number;
  top: number;
  types: Category[];
}}

export interface LiveProject {{
  slug: string;
  name: string;
  abbreviation: string | null;
  group: "city" | "sea";
  types: Category[];
  coordinates: {{ lat: number; lng: number }} | null;
  thumbnail: string | null;
  cover: string | null;
  intro: string[];
  overview: string[];
  galleries: string[][];
  lists: {{ title: string; items: {{ label: string; description: string; icon: FeatureIconName; thumbnail: string | null }}[] }}[];
  diptych: {{ title: string; text: string[] }} | null;
  /** Live CDN links — the files themselves are in the local archive only. */
  brochure: {{ label: string; url: string }} | null;
  video: string | null;
  masterplan: {{ map: string; width: number; height: number; items: LiveMasterplanItem[] }} | null;
}}

export const LIVE_PROJECTS: LiveProject[] = {json.dumps(projects, indent=2, ensure_ascii=False)};

export const LIVE_STORY = {json.dumps(story, indent=2, ensure_ascii=False)};

export const LIVE_HOME = {json.dumps(home, indent=2, ensure_ascii=False)};

export interface LiveArticle {{
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  thumbnail: string | null;
  intro: string[];
  paragraphs: string[];
  images: string[];
}}

export const LIVE_NEWS: LiveArticle[] = {json.dumps(news, indent=2, ensure_ascii=False)};
"""
open(os.path.join(ROOT, "src", "data", "hapLive.ts"), "w").write(ts)
print(len(projects), "projects;", sum(1 for m in media if m["local"].lower().endswith(IMG_EXT)), "images copied")
