/**
 * @winccoa-tools-pack/npm-winccoa-install-info
 *
 * Thin CLI and helpers for WinCC OA installation and registered-project introspection.
 * Detection lives in @winccoa-tools-pack/npm-winccoa-core.
 */

export type { InstallInfoVersion, InstallInfoProject } from './types';
export { listVersions, listProjects, mapRegistryToInstallInfoProject } from './api';
