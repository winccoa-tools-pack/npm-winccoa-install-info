# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
