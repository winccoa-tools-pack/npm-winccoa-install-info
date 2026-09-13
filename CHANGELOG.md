# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - Unreleased

### Added

- Initial install-info product identity (`@winccoa-tools-pack/npm-winccoa-install-info`)
- CLI bin `winccoa-install-info` with `versions` and `projects` commands
- Default JSON output (`--json`); optional `--no-json` human table
- Thin library helpers `listVersions`, `listProjects`, `mapRegistryToInstallInfoProject`
- Unit and integration tests for parseArgs, registry mapping, and `--help`
- Package vision in `docs/VISION.md`

### Notes

- Discovery is delegated entirely to `@winccoa-tools-pack/npm-winccoa-core`
- Replaces leftover template PNL/XML scaffold in this repository
