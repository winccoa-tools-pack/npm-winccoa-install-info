# Git Flow (this package)

Branching, releases, hotfixes, and PR guardrails are **org-standard**, not
package-specific. Prefer the APM skill over a second long copy of the template
doc.

## Source of truth

| Topic | Where |
| ----- | ----- |
| Branch model, release/hotfix | APM skill **`git-flow`** (after `apm install`: `.github/skills/git-flow/SKILL.md`, or `apm_modules/.../git-flow`) |
| Conventional commit PR titles | APM skill **`conventional-commits`** |
| Version bumps / SemVer | APM skill **`versioning`** |
| Changelog | APM skill **`changelog`** / **`clear-changelog`** |
| Workflows in this repo | `.github/workflows/` (`gitflow*.yml`, `create-release-branch.yml`, `pre-release.yml`, `release*.yml`) |
| Rulesets / settings | `.github/rulesets/`, `.github/repository.settings.yml` |

## Install skills

```shell
apm install
```

Dependencies are declared in `apm.yml` (`winccoa-tools-pack/apm-org`,
`winccoa-tools-pack/apm-npm-package`).

## Quick branch map

| Branch | Target PR base |
| ------ | -------------- |
| `feature/*`, `bugfix/*` | `develop` |
| `release/v*`, `hotfix/v*` | `main` (create via Actions → **Create Release Branch + PR**) |

Do **not** hand-create release/hotfix branches; use the workflow. Details and
edge cases live in the **`git-flow`** skill.
<!-- markdownlint-disable MD033 -->
<div align="center">Made with ❤️ for and by the WinCC OA community</div>
