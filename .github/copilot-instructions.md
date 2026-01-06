# Copilot instructions for Hackers on the Hill

Purpose: help AI coding agents be immediately productive in this Jekyll static-site repository.

## How to Use This Document

**Read this first before making changes.** This document captures essential context that isn't obvious from code inspection. Reference it throughout your work to understand the "why" behind decisions. When uncertain, check existing implementations before creating new patterns.

## Context & Team

- **Volunteer-run project:** Maintained by volunteers without professional web development backgrounds. AI coding assistants are primary development tools.
- **Sporadic development:** Development happens irregularly; code may look inconsistent or have unused features from past experiments. This is normal and expected.
- **Single active maintainer:** One person currently manages all site content and updates.
- **Philosophy:** Simple and straightforward > complex solutions, regardless of other tradeoffs. Minimal upkeep, easy to pick up after months away.
- **Approach:** Explain your changes clearly and be patient with web development concepts. When suggesting solutions, provide alternatives at different complexity levels. **Suggest process improvements** that are simple, low-maintenance, and easy to relearn.
- **Design feedback welcome:** Maintainer also does design (non-professionally). Suggestions to modernize look/feel, improve UX, or enhance visual consistency are encouraged—just keep implementations simple.

## Business Context

- **Event cadence:** Annual events in different cities (2026: Denver Feb, Netherlands Mar/Apr, DC May, Canada Nov, UK Dec), often timed around hacker conferences.
- **Content timeline:** Event pages updated 1-3 months before event date with iterative changes (dates, messages, registration info).
- **Compliance:** Consider accessibility (broad audience) and data protection (international attendees).

## Repository Structure

- **Repo type & entry points:** This is a Jekyll site (see [_config.yml](../_config.yml) and [Gemfile](../Gemfile)). Primary templates live in the `_layouts/` and `_includes/` directories. Static assets are under `assets/` and third-party libraries under `assets/vendor/`.
- **CSS organization:** Main stylesheet is [assets/css/index_style.css](../assets/css/index_style.css). Uses CSS custom properties (variables) for colors. Bootstrap 5.3.2 utility classes available but custom CSS preferred for maintainability.
- **Fixed header layout:** Header has `position: fixed` at `z-index: 997`. Actual height is ~57px (50px when scrolled). Elements that need to appear below header require explicit `margin-top: 57px !important` to override Bootstrap defaults.
- **Vendor asset integration:** Self-hosted in `assets/vendor/` to avoid CORS issues in Docker development. Font Awesome icons integrated directly into custom CSS (only used icons) rather than loading full library.

## Deployment & Archiving

- **Deploy process:** Push to GitHub → Netlify auto-deploys to https://hackersonthehill.org
- **Archiving past events:** Create branch named `{location}-{year}` (e.g., `uk-2024`) → Netlify publishes to subdomain (e.g., uk-2024.hackersonthehill.org). This preserves old event sites unchanged when main site updates.

## Build & Serve (Local Development)

- **Primary testing method:** Use Docker Compose (via `docker-compose.yml` in the repo root). This ensures consistent environment and avoids local Ruby/Bundler version issues.

  - **Start the Jekyll server with Docker Compose:**

    ```bash
    docker-compose up
    ```

    Then open `http://localhost:4000` in your browser.
  - **Alternative: Direct Docker command** (if docker-compose not available):

    ```bash
    docker run --rm -p 4000:4000 -v "$PWD":/srv/jekyll jekyll/jekyll:pages jekyll serve --watch --force_polling --verbose
    ```
  - **Local Bundler method** (not recommended due to version dependencies):

    ```bash
    bundle install
    bundle exec jekyll serve --livereload --host 0.0.0.0
    ```

    Note: May encounter bundler version issues. Use Docker instead.
