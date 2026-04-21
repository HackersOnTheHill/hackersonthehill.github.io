---
name: sprint-plan
description: Guided sprint-planning workflow for hackersonthehill.github.io. Use when the user wants to plan and execute a sprint — a new event page, a site-wide improvement, or a mix. Walks through archetype selection, environment probe, clarifying questions, plan draft, sign-off, then per-task execution with commit approval.
---

# /sprint-plan — Guided sprint planning

This skill drives a five-phase flow: **archetype → environment probe →
intake → draft → sign-off → execute**. Follow it in order. Do not skip
phases; each one assumes the previous one ran.

The supporting assets are:

- `assets/intake-questions.md` — the question sets for each archetype.
- `assets/sprint-template.md` — the structure to write the plan in.
- `assets/env-probe.sh` — read-only environment detection.
- `references/backlog-schema.md` — task-block schema used by
  `docs/BACKLOG.md`; the plan must match it.

Mission context (the *why* behind the site) lives in the repo root
`CLAUDE.md` and in `briefing.md`. Read both before drafting — good
sprint decisions serve the researcher↔policymaker mission, not just the
immediate request.

---

## What makes a good sprint

A sprint is a focused chunk of work with one clear goal and a clear
finish line. The idea comes from a software-planning method called
Scrum; its canonical description lives at scrumguides.org and is short
(around 14 pages) and free. No other skill in this repo teaches these
principles, so apply them explicitly. The seven rules below are the
ones that matter for a small volunteer-run site.

### 1. The site never goes half-broken

Every commit should leave hackersonthehill.github.io in a state where
you could hand the URL to a congressional staffer without blushing. No
menu link pointing at a page that doesn't exist yet. No event card
showing a date that was just deleted from the data file. No
registration button that leads to a 404.

If a change has to land in stages — for example, building a new event
page before linking to it from the homepage — plan the stages so every
intermediate state is still safe to ship. Publish the page first,
*then* link to it, not the other way around.

### 2. One theme per sprint

A good sprint has a goal you can say in one sentence: *"Launch the
Netherlands 2026 event page."* Not two sentences. Not *"and also."* If
the plan covers launching an event AND refreshing the homepage AND
fixing some accessibility issues, that's three sprints, not one — pick
the most important and defer the rest.

### 3. Decide what "finished" looks like before you start

Write it down in the plan's `## Definition of good` section as a
checklist someone else could tick off by looking at the live site:

- *"A page for Netherlands 2026 exists at `/netherlands/`."*
- *"A card for the event appears on the homepage events grid."*
- *"The registration button opens the correct Eventbrite page in a
  new tab."*

Avoid aspirational items like *"page feels modern"* or *"site is
compelling"* — those aren't a finish line, they're opinions, and two
people will disagree on whether they've been met. If you can't write a
concrete checklist, the sprint isn't ready yet. Go back to Phase 2 and
keep asking questions until you can.

### 4. Order tasks so each one is worth shipping on its own

Sprints get interrupted all the time: the organizer gets pulled into
work, the Claude session runs out of room, someone has to travel.
Don't save the most valuable work for the last task — do it first.

