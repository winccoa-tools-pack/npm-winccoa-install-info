# npm-winccoa-install-info

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
winccoa-install-info versions [--json|--no-json]
winccoa-install-info projects [--json|--no-json]
```

JSON is the default (best for scripts/CI). Use `--no-json` for a simple TSV table.

### Examples

```shell
winccoa-install-info versions --json
winccoa-install-info projects --json
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
