/**
 * Thin library API over @winccoa-tools-pack/npm-winccoa-core.
 * Discovery logic stays in core; this package only maps results.
 */

import {
    getAvailableWinCCOAVersions,
    getWinCCOAInstallationPathByVersion,
} from '@winccoa-tools-pack/npm-winccoa-core';
import { getRegisteredProjects as getProjectRegistries } from '@winccoa-tools-pack/npm-winccoa-core/types/project/ProjEnvProjectRegistry';
import type { ProjEnvProjectRegistry } from '@winccoa-tools-pack/npm-winccoa-core/types/project/ProjEnvProjectRegistry';

import type { InstallInfoProject, InstallInfoVersion } from './types';

/**
 * List installed WinCC OA versions with installation paths (core discovery).
 */
export function listVersions(): InstallInfoVersion[] {
    const versions = getAvailableWinCCOAVersions();
    return versions.map((version) => ({
        version,
        installationPath: getWinCCOAInstallationPathByVersion(version),
    }));
}

/**
 * Map a core registry entry to the stable public CLI/library JSON shape.
 */
export function mapRegistryToInstallInfoProject(
    registry: ProjEnvProjectRegistry,
): InstallInfoProject {
    const installationDir = registry.installationDir ?? '';
    const id = registry.id ?? '';
    // Prefer explicit install dir; when id is present, surface project root as dir+id.
    let installationPath = installationDir.replace(/\\/g, '/');
    if (installationPath && id) {
        if (!installationPath.endsWith('/')) {
            installationPath += '/';
        }
        // Avoid double-appending id if installationDir already ends with it
        const normalized = installationPath.replace(/\/+$/, '');
        const baseName = normalized.split('/').filter(Boolean).pop() ?? '';
        if (baseName !== id) {
            installationPath = `${normalized}/${id}`;
        } else {
            installationPath = normalized;
        }
    }

    const project: InstallInfoProject = {
        id,
        name: registry.name ?? id,
        runnable: !registry.notRunnable,
        installationPath,
        winccOaVersion: registry.installationVersion ?? null,
        currentProject: registry.currentProject ?? false,
    };

    if (registry.company !== undefined && registry.company !== '') {
        project.company = registry.company;
    }
    if (registry.description !== undefined && registry.description !== '') {
        project.description = registry.description;
    }
    if (registry.invalidReason !== undefined && registry.invalidReason !== '') {
        project.invalidReason = registry.invalidReason;
    }

    return project;
}

/**
 * List all registered projects from the host registry (no ProjEnvProject init side effects).
 */
export function listProjects(): InstallInfoProject[] {
    return getProjectRegistries().map(mapRegistryToInstallInfoProject);
}
