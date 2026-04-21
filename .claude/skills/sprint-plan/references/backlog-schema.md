# BACKLOG task schema (reference)

`docs/BACKLOG.md` uses a consistent task schema across every sprint. The
`/sprint-plan` skill must write new plans in this same schema so they can
be linked from BACKLOG without reformatting and read by anyone already
familiar with the repo's planning conventions.

## Canonical task block

```markdown
### Task N.M: <Title> [status emoji]
**Priority:** High | Medium | Low
**Effort:** <minutes | hours>
**Status:** Todo | In Progress | ✅ Completed (YYYY-MM-DD) | ⏸ Deferred
**Files:** `path/to/file.ext`, `path/to/other.ext`

**Description:**
<1–3 sentences: what this task does and why it matters.>

**Implementation:**
<Steps, commands, or code snippets. Keep snippets short — they're
illustrative, not the final edit. Reference existing patterns rather
than inventing new ones.>

**Verification:**
- <How to confirm the change works, in specific terms.>
- <Include the `docker-compose up` step when env supports it.>
- <Include any accessibility / light-dark / reduced-motion check that
   applies.>
```

Real examples to model on (from `docs/BACKLOG.md`):

- Simple / small task — Task 1.1 "Add GTM Preconnect Hint"
  (`docs/BACKLOG.md:21-39`). 5-minute effort, single file, one-line code
  snippet, two verification bullets.
- Visual / UI task — Task 2.1 "Consolidate Coming Soon Cards"
  (`docs/BACKLOG.md:66-122`). 30-minute effort, HTML snippets for
  before/after, explicit visual verification across light/dark themes.
- Accessibility / a11y task — Task 4.2 "Add Banner On-Load Animation"
  (`docs/BACKLOG.md:125-172`). Includes explicit
  `prefers-reduced-motion` handling and multi-theme check.

## Sprint-level structure

A full plan in `.claude/plans/<slug>.md` has these sections, in order:

1. `# Sprint: <Title>` — H1 with the sprint name.
2. Metadata block (Archetype, Status, Created, Owner, Launch-by).
3. `## Goal` — 1–2 sentences.
4. `## Why this matters` — mission tie-in, 1–2 sentences.
5. `## Definition of good` — checklist of measurable criteria.
6. `## Scope` — explicit In / Out lists.
7. `## Environment` — container / host-docker / limited, with any caveats.
8. `## Tasks` — one `### Task N.M` block per task, using the schema above.
9. `## Testing checklist` — scoped to the sprint's surface area.
10. `## Rollback` — one or two sentences.
11. `## Sign-off` — checklist the user ticks before execution.
12. `## Revision log` — dated entries as the plan evolves.

## Status emojis used in BACKLOG.md

- `✅` — completed
- `📋` — approved / next up
- `🎯` — current sprint
- `📝` — deferred / future
- `🔧` — testing checklist
- `📚` — reference links
- `🔄` — revision history

Reuse these; don't invent new emoji sets. Keep the use of emoji minimal —
BACKLOG.md uses them as section markers, not inline decoration.

## Close-out entry for BACKLOG.md

When a sprint completes, append an entry to the Revision History section
at the bottom of `docs/BACKLOG.md` (matching the 2026-01-12 entry at
`docs/BACKLOG.md:1542`):

```markdown
- **YYYY-MM-DD (Session Complete):** <Sprint title> — <N> of <M> tasks completed.
  - **Session Summary:**
    - Total implementation time: ~<X>
    - Files modified: <N> (<brief list>)
    - <Any regressions / caveats.>
  - **Completed Tasks:**
    - ✅ Task N.M: <Title>
    - …
  - **Deferred:**
    - 📝 Task N.M: <Title> — <reason>
  - **Key Improvements Delivered:**
    - …
  - **Next Session Recommendations:**
    1. …
```
