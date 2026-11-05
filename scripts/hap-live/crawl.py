"""Fetch every hap.com.eg page's Nuxt payload, decode it (devalue format) and
save the structured content as JSON — one file per page in data/."""
import json, os, re, sys, urllib.request

BASE = "https://www.hap.com.eg"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "data")
os.makedirs(OUT, exist_ok=True)


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.read().decode("utf-8")


def decode(raw):
    """Nuxt payload (devalue): a flat array; objects/arrays hold indices."""
    arr = json.loads(raw)
    memo = {}

    def res(i):
        if i in memo:
            return memo[i]
        v = arr[i]
        if isinstance(v, list):
            if v and isinstance(v[0], str) and v[0] in ("ShallowReactive", "Reactive", "Ref", "ShallowRef", "EmptyRef", "EmptyShallowRef"):
                out = res(v[1]) if len(v) > 1 else None
            elif v and isinstance(v[0], str) and v[0] in ("Set",):
                out = [res(x) for x in v[1:]]
            elif v and isinstance(v[0], str) and v[0] == "Date":
                out = v[1]
            else:
                out = []
                memo[i] = out
                out.extend(res(x) if isinstance(x, int) else x for x in v)
                return out
        elif isinstance(v, dict):
            out = {}
            memo[i] = out
            for k, x in v.items():
                out[k] = res(x) if isinstance(x, int) else x
            return out
        else:
            out = v
        memo[i] = out
        return out

    return res(0)


def page(path):
    raw = get(f"{BASE}{path}_payload.json")
    data = decode(raw)
    name = path.strip("/").replace("/", "__") or "home"
    with open(os.path.join(OUT, f"{name}.json"), "w") as f:
        json.dump(data, f, indent=1, ensure_ascii=False)
    return data


paths = ["/", "/projects/", "/the-story/", "/news/", "/contact/", "/legals/privacy-policy/", "/legals/terms-of-use/"]
html = get(f"{BASE}/") + get(f"{BASE}/projects/") + get(f"{BASE}/news/")
paths += sorted(set(re.findall(r'href="(/projects/[a-z0-9-]+/)"', html)))
news = page("/news/")
paths += sorted(set(re.findall(r'"(/news/[a-z0-9-]+/)"', json.dumps(news))) | set(re.findall(r'href="(/news/[a-z0-9-]+/)"', html)))

done = []
for p in dict.fromkeys(paths):
    try:
        page(p)
        done.append(p)
    except Exception as e:  # noqa: BLE001
        print("FAIL", p, e, file=sys.stderr)
print(len(done), "pages")
print("\n".join(done))