Example order for a new event: publish the event page first, then add
the homepage banner, then add the nice-to-haves (speaker photo grid,
a link to last year's archive, venue map, etc.). If the sprint stops
after the first task, the site is still better than it was. If you'd
put the nice-to-haves first, stopping halfway would mean you spent
time without giving visitors anything to click.

### 5. Fewer, finished tasks beat many half-done ones

Three tasks done well is a better sprint than nine tasks left in a
messy state. If the plan feels long, move the less-essential items
into the plan's "Out of scope" section. Those can become a second
sprint later; they don't have to be done now to matter.

### 6. When new work appears, write it down — don't quietly add it in

Halfway through almost any sprint, you'll spot other things worth
doing: *"while we're in here, we should also update the speaker
photos."* Resist. Add those to `docs/BACKLOG.md` or a new plan file,
and keep the current sprint focused on the goal it started with.
Sprints that quietly grow tend to never end — the finish line keeps
moving, and the original goal gets buried.

### 7. "Finished" really means finished, not almost-finished

A task gets marked `✅ Completed` only when its verification step
*actually passes* — the page loads, the link works, the banner shows
correctly on both phones and laptops, and anything else the task's
verification section listed. Saying *"it's mostly working, we'll fix
that last bit later"* and marking it done is the single most damaging
habit on a small site, because those half-finished pieces accumulate
silently and make the whole site feel sloppy over time.

When you notice a small issue while finishing a task, write it down
as a new task (either in this sprint or in `docs/BACKLOG.md`) and
leave the original task open until the real thing genuinely works.
A longer sprint with everything finished is always better than a
shorter sprint with quiet loose ends.

---

**Where to apply these during the workflow:**

- **When drafting the plan (Phase 3):** check rules 2, 3, and 5. If
  any fails — the goal covers more than one theme, the "finished"
  checklist is vague, or the task list is too long — loop back to
  Phase 2 and ask more questions before writing the plan.
- **At sign-off (Phase 4):** re-check rules 1, 3, and 4 before
  accepting. Does the order of tasks make sense if the sprint gets
  interrupted? Is every commit shippable?
- **While executing (Phase 5):** hold to rules 1, 6, and 7 after
  every task. Don't merge in unrelated work; don't mark half-finished
  things as done.

---

## Phase 1 — Archetype

**First action in every invocation.** Call `AskUserQuestion` with the
three archetype options defined in `assets/intake-questions.md` (Phase 1).

- **Content sprint** → use the Phase 2A question set. Most common path;
  usually driven by a local event organizer.
- **Infrastructure sprint** → use the Phase 2B question set.
- **Mixed** → run 2A then 2B and split the plan in Phase 3.

If the user's opening prompt already made the archetype obvious ("add
a Netherlands 2026 page"), confirm your inference with a single
`AskUserQuestion` rather than re-asking from scratch.

---

## Phase 1b — Environment probe

**Run immediately after archetype selection, before any other questions.**

Execute the probe:

```
bash .claude/skills/sprint-plan/assets/env-probe.sh
```

Parse `mode=`:

- `mode=container` → full tooling assumed. Tell the user: *"Running in a
  container — I can preview the site and run any checks I need."* Proceed.
- `mode=host-docker` → host has Docker. Tell the user: *"I'll use
  `docker-compose up` for previewing changes at http://localhost:4000."*
  If `compose_file=no`, also say: *"Note: the repo references
  `docker-compose.yml` in the README but I don't see one checked in. I
  can scaffold a minimal one using the `jekyll/jekyll:latest` image
  that `.github/copilot-instructions.md` recommends — want me to?"*
- `mode=limited` → **warn explicitly** and use `AskUserQuestion` to
  decide next step. Script:

  > I can't find Docker or a container here. That means I can still edit
  > Jekyll source files, but I won't be able to preview the site
  > locally, run a build, or check links before Netlify deploys your
  > branch. This usually happens when Claude Code is running on mobile
  > or a restricted environment.
  >
  > Three options:
  > 1. **Pause** so you can install Docker (or move to a machine with
  >    it) and come back.
  > 2. **Continue code-only** — I'll make edits, you'll verify by
  >    looking at the Netlify branch preview after each push.
  > 3. **Abort.**

  Record the user's choice in the plan's `## Environment` section. Do
  not assume any option; ask.

**Do not attempt to install Docker, Ruby, or bundler** on the host. The
fallback is explicit warning + user choice, never silent setup.

---

## Phase 2 — Intake & clarification

Walk the user through the question set for their archetype from
`assets/intake-questions.md`. Batch questions (max 4 per
`AskUserQuestion` call). Skip anything already answered in the opening
prompt — don't ask the user to repeat themselves.

After each batch, summarize what you heard in plain prose before asking
the next batch.

When all questions are answered, play it all back in the format at the
bottom of `assets/intake-questions.md` ("Here's what I heard …") and
wait for confirmation or corrections before moving to Phase 3.

---

## Phase 3 — Research & draft

Before drafting, explore the codebase to ground the plan in actual
patterns and file paths. For content sprints, look at one existing
event (e.g., `_data/events/colorado-2026.yml` + `colorado.md`) as a
model. For infrastructure sprints, read the relevant files in
`_layouts/` / `_includes/` / `assets/` first.

For open-ended research across the repo, use the `Explore` subagent
rather than many small `Grep`/`Read` calls.

Draft the plan to `.claude/plans/<kebab-case-slug>.md` using
`assets/sprint-template.md` as the structure and the task schema in
`references/backlog-schema.md` for every `### Task N.M` block.

Slug guidance: short, descriptive, kebab-case, no dates
(e.g., `netherlands-2026-launch`, `css-modularize`,
`newsletter-footer`). The existing reference in
`docs/BACKLOG.md:15` uses two-word slugs — match that register.

---

## Phase 4 — Sign-off

Present a brief summary of the plan (Goal, task count, environment, any
caveats) and ask the user to approve.

- If invoked from plan mode: call `ExitPlanMode` — that tool is the
  sign-off.
- If invoked mid-session (not in plan mode): call `AskUserQuestion`
  with options **Approve / Revise / Abort**.

On **Revise**, ask what to change and loop back to Phase 2 or Phase 3
as appropriate. Preserve the plan file; update its `## Revision log`
section with what changed.

On **Approve**:
1. Flip the plan's `**Status:**` metadata line from `Draft` to
   `Approved`.
2. Edit `docs/BACKLOG.md`: under the `## 🎯 CURRENT SPRINT` heading,
   add a one-line link to the plan file. Do not re-sort or reformat
   existing entries — minimal edit, additive only.
3. Tell the user you're moving into execution.

---

## Phase 5 — Execute

Use `TodoWrite` to mirror the plan's task list. Exactly one task
`in_progress` at a time.

For each task:

1. Make the edits via `Edit` / `Write`.
2. If `mode=container` or `mode=host-docker`: start `docker-compose up`
   in the background and verify the affected page at
   http://localhost:4000. Kill the server when you're done verifying.
   If `mode=limited`: skip this step and note in the commit message
   what the user should check on the Netlify branch preview.
3. **Propose the commit — do not commit yet.** Show the staged file
   list and a draft commit message. Call `AskUserQuestion` with
   options **Commit / Amend message / Skip commit / Abort sprint**.
4. On **Commit**: run `git add <specific files>` (never `git add -A`)
   and `git commit`. Never use `--no-verify` or `--amend` to a
   previously published commit.
5. Update the task's `**Status:**` in the plan file to
   `✅ Completed (YYYY-MM-DD)`.
6. Move to the next task.

If the user says **Skip commit** for a task, continue editing but keep
the task open until a later commit covers it. If they say **Abort
sprint**, stop execution, leave changes uncommitted, and tell them the
plan file records where things stopped.

---

## Close-out

When the last task is complete:

1. Append a Revision History entry to the bottom of `docs/BACKLOG.md`
   in the format shown at `references/backlog-schema.md` ("Close-out
   entry for BACKLOG.md"). Match the 2026-01-12 entry's shape.
2. Flip the plan's `**Status:**` to `Completed` and add a final line
   to its `## Revision log`.
3. Remind the user: *"Push when you're ready — I've left that step to
   you."* Do not push without explicit instruction.

---

## What this skill does not do

- Does not install Docker, Ruby, or bundler. Warn + ask instead.
- Does not commit without approval. Every commit is a user decision.
- Does not push. The user pushes when they're ready.
- Does not skip pre-commit hooks. If a hook fails, investigate the
  root cause and fix it, then make a new commit.
- Does not duplicate `.github/copilot-instructions.md`. Follow those
  conventions; don't restate them in the plan.
- Does not invent new abstractions or frameworks. Reuse existing
  patterns from `_layouts/` and `assets/css/main.css`.
