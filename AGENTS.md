# AGENTS.md

This file provides guidance to AI coding assistants when working with code in this repository.

## Repository overview

`spec-driven-development` is a Claude Code plugin that ships skills and governances for co-delivering behavioral specs alongside implementation. It is a **skill repo** (plugin bundle archetype).

- `plugin.json` — Claude Code plugin manifest; skills loaded from `./skills/`
- `skills/` — public skills shipped to consumers
- `governances/` — version-pinned governance docs loadable via `governance show`
- `specs/` — the repo's own behavioral specs (dogfooding SDD)
- `adrs/` — Architecture Decision Records for design choices
- `.research/` — research artifacts; not loaded by agents unless explicitly requested

## Skills

| Skill | Trigger | Purpose |
|---|---|---|
| `create-spec` | "create spec for X", "write spec" | Scaffold `spec.md` + `.feature` for a new domain |
| `validate-spec` | "validate spec", "check spec" | Check spec completeness and SDD compliance |

Both skills live in `skills/<name>/SKILL.md`. When modifying a skill, do not change its `name` frontmatter field — it must match the directory name.

## Spec lifecycle

Specs live in `specs/<domain>/spec.md`. Valid statuses: `Draft` → `Approved` → `Implemented` → `Deprecated`. Never mark a spec `Implemented` unless passing tests exist for all scenarios.

Core file pair: `spec.md` (what) + `plan.md` (how). A `.feature` file provides executable Gherkin scenarios when needed. See `adrs/001-spec-plan-file-naming.md` for the naming decision.

## Governances

Governance docs are in `governances/`. Load on demand — do not paste their full bodies into AGENTS.md.

```bash
npx cyber-skills@0.7.0 governance show sdd-principles
npx cyber-skills@0.7.0 governance show spec-template
```

## Validation

```bash
npx cyber-skills@0.7.0 audit validate
```

Run on any PR that touches `skills/`. No other build system is present.

## Commit Discipline

**Auto-commit rule:** When a unit of work is complete and verified, commit it immediately — do not wait for the user to ask. Batching multiple units into one commit, or finishing all work before committing, are both violations of this rule.

**Unit of work:** one coherent, independently revertable change — one domain's refactor, one feature, one bugfix, one test suite expansion for one concern, one config change. Never two unrelated concerns in the same commit. A TDD red-green-refactor cycle alone is not a commit boundary; commit when the full intended change is complete and tests pass. If the working tree has unrelated changes, leave them unstaged — commit the current unit first, then continue.

- Conventional Commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`
- One concern per commit; never batch unrelated changes
- Stage only files for this unit: `git add <files>`, then verify with `git diff --cached`
- Never use `git add .`, `git add -A`, or `git add -p` (interactive commands agents cannot run)
- Never commit with red tests; run validation commands first

### References

- **`commit-work` skill** — staging, splitting, and message writing when committing
