---
name: validate-spec
description: Check a spec.md and .feature file for completeness, consistency, and adherence to SDD principles. Use before approving a spec or marking it Implemented.
triggers:
  - "validate spec"
  - "check spec"
  - "review spec"
  - "is this spec complete"
---

# validate-spec

Check a spec for completeness, internal consistency, and adherence to SDD principles.

## When to use

- Before changing a spec's status from Draft → Approved
- Before changing a spec's status from Approved → Implemented
- When asked to review a spec

## Checklist

Run each check and report findings. Fix issues inline if possible; flag for human review if not.

### Required sections

- [ ] `Status` field present and valid (Draft / Approved / Implemented / Deprecated)
- [ ] `What` section present and non-empty
- [ ] `Why` section present and non-empty — "Why" is never optional
- [ ] `Command surface / API` section present (or explicitly noted as N/A with justification)
- [ ] Link to `.feature` file present
- [ ] `.feature` file exists at the linked path

### Content quality

- [ ] `What` describes observable behavior, not implementation internals
- [ ] `Why` explains the problem, not just restates the What
- [ ] `Design decisions` section present if any non-obvious choices were made
- [ ] No placeholder text ("TBD", "TODO", "...", empty sections)
- [ ] No contradictions between sections

### .feature file quality

- [ ] At least one happy-path scenario per operation in the command surface
- [ ] At least one error-case scenario per operation
- [ ] Scenarios use BDD language (Given/When/Then)
- [ ] Scenarios describe observable behavior only (no internal state references)
- [ ] `--json` scenarios present if the command supports `--json`

### Status consistency

- [ ] If status is `Implemented`: confirm passing tests exist that correspond to the scenarios
- [ ] If status is `Approved`: confirm the spec has been reviewed (PR approval or recorded acknowledgment)
- [ ] If status is `Draft`: no implementation exists yet (or backfill is in progress)

## Output

Report:
- PASS / FAIL per check
- Summary: how many checks passed, how many failed
- List of required fixes before the spec can advance to the next status