- **Where to make changes:**

  - Layouts: see [_layouts/index.html](../_layouts/index.html) and per-event layouts like [_layouts/uk_2025.html](../_layouts/uk_2025.html).
  - Reusable fragments: see `_includes/` (e.g., [head.html](../_includes/head.html), [navbar.html](../_includes/navbar.html)). Edits here affect all pages that include them.
  - Site-wide data: YAML files in `_data/` (e.g., [_data/event.yml](../_data/event.yml)) supply event metadata — modify these for date/time/location changes.
  - Event/content pages: markdown files at repo root (e.g., `index.md`, `ca.md`, `uk.md`, `dc_2024.md`) use front matter to select layouts.

## Creating a New Event Page

- **Standard workflow:** Copy an existing event page (e.g., copy `uk_2024.md` to `nl_2026.md`) and its layout (copy `_layouts/uk_2024.html` to `_layouts/nl_2026.html`).
- **Update checklist:**

  1. Change front matter in `.md` file: `layout:`, `title:`, `permalink:`
  2. Update `_data/event.yml` with new dates/location
  3. Update layout file: dates, location names, registration links, images
  4. Test locally before pushing
- **Why this approach:** Ensures consistency, minimizes learning curve, easy to remember after months away.
- **Conventions & patterns discovered:**

  - `permalink: pretty` in [_config.yml](../_config.yml) — assume pretty URLs when generating links.
  - `plugins:` includes `jekyll-seo-tag` via Gemfile; metadata is expected in YAML front-matter and `_config.yml`.
  - Vendor assets are vendored into `assets/vendor/` (Bootstrap, AOS, Swiper, GLightbox, Font Awesome webfonts). Avoid modifying upstream vendor files unless updating versions.
  - Analytics and API keys (e.g., `google_analytics_key`, `google_maps_javascript_api_key`) live in `_config.yml`; treat them as sensitive when making public commits.
  - **Unused features:** Code may contain experiments or integrations (e.g., Eventbrite embeds, mailing list forms) that worked once but may not be active. Don't assume everything is currently used.
  - **CSS units:** Use `px` consistently (not `rem`). This is the established convention throughout the codebase.
  - **Bootstrap overrides:** Bootstrap utility classes can be overridden but often require `!important` flag. For instance, `.alert` class has default margins/padding with `!important` that must be explicitly overridden.
  - **Reusable components:** Create CSS classes (like `.event-banner`) for components that will be reused, rather than inline styles. Document these in the CSS file with section comments.
  - **Design system standards:**
    - Border-radius: 8px for UI elements (buttons, dropdowns, cards), 12px for larger cards (location cards), 50px/50% for pills/circles
    - Transition timing: 0.2s for micro-interactions (button hovers), 0.3s for standard UI changes (dropdowns, theme toggle)
    - Icon sizing: 48px for all #about section icons (unified for consistency)
    - Line-height: 1.6 for body text (do not vary unless creating separate long-form content pages)
  - **CSS variables:** Use only defined semantic variables (e.g., `var(--accent-primary)`, `var(--bg-secondary)`). Never reference undefined variables like `var(--link-color)` — search existing CSS before adding new variables.
- **Common developer workflows:**

  - **To preview changes:** Run `docker-compose up` and open `http://localhost:4000`. This is the primary testing method.
  - Alternative: run `bundle exec jekyll serve` locally (may have version issues).
  - If file watching is unreliable on macOS or in containers, add `--force_polling`.
  - For production builds set `JEKYLL_ENV=production` before `jekyll build`.
  - **Manual testing:** Check on mobile/desktop, verify links work, test forms/registration if changed, check accessibility with browser tools.
  - **Discovery first:** Before creating new code/patterns, search for similar existing implementations. Reuse patterns from recent layouts (e.g., `uk_2025.html`) rather than inventing new approaches.
- **Where to inspect for behavior/logic:**

  - Front-end behavior: `assets/js/main.js` and CSS in `assets/css/`.
  - Template includes that affect SEO/meta: `_includes/head.html` and `_layouts/*`.
  - Footer/social/share links: `_layouts/index.html` and `_includes/footer.html`.
