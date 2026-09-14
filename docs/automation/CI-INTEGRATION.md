# CI + integration (this package)

Full pipeline behavior is defined by the workflows under `.github/workflows/`,
not by a long narrative doc. This page keeps only **package-local** notes.

## Workflows (source of truth)

| Workflow | Role |
| -------- | ---- |
| `.github/workflows/ci-cd.yml` | Lint, format, unit tests; optional WinCC OA Docker integration job |
| Other `.github/workflows/*` | Git Flow, release, labels, settings (see [GITFLOW_WORKFLOW.md](./GITFLOW_WORKFLOW.md)) |

## Local / agent guidance

- Contributor CLI smoke tests: [CONTRIBUTING.md](../../CONTRIBUTING.md)
- Product scope: [docs/VISION.md](../VISION.md)
- APM: `apm install` then org/npm skills under `.github/skills/` (e.g. **`git-flow`**, **`versioning`**)

There is no dedicated “CI” APM skill yet; treat **workflow YAML** + **package
scripts** as canonical.

## This package’s CI knobs

| Item | Value / notes |
| ---- | ------------- |
| Unit | `npm run test:unit` |
| Integration | `npm run test:integration` / `npm run ci:integration` |
| Docker image hint | `package.json` → `config.winccoaImage` (overridable by repo variable `WINCCOA_IMAGE`) |
| Private image pull (optional) | secrets `DOCKER_USER`, `DOCKER_PASSWORD` |

Integration job is effectively a no-op until an image is configured.

## CLI in automation

Core may log to the console. Prefer a clean artifact:

```shell
node dist/cjs/cli.js projects --result-file projects.json
node dist/cjs/cli.js versions --result-file versions.json
```

Exit codes: `0` ok, `1` usage/help, `2` failure. See README.
<!-- markdownlint-disable MD033 -->
<div align="center">Made with ❤️ for and by the WinCC OA community</div>
