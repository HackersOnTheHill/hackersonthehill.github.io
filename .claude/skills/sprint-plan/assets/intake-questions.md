# Intake questions

Canonical clarifying questions the `/sprint-plan` skill asks. Group into
at most four questions per `AskUserQuestion` call (tool limit). Skip any
question the user has already answered in their opening prompt.

Summarize what you've heard back to the user after each set of questions
before moving to the next phase.

---

## Phase 1 — Archetype (always first)

**Q: What kind of sprint is this?**
- **Content sprint** — adding or updating an event page (date, location,
  speakers, copy, banner, archive). Usually led by a local event organizer.
- **Infrastructure sprint** — site-wide changes (layouts, CSS, JS, data
  model, analytics, build). Usually led by the maintainer.
- **Mixed / not sure** — some of both, or the user isn't sure yet.

The answer determines which question set below you use, which files the
plan will touch, and which template you draft from.

---

## Phase 2A — Content-sprint questions

Ask in plain language. Do not assume the user knows Jekyll, front matter,
or Liquid. If they don't know an answer, note it as "TBD" in the plan
rather than blocking on it.

1. **Which location and year?** (e.g., "Colorado 2026", "Netherlands 2026")
   — drives `event_key`, the `.md` filename, and the archive branch name.
2. **Event date, venue, and registration URL?** Any of these can be TBD.
3. **Short description + any speakers or partners to highlight?** Roughly
   one paragraph for the event hero; full agenda can come later.
4. **What visibility surfaces does this need?**
   - Banner at the top of the homepage? (y/n + launch date)
   - Info-bar entry on the homepage? (y/n)
   - Nav / menu entry? (y/n)
   - A card in the Events grid? (y/n)
5. **Existing archive to link?** — e.g., last year's event on the same
   site, or a brand-new location with nothing to link yet.
6. **Hard deadline and owner?** — launch-by date (for the page going
   live) and who signs off on final content.

---

## Phase 2B — Infrastructure-sprint questions

1. **Goal in one sentence.** What should be different after this sprint?
2. **Why now?** What problem does this solve, and what's the cost of
   waiting? (Helps prioritize and scope.)
3. **What does "good" look like?** Measurable criteria where possible —
   Lighthouse score, WCAG level, specific user task that should succeed,
   page weight target, etc.
4. **Scope boundaries.** What's explicitly IN, and what's explicitly OUT
   of this sprint? The out-of-scope list is as important as the in-scope
   list.
5. **Hard constraints.**
   - Launch-by date (event tie-in?)
   - Accessibility floor (WCAG AA is the project baseline)
   - SEO / analytics constraints (don't break GTM, don't regress
     structured data)
   - Motion / reduced-motion budget
   - Zero-new-dependency policy? (default: yes, per copilot-instructions)
6. **Audience impact.** Which pages or regions does this affect? Any
   pages that should be explicitly left alone?
7. **Dependencies.** Anything waiting on a person (content owner, legal
   review, analytics lead) or a third party (Netlify, GTM, a vendor)?

---

## Phase 2C — Mixed sprint

Run Phase 2A and Phase 2B in sequence, but explicitly tell the user
you're going to do that so they know what to expect. In the plan,
split the task list into a "Content" section and an "Infrastructure"
section so each side can be reviewed independently.

---

## Playback

Before moving to Phase 3 (research and draft), play back to the user:

> Here's what I heard:
> - Goal: …
> - Definition of good: …
> - In scope: …
> - Out of scope: …
> - Deadline: …
> - Environment for dev/test: … *(from Phase 1b probe)*
>
> Anything I missed or got wrong?

Wait for confirmation (or corrections) before drafting the plan.