- **Do / Don't**

  - Do test layout changes by serving locally; many pages share includes so a small include change touches many pages.
  - Do explain changes in plain language; maintainer is not a web developer.
  - Do suggest simple improvements to workflow/automation if they require minimal maintenance.
  - Do measure actual values (like header height) in browser dev tools rather than guessing when debugging positioning issues.
  - Do create reusable CSS classes for components that will be used multiple times (banners, cards, etc.).
  - Do self-host external assets if CORS issues arise from Docker development or changes to third-party integrations (like Font Awesome) break functionality.
  - Do prefer CSS classes over inline styles for maintainability — inline styles should only be used for truly one-off cases.
  - Do check for inconsistencies when making changes: look for undefined CSS variables, mismatched border-radius values, or varying transition timings that could be standardized.
  - Don't edit files in `assets/vendor/` unless updating a library — instead update the vendor package and verify assets load.
  - Don't remove `CNAME` — it's used for the hosted domain.
  - Don't over-engineer solutions; simple/straightforward is preferred over optimal/complex.
  - Don't use inline styles when CSS classes would be more maintainable.
  - Don't assume inline padding/margin on a section will affect preceding elements in document flow.
- **Examples (quick tasks):**

  - Change event date: update [_data/event.yml](../_data/event.yml) with new `start_datetime`/`end_datetime` and verify the layout that reads it (search `_data.event` usage in `_layouts`).
  - Add a new event page: copy existing `.md` + `_layouts/*.html`, update front matter, change dates/location in layout file, test locally.
  - Archive current event: create branch named `{location}-{year}`, push to GitHub, verify Netlify deploys subdomain.
  - Add promotional banner: create include file in `_includes/`, use `.event-banner` CSS class (handles positioning below fixed header with `margin-top: 57px !important`), include in layout file.
  - Add Font Awesome icon: add icon unicode definition to Font Awesome section in `assets/css/index_style.css` (format: `.fa-iconname::before { content: "\fXXX"; }`).

## Common Issues & Solutions

- **Fixed header overlaying content:** Elements in normal document flow that appear after a fixed header need explicit `margin-top` equal to header height (57px). Padding on subsequent sections won't push content below the fixed header.
- **Bootstrap utility class not working:** Bootstrap classes often have `!important` flags. Override them by adding `!important` to your custom CSS or using more specific selectors.
- **CORS errors in Docker for external assets:** Self-host the assets in `assets/vendor/` instead of loading from CDN. This is especially common with font files.
- **Dropdown menu styling:** Remove Bootstrap's default padding on `.dropdown-menu` (set to `0` or `0 !important`) and style individual `.dropdown-item` elements instead.
- **Icons not displaying:** Check that Font Awesome webfonts are in `assets/vendor/fontawesome/webfonts/` and CSS references them correctly with relative paths (`../vendor/fontawesome/webfonts/`).

## Optimization Guidelines

- **Vendor assets:** Keep only what's needed. For Font Awesome: keep `webfonts/` folder (1MB), integrate minimal CSS directly into `index_style.css`.
- **CSS organization:** Group related styles with comment headers (`/*--------------------------------------------------------------`). Place new components after existing patterns.
- **Consolidation opportunities:** When editing CSS/HTML, look for:
  - Duplicate selectors that can be grouped
  - Inline styles that should be classes
  - Redundant wrapper elements
  - CSS classes that duplicate Bootstrap utilities
  - Inconsistent values (border-radius, transitions) that should follow design system standards
- **Image assets:** Optimize images before adding to repo. Consider using WebP for better compression.
- **Third-party libraries:** Prefer self-hosting over CDN for Docker compatibility and reliability.

## Simple Automation Ideas (Optional)

- **Link checker:** Add simple GitHub Action to check for broken links on push (e.g., `lychee-action`)
- **Accessibility checker:** Use free tools like axe DevTools during manual testing, or add `pa11y-ci` GitHub Action
- **Checklist template:** Create `.github/PULL_REQUEST_TEMPLATE.md` with manual testing checklist
- **Date validation:** Add simple script to warn if event date in `_data/event.yml` is in the past

If any sections are unclear or you'd like more detail on implementation, ask for specific examples.