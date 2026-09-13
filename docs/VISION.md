# Vision — npm-winccoa-install-info

## Why this exists

Engineers, scripts, and CI need a **simple, scriptable answer** to:

- Which WinCC OA **versions** are installed on this machine, and where?
- Which **projects** are currently registered, and are they runnable?

Library-level discovery already lives in `@winccoa-tools-pack/npm-winccoa-core`
(`getAvailableWinCCOAVersions`, `getWinCCOAInstallationPathByVersion`,
`getRegisteredProjects`, `getRegisteredProducts`, and related helpers).

This package is the **CLI and machine-readable view** of that information—
not a second installation- or registry-detection stack.

## Vision statement

Be the small, reliable command-line companion for WinCC OA **installation and
project-registration awareness**: fast to run, safe to script, boring in the
best way. Prefer stable JSON for automation; keep human output secondary.

## In scope

### Installations (products)

- List installed / registered WinCC OA versions (stable order)
- Resolve installation root/path for a given version
- Optional detail: known components/executables for a version (via core)

### Registered projects

- List **all currently registered projects** as a **JSON array** (primary
  automation output)
- Each project entry should include at least:
  - project id / name (when available)
  - **runnable** vs **not-runnable** (from registry `notRunnable` / equivalent)
  - **installation path** (project directory)
  - **WinCC OA version** associated with the project (registry and/or config
    fallback as core already models)
- Useful extras when cheap to obtain from core/registry: description, company,
  whether it is the current project, invalid reason if not runnable

### Cross-cutting

- Machine-readable output (JSON) for CI and other tools; consistent exit codes
- Simulation/override hooks for tests on hosts without WinCC OA (aligned with
  patterns used elsewhere, e.g. register-project)
- Cross-platform behavior aligned with core (Windows primary; others as core
  supports)

## Example shapes (illustrative)

```text
winccoa-install-info versions --json
winccoa-install-info projects --json
```

```json
[
  {
    "id": "MyPlant",
    "name": "MyPlant",
    "runnable": true,
    "installationPath": "D:/WinCC_OA_Proj/MyPlant",
    "winccOaVersion": "3.20",
    "currentProject": false
  }
]
```

Exact field names may follow core’s registry types; the CLI should document a
stable public JSON schema.

## Out of scope

- Reimplementing path/registry discovery (use core)
- Project register / unregister / start / stop (see
  `npm-winccoa-register-project` and higher-level project APIs in core)
- Panel/PNL/XML conversion or UI tooling
- Replacing VS Code project/extension UX (extensions should call core or this
  CLI from terminals/tasks)

## Relationship to the ecosystem

| Package | Role |
|---------|------|
| `npm-winccoa-core` | Source of truth for install, version, component, and project-registry APIs |
| `npm-winccoa-install-info` | CLI (+ thin helpers) for install and registered-project introspection |
| `npm-winccoa-register-project` | Mutating registration workflows; may *use* version lists |
| VS Code extensions | Prefer core APIs; may shell out to this CLI in terminals/tasks |

## Success looks like

- A global/`npx` CLI answers “what’s installed?” and “what’s registered?” in
  seconds
- `projects --json` returns a list suitable for scripts without scraping text
- Each project JSON item always carries runnable flag, installation path, and
  WinCC OA version when the host registry/config provides them
- Zero duplicated detection logic vs core
- Docs make the core vs CLI split obvious so we do not create a third package
  later

## Non-goals / decision checkpoint

If the only need is programmatic access inside Node apps, **prefer core** and
keep this package a thin bin.

If this CLI never grows beyond wrapping a handful of core getters, consider
folding the bin into core (or documenting core-only usage) rather than
maintaining a hollow package.
