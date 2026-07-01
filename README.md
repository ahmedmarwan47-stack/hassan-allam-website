# Hassan Allam Properties — Corporate Website

Marketing site for Hassan Allam Properties, built from the
[Figma design](https://www.figma.com/design/yTAVRd2RdVoxrax0rySAE1/Hassan-Allam-Corporate-Website).

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion.

## Getting started

```bash
npm run dev      # dev server on http://localhost:3000
npm run build    # production build
```

## Project structure

```
src/
  app/
    layout.tsx          # fonts + <Navbar/> mounted once, page-agnostic
    page.tsx            # home page: composes the sections in order
    globals.css         # design tokens (@theme) — brand colours + fonts
  components/
    Navbar.tsx          # fixed navbar that swaps light/dark per section
    Footer.tsx
    sections/
      Hero.tsx            (data-nav-theme="light")
      PortfolioIntro.tsx  (data-nav-theme="dark")
      AssetClasses.tsx    (data-nav-theme="light")  <- scroll-scale animation
      FactsFigures.tsx    (data-nav-theme="light")
      AppCta.tsx          (data-nav-theme="dark")
  hooks/
    useSectionTheme.ts  # decides which section sits under the navbar
```

## The two animation behaviours

### 1. Theme-swapping navbar

Every full-width section declares `data-nav-theme="dark"` or `"light"`.
`useSectionTheme` watches which section is currently under the navbar line
(~40px from the top) and returns its theme. `Navbar` cross-fades the two logo
variants, transitions the link/CTA colours, and swaps a legibility scrim — all
with a 500ms ease. To add a section, just tag it with `data-nav-theme`.

### 2. Asset Classes scale-on-scroll

`AssetClasses` is a 200vh section with a pinned (sticky) stage. Framer Motion's
`useScroll` drives `useTransform` values so that, as you scroll in, the heading
settles from oversized to its resting size and the gallery scales up from a
compact preview (~0.46) to full size — the "collapsed → expanded" states in the
Figma file. Tune the feel via the `[input] -> [output]` ranges at the top of the
component.

## Known follow-ups (placeholders to replace before launch)

- **Fonts:** Cormorant Garamond (display serif) is loaded exactly. The licensed
  brand sans (Avenir Next / Aeonik) are substituted with **Manrope** for now —
  drop the real `.woff2` files into `src/app/fonts` and switch to
  `next/font/local`, then point `--font-sans` at it in `globals.css`.
- **Imagery:** `public/images/*` were pulled from Figma at full resolution
  (`residential.jpg` ~9.6MB, `retail.jpg` ~12MB). Compress/resize before launch.
- **Content & links:** section copy and nav links are representative placeholders.
- **Mobile nav:** links are hidden under `md`; a hamburger menu still needs building.
