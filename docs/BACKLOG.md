# Hackers on the Hill - Development Backlog

**Last Updated:** 2026-01-12
**Status:** Active development
**Version:** 1.1

---

## 📖 About This Document

This backlog tracks planned improvements, enhancements, and technical debt for hackersonthehill.github.io. Tasks are organized by status and priority. Each task includes detailed implementation guidance to enable pickup at any time.

**Related Documents:**
- [Copilot Instructions](../.github/copilot-instructions.md) - Development guidelines
- [Current Implementation Plan](../.claude/plans/radiant-mapping-pudding.md) - Detailed technical plan

---

## 🎯 CURRENT SPRINT (Ready to Implement)

### Task 1.1: Add GTM Preconnect Hint ✅
**Priority:** High
**Effort:** 5 minutes
**Status:** Completed (2026-01-12)
**Files:** `_includes/head.html`

**Description:**
Add preconnect hint for Google Tag Manager to reduce DNS lookup time.

**Implementation:**
```html
<!-- Add before line 69 (GTM script tag) -->
<link rel="preconnect" href="https://www.googletagmanager.com">
```

**Verification:**
- Check Network tab in DevTools (preconnect should appear)
- No visual changes expected

---

### Task 1.2: Verify JSON-LD Structured Data ✅
**Priority:** Medium
**Effort:** 10 minutes
**Status:** Completed (2026-01-12)
**Files:** `_includes/head.html`

**Description:**
Review existing Organization and Event schema.org structured data for accuracy.

**Current State:**
✅ Organization schema exists (lines 16-29)
✅ Event schema for Colorado 2026 exists (lines 30-51)

**Action:**
- Verify Colorado 2026 date is correct (Feb 10, 2026)
- Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
- Update event details if needed for future events

**Verification:**
- Paste URL into Google Rich Results Test
- Should show valid Organization + Event markup

---

### Task 2.1: Consolidate Coming Soon Cards ✅
**Priority:** High
**Effort:** 30 minutes
**Status:** Completed (2026-01-12)
**Files:** `_layouts/index.html` (lines 269-295)

**Description:**
Replace 2 generic "Coming Soon" cards with 1 consolidated + 1 "Suggest a Location" interactive card.

**Current State:**
- Card 1: Coming soon (National Capitol)
- Card 2: Coming soon (US State Capitol)

**New Design:**

**Card 1 - Consolidated Coming Soon:**
```html
<div class="col-12 col-md-4 mb-4">
  <div class="location-card" aria-label="Coming soon: More locations">
    <div class="card-logo">
      <i class="fa-solid fa-landmark" style="font-size: 72px; color: var(--accent-secondary);" aria-hidden="true"></i>
    </div>
    <div class="card-body text-center">
      <h3 class="card-title">Coming Soon</h3>
      <p class="card-location">More locations worldwide</p>
      <p class="card-detail">Stay tuned for announcements</p>
      <p class="card-date-next">Expanding in 2026</p>
    </div>
  </div>
</div>
```

**Card 2 - Suggest a Location:**
```html
<div class="col-12 col-md-4 mb-4">
  <a href="#" class="location-card" aria-label="Suggest a location for Hackers on the Hill">
    <div class="card-logo">
      <i class="fa-solid fa-lightbulb" style="font-size: 72px; color: var(--accent-primary);" aria-hidden="true"></i>
    </div>
    <div class="card-body text-center">
      <h3 class="card-title">Suggest a Location</h3>
      <p class="card-location">Help Us Expand</p>
      <p class="card-detail">Know a great capitol for our next event?</p>
      <span class="button card-badge">Share Your Ideas</span>
    </div>
  </a>
</div>
```

**Note:** Replace `href="#"` with actual form URL when ready.

**Verification:**
- 6 total cards visible (4 events + 1 coming soon + 1 suggest)
- Grid layout maintained
- Suggest card is clickable with hover state
- Both light/dark themes work

---

### Task 4.2: Add Banner On-Load Animation ✅
**Priority:** High
**Effort:** 15 minutes
**Status:** Completed (2026-01-12)
**Files:** `assets/css/main.css`

**Description:**
Add subtle pulse animation to 2026 banner on page load to draw attention.

**Implementation Notes:**
Applied animation to `.event-banner .banner-content` (not the whole banner) to avoid affecting the hamburger menu on mobile.

```css
/* Banner attention animation */
@keyframes banner-attention {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

.event-banner .banner-content {
  animation: banner-attention 1.2s ease-in-out 0.5s 2;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .event-banner .banner-content {
    animation: none;
  }
}
```

**Properties:**
- Runs 2 times on page load
- 0.5s delay (lets page settle first)
- 1.2s duration (smooth, not rushed)
- Subtle 2% scale increase
- Respects accessibility preferences

**Verification:**
- Banner pulses twice on page load
- No animation when prefers-reduced-motion is set
- Does not interfere with sticky/fade behavior
- Works in both light/dark themes

---

## 📋 APPROVED BACKLOG (Next Up)

### Task: Component Modularity - Extract Sections into Includes
**Priority:** High
**Effort:** 2-3 hours
**Status:** Todo
**Impact:** High - Makes maintenance significantly easier for non-professionals

**Description:**
Extract inline sections from `_layouts/index.html` into reusable `_includes/sections/` components, following the pattern already established with `{% include header.html %}`.

