---
name: create-spec
description: Scaffold a spec.md and .feature file for a new domain. Use when starting a new feature or command group that needs a spec before implementation begins.
triggers:
  - "create spec for"
  - "add spec"
  - "spec for new domain"
  - "write spec"
---

# create-spec

Scaffold `specs/<domain>/spec.md` and `specs/<domain>/<domain>.feature` for a new or existing domain.

## When to use

- Starting a new feature or command group
- Backfilling a spec for an existing domain that has no spec yet (reverse: infer from code + tests)
- Requested explicitly: "create spec for X"

## Process

### 1. Identify the domain

Ask for or infer the domain name. The domain name should match the implementation folder (screaming architecture: `src/governance/`, `src/build/`).

If the domain already exists in `specs/`, confirm whether this is a backfill or a new feature before proceeding.

### 2. Gather content

For a **new feature**: ask the user for What, Why, and the command surface. Do not scaffold until you have at least a draft answer for each.

For a **backfill** (implementation exists): read the existing source files and tests to infer What, Why (from comments, PR descriptions, commit messages), design decisions (from code structure), and command surface (from CLI adapter). Present the inferred content and ask the user to review before writing.

### 3. Write spec.md

Use the `spec-template` governance as the template (`uni-plugin governance show spec-template`).

Fill in:
- Status: `Draft`
- What: observable behavior
- Why: the problem solved
- Design decisions: non-obvious choices (omit section if none)
- Command surface: CLI syntax or API signature
- Link to `.feature` file

### 4. Write <domain>.feature

Scenarios must cover:
- Happy path for each operation
- Primary error cases (not-found, invalid input)
- `--json` output if the command supports it

Use BDD language. Do not reference internal state or function names.

### 5. Update specs/README.md

Add the new domain to the command surface table and domain index. If `specs/README.md` does not exist, create it.

### 6. Validate

Run `validate-spec` on the new spec before committing.

### 7. Commit

Commit with:
```
docs(specs): add <domain> spec
```
