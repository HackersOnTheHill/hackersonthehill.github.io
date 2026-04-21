# Sprint: US/DC 2026 Event Launch

**Archetype:** Content
**Status:** Completed
**Created:** 2026-04-21
**Owner:** Beau Woods
**Launch-by:** 2026-04-25

## Goal

Publish the Hackers on the Hill Washington, DC 2026 event page (June 16, US Capitol) and surface it across the site — nav, events card, info-bar, and homepage banner modal.

## Why this matters

DC is the flagship HotH event. Congressional offices and security researchers planning their summer calendars need a page to point at now. Registration opens ~May 1; every day without a page is a day the notification list can't convert.

## Definition of good

- [ ] A page for US/DC 2026 exists at `/us-2026/` and loads correctly
- [ ] The event appears in the site nav under the upcoming events dropdown
- [ ] An event card for US/DC 2026 appears in the homepage events grid
- [ ] The homepage info-bar includes a DC 2026 entry linking to `/us-2026/`
- [ ] The "What's New for 2026?" banner modal links to `/us-2026/` instead of the generic mention
- [ ] The page includes: hero with CTA → notification list, schedule (all TBD times), location section with map, FAQ section
- [ ] Light and dark themes render correctly on the event page
- [ ] Mobile viewport looks correct on the event page

## Scope

**In scope:**
- `_data/events/2026-us.yml` — new event data file (from `_data/events/template.yml`)
- `us-2026.md` — new event page (from `docs/templates/template.md`)
- `_data/pages/index.yml` — add DC 2026 to info-bar
- `_data/banners.yml` — update "What's New for 2026?" modal to link to the real page

**Out of scope (explicitly deferred):**
- Cyber Policy Shark Tank standalone reference page → Sprint 2
- Speaker profiles, photos, or bios (all TBD at launch)
- Registration form or Eventbrite link (opens ~May 1)
- Archive entry for DC 2026 (happens after the event)
- Capitol tours / mock hearing details (not yet public)

## Environment

`host-docker` — host has Docker; will use `docker-compose up` for preview at http://localhost:4000.

## Tasks

### Task 1.1: Create event data file and event page 📋
**Priority:** High
**Effort:** 20 minutes
**Status:** Todo
**Files:** `_data/events/2026-us.yml`, `us-2026.md`

**Description:**
Create the event data file from `_data/events/template.yml` and the event page from `docs/templates/template.md`. Set `status: draft` in the data file so nothing appears in nav or cards yet — the page will be accessible at `/us-2026/` but not linked anywhere, which is safe to ship.

**Implementation:**

`_data/events/2026-us.yml`:
```yaml
status: draft
region: us
start_date: 2026-06-16
url: /us-2026/
show_in_nav: true
show_on_index: true
nav:
  label: US - Jun 2026
card:
  title: United States
  location: Washington, DC
  detail: US Capitol
  date_label: "Next: June 16, 2026"
  date_type: next
  badge: Get Notified
  badge_class: ""
  logo_light: /assets/img/hoth-us_lightmode.svg
  logo_dark: /assets/img/hoth-us_darkmode.svg
  logo_alt: Hackers on the Hill United States logo
  aria_label: Register for Hackers on the Hill US 2026
hero:
  title: Hackers on the Hill Washington, DC
  date_label: June 16, 2026
  location_label: Washington, DC
  logo: /assets/img/hoth-us_lightmode.svg
  logo_alt: Hackers on the Hill United States logo
  description: Cybersecurity researchers and Congressional staff, in the same room, making policy smarter together.
  notice: "Registration opens around May 1. Sign up for our notification list to hear when it drops."
  cta:
    label: Get Notified
    modal_target: "#newsletterModal"
schedule_intro: "The day runs from Capitol Hill to the Critical Effect stage — with something new we're not quite ready to announce yet."
location:
  name: US Capitol
  directions_url: https://www.google.com/maps?q=US+Capitol+Washington+DC
  address: East Capitol St NE & First St SE, Washington, DC 20004
  details: |
    The Capitol is accessible by Metro (Capitol South on the Blue/Orange/Silver lines, or Union Station on the Red line). Entry requires a government-issued photo ID and security screening.

    Specific room assignments and entry points will be shared with confirmed attendees.
  map_embed_url: https://www.google.com/maps?q=US+Capitol+Washington+DC&output=embed
  map_title: Google map of the US Capitol
schedule:
  - time: TBD
    title: Arrival and security check
    description: Arrive at the Capitol and clear security screening. Bring a government-issued photo ID.
  - time: TBD
    title: Cyber Policy 101
    location: US Capitol
    description: A grounding session on what is moving on the Hill right now, what makes policy change, and where the security research community fits in.
    speaker_placeholder: true
  - time: TBD
    title: A Day in the Life of a Staffer
    location: US Capitol
    description: Straight talk from Hill staff on how they receive and use technical input — and what actually makes a difference.
    speaker_placeholder: true
  - time: TBD
    title: Office briefings
    location: Congressional offices
    description: Small-group meetings with Congressional offices around the Capitol. Stay tuned — there is something new happening alongside the briefings this year.
    speaker_placeholder: true
  - time: TBD
    title: Cyber Policy Shark Tank — live finale
    location: Critical Effect
    description: Researchers pitch cybersecurity policy solutions. Congressional staffers push back. The final round goes live on stage at the close of <a href="https://securityandtechnology.org/event/critical-effect-2026/" target="_blank" rel="noopener">Critical Effect 2026</a>, presented in partnership with the Institute for Security and Technology.
faq:
  - question: When does registration open?
    answer: |
      Registration is expected to open around May 1, 2026. <a data-bs-toggle="modal" href="#newsletterModal" aria-label="notification list">Sign up for our notification list</a> to hear as soon as it does.
  - question: What happens after I register my interest?
    answer: |
      Registering your interest lets us follow up with details as plans are finalized. It does not guarantee a spot.

      If we can accommodate you, you will receive a confirmation email with next steps.
  - question: Is this event connected to Critical Effect?
    answer: |
      Yes. The Cyber Policy Shark Tank finale will be held live on stage at the close of <a href="https://securityandtechnology.org/event/critical-effect-2026/" target="_blank" rel="noopener">Critical Effect 2026</a>, presented in partnership with the Institute for Security and Technology. If you plan to attend Critical Effect, we recommend coordinating your schedule to catch the finale.
  - question: Do you allow press?
    answer: |
      Press attendance is handled separately. If you are a member of the press and would like to attend or speak with us, please <a data-bs-toggle="modal" href="#contactModal" aria-label="Contact Us">get in touch</a>.
  - question: Are there recommended hotels?
    answer: |
      We do not have an official hotel block. Capitol Hill has several options within walking distance of the Capitol, and Dupont Circle and downtown DC are easy Metro rides away.
  - question: What should I bring? What should I wear?
    answer: |
      Bring a government-issued photo ID for security screening. A notepad is useful; laptops are optional.

      Business casual is comfortable and appropriate for the Hill.
  - question: Can I bring a guest?
    answer: |
      Due to venue requirements and limited capacity, each attendee must register individually. Please do not bring unregistered guests.
```