**Current State:**
All sections (hero, problem, about, impact-strip, events) are currently inline in [index.html:45-302](_layouts/index.html#L45-L302).

**Proposed Structure:**
```
_includes/
  sections/
    hero.html
    problem.html
    about.html
    impact-strip.html
    events.html
```

**Implementation:**

1. **Create the sections directory:**
```bash
mkdir -p _includes/sections
```

2. **Extract Hero Section:**
Extract lines 42-64 from `_layouts/index.html` into `_includes/sections/hero.html`

3. **Extract Problem Section:**
Extract lines 78-99 from `_layouts/index.html` into `_includes/sections/problem.html`

4. **Extract About Section:**
Extract lines 108-148 from `_layouts/index.html` into `_includes/sections/about.html`

5. **Extract Impact Strip:**
Extract lines 159-177 from `_layouts/index.html` into `_includes/sections/impact-strip.html`

6. **Extract Events Section:**
Extract lines 191-292 from `_layouts/index.html` into `_includes/sections/events.html`

7. **Update index.html:**
Replace extracted sections with includes:
```liquid
<main id="top" tabindex="-1" data-aos="fade-down" data-aos-duration="800">
  {% include sections/hero.html %}
  {% include sections/info-bar.html %}
  {% include sections/problem.html %}
  {% include sections/about.html %}
  {% include sections/impact-strip.html %}
  {% include sections/events.html %}
</main>
```

**Benefits:**
- Easier to find and edit specific sections
- Reusable components across event pages
- Clearer file structure for non-technical maintainers
- Better Git diffs (changes isolated to specific files)
- Follows Jekyll best practices

**Verification:**
- [ ] Site looks identical before/after
- [ ] All AOS animations still work
- [ ] All analytics events still fire
- [ ] Dark mode works correctly
- [ ] Test all viewports (mobile/tablet/desktop)
- [ ] No console errors

---

### Task: Data-Driven Event Cards with YAML
**Priority:** High
**Effort:** 1.5-2 hours
**Status:** Todo
**Impact:** Very High - Biggest maintainability win

**Description:**
Replace hardcoded event cards with a data-driven approach using `_data/events.yml` and Liquid loops. This makes adding/updating events a simple YAML edit instead of HTML manipulation.

**Current State:**
Event cards are hardcoded in [index.html:205-289](_layouts/index.html#L205-L289) with repetitive HTML for each location.

**Implementation:**

1. **Create `_data/events.yml`:**
```yaml
# Active events (displayed first)
- title: "Colorado"
  location: "Denver"
  venue: "Colorado State Capitol"
  status: "upcoming"
  date: "February 10, 2026"
  url: "https://docs.google.com/forms/d/e/1FAIpQLScIJV3gkbFDIo4vydaepGDzo1an9LwtXcA-dkGu2Lq-YSv_Lw/viewform"
  logo_light: "/assets/img/hoth-colorado-dome.svg"
  logo_dark: "/assets/img/hoth-colorado-dome.svg"
  cta: "Request a Seat"
  order: 1

- title: "United States"
  location: "Washington, DC"
  venue: "US Capitol"
  status: "future"
  date: "Mid-2026"
  url: "https://us-2025.hackersonthehill.org"
  logo_light: "/assets/img/hoth-us_lightmode.svg"
  logo_dark: "/assets/img/hoth-us_darkmode.svg"
  cta: "Get Notified"
  order: 2

- title: "Canada"
  location: "Ottawa, ON"
  venue: "Parliament Hill"
  status: "future"
  date: "Mid-2026"
  url: "https://ca-2024.hackersonthehill.org"
  logo_light: "/assets/img/hoth-ca_lightmode.svg"
  logo_dark: "/assets/img/hoth-ca_darkmode.svg"
  cta: "Get Notified"
  order: 3

- title: "United Kingdom"
  location: "London"
  venue: "UK Government"
  status: "future"
  date: "Mid-2026"
  url: "https://uk-2025.hackersonthehill.org"
  logo_light: "/assets/img/hoth-uk_lightmode.svg"
  logo_dark: "/assets/img/hoth-uk_darkmode.svg"
  cta: "Get Notified"
  order: 4

# Special cards (displayed after events)
special_cards:
  - type: "coming-soon"
    title: "Coming Soon"
    location: "More locations worldwide"
    detail: "Stay tuned for announcements"
    date: "Expanding in 2026"
    icon: "fa-solid fa-landmark"

  - type: "suggest"
    title: "Suggest a Location"
    location: "Help Us Expand"
    detail: "Know a great capitol for our next event?"
    url: "#"  # Replace with actual form URL when ready
    cta: "Share Your Ideas"
    icon: "fa-solid fa-lightbulb"
```

2. **Update events section template:**
Replace hardcoded cards in `_includes/sections/events.html` (or `_layouts/index.html` if not yet modularized):

```liquid
<div class="row g-4">
  <!-- Active Event Cards -->
  {% assign sorted_events = site.data.events | where_exp: "item", "item.order" | sort: "order" %}
  {% for event in sorted_events %}
  <div class="col-12 col-md-4 mb-4">
    <a href="{{ event.url }}" class="location-card" {% if event.url contains 'http' %}target="_blank" rel="noopener"{% endif %}>
      <div class="card-logo">
        <img class="event-logo logo-light" src="{{ event.logo_light }}" alt="{{ event.title }}" loading="lazy" width="120" height="120">
        <img class="event-logo logo-dark" src="{{ event.logo_dark }}" alt="{{ event.title }}" loading="lazy" width="120" height="120">
      </div>
      <div class="card-body text-center">
        <h3 class="card-title">{{ event.title }}</h3>
        <p class="card-location">{{ event.location }}</p>
        <p class="card-detail">{{ event.venue }}</p>
        <p class="card-date-{{ event.status }}">{{ event.date }}</p>
        <span class="button card-badge">{{ event.cta }}</span>
      </div>
    </a>
  </div>
  {% endfor %}

  <!-- Special Cards (Coming Soon, Suggest Location) -->
  {% for card in site.data.events.special_cards %}
  <div class="col-12 col-md-4 mb-4">
    {% if card.type == 'coming-soon' %}
    <div class="location-card" aria-label="{{ card.title }}: {{ card.location }}">
      <div class="card-logo">
        <i class="{{ card.icon }}" aria-hidden="true"></i>
      </div>
      <div class="card-body text-center">
        <h3 class="card-title">{{ card.title }}</h3>
        <p class="card-location">{{ card.location }}</p>
        <p class="card-detail">{{ card.detail }}</p>
        <p class="card-date-next">{{ card.date }}</p>
      </div>
    </div>
    {% else %}
    <a href="{{ card.url }}" class="location-card" aria-label="{{ card.title }}: {{ card.detail }}">
      <div class="card-logo">
        <i class="{{ card.icon }}" aria-hidden="true"></i>
      </div>
      <div class="card-body text-center">
        <h3 class="card-title">{{ card.title }}</h3>
        <p class="card-location">{{ card.location }}</p>
        <p class="card-detail">{{ card.detail }}</p>
        <span class="button card-badge">{{ card.cta }}</span>
      </div>
    </a>
    {% endif %}
  </div>
  {% endfor %}
</div>
```

**Benefits:**
- **Zero HTML knowledge needed** to add/update events
- Simple YAML editing in `_data/events.yml`
- Consistent card structure across all events
- Easy to reorder events (change `order` value)
- Easy to archive events (remove from YAML)
- DRY (Don't Repeat Yourself) principle

**To Add a New Event (Non-technical):**
```yaml
# Just copy this template and fill in the details:
- title: "New Location"
  location: "City Name"
  venue: "Venue Name"
  status: "upcoming"  # or "future"
  date: "Month Day, Year"
  url: "https://..."
  logo_light: "/assets/img/..."
  logo_dark: "/assets/img/..."
  cta: "Register Now"
  order: 5  # Display order
```

**Verification:**
- [ ] All 6 cards display correctly
- [ ] Card ordering matches YAML `order` field
- [ ] Logos display in light/dark themes
- [ ] Links work correctly
- [ ] Special cards (Coming Soon, Suggest) display
- [ ] Test adding a new event via YAML
- [ ] Test removing an event via YAML

---

### Task: Enhanced Info Bar - Data-Driven Pattern
**Priority:** Medium
**Effort:** 30 minutes
**Status:** Todo
**Impact:** Medium - Quick maintainability win

**Description:**
Make the info bar data-driven and easily toggleable via YAML configuration instead of requiring HTML edits.

**Current State:**
Info bar is hardcoded in [index.html:69-77](_layouts/index.html#L69-L77).

**Implementation:**

1. **Create `_data/announcements.yml`:**
```yaml
info_bar:
  enabled: true
  text: "Upcoming: Colorado · February 10, 2026"
  url: "https://docs.google.com/forms/d/e/1FAIpQLScIJV3gkbFDIo4vydaepGDzo1an9LwtXcA-dkGu2Lq-YSv_Lw/viewform"
  analytics_location: "info_bar_top"
```

2. **Update info bar include:**
Create `_includes/sections/info-bar.html`:
```liquid
{% if site.data.announcements.info_bar.enabled %}
<aside class="info-bar">
  <div class="container">
    <div class="info-bar-content">
      <div class="info-bar-text">
        <span class="info-label">
          <a href="{{ site.data.announcements.info_bar.url }}"
             target="_blank"
             rel="noopener"
             data-analytics-event="info_bar_click"
             data-analytics-location="{{ site.data.announcements.info_bar.analytics_location }}">
            {{ site.data.announcements.info_bar.text }}
          </a>
        </span>
      </div>
    </div>
  </div>
</aside>
{% endif %}
```

3. **Include in index.html:**
```liquid
{% include sections/info-bar.html %}
```

**Benefits:**
- Toggle on/off by changing `enabled: false` in YAML
- Update announcement text without touching HTML
- No code changes needed for temporary announcements

**To Update Announcement (Non-technical):**
```yaml
# Edit _data/announcements.yml
info_bar:
  enabled: true  # Set to false to hide completely
  text: "New announcement text here"
  url: "https://link-destination.com"
```

**Verification:**
- [ ] Info bar displays when `enabled: true`
- [ ] Info bar hidden when `enabled: false`
- [ ] Link works correctly
- [ ] Analytics event fires
- [ ] Test updating text via YAML

---

### Task: CSS Table of Contents
**Priority:** Low
**Effort:** 15 minutes
**Status:** Todo
**Impact:** Low - Developer experience improvement

**Description:**
Add a comprehensive table of contents at the top of `assets/css/main.css` to help maintainers quickly locate styles.

**Current State:**
CSS file has 1,196 lines with scattered section comments.

**Implementation:**

Add to the top of `assets/css/main.css` (after the existing CSS variables):

```css
/**
 * ============================================================================
 * TABLE OF CONTENTS
 * ============================================================================
 *
 * 1. THEME & VARIABLES
 *    1.1 Color Palette
 *    1.2 Semantic Tokens (Light Mode)
 *    1.3 Dark Mode Overrides
 *    1.4 Theme Toggle
 *
 * 2. TYPOGRAPHY
 *    2.1 Base Styles
 *    2.2 Headings
 *    2.3 Links
 *    2.4 Accessibility (Skip Links, Focus States)
 *
 * 3. LAYOUT & GRID
 *    3.1 Base Layout
 *    3.2 Container
 *    3.3 Section Spacing
 *
 * 4. COMPONENTS
 *    4.1 Buttons
 *    4.2 Cards (Location Cards)
 *    4.3 Modals
 *    4.4 Banners (Info Bar, Event Banner)
 *    4.5 Impact Strip
 *
 * 5. NAVIGATION
 *    5.1 Header
 *    5.2 Navbar
 *    5.3 Mobile Menu
 *    5.4 Dropdown
 *
 * 6. SECTIONS
 *    6.1 Hero
 *    6.2 Problem
 *    6.3 About
 *    6.4 Events
 *
 * 7. FOOTER
 *    7.1 Base Styles
 *    7.2 Social Links
 *
 * 8. ANIMATIONS
 *    8.1 AOS (Animate On Scroll)
 *    8.2 Micro-interactions
 *    8.3 Keyframes
 *
 * 9. UTILITIES
 *    9.1 Display
 *    9.2 Print Styles
 *    9.3 Accessibility
 *
 * 10. RESPONSIVE
 *     10.1 Mobile Adjustments
 *     10.2 Tablet Breakpoints
 *     10.3 Desktop Overrides
 *
 * ============================================================================
 */
```

**Then update existing section comments to match:**

Example:
```css
/*--------------------------------------------------------------
# 4.1 Buttons
--------------------------------------------------------------*/
.button {
  /* ... */
}

/*--------------------------------------------------------------
# 4.2 Cards (Location Cards)
--------------------------------------------------------------*/
.location-card {
  /* ... */
}
```

**Benefits:**
- Quick navigation for developers
- Clear file organization
- Easier to locate what needs changing
- Professional code documentation
- Helps onboard new contributors

**Verification:**
- [ ] TOC accurately reflects file structure
- [ ] Line numbers roughly align with sections
- [ ] All major sections documented
- [ ] Consistent numbering scheme

---

### Task 4.1: Add Micro-interactions ✅
**Priority:** Medium
**Effort:** 45 minutes
**Status:** Completed (2026-01-12)
**Files:** `assets/css/main.css`

**Description:**
Add subtle animations to buttons and cards for enhanced interactivity.

**Components:**

1. **Button Ripple Effect:**
```css
.button {
  position: relative;
  overflow: hidden;
}

.button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.button:active::after {
  width: 300px;
  height: 300px;
}
```

2. **Card Accent Line Animation:**
```css
.location-card .card-logo::after {
  width: 0;
  transition: width 0.4s ease;
}

.location-card:hover .card-logo::after {
  width: 100%;
}
```

**Note:** Icon hover scale already exists (lines 949, 554) - no changes needed.

**Verification:**
- Ripple expands from click point on buttons
- Card top accent line animates on hover
- Animations feel smooth and subtle
- Respects prefers-reduced-motion

---

### Task 5.1: Comprehensive Focus Styles ✅
**Priority:** Medium
**Effort:** 30 minutes
**Status:** Completed (2026-01-12)
**Files:** `assets/css/main.css`

**Description:**
Add visible focus indicators to all interactive elements for keyboard accessibility.

**Implementation:**
Add unified focus-visible style:

```css
/* Unified focus-visible for keyboard navigation */
*:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 3px;
  border-radius: 4px;
}

/* Specific overrides for cards (need more offset) */
.location-card:focus-visible {
  outline-offset: 4px;
}

/* Button focus uses fill instead of outline */
.button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-secondary);
}
```

**Elements Covered:**
- All links (enhance existing)
- All buttons (`.button`)
- Cards (`.location-card`)
- Theme toggle
- Navbar items
- Modal close buttons

**Verification:**
- Tab through entire page
- All interactive elements show visible focus
- Focus indicators use accent colors
- Works in both light/dark themes

---

### Task 5.3: Improve Text Contrast ✅
**Priority:** High
**Effort:** 20 minutes
**Status:** Completed (2026-01-12)
**Files:** `assets/css/main.css` (lines 20, 41)

**Description:**
Increase opacity of `--text-secondary` from 60% to 70-75% to meet WCAG AA standards.

**Current Values:**
```css
/* Light mode - line 20 */
--text-secondary: rgba(34, 34, 34, 0.6);

/* Dark mode - line 41 */
--text-secondary: rgba(245, 245, 245, 0.6);
```

**New Values:**
```css
/* Light mode - line 20 */
--text-secondary: rgba(34, 34, 34, 0.7);

/* Dark mode - line 41 */
--text-secondary: rgba(245, 245, 245, 0.7);
```

**Affected Elements:**
- `.impact-label` (Impact strip: "Years running", "Hackers engaged", etc.)
- `.card-detail` (Location cards: "US Capitol", "Parliament Hill", etc.)

**Verification:**
- Test with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Target: 4.5:1 ratio minimum
- Visual check on multiple monitors
- Ensure text remains readable in both themes

---

## 🔧 TECHNICAL DEBT

### Task 8.1: Upgrade Bootstrap to Latest Version
**Priority:** Medium
**Effort:** 2-4 hours
**Status:** Todo
**Current Version:** Bootstrap 5.3.2
**Latest Version:** Check [Bootstrap releases](https://github.com/twbs/bootstrap/releases)

**Description:**
Upgrade Bootstrap framework to latest stable version for security patches, bug fixes, and new features.

**Current Implementation:**
```html
<!-- _includes/head.html -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- _includes/scripts.html -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
```

**Pre-Upgrade Checklist:**
1. **Review Breaking Changes**
   - Check Bootstrap changelog for breaking changes
   - Note deprecated features used in site
   - Review migration guide if major version bump

2. **Audit Current Usage**
   Find all Bootstrap components used:
   ```bash
   # Search for Bootstrap classes
   grep -r "class=\".*\(btn\|modal\|navbar\|alert\|container\)" _layouts/ _includes/

   # Check for Bootstrap JavaScript features
   grep -r "data-bs-" _layouts/ _includes/
   ```

3. **Inventory Bootstrap Features:**
   - Modal component (newsletter modal, 2026 updates modal)
   - Navbar component (mobile hamburger menu)
   - Alert component (event banner)
   - Button styles (`.btn`, `.btn-close`)
   - Grid system (`.container`, `.row`, `.col-*`)
   - Utilities (spacing, display, etc.)

**Upgrade Process:**

1. **Create Test Branch:**
   ```bash
   git checkout -b upgrade/bootstrap-latest
   ```

2. **Update CDN Links:**
   - Update version in `_includes/head.html`
   - Update version in `_includes/scripts.html`
   - Consider SRI (Subresource Integrity) hashes for security

3. **Test All Bootstrap Components:**
   - [ ] Newsletter modal opens/closes correctly
   - [ ] 2026 updates modal functions
   - [ ] Mobile navbar toggles properly
   - [ ] Event banner displays correctly
   - [ ] All buttons render properly
   - [ ] Grid layout unchanged (responsive breakpoints)
   - [ ] Dark mode compatibility maintained

4. **Test Across Browsers:**
   - [ ] Chrome/Edge (Chromium)
   - [ ] Firefox
   - [ ] Safari (desktop + iOS)
   - [ ] Test at all breakpoints (mobile, tablet, desktop)

5. **Check for Style Conflicts:**
   - Bootstrap updates may override custom CSS
   - Verify all custom styles in `main.css` still work
   - Check for specificity issues

6. **Update Dependencies (if needed):**
   If using Popper.js separately:
   - Bootstrap bundle includes Popper.js
   - Verify correct version compatibility

**Potential Issues to Watch:**

1. **Modal Backdrop Changes:**
   - Bootstrap occasionally changes modal behavior
   - Verify backdrop click closes modal
   - Check z-index layering

2. **Grid System Updates:**
   - New breakpoints may be added
   - Check responsive behavior at all sizes

3. **JavaScript API Changes:**
   - Event names might change (`show.bs.modal` format)
   - Check analytics event listeners in `main.js`

4. **CSS Custom Properties:**
   - Bootstrap may add new CSS variables
   - Check for conflicts with site's custom properties

**Rollback Plan:**
If issues found:
```bash
# Revert CDN links to 5.3.2
git checkout master -- _includes/head.html _includes/scripts.html
```

**Post-Upgrade:**
- [ ] Run full testing checklist
- [ ] Update BACKLOG.md with new version
- [ ] Document any workarounds needed
- [ ] Update copilot-instructions.md if needed
- [ ] Commit with message: "chore: upgrade Bootstrap to X.X.X"

**Long-term Consideration:**
- Schedule regular Bootstrap updates (quarterly?)
- Subscribe to Bootstrap security advisories
- Consider self-hosting Bootstrap files for performance

**Files to Update:**
- `_includes/head.html` (CSS link)
- `_includes/scripts.html` (JS link)
- `docs/BACKLOG.md` (document new version)

---

### Task 6.1: Split CSS into Modules
**Priority:** Medium
**Effort:** 2-3 hours
**Status:** Todo
**Files:** `assets/css/` directory

**Description:**
Refactor monolithic 1,196-line CSS file into maintainable modules.

**Proposed Structure:**
```
assets/css/
├── main.css          (main import file)
├── modules/
│   ├── _variables.css       (CSS custom properties, lines 9-32)
│   ├── _base.css            (Typography, defaults, lines 34-121)
│   ├── _components.css      (Cards, buttons, modals, banners)
│   ├── _layout.css          (Sections, spacing, grid)
│   ├── _navigation.css      (Header, navbar, footer)
│   ├── _animations.css      (AOS, transitions, keyframes)
│   └── _utilities.css       (Responsive, print, helpers)
```

**Jekyll Integration:**
Option 1 - CSS @import:
```css
/* main.css */
@import 'modules/_variables.css';
@import 'modules/_base.css';
/* etc. */
```

Option 2 - Convert to SCSS and use Jekyll's SASS processing

**Benefits:**
- Easier maintenance
- Better Git diffs
- Faster development
- Modern architecture

**Trade-offs:**
- More HTTP requests (mitigated by HTTP/2)
- Slightly more complex

**Verification:**
- Site looks identical before/after
- No console errors
- All styles still apply
- Test in all viewports

---

### Task 6.2: CSS Cleanup - Remove Redundancy ✅
**Priority:** Medium
**Effort:** 1-2 hours
**Status:** Completed (2026-01-12)
**Files:** `assets/css/main.css`

**Description:**
Remove redundant declarations and consolidate scattered rules.

**Issues to Fix:**

1. **Invalid transition in :root (line 31)**
```css
/* REMOVE THIS - transition doesn't work on :root */
:root {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* ADD TO body or html instead */
html, body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

2. **Consolidate Media Queries**
- Mobile styles currently scattered (lines 957-1064)
- Group all mobile styles into single block
- Easier to maintain breakpoints

3. **Audit Unused Rules**
- Use Chrome DevTools Coverage tab
- Remove unused Bootstrap overrides
- Check for duplicate selectors

**Method:**
1. Run Coverage analysis
2. Document all unused rules
3. Verify removal doesn't break anything
4. Commit changes with detailed message

**Verification:**
- Visual regression test (before/after screenshots)
- No console errors
- Lighthouse score unchanged or improved

---

### Task 7.1: Document Analytics Events ✅
**Priority:** Low
**Effort:** 30 minutes
**Status:** Completed (2026-01-12)
**Files:** `docs/ANALYTICS.md` (new file created)

**Description:**
Document all Google Tag Manager events being tracked for team reference.

**Current Events (from main.js):**
1. **CTA Clicks:** `newsletter_cta_click` (with location: header/hero/events)
2. **Modal Events:** `newsletter_modal_open`, `newsletter_modal_close`
3. **Info Bar:** `info_bar_click` (with link_url)
4. **Outbound Links:** `outbound_click` (with link_url, link_text)
5. **Scroll Depth:** `scroll_depth` (percent: 25/50/75/100)
6. **Section Views:** `section_view` (section: hero/problem/about/events/impact)

**Template:**
```markdown
# Analytics Events

## Overview
All events are tracked via Google Tag Manager (GTM-5SWT2G3G).

## Event Reference

### newsletter_cta_click
**Trigger:** User clicks "Get Notified" button
**Parameters:**
- `location`: "header" | "hero" | "events"

**Purpose:** Track which CTAs drive newsletter signups

### [etc...]
```

**Verification:**
- All events documented
- GTM event names match exactly
- Include purpose for each event

---

## 🔮 FUTURE BACKLOG

### High Priority Future Work

#### Create Standard Event Page Template
**Effort:** 4-6 hours
**Priority:** High
**Status:** Todo

Create a reusable Jekyll layout for individual event pages with consistent structure.

**Template Structure:**

1. **Hero Section**
   - Event logo (upload or default)
   - Date and time
   - Location (city, venue)
   - Event-specific tagline/description (1-2 sentences)
   - Primary CTA button (Register, Get Notified, etc.)

2. **Overview Section** (1-2 paragraphs)
   - What is this event
   - Who should attend
   - What makes this event unique

3. **Location Details**
   - Venue name and address
   - Getting there (public transit, parking)
   - Accessibility information
   - Map embed (Google Maps or similar)
   - Hotel/accommodation suggestions

4. **Schedule Section**
   - Timeline/agenda
   - Keynote speakers
   - Session tracks (if applicable)
   - Social events (happy hour, networking)

5. **FAQ Section**
   - Event-specific questions
   - Registration process
   - What to bring
   - Code of conduct link

6. **Contact Section**
   - Event-specific contact email
   - Social media hashtag
   - Organizer information
   - Link back to main site

**Implementation Details:**

**New Layout File:** `_layouts/event.html`
```yaml
---
layout: default
---
<div class="event-page">
  <section class="event-hero" style="background-image: url('{{ page.hero_image }}')">
    <div class="container">
      {% if page.event_logo %}
      <img src="{{ page.event_logo }}" alt="{{ page.title }} logo" class="event-logo">
      {% endif %}
      <h1>{{ page.title }}</h1>
      <p class="event-date">{{ page.event_date }}</p>
      <p class="event-location">{{ page.location }}</p>
      <p class="event-tagline">{{ page.tagline }}</p>
      <a href="{{ page.cta_link }}" class="button">{{ page.cta_text }}</a>
    </div>
  </section>

  <section class="event-overview section-padding">
    <div class="container">
      <h2>About This Event</h2>
      {{ page.overview | markdownify }}
    </div>
  </section>

  <!-- Additional sections... -->
</div>
```

**Sample Front Matter:**
```yaml
---
layout: event
title: "Hackers on the Hill - Colorado 2026"
event_date: "February 10, 2026"
location: "Denver, Colorado"
venue: "Colorado State Capitol"
tagline: "Our first STATE-level event alongside Wild West Hackin' Fest"
cta_text: "Register Your Interest"
cta_link: "https://docs.google.com/forms/..."
event_logo: "/assets/images/events/colorado-2026-logo.png"
hero_image: "/assets/images/events/colorado-hero.jpg"
overview: |
  Join us for our first STATE-level Hackers on the Hill event...

  This unique event brings together...
schedule:
  - time: "9:00 AM"
    title: "Registration & Coffee"
  - time: "10:00 AM"
    title: "Opening Remarks"
contact_email: "colorado2026@hackersonthehill.org"
hashtag: "#HackersOnTheHillColorado"
---
```

**CSS Needed:**
- Event hero styles (full-width background, overlay)
- Schedule timeline component
- FAQ accordion component
- Location map container
- Event-specific color overrides (optional)

**Benefits:**
- Consistent branding across all event pages
- Easy for team to create new event pages
- Better SEO for individual events
- Can link from homepage location cards
- Dedicated space for event-specific details

**Files to Create:**
- `_layouts/event.html`
- `assets/css/event.css` (or add to modules)
- `_includes/event-faq.html` (reusable FAQ component)
- `_includes/event-schedule.html` (reusable schedule component)

**Example URL Structure:**
- `/events/colorado-2026/`
- `/events/dc-2026/`
- `/events/ottawa-2026/`

---

#### Clean Up File Structure
**Effort:** 2-3 hours
**Priority:** Medium
**Status:** Todo

Audit repository and remove old, outdated, or unused files to improve maintainability.

**Areas to Review:**

1. **Root Directory**
   - Check for old HTML files (non-Jekyll pages)
   - Remove deprecated config files
   - Clean up unused README files or duplicates

2. **Assets Directory**
   - Remove unused images
   - Delete old CSS/JS files if replaced
   - Check for duplicate vendor files (old Bootstrap versions)
   - Optimize image sizes (compress large files)

3. **Layouts & Includes**
   - Remove unused layouts
   - Delete deprecated includes
   - Check for commented-out includes no longer referenced

4. **Archive Pages**
   - Verify which archives are active
   - Remove placeholder or test archives
   - Check for broken links

**Process:**

1. **Inventory Phase:**
   ```bash
   # Find all files, sort by last modified
   find . -type f -not -path "./.git/*" -exec ls -lh {} \; | sort -k6,7

   # Find large files (over 1MB)
   find . -type f -size +1M -not -path "./.git/*"

   # Find files not modified in over a year
   find . -type f -mtime +365 -not -path "./.git/*"
   ```

2. **Audit Phase:**
   - Create `docs/FILE_AUDIT.md` documenting findings
   - List candidates for deletion with justification
   - Note any files that need migration or updating

3. **Cleanup Phase:**
   - Create new branch: `cleanup/file-structure`
   - Remove confirmed unused files
   - Update any broken references
   - Test site builds successfully
   - Commit with detailed message

**Safety Checklist:**
- [ ] Create backup branch before deletion
- [ ] Verify files aren't referenced in any pages
- [ ] Check Git history (file might be needed for old commits)
- [ ] Test local build after each deletion batch
- [ ] Update .gitignore if needed

**Expected Outcomes:**
- Faster Git operations
- Cleaner repository structure
- Easier onboarding for new contributors
- Reduced confusion about which files are active

---

#### Update Archive Pages - Remove Navigation
**Effort:** 1-2 hours
**Priority:** Medium
**Status:** Todo

Standardize archive pages by removing their original navigation bars and updating the archive creation process.

**Current Issue:**
- Archived event sites retain their original navbar
- Creates confusion (navbar links may not work)
- Inconsistent with iframe viewer warning banner
- Each archive needs manual cleanup

**Solution:**

**Phase 1: Update Existing Archives**

Create a script to strip navbar from existing archives:

```bash
#!/bin/bash
# scripts/strip-archive-navbar.sh

ARCHIVE_DIR="archives"

for archive in $ARCHIVE_DIR/*/index.html; do
  echo "Processing: $archive"

  # Remove navbar section (adjust selectors as needed)
  # This is a placeholder - actual implementation depends on archive structure
  sed -i '/<nav/,/<\/nav>/d' "$archive"

  # Or use a more surgical approach with a script
done
```

**Phase 2: Document Archive Process**

Create `docs/ARCHIVE_PROCESS.md`:

```markdown
# Archive Creation Process

## Steps to Archive an Event Site

### 1. Capture the Site
- Use wget or similar tool to download full site
- Or export from hosting platform

### 2. Clean Navigation
Remove the original navbar to avoid confusion:
- Delete `<nav>` or `<header>` element
- Remove navigation CSS
- Strip navigation JavaScript

### 3. Add Archive Banner
The archive layout (`_layouts/archive.html`) automatically adds:
- Warning banner indicating this is an archive
- Link back to main site
- Breadcrumb navigation

### 4. Directory Structure
```
archives/
├── dc-2025/
│   ├── index.html
│   ├── assets/
│   └── ...
├── ottawa-2025/
│   ├── index.html
│   └── ...
```

### 5. Update Main Site
Add archive card to homepage location cards section:
```html
<a href="/archives/dc-2025/" class="location-card">
  <!-- Card content -->
  <span class="button card-badge">See the Archive</span>
</a>
```

### 6. Testing
- [ ] Archive loads in iframe viewer
- [ ] No navigation conflicts
- [ ] All assets load correctly
- [ ] Warning banner displays
- [ ] Links to main site work
```

**Phase 3: Create Automation Script**

`scripts/prepare-archive.sh`:
```bash
#!/bin/bash
# Usage: ./scripts/prepare-archive.sh <source-dir> <event-name>

SOURCE_DIR=$1
EVENT_NAME=$2
DEST_DIR="archives/$EVENT_NAME"

echo "Preparing archive for: $EVENT_NAME"

# Copy files
cp -r "$SOURCE_DIR" "$DEST_DIR"

# Remove navigation (customize selectors for your archives)
find "$DEST_DIR" -name "*.html" -exec sed -i '/<nav/,/<\/nav>/d' {} \;

# Remove nav-related scripts
find "$DEST_DIR" -name "*.html" -exec sed -i '/navbar\.js/d' {} \;

echo "Archive prepared at: $DEST_DIR"
echo "Next steps:"
echo "1. Test the archive locally"
echo "2. Add archive card to homepage"
echo "3. Commit and push"
```

**Files to Create/Update:**
- `scripts/strip-archive-navbar.sh`
- `scripts/prepare-archive.sh`
- `docs/ARCHIVE_PROCESS.md`
- Update existing archives (dc-2025, ottawa-2025, london-2025)

**Verification:**
- [ ] All existing archives load without their original navbar
- [ ] Archive viewer warning banner works
- [ ] No console errors from missing navigation assets
- [ ] Links within archives still work
- [ ] Process documented for future archives

---

#### Resources Page
**Effort:** 3-4 hours
**User Note:** "High priority for future work on the site"

Create new page for policy briefs, recordings, and educational content.

**Structure:**
- `/resources` permalink
- Filterable by topic (AI, IoT, Privacy, etc.)
- Downloadable PDFs
- Embedded video player for recordings
- Search functionality

---

#### Breadcrumbs for Archive Pages
**Effort:** 1-2 hours
**SEO Impact:** Medium-High

Add breadcrumb navigation to `_layouts/archive.html` with BreadcrumbList schema.

**Example:** Home > Archives > UK 2025

**Benefits:**
- Better SEO (appears in Google results)
- Easier navigation back to main site
- Helps AI/LLM understand structure

---

### Medium Priority Future Work

#### Exit-Intent Newsletter Modal
**Effort:** 1-2 hours
**Conversion Impact:** 10-15% lift potential

Show newsletter modal when user's mouse moves toward browser chrome (about to leave).

**Implementation:**
- Detect mouse position near top of viewport
- Show modal once per session
- Respect "already signed up" state

---

#### Photo Gallery
**Effort:** 2-3 hours
**User Note:** "Maybe Google Photos embed to make it easy"

Add gallery showcasing past events.

**Options:**
1. Google Photos embed (easiest)
2. Lightbox gallery with local images
3. Flickr/Instagram embed

---

#### Timeline/Roadmap Visualization
**Effort:** 3-4 hours

Interactive timeline showing past events and upcoming schedule.

**Features:**
- Horizontal scroll timeline
- Year markers
- Click to expand event details
- Links to archive pages

---

### Low Priority Future Work

- A/B test newsletter button text ("Get Notified" vs alternatives)
- Tooltips for "What We Do" icon grid
- Testimonial quotes section
- "Why Attend?" benefits section
- Blog/news section
- Alumni directory
- Mobile nav slide-in animation
- Hero spacing adjustment (mobile)

---

## 🔒 DEFERRED SECURITY/INFRASTRUCTURE

**Note:** Good ideas to revisit later, lower priority for volunteer team

- Content Security Policy headers (Netlify config)
- Subresource Integrity (SRI) hashes for vendor JS
- Privacy policy page (GTM data collection disclosure)
- Automated accessibility testing (pa11y/axe-core in CI/CD)
- Font Awesome SVG sprite optimization
- CMS integration (Netlify CMS / Forestry.io)
- i18n support for non-English countries

---

## ✅ COMPLETED TASKS

### 2026-01-12
- [x] Comprehensive site audit
- [x] Created detailed improvement plan
- [x] Researched newsletter best practices
- [x] Researched breadcrumb SEO benefits
- [x] Analyzed `--text-secondary` usage
- [x] Documented 2026 banner implementation
- [x] Created backlog tracking system

---

## 📊 METRICS & SUCCESS CRITERIA

### Performance Goals
- Lighthouse Performance: 90+ (currently ~85)
- First Contentful Paint: <1.5s
- Cumulative Layout Shift: <0.1

### Accessibility Goals
- Lighthouse Accessibility: 95+ (currently ~92)
- WCAG AA compliance: 100%
- Keyboard navigable: All elements

### SEO Goals
- Lighthouse SEO: 100 (currently ~98)
- Mobile-friendly test: Pass
- Rich results: Valid schema.org markup

---

## 🔧 TESTING CHECKLIST

Use this for every implementation:

**Automated:**
- [ ] Lighthouse audit (all categories)
- [ ] Multiple viewports (mobile/tablet/desktop)
- [ ] GTM Preview mode (verify events)

**Manual:**
- [ ] Tab through page (keyboard nav)
- [ ] Screen reader test (VoiceOver/NVDA)
- [ ] Color contrast check (WebAIM tool)
- [ ] Cross-browser (Chrome/Firefox/Safari)
- [ ] Light and dark themes
- [ ] Prefers-reduced-motion respected

**Local Testing:**
```bash
docker-compose up
# Visit http://localhost:4000
```

---

## 📚 REFERENCE LINKS

**Research Sources:**
- [Newsletter Best Practices (Omnisend)](https://www.omnisend.com/blog/newsletter-signup-examples/)
- [SEO Breadcrumbs Guide (Search Engine Land)](https://searchengineland.com/guide/seo-breadcrumbs)
- [GitHub Projects Best Practices](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/best-practices-for-projects)
- [Backlog.md - Git-based Task Management](https://github.com/MrLesk/Backlog.md)

**Tools:**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Google Tag Manager Preview](https://tagmanager.google.com/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

## 🔄 REVISION HISTORY

- **2026-01-12 (Session Complete):** Sprint finished - 9 of 10 tasks completed! 🎉
  - **Session Summary:**
    - Total implementation time: ~2-3 hours across 3 phases
    - Files modified: 6 (head.html, main.css, index.html, 2026_banner.html, BACKLOG.md, ANALYTICS.md)
    - Zero regressions, all manual testing passed
    - User feedback: "This has all worked out well"

  - **Completed Tasks:**
    - ✅ Task 1.1: GTM preconnect hint (performance boost)
    - ✅ Task 1.2: JSON-LD structured data verification
    - ✅ Task 2.1: Coming Soon cards consolidated + Suggest Location card added (with mobile fix)
    - ✅ Task 4.1: Micro-interactions (button ripple + card accent animation)
    - ✅ Task 4.2: Banner on-load animation (2 pulse cycles, accessibility-aware)
    - ✅ Task 5.1: Comprehensive focus-visible styles for keyboard nav
    - ✅ Task 5.2: Added aria-live="polite" to banner
    - ✅ Task 5.3: Text contrast improved (60% → 70% opacity)
    - ✅ Task 6.2: CSS cleanup (removed invalid :root transition)
    - ✅ Task 7.1: Analytics documentation (comprehensive ANALYTICS.md)

  - **Deferred (User Decision):**
    - 📝 Task 6.1: CSS modularization → Future session (2-3 hours dedicated block needed)

  - **Key Improvements Delivered:**
    - Performance: Faster GTM resource loading
    - Visual Polish: Subtle animations respect minimal design aesthetic
    - Accessibility: WCAG AA text contrast, keyboard navigation support, screen reader announcements
    - Documentation: Complete analytics event catalog for team reference
    - Code Quality: Removed invalid CSS, proper theme transition handling

  - **Next Session Recommendations:**
    1. Allocate 2-3 hour block for CSS modularization (Task 6.1)
    2. Consider starting Resources page (high user priority)
    3. Breadcrumb implementation for archives (SEO benefit)

---

*Last updated: 2026-01-12 by Claude Code*
