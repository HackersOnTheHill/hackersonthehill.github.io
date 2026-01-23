# Copilot instructions for Hackers on the Hill

Purpose: Make LLM designers/developers productive in this Jekyll static-site repo with minimal re-learning, low maintenance, and a focus on simplicity so that human designers/developers/maintainers can easily understand and modify the code.

## Principles
- Simple > clever. Reuse existing patterns; avoid new frameworks.
- Modern, clean, minimal: fewer elements, ample whitespace, consistent accents (`--accent-primary #6A4B9A`, `--accent-secondary #B59ADB`), body in Noto Sans.
- Favor docker-compose; avoid local Ruby wrestling.
- Small, well-explained changes; keep motion low and respect `prefers-reduced-motion`.
- Do not revert or overwrite user-made changes; preserve manual edits and ask before modifying anything that looks recently changed.
- Pre-change check: review files for manual fixes and examine conversational statements to verify any proposed edits (even hypothetical) do not undo them; if unsure, ask before suggesting alternatives.
- When proposing design refactors, provide counts/impact summary first (e.g., how many rules/lines are affected) before applying edits.
- When adding new features, propose minimal viable options that align with existing patterns and the goal of modern, clean, minimal design; avoid introducing large new systems or dependencies.
- When asked to provide recommendations, suggestions, or guidance, draw from common patterns in sites with the same simple, modern, clean, minimal aesthetic.

## Run/Test
- Preferred: `docker-compose up` → http://localhost:4000 (uses `jekyll/jekyll:latest`).
- Never: `bundle exec jekyll serve --livereload --host 0.0.0.0`.
- Netlify auto-deploys on push to main and branches.

## Layout & spacing patterns
- Fixed header (~50px). Sections start below it; banners use margin-top to clear header.
- Backgrounds: hero/problem/about/events use `--bg-secondary` off-white; cards generally use `--bg-primary` white.
- Section padding utilities: `.section-padding-lg` (hero), `.section-padding`, `.section-padding-sm`.
- Grid structure: `container -> row -> col-*`; avoid mixing container/cols on same element.
- Icon sizing: 48px for Problem/What We Do icons; color inherits `--accent-primary`.

## Components
- Banners: `_includes/2026_banner.html` included in index; sticky fade handled in JS. Info bar in index shares styling.
- About/Problem: icon grids (no cards) with centered headings.
- Events: `.location-card` (12px radius, light shadow, accent top rule). Denver card links to interest form.
- Navbar: `_includes/navbar.html`; fixed header.

## CSS conventions (assets/css/index_style.css)
- Use defined variables only (`--accent-primary`, `--accent-secondary`, `--bg-secondary`, etc.).
- Border radius: 8px controls, 12px cards; transitions 0.2s micro, 0.3s standard.
- Links: underlined by default; thicker on hover/focus. Buttons/cards handle lift/shadow; don’t add new hover systems.
- Vendor assets: self-hosted in `assets/vendor/`; Font Awesome glyphs embedded in CSS. Don’t edit vendor files unless updating.

## JS conventions (assets/js/main.js)
- Only: AOS init, banner pause when modal open, theme toggle, banner sticky fade. Do not reintroduce template behaviors (nav scroll state, gallery sliders, ticket modals).

## Content/data
- Main page: `index.md` with `layout: index`.
- Event metadata: `_data/` (e.g., `_data/event.yml`); landing cards are hardcoded in `_layouts/index.html`.
- Announcement copy: `_includes/2026_banner.html`; head/meta in `_includes/head.html`.

## Workflows to remember
- Add a new event page: copy an existing `.md` + layout from `_layouts/`, update front matter (`layout`, `title`, `permalink`), update dates/location in layout and `_data/event.yml`, test locally.
- Archive an event: branch named `{location}-{year}` (e.g., `uk-2024`); Netlify publishes to subdomain (e.g., uk-2024.hackersonthehill.org).
- Add/adjust banner: create/update include, use `.event-banner` class; ensure margin-top clears fixed header.
- Add icon: define glyph in the Font Awesome section of `index_style.css` (`.fa-name::before { content: "\fXXX"; }`).
- Images: add `width`/`height` and `loading="lazy"` to non-critical images; keep `CNAME`.

## Common gotchas
- Fixed header overlay: elements after it may need explicit margin/padding equal to header height.
- Bootstrap utilities often have `!important`; override with specificity/`!important` as needed.
- CORS in Docker: self-host assets instead of CDN if issues appear.
- Don’t remove `CNAME`; don’t pin Ruby differently without updating docker image/compose.

If something seems new, propose the minimal option and reuse recent patterns in `_layouts/index.html` and `assets/css/index_style.css`.***
