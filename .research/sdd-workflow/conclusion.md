# Conclusion: SDD Workflow — Artifact-Anchored Model

## Last updated

June 2026

## Question

What is the proper SDD workflow, modeled with artifacts as the explicit input and output of each step?

## Verdict

The SDD workflow is a **two-mode model with a single gate**, not a linear pipeline. All artifacts (`spec.md`, `.feature`, `plan.md`, `tasks.md`, code + tests) can exist in either mode, in any order. What changes across modes is the **validation bar**, not which artifacts exist or the order they were created.

**Exploration mode** (before `spec.md → Approved`): artifacts co-evolve freely. Code may be unit-level and mock-heavy. Scenarios are being discovered. Plan and tasks may be rough. Primary goal: rapid understanding + identify all test cases.

**Implementation mode** (after `spec.md → Approved`): all artifacts must be at implementation quality before the MR is merged. `.feature` scenarios are frozen. Code requires full scenario coverage at boundary level. Exploration artifacts are either reused as-is or serve as source material for rewriting.

The **single gate** is `spec.md → Approved`. This is enforced by `validate-spec` + peer review. There is no equivalent gate for `plan.md` or `tasks.md` — they are strategy artifacts, not contracts.

## Confidence

**High** — derived from iterative refinement with project author, cross-validated against tool research in [[spec-driven-development]] and [[sdd-file-templates]].

## Strongest supporting evidence

- All major SDD tools converge on the same artifact set (spec/requirements + plan/design + tasks); the two-mode model explains why artifacts appear at different quality levels across tool examples.
- The XP spike concept independently validates exploration-mode code: same practice, established prior art.
- Author confirmed: exploration code and implementation code can be the same code; the bar rises, the code does not swap.

## Strongest weakening or contradictory evidence

- `specs/spec.md:104` in this repo states "Implementation begins only after Approved" — directly contradicts the two-mode model. This is a known doc error requiring a fix.
- No external SDD tool explicitly names the two-mode distinction; the framing is synthesized from tool behavior and author input. May not match how other practitioners describe the same phenomenon.

## What is not supported

- The two-mode model does not prescribe an ordering for artifact creation during exploration — that is intentional, not a gap.
- `plan.md` deliberately has no `Draft → Approved` lifecycle. This is not an oversight.

## Where evidence is thin

Three plugin design requirements emerged but are not yet resolved:

1. **Project-level quality configuration** — how projects declare their implementation-quality thresholds for `verify-implementation` to consume. Design open.
2. **Agent definition rule for `.feature` freeze** — the agent governance rule that prevents `.feature` edits after `spec.md → Approved`. Not yet written.
3. **Gap analysis in backfill** — the step in the `create-spec` backfill path that places existing code in the correct mode and seeds `tasks.md`. Design open.

## Skill map

| Step | Skill | Status |
|---|---|---|
| Specify | `create-spec` | Exists |
| Validate spec (Draft → Approved) | `validate-spec` | Exists |
| Plan | `plan-spec` | Missing |
| Break down tasks | `create-tasks` | Missing |
| Verify implementation (Approved → Implemented) | `verify-implementation` | Missing |

## Check again later

- Project-level quality config design (open question 1)
- Agent definition `.feature` freeze rule (open question 2)
- Gap analysis step in backfill (open question 3)
- Whether `plan-spec` and `create-tasks` should be a single combined skill or two separate ones
