# Hackers on the Hill website

This is the public website for Hackers on the Hill. It’s a simple static site built with Jekyll (a static site generator) and uses basic HTML/CSS plus a little JavaScript. You don’t need to be a modern web expert to make updates.

## Quick start (local preview)
1) Install Docker.  
2) In this folder, run: `docker-compose up`  
3) Open http://localhost:4000 to see the site.  
Stop with `Ctrl+C`. This avoids needing to install Ruby/Bundler.

## What lives where
- `index.md` → main homepage content; uses layout `_layouts/index.html`.
- `_includes/` → reusable pieces: `head.html` (metadata/fonts), `navbar.html`, `2026_banner.html` (announcement bar).
- `_layouts/` → page templates. The homepage layout is `index.html`. Event-specific layouts live here too.
- `_data/` → small YAML files (e.g., `_data/event.yml`) with dates/metadata some layouts read.
- `assets/css/index_style.css` → main styles (colors, spacing, icons).  
- `assets/js/main.js` → small scripts (scroll animation, banner pause, theme toggle, sticky banner).
- `assets/vendor/` → self-hosted libraries (Bootstrap, AOS, Font Awesome). Avoid editing unless upgrading.
- `CNAME` → domain mapping; don’t remove.

## Common tasks
### Update homepage text or cards
Edit `_layouts/index.html`. Hero, Problem, What We Do (icon grid), and Events cards are all in this file. The announcement banner content is in `_includes/2026_banner.html`.

### Change an event date/location
- If it’s on the homepage: edit the relevant card in `_layouts/index.html`.
- If an event uses data files: update `_data/event.yml` or other `_data/*.yml` as referenced by that layout.

### Add a new event page
1) Copy an existing event markdown file (e.g., `uk.md`) and its layout from `_layouts/` (e.g., `_layouts/uk_2025.html`).  
2) Update the front matter in the new `.md` (title, layout, permalink).  
3) Update dates/venue/links inside the copied layout and `_data/event.yml` if it’s referenced.  
4) Preview locally with `docker-compose up`.

### Archive an event
Create a branch named `{location}-{year}` (for example, `uk-2024`) and push it. Netlify publishes that branch to a matching subdomain (e.g., `uk-2024.hackersonthehill.org`), preserving the old site.

## Design/behavior notes
- Look/feel: modern, minimal, lots of whitespace. Primary accent `#6A4B9A`, secondary `#B59ADB`. Body font: Noto Sans (loaded in `head.html`).
- Fixed header at the top; banners sit below it. Hero, Problem, About, and Events share a light background.
- Icons in Problem/What We Do are defined in `index_style.css` (48px size). Font Awesome glyphs are embedded there.
- Hover/motion: links are underlined by default (no lift). Buttons/cards use a slight lift/shadow. Animations respect “reduce motion” settings.
- JS is minimal: no nav scroll magic or galleries—just animations, banner pause, theme toggle, and sticky banner behavior.

## Deployment
Push to GitHub → Netlify auto-deploys to https://hackersonthehill.org. Keep `CNAME` so the domain stays mapped.

## Troubleshooting
- If Docker errors about Ruby versions: Gemfile allows Ruby 3.1–3.2; `docker-compose up` should work without local Ruby.
- If external assets fail in Docker: we self-host vendors in `assets/vendor/`; avoid swapping to CDN without testing.

## Need help?
Check `_includes/` and `_layouts/` for examples before adding new code. Keep changes small and simple. If unsure, follow existing patterns instead of inventing new ones.***
