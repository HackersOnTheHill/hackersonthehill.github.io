# Sprint: Cyber Policy Shark Tank Reference Page

**Archetype:** Content
**Status:** Completed
**Created:** 2026-04-21
**Owner:** Beau Woods
**Launch-by:** 2026-04-25

## Goal

Publish a standalone, evergreen reference page at `/cyber-policy-shark-tank/` that explains the Shark Tank format, scoring, and submission process without tying it to any specific event or host.

## Why this matters

The Shark Tank is a signature HotH program that researchers and policymakers will want to learn about independently of any particular event page. Having a permanent reference makes it easy to link from event pages (like DC 2026), share with prospective participants, and build the format's identity over time.

## Definition of good

- [ ] A page exists at `/cyber-policy-shark-tank/` and loads correctly
- [ ] The page appears in the site nav under the Resources dropdown as "Cyber Policy Shark Tank"
- [ ] The page covers: what it is, the format (pitch + Q&A timing), the scoring rubric, who the Sharks are, how to submit, and past instances
- [ ] Past instances section links to `/archives/us-2025-critical-effect/` and `/us-2026/`
- [ ] No em-dashes in any copy
- [ ] Light and dark themes render correctly
- [ ] Mobile viewport looks correct

## Scope

**In scope:**
- `cyber-policy-shark-tank.md` — new page using the `briefing` layout
- `_data/nav.yml` — one new entry under `resources.items`

**Out of scope (explicitly deferred):**
- "How to run a Shark Tank" organizer guide
- Speaker/Shark bios or photos
- Submission form or intake mechanism
- New CSS or layout file (reusing `briefing` layout)

## Environment

`host-docker` — Jekyll running on port 4000, accessible at `http://ntel.gibbon-blues.ts.net:4000`.

## Tasks

### Task 1.1: Create the Shark Tank reference page 📋
**Priority:** High
**Effort:** 30 minutes
**Status:** Todo
**Files:** `cyber-policy-shark-tank.md`

**Description:**
Create the page using the `briefing` layout, which provides the correct top-padding offset for the fixed navbar and matches the pattern of other standalone content pages (`briefing.md`, `style-guide.md`). Write all sections in plain HTML within the markdown file, using `briefing-section` and Bootstrap grid classes for consistent styling. No new CSS or layout needed.

**Sections to include:**
1. Hero — name + one-line description of what it is
2. What it is — one paragraph explaining the concept
3. The format — pitch timing (3-4 min) and Shark response (7-8 min), prelims → 3 finalists → live final
4. How pitches are scored — the four-point rubric
5. Who are the Sharks — current and former Congressional staffers
6. How to submit — what's required in a submission, sign up for notification list
7. Past events — DC/Critical Effect 2025 (with archive link), DC 2026 upcoming (with event page link)

**Implementation:**

Front matter:
```yaml
---
title: Cyber Policy Shark Tank
layout: briefing
permalink: /cyber-policy-shark-tank/
---
```

Follow the HTML structure of `briefing.md`: a `briefing-hero` section for the top, then `briefing-section` blocks for each content section, each wrapped in `.container > .row.justify-content-center > .col-12.col-lg-9`. No em-dashes anywhere.

**Verification:**
- `docker-compose up` → `http://ntel.gibbon-blues.ts.net:4000/cyber-policy-shark-tank/` loads without error
- All seven sections render in order
- Links to `/archives/us-2025-critical-effect/` and `/us-2026/` are correct
- Newsletter modal link opens correctly
- Light and dark themes look correct
- Mobile viewport looks correct

---

### Task 1.2: Add to Resources nav 📋
**Priority:** High
**Effort:** 5 minutes
**Status:** Todo
**Files:** `_data/nav.yml`

**Description:**
Add the page to the Resources dropdown. The page should be live and verified before this entry is added — the nav link should never point at a 404.

**Implementation:**

In `_data/nav.yml`, under `resources.items`, add:
```yaml
    - label: Cyber Policy Shark Tank
      url: /cyber-policy-shark-tank/
```

Position: add after the existing items, or wherever it fits best in the list order.

**Verification:**
- `http://ntel.gibbon-blues.ts.net:4000` → Resources dropdown includes "Cyber Policy Shark Tank"
- Clicking it navigates to `/cyber-policy-shark-tank/`
- No existing nav entries broken

---

## Testing checklist

**Manual:**
- [ ] Multiple viewports: mobile / tablet / desktop
- [ ] Light and dark themes
- [ ] All links on the page open correctly (archive, event page, newsletter modal)
- [ ] Resources nav dropdown includes the new entry and routes correctly

## Rollback

Delete `cyber-policy-shark-tank.md` and revert the one-line addition to `_data/nav.yml`.

## Sign-off

- [ ] Plan reviewed and approved by Beau
- [ ] Ready to execute

## Revision log

- 2026-04-21 — Plan drafted.
- 2026-04-21 — Completed. See `docs/BACKLOG.md` Revision History for session summary.
