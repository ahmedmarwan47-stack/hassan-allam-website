"""Download every hap.com.eg media file into an organized, descriptively named
archive, and write a manifest (CSV + JSON) plus the decoded page content.

Usage: python3 -I organize.py <archive dir>
"""
import csv, json, os, re, shutil, sys, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
ARCH = sys.argv[1]
media = json.load(open(os.path.join(HERE, "media.json")))
pages = {f[:-5]: json.load(open(os.path.join(HERE, "data", f))) for f in os.listdir(os.path.join(HERE, "data"))}


def slug(s):
    s = re.sub(r"_[0-9a-f]{10}$", "", os.path.splitext(s or "")[0])  # Strapi hash suffix
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-") or "file"


def resolve(page, path):
    """The object at `path` in a page's decoded data, plus its parent chain."""
    obj, chain = pages[page], []
    for part in re.findall(r"[^.\[\]]+|\[\d+\]", path):
        chain.append(obj)
        obj = obj[int(part[1:-1])] if part.startswith("[") else obj[part]
    return obj, chain


def label_of(d):
    if not isinstance(d, dict):
        return None
    if d.get("firstname") or d.get("lastname"):  # team members
        return f"{d.get('firstname', '')} {d.get('lastname', '')}".strip()
    for k in ("name", "title", "label", "fullName", "firstName"):
        v = d.get(k)
        if isinstance(v, str) and v.strip():
            return v.strip()
    return None


ext_of = lambda r: os.path.splitext(urllib.parse.urlparse(r["url"]).path)[1].lower() or ".bin"
counters = {}


def place(r):
    """Folder + file name for a media item, from its first (primary) use."""
    u = r["uses"][0]
    page, path = u["page"], re.sub(r"^data\.en_[^.]+\.data\.", "", u["path"])
    ext = ext_of(r)
    kind = (r["mime"] or "").split("/")[0]
    _, chain = resolve(u["page"], u["path"])
    owner = next((label_of(c) for c in reversed(chain[-3:]) if label_of(c)), None)

    def seq(key):
        counters[key] = counters.get(key, 0) + 1
        return f"{counters[key]:02d}"

    if page.startswith("projects__"):
        p = page.split("__")[1]
        base = f"projects/{p}"
        if path == "thumbnail":
            return base, f"{p}-card-thumbnail{ext}"
        if path == "hero.cover":
            return base, f"{p}-hero-cover{ext}"
        if path == "hero.thumbnail":
            return base, f"{p}-hero-thumbnail{ext}"
        if path.endswith(".map"):
            return base, f"{p}-masterplan{ext}"
        if path.endswith(".video"):
            return f"{base}/videos", f"{p}-fly-through{ext}"
        if path.endswith("attachment.file"):
            return f"{base}/brochures", f"{p}-brochure{ext}"
        if ".items[" in path:
            # Thumbnails of a project's amenity list (e.g. "Golf Course").
            return f"{base}/amenities", f"{p}-{slug(owner or 'amenity')}{ext}"
        if ".images[" in path:
            return f"{base}/gallery", f"{p}-gallery-{seq(base + 'g')}{ext}"
        return f"{base}/other", f"{p}-{slug(r['name'])}{ext}"
    if page.startswith("news__"):
        n = page.split("__")[1]
        if path == "thumbnail":
            return f"news/{n}", f"{n}-thumbnail{ext}"
        return f"news/{n}/gallery", f"{n}-gallery-{seq('news' + n)}{ext}"
    if page == "the-story":
        if path.startswith("team.members"):
            return "the-story/team", f"{slug(owner or r['name'])}{ext}"
        if path == "message.image":
            return "the-story", f"chairman-message{ext}"
        if path == "introduction.image":
            return "the-story", f"introduction{ext}"
        if path.startswith("list.items"):
            return "the-story/milestones", f"{seq('story-list')}-{slug(owner or r['name'])}{ext}"
    if page == "home":
        named = {
            "hero.background": "hero-background", "hero.mobileBackground": "hero-background-mobile",
            "hero.showreel": "showreel", "hero.mobileShowreel": "showreel-mobile",
            "about.image": "the-story-teaser", "application.mockup": "hap-family-app-mockup",
        }
        if path in named:
            return ("home/videos" if kind == "video" else "home"), f"{named[path]}{ext}"
        if path.startswith("about.dataList"):
            return "home/facts-and-figures", f"{seq('facts')}-{slug(owner or r['name'])}{ext}"
    return f"{page}/other", f"{slug(r['name'])}{ext}"


taken = set()
for r in media:
    folder, name = place(r)
    # Never let two files share a name.
    stem, ext = os.path.splitext(name)
    n = 2
    while f"{folder}/{name}" in taken:
        name = f"{stem}-{n}{ext}"
        n += 1
    taken.add(f"{folder}/{name}")
    r["local"] = f"{folder}/{name}"


def fetch(r):
    dest = os.path.join(ARCH, r["local"])
    if os.path.exists(dest) and (r["bytes"] <= 0 or os.path.getsize(dest) == r["bytes"]):
        return r["local"], "kept"
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    req = urllib.request.Request(r["url"], headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=600) as resp, open(dest + ".part", "wb") as f:
        shutil.copyfileobj(resp, f, 1 << 20)
    os.replace(dest + ".part", dest)
    return r["local"], "downloaded"


os.makedirs(ARCH, exist_ok=True)
with ThreadPoolExecutor(6) as ex:
    for local, status in ex.map(fetch, media):
        print(status, local, flush=True)

# Manifest — one row per use, so every place a file appears is listed.
with open(os.path.join(ARCH, "manifest.csv"), "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["local_file", "type", "width", "height", "size_mb", "alt_text", "used_on_page", "used_in_field", "original_url"])
    for r in sorted(media, key=lambda r: r["local"]):
        for u in r["uses"]:
            w.writerow([r["local"], r["mime"], r["width"] or "", r["height"] or "", round(max(r["bytes"], 0) / 1e6, 2),
                        r["alt"] or "", "/" + u["page"].replace("__", "/").replace("home", "") ,
                        re.sub(r"^data\.en_[^.]+\.data\.", "", u["path"]), r["url"]])
json.dump(media, open(os.path.join(ARCH, "manifest.json"), "w"), indent=1, ensure_ascii=False)

# Page content (decoded), for data entry.
os.makedirs(os.path.join(ARCH, "content"), exist_ok=True)
for name, data in pages.items():
    json.dump(data, open(os.path.join(ARCH, "content", f"{name}.json"), "w"), indent=1, ensure_ascii=False)
print("done", len(media), "files")
