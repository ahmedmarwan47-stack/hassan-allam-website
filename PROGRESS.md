# Hassan Allam Properties — Build Progress

A handoff doc for resuming work in a fresh session. Last updated **2026-06-29**.

## Stack

- **Next.js 16.2.9** (App Router, Turbopack, React 19) — `npm run dev` on port 3000
- **TypeScript 5**
- **Tailwind CSS v4** — tokens live in `src/app/globals.css` via `@theme` (no `tailwind.config.js`)
- **Framer Motion 12** — `useScroll` / `useTransform` / `useMotionTemplate` / `useMotionValue` for scroll-driven & interaction animations
- **`next/font`** — Cormorant Garamond (serif display) loaded exactly; Manrope is a temporary stand-in for the licensed brand sans (Avenir Next / Aeonik)

## Project structure

```
hassan-allam-website/
├── public/
│   ├── logo-on-dark.svg            # white logo  → for dark sections
│   ├── logo-on-light.svg           # black logo  → for light sections
│   ├── images/
│   │   ├── section-bg.png          # 2880×1918 leaf-shadow bg (Asset Classes)
│   │   ├── residential.jpg         # full-res hero/section photos (unused now in cards)
│   │   ├── office.jpg, hospitality.jpg, sports.jpg, retail.jpg
│   │   ├── residential-card.png    # 493×424 card images (used in AssetClasses)
│   │   ├── office-card.png, hospitality-card.png, sports-card.png, retail-card.png
│   └── videos/                     # drop hero.mp4 (+ optional hero.webm) here
└── src/
    ├── app/
    │   ├── layout.tsx              # root: fonts + <Navbar/>
    │   ├── page.tsx                # composes sections in order
    │   └── globals.css             # @theme tokens (colors + fonts)
    ├── components/
    │   ├── Navbar.tsx              # fixed, swaps light/dark per section
    │   ├── Footer.tsx
    │   └── sections/
    │       ├── Hero.tsx            # data-nav-theme="dark" · video bg
    │       ├── PortfolioIntro.tsx  # data-nav-theme="dark"
    │       ├── AssetClasses.tsx    # data-nav-theme="light" · scroll-scale + carousel
    │       ├── FactsFigures.tsx    # data-nav-theme="light"
    │       └── AppCta.tsx          # data-nav-theme="dark"
    └── hooks/
        └── useSectionTheme.ts      # reads data-nav-theme of section under navbar
```

## Sections built

### Hero · Figma `16988-1082`

Full-bleed `<video>` background with `autoplay muted loop playsinline`. Falls back to
`/images/residential.jpg` as poster until `public/videos/hero.mp4` is dropped in.
Bottom-left "FROM OUR / FAMILY, TO YOURS." (Cormorant 42px uppercase), bottom-right
"See the Showreel" with circular play icon. `data-nav-theme="dark"` → white navbar.

### Asset Classes · Figma `16988-1390`

200vh tall, with a sticky `h-screen` stage. Scroll-driven via `useScroll` (offset
`["start start", "end end"]`) so progress 0 = pin engages, 1 = pin releases.

- **Heading** (top-right): 62px Cormorant Light → 42px. Width animates 425px → 605px
  so it wraps **4 lines → 2 lines** ("Asset Classes Designed for / Future Lifestyles"
  per Figma).
- **Cards rail**: 5 cards in a flex row. Container width animates from `100%` (5 fit,
  thumbnails) → `250%` (only ~2 fit, the rest scrollable). Images: high-quality
  `.jpg` exports (`residential.jpg`, `office.jpg`, `hospitality.jpg`, `sports.jpg`,
  `retail.jpg`).
- **Carousel arrows**: `animate={{ x: \`-${index * stepPercent}%\` }}` with
  `transition: spring(stiffness 140, damping 24)`. `index` state, `MAX_INDEX = 3`.
  Previously used `useMotionValue.set()` which bypassed animation; fixed to `animate`.
- **Track indicator** (left of arrows): black bar inside a 15%-opacity track, width
  = `(2/5) * 100%`, position = `index / MAX_INDEX * (100 - 40)%`. Also spring-animated.
- **Custom "Discover →" cursor**: `onPointerEnter`/`Leave` on each `<figure>` individually
  (not the whole zone) so the pill and `cursor: none` only activate per-card.
