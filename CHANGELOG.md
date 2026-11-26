# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.2] - 2026-11-26

### Added

- add --result-file option for output redirection
- replace template with install-info CLI over core

### Fixed

- resolve katex and js-yaml security alerts in dev dependencies (#61)
- use client-id instead of the deprecated app-id for the bot token (#55)
- ignore TypeScript 7 and ESLint 10 updates until the lint tooling supports them (#52)

### Changed

- replace the old Pre-Release (Develop) workflow with the Pre-Release (Alpha) variant (#57)
- align .github files and scripts with the template (#58)
- prefer REPO_ADMIN_TOKEN over the bot app token for merges and branch updates (#56)
- deps-dev(deps-dev): bump typescript from 5.9.3 to 6.0.3 (#48)
- use the winccoa-tools-pack-bot app token for automated PR actions (#53)
- deps-dev(deps-dev): bump markdownlint-cli from 0.50.0 to 0.50.1 (#54)
- run integration tests manually and warn on limited test coverage (#50)
- auto-release patch and minor releases (#49)
- align .github with template-npm-shared-library (#47)
- deps-dev(deps-dev): bump markdownlint from 0.42.1 to 0.42.2 (#42)
- deps-dev(deps-dev): bump typescript-eslint from 8.72.2 to 8.73.0 (#43)
- deps-dev(deps-dev): bump markdownlint from 0.42.0 to 0.42.1 (#41)
- deps-dev(deps-dev): bump typescript-eslint from 8.72.1 to 8.72.2 (#40)
- deps-dev(deps-dev): bump prettier (#39)
- deps-dev(deps-dev): bump globals from 17.13.0 to 17.14.0 (#37)
- deps-dev(deps-dev): bump typescript-eslint from 8.72.0 to 8.72.1 (#36)
- deps-dev(deps-dev): bump markdownlint-cli from 0.49.1 to 0.50.0 (#35)
- deps-dev(deps-dev): bump @types/node (#34)
- deps-dev(deps-dev): bump typescript-eslint from 8.71.2 to 8.72.0 (#33)
- deps-dev(deps-dev): bump markdown-it from 14.3.1 to 14.3.3 (#31)
- deps-dev(deps-dev): bump markdownlint from 0.41.1 to 0.42.0 (#29)
- deps-dev(deps-dev): bump typescript-eslint from 8.71.1 to 8.71.2 (#30)
- deps-dev(deps-dev): bump prettier (#28)
- deps-dev(deps-dev): bump @types/node (#25)
- deps-dev(deps-dev): bump typescript-eslint from 8.71.0 to 8.71.1 (#26)
- deps-dev(deps-dev): bump typescript-eslint from 8.70.1 to 8.71.0 (#23)
- deps-dev(deps-dev): bump globals from 17.12.0 to 17.13.0 (#22)
- deps-dev(deps-dev): bump brace-expansion from 1.1.18 to 1.1.21 (#24)
- deps-dev(deps-dev): bump @types/node (#21)
- deps-dev(deps-dev): bump tsx from 4.23.13 to 4.23.15 (#18)
- deps-dev(deps-dev): bump typescript-eslint from 8.70.0 to 8.70.1 (#20)
- deps-dev(deps-dev): bump prettier (#17)
- deps-dev(deps-dev): bump @types/node in the testing group (#16)
- deps-dev(deps-dev): bump prettier (#15)
- deps-dev(deps-dev): bump @types/node in the testing group (#14)
- bump actions/upload-artifact from 6 to 7 (#1)
- deps-dev(deps-dev): bump @types/node (#2)
- deps-dev(deps-dev): bump typescript-eslint from 8.69.0 to 8.70.0 (#10)
- deps-dev(deps-dev): bump globals from 17.11.0 to 17.12.0 (#3)
- format
- format and lint
- add package vision for install-info CLI

## [0.1.1] - 2026-09-14

### Added

- add --result-file option for output redirection
- replace template with install-info CLI over core

### Changed

- bump actions/upload-artifact from 6 to 7 (#1)
- deps-dev(deps-dev): bump @types/node (#2)
- deps-dev(deps-dev): bump typescript-eslint from 8.69.0 to 8.70.0 (#10)
- deps-dev(deps-dev): bump globals from 17.11.0 to 17.12.0 (#3)
- format
- format and lint
- add package vision for install-info CLI

## [0.1.0] - Unreleased

### Added

- Initial install-info product identity (`@winccoa-tools-pack/npm-winccoa-install-info`)
- CLI bin `winccoa-install-info` with `versions` and `projects` commands
- Default JSON output (`--json`); optional `--no-json` human table
- `--result-file <path>` to write the clean payload to a file (avoids core console noise on stdout)
- CLI stops core `pvssInst.conf` file watcher so one-shot runs exit cleanly
- Thin library helpers `listVersions`, `listProjects`, `mapRegistryToInstallInfoProject`
- Unit and integration tests for parseArgs, registry mapping, and `--help`
- Package vision in `docs/VISION.md`
- Local CLI testing notes in README / CONTRIBUTING

### Notes

- Discovery is delegated entirely to `@winccoa-tools-pack/npm-winccoa-core`
- Replaces leftover template PNL/XML scaffold in this repository
