# CLAUDE.md

Guidance for Claude Code working in this repo. Short on purpose — read
`.github/copilot-instructions.md` for detailed style / CSS / JS
conventions, and `briefing.md` for the full mission context.

## What this site is for

Hackers on the Hill connects security researchers directly with
policymakers so legislation is shaped by people who see real-world
consequences firsthand. Running since 2017 (global since 2024: DC,
Ottawa, London, Colorado, Netherlands), it's an all-volunteer initiative
of I Am The Cavalry — non-commercial, no lobbying, no vendor pitches.
Tagline: *Technical Truth Meets Policy Power.*

This is important context when making judgment calls. The site is a
low-friction introduction for congressional and parliamentary offices, an
announcement and registration hub for upcoming events, a credible archive
of past work (PATCH Act, California SB-327, ETSI EN 303 645), and a
recruitment touchpoint for researchers. Favor clarity and trust over
cleverness or polish.

## Two kinds of change

Most edits here are one of two shapes:

- **Content** — adding or updating an event (date, location, speakers,
  banner, archive). Usually driven by a local event organizer who owns
  the content but isn't a web developer. Touches `_data/events/*.yml`,
  region `.md` files, `_data/pages/index.yml`, `_data/banners.yml`,
  `_data/archives.yml`, and `archives/`.
- **Infrastructure** — site-wide structure, layouts, CSS, JS, data
  model, analytics, build. Usually driven by the maintainer. Touches
  `_layouts/`, `_includes/`, `assets/`, `_config.yml`, `docs/`,
  `.github/`.

The `/sprint-plan` skill asks which one applies up front, then walks
the user through a tailored intake, drafts a plan, waits for sign-off,
and executes with per-commit approval. Use it whenever the user wants
to plan and execute a sprint. Plans land in `.claude/plans/` and are
linked from `docs/BACKLOG.md`.

## Dev environment

Preferred: `docker-compose up` → http://localhost:4000 (Jekyll image).
Never install Ruby locally. If Docker isn't available (e.g., mobile /
web Claude Code), the sprint-plan skill surfaces that explicitly and
asks how the user wants to proceed — don't silently skip preview steps.

## Commit policy

Propose each commit and wait for approval. Don't auto-commit, don't use
`--no-verify`, don't amend published commits, and don't push without
being asked.

## Tone for any copy you draft

Match `briefing.md`: plain-language, evidence-led, no vendor-speak, no
hype. The Cavalry motto — *"The Cavalry isn't coming. It falls to us.
Safer. Sooner. Together."* — sets the register.

## Don't

- Don't duplicate `.github/copilot-instructions.md` here; point to it.
- Don't introduce new frameworks, build tooling, or npm packages.
- Don't remove `CNAME`.
- Don't edit `assets/vendor/` unless explicitly upgrading a vendor lib.
