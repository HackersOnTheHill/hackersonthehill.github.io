# Hackers on the Hill website

This is the public website for Hackers on the Hill. It’s a simple static site built with Jekyll (a static site generator) and uses basic HTML/CSS plus a little JavaScript. You don’t need to be a modern web expert to make updates.

## Quick start (local preview)
1) Install Docker.  
2) In this folder, run: `docker-compose up`  
3) Open http://localhost:4000 to see the site.  
Stop with `Ctrl+C`. This avoids needing to install Ruby/Bundler.

## What lives where
- `index.md` → main homepage content; uses layout `_layouts/index.html`.
- `_includes/` → reusable pieces: `head.html` (metadata/fonts), `navbar.html`, `footer.html`, `event-*.html` sections, `event-banner.html`, `info-bar.html`.
- `_layouts/` → page templates: `index.html`, `event.html`, `archive.html`, `style-guide.html`, `base.html`.
- `_data/` → YAML content and configuration:
  - `_data/pages/index.yml` → homepage info bar, FAQ, recent cards, static cards.
  - `_data/events/*.yml` → event content (hero, location, schedule, FAQ) and card/nav metadata.
  - `_data/banners.yml` → announcement banner content.
  - `_data/archives.yml` → archive links for the nav dropdown.
  - `_data/nav.yml` → nav labels and resources.
- `assets/css/main.css` → main styles (colors, spacing, icons).  
- `assets/js/main.js` → small scripts (scroll animation, banner pause, theme toggle, sticky banner).
- `assets/vendor/` → self-hosted libraries (Bootstrap, AOS, Font Awesome). Avoid editing unless upgrading.
- `CNAME` → domain mapping; don’t remove.

## Common tasks
### Update homepage text or cards
Edit `_layouts/index.html` for the hero and section copy.  
Update homepage data in `_data/pages/index.yml`:
- `event_cards_recent`: manual “last event” cards (US/UK/Canada).
- `event_cards_static`: static cards (Coming Soon, Suggest a Location).
- `info_bar` and `faq` content.
Announcement banner content lives in `_data/banners.yml`.

### Change an event date/location
Update the event’s data file in `_data/events/<event>.yml`.  
For visibility on the index/nav, set `status: published` and add `start_date`.

### Add a new event page
1) Copy `docs/templates/template.md` to a new file (e.g., `colorado.md`).  
2) Update front matter (title, permalink, event_key) and remove `published: false`.  
3) Copy `_data/events/template.yml` to `_data/events/<event-key>.yml` and fill it in.  
4) Set `status: published` when ready; use `show_in_nav` / `show_on_index` to hide if needed.  
5) Add any custom “About” text in the `.md` body.  
6) Preview locally with `docker-compose up`.

### Archive an event
1) Add a file under `archives/` with `title`, `archive_url`, and `permalink`.  
2) Add a link to `_data/archives.yml` so it appears in the Archive dropdown.  
3) We still manually manage archive links and URLs for older events.

## Design/behavior notes
- Look/feel: modern, clean, and minimal. The [Style Guide](/style-guide) has full details.
- Fixed header at the top; banners sit below it. Hero, Problem, About, and Events share a light background.
- Icons in Problem/What We Do are defined in `main.css` (48px size), using Font Awesome glyphs.
- Hover/motion: links are underlined by default (no lift). Buttons/cards use a slight lift/shadow. Animations respect “reduce motion” settings.
- JS is minimal: no nav scroll magic or galleries—just animations, banner pause, theme toggle, and sticky banner behavior.

## Deployment
Push to GitHub → Netlify auto-deploys to https://hackersonthehill.org. Keep `CNAME` so the domain stays mapped.

## Troubleshooting
- If Docker errors about Ruby versions: Gemfile allows Ruby 3.1–3.2; `docker-compose up` should work without local Ruby.
- If external assets fail in Docker: we self-host vendors in `assets/vendor/`; avoid swapping to CDN without testing.

## Need help?
Check `_includes/` and `_layouts/` for examples before adding new code. Keep changes small and simple. If unsure, follow existing patterns instead of inventing new ones.
