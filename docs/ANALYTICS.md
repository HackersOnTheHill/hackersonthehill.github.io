# Analytics Events Documentation

**Last Updated:** 2026-01-12
**Google Tag Manager ID:** GTM-5SWT2G3G
**Legacy UA ID:** UA-154554887-1 (configured in `_config.yml`)

---

## Overview

This document catalogs all analytics events tracked via Google Tag Manager for hackersonthehill.github.io. Events are implemented in `assets/js/main.js` and triggered through data attributes or JavaScript observers.

**Purpose:** Track user engagement, conversion funnel performance, and content interaction to inform site improvements and event planning.

---

## Event Categories

### 1. Call-to-Action (CTA) Tracking

#### `newsletter_cta_click`
**Trigger:** User clicks any "Get Notified" or newsletter signup button
**Parameters:**
- `location` (string): Where the CTA was clicked
  - `"header"` - Navigation bar button
  - `"hero"` - Hero section button
  - `"events"` - Events section link
  - `"updates2026Modal"` - From 2026 updates modal

**Implementation:**
```html
<button data-analytics-event="newsletter_cta_click" data-analytics-location="hero">
  Get Notified
</button>
```

**Use Case:** Measure which CTAs drive the most newsletter signups to optimize placement and copy.

**Files:**
- `_includes/navbar.html` (line ~37)
- `_layouts/index.html` (line ~58, ~201)
- `_includes/2026_banner.html` (line ~20)

---

### 2. Modal Interactions

#### `newsletter_modal_open`
**Trigger:** Newsletter modal is displayed to user
**Parameters:** None
**Implementation:** Automatic via Bootstrap modal event listener

**Use Case:** Track how often users engage with the newsletter signup flow (versus bounce).

#### `newsletter_modal_close`
**Trigger:** Newsletter modal is closed (via X button, backdrop click, or Esc key)
**Parameters:** None
**Implementation:** Automatic via Bootstrap modal event listener

**Use Case:** Measure abandonment rate - users who open but don't complete signup.

**Code Reference:** `assets/js/main.js` (lines 68-76)
```javascript
const newsletterModal = document.getElementById('newsletterModal');
if (newsletterModal) {
  newsletterModal.addEventListener('show.bs.modal', () => {
    pushAnalytics({ event: 'newsletter_modal_open' });
  });
  newsletterModal.addEventListener('hidden.bs.modal', () => {
    pushAnalytics({ event: 'newsletter_modal_close' });
  });
}
```

---

### 3. Navigation & Engagement

#### `info_bar_click`
**Trigger:** User clicks link in the info bar (between hero and about sections)
**Parameters:**
- `link_url` (string): The href destination

**Implementation:** Automatic for all `<a>` tags within `.info-bar`

**Use Case:** Track clicks on time-sensitive announcements (e.g., "Upcoming: Denver · February 10, 2026").

**Code Reference:** `assets/js/main.js` (lines 50-52)
```javascript
if (target.closest('.info-bar') && target.tagName === 'A') {
  pushAnalytics({ event: 'info_bar_click', link_url: target.href });
}
```

#### `outbound_click`
**Trigger:** User clicks external link (different domain)
**Parameters:**
- `link_url` (string): Full destination URL
- `link_text` (string): Link text content (truncated to 100 chars)

**Implementation:** Automatic for all external `<a>` tags

**Use Case:** Understand which external resources users find valuable (event registrations, social media, partner sites).

**Code Reference:** `assets/js/main.js` (lines 54-63)
```javascript
if (target.tagName === 'A') {
  const href = target.getAttribute('href');
  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) {
    const label = (target.textContent || '').trim().slice(0, 100);
    pushAnalytics({ event: 'outbound_click', link_url: url.href, link_text: label });
  }
}
```

---

### 4. Content Engagement

#### `scroll_depth`
**Trigger:** User scrolls to milestone depth thresholds
**Parameters:**
- `percent` (number): Scroll depth percentage
  - `25` - First quarter
  - `50` - Halfway
  - `75` - Three quarters
  - `100` - Bottom reached

**Implementation:** Automatic via scroll event listener with throttling

**Use Case:** Measure content engagement - do users read full page or bounce early?

**Code Reference:** `assets/js/main.js` (lines 78-111)
```javascript
const scrollThresholds = [25, 50, 75, 100];
const seenScrollDepth = new Set();
// Fires once per threshold per session
```

