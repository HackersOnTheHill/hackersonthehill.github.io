# Sprint plan template

Copy this file to `.claude/plans/<kebab-case-slug>.md` when drafting a new
sprint. The header format mirrors `docs/BACKLOG.md` so plans can be linked
under `🎯 CURRENT SPRINT` without reformatting.

When filling this in: delete the instructional italics in parentheses, keep
the section headings as-is, and use the existing BACKLOG task schema
(`## Task N.M`) for every task.

---

# Sprint: <Title>

**Archetype:** Content | Infrastructure | Mixed
**Status:** Draft | Approved | Active | Completed
**Created:** YYYY-MM-DD
**Owner:** <name or role>
**Launch-by:** YYYY-MM-DD | none

## Goal

*(One or two sentences. What should be different after this sprint?)*

## Why this matters

*(One or two sentences tying back to the mission — researcher↔policymaker
bridge, a specific upcoming event, an accessibility or SEO gap, etc.
Helps future readers and Claude make trade-offs that serve the mission.)*

## Definition of good

*(Measurable criteria. For content sprints: page live at /<region>/, nav
entry present, banner launches on agreed date, registration link works.
For infrastructure sprints: Lighthouse score, WCAG level, specific task
flow, page weight, etc.)*

- [ ] …
- [ ] …

## Scope

**In scope:**
- …

**Out of scope (explicitly deferred):**
- …

## Environment

*(Auto-filled from the Phase 1b probe. Pick one.)*

- `container` — running in an unconstrained container; `docker-compose up`
  works; full preview + test available.
- `host-docker` — host has Docker; will use `docker-compose up` for
  preview. *(Note if `docker-compose.yml` needs scaffolding.)*
- `limited` — no container, no Docker (e.g., mobile / web Claude Code).
  Code edits only; previewing and link-checking will be skipped. The user
  accepted this trade-off during Phase 1b.

## Tasks

### Task 1.1: <Title>
**Priority:** High | Medium | Low
**Effort:** <minutes | hours>
**Status:** Todo
**Files:** `path/to/file.ext`

**Description:**
*(What changes and why in one short paragraph.)*

**Implementation:**
*(Steps, commands, or code snippets. Keep snippets minimal — actual edits
happen via Edit/Write during execution. Reference existing patterns
instead of inventing new ones.)*

**Verification:**
- …
- If env is `container` or `host-docker`: `docker-compose up` →
  http://localhost:4000 → confirm the affected page/section.
- If env is `limited`: note what can't be verified locally and what the
  user should check after Netlify deploys the branch preview.

### Task 1.2: <Title>
*(same schema)*

## Testing checklist

*(Keep for infrastructure sprints. For content-only sprints, keep the
parts that apply — e.g., mobile viewport, light/dark theme, keyboard nav.)*

**Automated / in-browser:**
- [ ] Multiple viewports (mobile / tablet / desktop)
- [ ] Lighthouse pass on affected pages (if infra)
- [ ] GTM Preview if analytics touched

**Manual:**
- [ ] Keyboard tab order through new/changed UI
- [ ] Light and dark themes
- [ ] `prefers-reduced-motion` respected if animation touched
- [ ] Color contrast check (WebAIM) if colors touched

## Rollback

*(One or two sentences: which commit to revert, or which file(s) to
restore. For content sprints with a new branch: delete the branch.)*

## Sign-off

- [ ] Plan reviewed and approved by <owner>
- [ ] Environment trade-offs understood
- [ ] Ready to execute

## Revision log

- YYYY-MM-DD — Plan drafted.
- YYYY-MM-DD — Revision N: <what changed>.
- YYYY-MM-DD — Completed. See `docs/BACKLOG.md` Revision History for the
  session summary.
