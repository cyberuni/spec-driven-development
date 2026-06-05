# Design: Documentation GitHub Pages Site

**Date:** 2026-06-04
**Status:** Approved

## Overview

Add a documentation site at `apps/web` using Astro + Starlight, served via GitHub Pages. The site targets two equal audiences: developers installing this plugin (skills reference) and teams evaluating SDD (methodology guide). Content is separately authored — not auto-synced from `skills/` — to allow human-readable prose.

## Repo Structure

```
spec-driven-development/
├── package.json               # root workspace config (npm workspaces + turbo)
├── turbo.json                 # Turborepo pipeline
├── apps/
│   └── web/                   # Astro + Starlight site
│       ├── package.json
│       ├── astro.config.mjs
│       └── src/
│           └── content/
│               └── docs/
│                   ├── index.mdx
│                   ├── methodology/
│                   │   ├── overview.md
│                   │   ├── spec-lifecycle.md
│                   │   └── principles.md
│                   └── skills/
│                       ├── create-spec.md
│                       └── validate-spec.md
├── skills/                    # unchanged
├── governances/               # unchanged
└── .github/
    └── workflows/
        └── deploy-docs.yml    # GitHub Actions → gh-pages
```

## Navigation & Content

**Sidebar sections:**

- **Methodology**
  - Overview — what SDD is, the co-delivery model
  - Spec Lifecycle — Draft → Approved → Implemented → Deprecated
  - Principles — sourced from `governances/sdd-principles.md`
- **Skills Reference**
  - create-spec — what it does, when to trigger, what it produces
  - validate-spec — what it checks, how to run it, what passing means

**Landing page** (`index.mdx`): hero intro, what the plugin is, who it's for, quick install snippet, links into both sections.

## Monorepo Setup

- Root `package.json` uses npm workspaces: `["apps/*"]`, with `turbo` as devDependency
- Scripts at root: `build` and `dev` delegated via Turborepo
- `turbo.json` pipeline: `build` depends on `^build`, outputs `dist/**`

## Deployment

- Trigger: push to `main` with path filter `apps/web/**` or `skills/**`
- Build: `npx turbo run build --filter=web`
- Deploy: `withastro/action` pushes `apps/web/dist/` to `gh-pages` branch
- GitHub Pages serves from `gh-pages` branch
- `astro.config.mjs` sets `base: '/spec-driven-development'` for correct asset paths
