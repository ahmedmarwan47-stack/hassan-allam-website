# hap.com.eg → site data

Pulls the live site's content and media into an organized local archive, then
feeds the real images and copy into this website.

Run from the repo root (Python 3, no extra packages):

```bash
python3 -I scripts/hap-live/crawl.py        # every page's content → scripts/hap-live/data/
python3 -I scripts/hap-live/collect.py      # list every media file + size → media.json
python3 -I scripts/hap-live/organize.py "../hap-live-assets"          # download + organize + manifest
python3 -I scripts/hap-live/build_site_data.py "../hap-live-assets"   # images → public/images/hap, src/data/hapLive.ts
```

## The archive (`../hap-live-assets`, outside the repo)

```
hap-live-assets/
  manifest.csv / manifest.json   every file: local path, type, size, alt text,
                                 page + field it's used in, original URL
  content/                       each page's full content (decoded JSON)
  home/                          hero video, facts images, app mockup…
  the-story/                     introduction, chairman message, milestones, team/<name>
  news/<article>/                thumbnail + gallery
  projects/<slug>/
    <slug>-hero-cover, <slug>-card-thumbnail, <slug>-masterplan
    gallery/<slug>-gallery-01…
    amenities/<slug>-<amenity>   photos from the amenity lists
    videos/<slug>-fly-through    (large — archive only)
    brochures/<slug>-brochure    (large — archive only)
```

Images are copied into `public/images/hap/` with the same paths; videos and
brochures stay in the archive (several exceed GitHub's 100 MB file limit) and
the site links to the live CDN copies instead.
