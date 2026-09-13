/**
 * Public types for install-info CLI and library output.
 */

/** One installed WinCC OA version and its installation root. */
export interface InstallInfoVersion {
    version: string;
    installationPath: string | null;
}

/**
 * Stable public JSON shape for a registered project.
 * Field names are intentional CLI contract (see docs/VISION.md).
 */
export interface InstallInfoProject {
    id: string;
    name: string;
    runnable: boolean;
    installationPath: string;
    winccOaVersion: string | null;
    currentProject: boolean;
    company?: string;
    description?: string;
    invalidReason?: string;
}