- **Background**: `/images/section-bg.png` (2880×1918) rendered with `unoptimized` to
  preserve gradient fidelity. **Leaf-shadow is baked into this single PNG** — no overlay div.

### Portfolio Statement · Figma `16980-473`

Full-viewport black section (`min-h-screen`, centered flex column). Two text blocks
in Cormorant Garamond Light uppercase, separated by `gap-28`:
- Large heading: "Nationwide Portfolio of Developments" (`clamp(3rem, 6.4vw, 5.75rem)`)
- Body: portfolio description (`clamp(0.9rem, 1.5vw, 1.375rem)`, `max-w-[465px]`)
`data-nav-theme="dark"` → white navbar.

### Project Gallery · Figma `16980-470`

Full-viewport black section (`h-screen flex flex-col`). Layout:
- **Filter bar**: "All Project (11)" label + two tabs ("In The City" / "On The Coast").
  Active tab gets a green underline via `after:` pseudo-element (`color-success-soft`).
- **Heading + arrows**: Cormorant 42px uppercase heading (changes with active filter),
  prev/next buttons (54×54px, `border-white/20`, `rounded-[2px]`).
- **Carousel**: `animate={{ x }}` spring (same params as AssetClasses). 5 projects,
  3 visible at a time (`MAX_INDEX = 2`). Project images from `public/images/image 39*.png`.
- **Progress bar**: `motion.div` with spring-animated `left`, fill width = `3/5 * 100%`.
`data-nav-theme="dark"` → white navbar.

### Other sections (placeholder content, structurally correct)

- **PortfolioIntro** — dark, introductory text
- **FactsFigures** — light, "Facts & Figures" + 3-stat row
- **AppCta** — dark, "Manage your home anytime, anywhere" + phone mock
- **Footer** — dark, 4-column nav + brand line

## Conventions (must follow)

1. **`data-nav-theme`** — every full-width section sets `"dark"` or `"light"` on its root.
   The fixed `Navbar` swaps logo/links/CTA accordingly with a 500ms ease.
2. **Design tokens** — use the Tailwind utilities derived from `@theme` (e.g.
   `bg-warm-50`, `text-grey-500`). Don't hard-code hex values.
3. **Heading typography** — Cormorant Garamond, Light weight (300), uppercase, tight
   tracking `-0.02em`. Body/labels use the sans (`font-sans`).
4. **Scroll-driven animations** — prefer `useScroll` with `offset: ["start start",
   "end end"]` so progress aligns with the pinned-stage window. For numeric CSS
   properties that need units (e.g. `lineHeight`, `width` in px), wrap the `useTransform`
   numeric value in `useMotionTemplate` to add the unit string — Framer doesn't
   auto-append px for these.

## Known TODOs

- **Hero video file** — `public/videos/hero.mp4` is the missing piece. Figma node
  `17002-80` (`videocutHAP3 1`) is a static rounded-rectangle placeholder; Figma's
  `export_video` only works on real animation timelines and returns 500 on this
  node. The actual MP4 needs to come from the brand team.
- **Brand fonts** — replace Manrope with licensed Avenir Next / Aeonik. Drop
  `.woff2` files into `src/app/fonts/`, switch to `next/font/local`, and update
  `--font-sans` in `globals.css`.
- **Image compression** — `public/images/residential.jpg` (9.6MB) and `retail.jpg`
  (12MB) are full-res Figma exports used by sections beyond AssetClasses (e.g. Hero
  poster). Compress before production.
- **Mobile navigation** — desktop nav links are hidden under `md`. The hamburger
  menu is not implemented.
- **Remaining sections** — check Figma full page `991-532` for any sections not yet
  built. Current order: Hero → PortfolioIntro → AssetClasses → PortfolioStatement →
  ProjectGallery → FactsFigures → AppCta → Footer.

## How to verify locally

```bash
npm run dev      # http://localhost:3000
npm run build    # type-check + production build
npm run lint
```

For browser verification we use the **Claude_Preview MCP** (system Chrome isn't
installed, so Playwright MCP fails). A launch config lives in `.claude/launch.json`.

## Open Figma references

- Full page: `https://www.figma.com/design/yTAVRd2RdVoxrax0rySAE1/Hassan-Allam-Corporate-Website?node-id=991-532`
- Hero: `?node-id=16988-1082`
- Asset Classes: `?node-id=16988-1390`
- Hero video placeholder: `?node-id=17002-80`
- Navbar variants: `?node-id=17000-58`
