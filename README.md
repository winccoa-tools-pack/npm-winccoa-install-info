# npm-winccoa-install-info

<!-- markdownlint-disable MD033 -->
<div align="center">

[![npm version](https://img.shields.io/npm/v/@winccoa-tools-pack/npm-winccoa-install-info.svg?label=npm)](https://www.npmjs.com/package/@winccoa-tools-pack/npm-winccoa-install-info)
![License](https://img.shields.io/github/license/winccoa-tools-pack/npm-winccoa-install-info)
[![CI/CD](https://github.com/winccoa-tools-pack/npm-winccoa-install-info/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/winccoa-tools-pack/npm-winccoa-install-info/actions/workflows/ci-cd.yml)
[![Release](https://github.com/winccoa-tools-pack/npm-winccoa-install-info/actions/workflows/release.yml/badge.svg)](https://github.com/winccoa-tools-pack/npm-winccoa-install-info/actions/workflows/release.yml)

</div>

CLI (and thin library helpers) for **WinCC OA installation and registered-project
introspection**.

Detection of installed versions and the project registry lives in
[`@winccoa-tools-pack/npm-winccoa-core`](https://github.com/winccoa-tools-pack/npm-winccoa-core).
This package is a small, scriptable facade — not a second discovery stack.

See [docs/VISION.md](docs/VISION.md) for scope and JSON shapes.

## Install

```shell
npm install -g @winccoa-tools-pack/npm-winccoa-install-info
```

Or run without a global install:

```shell
npx @winccoa-tools-pack/npm-winccoa-install-info --help
```

## CLI

```text
winccoa-install-info versions [--json|--no-json] [--result-file <path>]
winccoa-install-info projects [--json|--no-json] [--result-file <path>]
```

JSON is the default (best for scripts/CI). Use `--no-json` for a simple TSV table.

Core may print diagnostic logs to the console. For automation, prefer
`--result-file` so the clean payload is written to a file (stdout is not used
for the payload in that mode).

### Examples

```shell
winccoa-install-info versions --json
winccoa-install-info projects --json
winccoa-install-info projects --result-file projects.json
winccoa-install-info versions --no-json --result-file versions.txt
```

Example `projects` item:

```json
{
  "id": "MyPlant",
  "name": "MyPlant",
  "runnable": true,
  "installationPath": "D:/WinCC_OA_Proj/MyPlant",
  "winccOaVersion": "3.20",
  "currentProject": false
}
```

Optional fields when present in the registry: `company`, `description`,
`invalidReason`.

### Exit codes

| Code | Meaning |
| ------ | --------- |
| 0 | Success |
| 1 | Usage / help |
| 2 | Runtime failure |

## Library

```ts
import {
  listVersions,
  listProjects,
} from '@winccoa-tools-pack/npm-winccoa-install-info';

const versions = listVersions();
const projects = listProjects();
```

For programmatic access inside Node apps, prefer core APIs directly when you
do not need the CLI.

## Related packages

| Package | Role |
| --------- | ------ |
| `npm-winccoa-core` | Install, version, component, and project-registry APIs |
| `npm-winccoa-install-info` | This CLI (+ thin helpers) |
| `npm-winccoa-register-project` | Register / unregister projects |

## Development

```shell
npm ci
npm run build
npm run test:unit
npm run test:integration
```

Requires Node.js 20+.

### Try the CLI against your machine

After a build, run the compiled entry (no global install needed):

```shell
node dist/cjs/cli.js --help
node dist/cjs/cli.js versions
node dist/cjs/cli.js projects
node dist/cjs/cli.js versions --no-json
```

Optional: `npm link` so `winccoa-install-info` is on your PATH, or use
`npx tsx src/cli.ts …` without rebuilding.

Full contributor workflow (link/unlink, exit codes, empty-host behavior):
see [CONTRIBUTING.md](CONTRIBUTING.md#test-the-cli-locally).

## Docs index

| Doc | Contents |
| --- | -------- |
| [docs/VISION.md](docs/VISION.md) | Product scope |
| [docs/automation/CI-INTEGRATION.md](docs/automation/CI-INTEGRATION.md) | Package CI knobs; workflows are source of truth |
| [docs/automation/GITFLOW_WORKFLOW.md](docs/automation/GITFLOW_WORKFLOW.md) | Short pointers to APM **`git-flow`** / related skills |

Org process lives in APM skills (`apm install` → `.github/skills/`), not duplicated long template docs.

<!-- markdownlint-disable MD033 -->
<div align="center">Made with ❤️ for and by the WinCC OA community</div>
