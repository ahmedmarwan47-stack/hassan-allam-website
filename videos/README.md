# Hero video

Drop the brand reel here as:

- `hero.mp4` (H.264, AAC) — required
- `hero.webm` (VP9/AV1) — optional, served first to modern browsers for a smaller payload

The `<video>` element in `src/components/sections/Hero.tsx` is set to
`autoplay muted loop playsinline`. Until a file is in place the poster image
(`/images/residential.jpg`) stays on screen.

Recommended specs:

- 1920×1080, 24–30 fps
- ~6–10 Mbps (mp4); webm can be ~40% smaller at equal quality
- < 10s loop, no audio (track is muted regardless)
- First frame should match the poster image as closely as possible to avoid a flash on swap