**Note:** Uses `requestAnimationFrame` for performance optimization.

---

#### `section_view`
**Trigger:** Section becomes visible in viewport (50% threshold)
**Parameters:**
- `section` (string): Section ID or data-analytics-section attribute
  - `"hero"`, `"problem"`, `"about"`, `"impact"`, `"events"`

**Implementation:** Automatic via IntersectionObserver for all `<section>` elements in `<main>`

**Use Case:** Track which sections get the most attention - helps prioritize content updates.

**Code Reference:** `assets/js/main.js` (lines 113-131)
```javascript
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sectionName = entry.target.dataset.analyticsSection || entry.target.id;
      if (sectionName && !seenSections.has(sectionName)) {
        pushAnalytics({ event: 'section_view', section: sectionName });
        seenSections.add(sectionName);
      }
    }
  });
}, { threshold: 0.5 });
```

---

## Implementation Details

### Data Layer Structure

All events push to `window.dataLayer` using this format:

```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'event_name',
  parameter1: 'value1',
  parameter2: 'value2'
});
```

### Helper Function

```javascript
const pushAnalytics = (payload) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
};
```

**Location:** `assets/js/main.js` (lines 23-26)

---

## Event Summary Table

| Event Name | Trigger | Parameters | Priority |
|------------|---------|------------|----------|
| `newsletter_cta_click` | CTA button/link clicked | `location`, `label` (optional) | **High** |
| `newsletter_modal_open` | Modal displayed | None | Medium |
| `newsletter_modal_close` | Modal closed | None | Medium |
| `info_bar_click` | Info bar link clicked | `link_url` | Medium |
| `outbound_click` | External link clicked | `link_url`, `link_text` | Low |
| `scroll_depth` | Scroll milestone reached | `percent` | Medium |
| `section_view` | Section enters viewport | `section` | Low |

---

## Testing & Verification

### GTM Preview Mode
1. Visit: https://tagmanager.google.com/
2. Select container `GTM-5SWT2G3G`
3. Click "Preview" button
4. Navigate to your site
5. Perform actions and verify events fire in debug panel

### Browser Console
```javascript
// View all events pushed to dataLayer
console.table(window.dataLayer);

// Monitor in real-time
window.dataLayer.push = new Proxy(window.dataLayer.push, {
  apply: function(target, thisArg, argumentsList) {
    console.log('📊 Event:', argumentsList[0]);
    return target.apply(thisArg, argumentsList);
  }
});
```

---

## Recommended Metrics

### Conversion Funnel
1. **Awareness:** `section_view` (hero, events)
2. **Interest:** `scroll_depth` (50%+)
3. **Consideration:** `newsletter_cta_click`
4. **Action:** `newsletter_modal_open`
5. **Completion:** Form submission (tracked by Sender.net)

### Engagement Score
- `scroll_depth` 100% = 4 points
- `scroll_depth` 75% = 3 points
- `scroll_depth` 50% = 2 points
- `section_view` each = 1 point
- `outbound_click` = 2 points

### Bounce Rate Indicators
- `scroll_depth` < 25%
- No `section_view` events beyond hero
- Session duration < 30 seconds

---

## Future Event Ideas

**Suggested additions for A/B testing and deeper insights:**

1. **Form Field Interactions**
   - `form_field_focus` - Which fields get attention
   - `form_validation_error` - Where users struggle
   - `form_submission_success` - Completion tracking

2. **Card Interactions**
   - `location_card_click` - Which events get most clicks
   - `location_card_hover` - Engagement without clicking

3. **Performance Metrics**
   - `page_load_time` - Track site speed
   - `interaction_to_next_paint` - Measure responsiveness

4. **Newsletter Performance**
   - `newsletter_signup_success` - Track completions (requires Sender.net webhook)
   - `newsletter_signup_error` - Identify technical issues

---

## Related Configuration

### _config.yml
```yaml
google_analytics_key: UA-154554887-1
```

### GTM Container
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5SWT2G3G');</script>
```

**Location:** `_includes/head.html` (lines 72-75)

---

## Changelog

- **2026-01-12:** Initial documentation created
  - Cataloged 7 event types
  - Documented all parameters
  - Added testing procedures
  - Suggested future improvements

---

*For questions or additions, see main BACKLOG.md or contact site maintainers.*
