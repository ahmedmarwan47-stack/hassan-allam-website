#!/usr/bin/env bash
# Publish the current branch as a preview on GitHub Pages, next to the live
# site and without touching it:
#   https://ahmedmarwan47-stack.github.io/hassan-allam-website/preview/<branch>/
#
# The preview is a full export of this branch under its own sub-path, but it
# loads images from the live site's /images and /_img (same files), so it
# doesn't add a second copy of every image to the gh-pages branch.
# Run from any branch: `npm run deploy:preview`.
set -euo pipefail
cd "$(dirname "$0")/.."

REPO="https://github.com/ahmedmarwan47-stack/hassan-allam-website.git"
DEPLOY_DIR=".deploy"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
SLUG="$(echo "$BRANCH" | tr '/' '-' | tr -cd 'A-Za-z0-9._-')"
if [ "$SLUG" = "main" ]; then
  echo "On main — use 'npm run deploy' for the live site." >&2
  exit 1
fi

rm -rf out
DEPLOY_TARGET=gh-pages \
PAGES_BASE_PATH="/hassan-allam-website/preview/$SLUG" \
PAGES_ASSET_BASE="/hassan-allam-website" \
  npx next build

# Images come from the live site.
rm -rf out/_img out/images

if [ ! -d "$DEPLOY_DIR/.git" ]; then
  git clone --branch gh-pages --single-branch --depth 1 "$REPO" "$DEPLOY_DIR"
else
  git -C "$DEPLOY_DIR" fetch --depth 1 origin gh-pages
  git -C "$DEPLOY_DIR" reset --hard origin/gh-pages
fi

mkdir -p "$DEPLOY_DIR/preview/$SLUG"
rsync -a --delete out/ "$DEPLOY_DIR/preview/$SLUG/"
git -C "$DEPLOY_DIR" add -A "preview/$SLUG"
if git -C "$DEPLOY_DIR" diff --cached --quiet; then
  echo "Nothing changed — preview already up to date."
else
  git -C "$DEPLOY_DIR" commit -qm "Preview $BRANCH ($(git rev-parse --short HEAD))"
  git -C "$DEPLOY_DIR" push origin gh-pages
fi
echo "Preview: https://ahmedmarwan47-stack.github.io/hassan-allam-website/preview/$SLUG/"
