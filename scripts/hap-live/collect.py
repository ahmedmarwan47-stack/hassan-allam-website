"""List every media file referenced by the decoded pages, with where it's
used (page + content path), its kind and size. Writes media.json."""
import json, os, glob, urllib.request
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
items = {}


def walk(o, page, path):
    if isinstance(o, dict):
        url = o.get("url")
        if isinstance(url, str) and "hap-medias" in url:
            rec = items.setdefault(url, {"url": url, "name": o.get("name"), "mime": o.get("mime"),
                                         "width": o.get("width"), "height": o.get("height"),
                                         "alt": o.get("alternativeText"), "uses": []})
            rec["uses"].append({"page": page, "path": path})
            return
        for k, v in o.items():
            if k in ("metadata", "formats"):
                continue
            walk(v, page, f"{path}.{k}" if path else k)
    elif isinstance(o, list):
        for i, v in enumerate(o):
            walk(v, page, f"{path}[{i}]")


for f in sorted(glob.glob(os.path.join(HERE, "data", "*.json"))):
    page = os.path.basename(f)[:-5]
    walk(json.load(open(f)), page, "")


def size(url):
    try:
        req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as r:
            return int(r.headers.get("Content-Length") or 0)
    except Exception:  # noqa: BLE001
        return -1


with ThreadPoolExecutor(12) as ex:
    for rec, s in zip(items.values(), ex.map(size, list(items))):
        rec["bytes"] = s

json.dump(list(items.values()), open(os.path.join(HERE, "media.json"), "w"), indent=1, ensure_ascii=False)
by = {}
for r in items.values():
    k = (r["mime"] or "?").split("/")[0] + "/" + (r["mime"] or "?").split("/")[-1]
    c, b = by.get(k, (0, 0))
    by[k] = (c + 1, b + max(r["bytes"], 0))
for k, (c, b) in sorted(by.items(), key=lambda x: -x[1][1]):
    print(f"{k:28} {c:4} files {b/1e6:9.1f} MB")
print("total", len(items), "files", round(sum(max(r["bytes"], 0) for r in items.values()) / 1e6, 1), "MB")
big = sorted(items.values(), key=lambda r: -r["bytes"])[:8]
for r in big:
    print(round(r["bytes"] / 1e6, 1), "MB", r["name"])