`us-2026.md` (from `docs/templates/template.md`):
```markdown
---
layout: event
title: Hackers on the Hill Washington, DC 2026
permalink: /us-2026/
event_key: 2026-us
---

## About This Event

Hackers on the Hill DC is back for 2026 — and this year we're building on what worked and adding a few new dimensions to the format.

The day starts on Capitol Hill, with a grounding plenary on the current policy landscape and a candid session with Congressional staff on what technical input actually looks like from their side of the table. Then we break into small groups for one-on-one office briefings — the core of what makes Hackers on the Hill different from a conference.

To close the day, the Cyber Policy Shark Tank returns. Researchers pitch cybersecurity policy ideas to a panel of current and former Congressional staffers — the Sharks — who score each pitch on real-world viability and legislative fit. This year's finale goes live on stage at the close of [Critical Effect 2026](https://securityandtechnology.org/event/critical-effect-2026/), presented in partnership with the Institute for Security and Technology.

This event is non-commercial. No vendor pitches, no lobbying, no sponsors taking the stage. Just researchers and policymakers, working through the hard problems together.
```

**Verification:**
- `docker-compose up` → http://localhost:4000/us-2026/ loads without error
- Hero section shows date, location, "Get Notified" CTA opens newsletter modal
- Schedule lists all five blocks; "something new" teaser is present in the office briefings row
- Location section shows Capitol address and map embed
- FAQ section renders all seven questions
- Light and dark themes look correct
- Mobile viewport looks correct

---

### Task 1.2: Publish the event 📋
**Priority:** High
**Effort:** 5 minutes
**Status:** Todo
**Files:** `_data/events/2026-us.yml`

**Description:**
Flip `status` from `draft` to `published` in the event data file. This makes the event appear in the site nav (under the upcoming events dropdown) and as a card in the homepage events grid — no other file changes needed.

**Implementation:**
Change line 1 of `_data/events/2026-us.yml`:
```
status: published
```

**Verification:**
- `docker-compose up` → http://localhost:4000 → nav dropdown shows "US - Jun 2026" linking to `/us-2026/`
- Events grid on the homepage shows a United States card with "Next: June 16, 2026" and "Get Notified" badge
- Clicking both takes you to the correct page

---

### Task 1.3: Update homepage surfaces 📋
**Priority:** High
**Effort:** 10 minutes
**Status:** Todo
**Files:** `_data/pages/index.yml`, `_data/banners.yml`

**Description:**
Add DC 2026 to the homepage info-bar, and update the "What's New for 2026?" banner modal to replace the generic DC mention with a real link to the event page.

**Implementation:**

In `_data/pages/index.yml`, add to `info_bar.items`:
```yaml
    - label: "Upcoming: US/DC - June 16, 2026"
      url: /us-2026/
```

In `_data/banners.yml`, replace the generic DC line in `modal_body_html`:

Before:
```html
<li><strong>By popular demand</strong> We will return to Washington, DC later in 2026, as well as Ottawa, Canada and London, UK.</li>
```

After:
```html
<li><strong>Washington, DC — June 16</strong> Hackers on the Hill returns to the Capitol. Registration opens around May 1. <a href="/us-2026/">Learn more on the DC page.</a></li>
```

**Verification:**
- `docker-compose up` → http://localhost:4000 → info-bar shows "Upcoming: US/DC - June 16, 2026" and links to `/us-2026/`
- Clicking the "What's New for 2026?" banner opens the modal; DC entry now shows the date and links to the event page
- No other modal content is changed

---

## Testing checklist

**Manual:**
- [ ] Multiple viewports: mobile / tablet / desktop on `/us-2026/`
- [ ] Light and dark themes on the event page and homepage
- [ ] All links on the event page open correctly (newsletter modal, Critical Effect URL, contact modal)
- [ ] Nav dropdown includes "US - Jun 2026" and routes correctly
- [ ] Events grid card "Get Notified" badge opens newsletter modal

## Rollback

Revert the three commits in reverse order. The event page and data file can be deleted; the index.yml and banners.yml edits are small enough to revert by hand in under a minute.

## Sign-off

- [ ] Plan reviewed and approved by Beau
- [ ] Environment trade-offs understood
- [ ] Ready to execute

## Revision log

- 2026-04-21 — Plan drafted.
- 2026-04-21 — Completed. See `docs/BACKLOG.md` Revision History for session summary.
