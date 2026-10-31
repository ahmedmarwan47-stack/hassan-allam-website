#!/usr/bin/env bash
# Deploy the static site to GitHub Pages (the gh-pages branch).
#
# 1. Pre-resize images (scripts/optimize-images.mjs) and build the export.
# 2. Drop original images the export no longer needs — pages load the
#    resized copies in /_img; only the few files served as-is are kept.
# 3. Sync the export into a persistent checkout of gh-pages (.deploy/) and
#    push a normal commit, so only changed files are uploaded each time
#    (instead of re-sending the whole site).
set -euo pipefail
cd "$(dirname "$0")/.."

REPO="https://github.com/ahmedmarwan47-stack/hassan-allam-website.git"
DEPLOY_DIR=".deploy"

node scripts/optimize-images.mjs
rm -rf out
DEPLOY_TARGET=gh-pages npx next build

# Originals still referenced directly (not through the image loader).
KEEP_ORIGINALS=(
  "map/egypt-map-full.webp"
  "map/cloud-a.webp"
  "map/cloud-b.webp"
  "map/cloud-c.webp"
  "section-bg.jpg"
)
keep_args=()
for f in "${KEEP_ORIGINALS[@]}"; do keep_args+=(! -path "out/images/$f"); done
find out/images -type f "${keep_args[@]}" -delete
find out/images -type d -empty -delete

if [ ! -d "$DEPLOY_DIR/.git" ]; then
  git clone --branch gh-pages --single-branch --depth 1 "$REPO" "$DEPLOY_DIR"
else
  git -C "$DEPLOY_DIR" fetch --depth 1 origin gh-pages
  git -C "$DEPLOY_DIR" reset --hard origin/gh-pages
fi

rsync -a --delete --exclude .git out/ "$DEPLOY_DIR/"
git -C "$DEPLOY_DIR" add -A
if git -C "$DEPLOY_DIR" diff --cached --quiet; then
  echo "Nothing changed — already deployed."
  exit 0
fi
git -C "$DEPLOY_DIR" commit -qm "Deploy to GitHub Pages ($(git rev-parse --short HEAD))"
git -C "$DEPLOY_DIR" push origin gh-pages
echo "Deployed $(git rev-parse --short HEAD)."
