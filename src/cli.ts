#!/usr/bin/env node

import { listProjects, listVersions } from './api';
import type { InstallInfoProject, InstallInfoVersion } from './types';

/** CLI exit codes. */
const EXIT_OK = 0;
const EXIT_USAGE = 1;
const EXIT_FAILED = 2;

const BIN = 'winccoa-install-info';

export type CliCommand = 'versions' | 'projects';

export interface ParsedArgs {
    command: CliCommand;
    json: boolean;
}

/**
 * Print usage information to stderr.
 */
export function printUsage(): void {
    process.stderr.write(
        [
            '',
            `Usage: ${BIN} <command> [options]`,
            '',
            'Commands:',
            '  versions    List installed WinCC OA versions and paths',
            '  projects    List registered WinCC OA projects',
            '',
            'Options:',
            '  --json              Emit machine-readable JSON (default for scripting)',
            '  --no-json           Prefer a simple human-readable table on stdout',
            '  -h, --help          Show this help message',
            '',
            'Examples:',
            `  ${BIN} versions --json`,
            `  ${BIN} projects --json`,
            '',
            'Detection is provided by @winccoa-tools-pack/npm-winccoa-core.',
            '',
        ].join('\n'),
    );
}

/**
 * Minimal argument parser.
 * Returns parsed options, or null when help/invalid (caller prints usage).
 */
export function parseArgs(argv: string[]): ParsedArgs | null {
    const args = argv.slice(2);

    if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
        return null;
    }

    const command = args[0];
    if (command !== 'versions' && command !== 'projects') {
        process.stderr.write(
            `Error: Unknown command "${command}". Expected "versions" or "projects".\n`,
        );
        return null;
    }

    let json = true;
    for (let i = 1; i < args.length; i++) {
        const a = args[i];
        if (a === '--json') {
            json = true;
        } else if (a === '--no-json') {
            json = false;
        } else if (a === '-h' || a === '--help') {
            return null;
        } else {
            process.stderr.write(`Error: Unknown option "${a}".\n`);
            return null;
        }
    }

    return { command, json };
}

function printVersionsHuman(versions: InstallInfoVersion[]): void {
    if (versions.length === 0) {
        process.stdout.write('No WinCC OA versions found.\n');
        return;
    }
    for (const v of versions) {
        process.stdout.write(`${v.version}\t${v.installationPath ?? ''}\n`);
    }
}

function printProjectsHuman(projects: InstallInfoProject[]): void {
    if (projects.length === 0) {
        process.stdout.write('No registered projects found.\n');
        return;
    }
    for (const p of projects) {
        const runnable = p.runnable ? 'runnable' : 'not-runnable';
        process.stdout.write(
            `${p.id}\t${runnable}\t${p.winccOaVersion ?? ''}\t${p.installationPath}\n`,
        );
    }
}

/**
 * CLI entry used by the bin script and integration tests.
 */
export async function main(argv: string[] = process.argv): Promise<number> {
    const parsed = parseArgs(argv);
    if (!parsed) {
        printUsage();
        return EXIT_USAGE;
    }

    try {
        if (parsed.command === 'versions') {
            const versions = listVersions();
            if (parsed.json) {
                process.stdout.write(`${JSON.stringify(versions, null, 2)}\n`);
            } else {
                printVersionsHuman(versions);
            }
            return EXIT_OK;
        }

        const projects = listProjects();
        if (parsed.json) {
            process.stdout.write(`${JSON.stringify(projects, null, 2)}\n`);
        } else {
            printProjectsHuman(projects);
        }
        return EXIT_OK;
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        process.stderr.write(`Error: ${message}\n`);
        return EXIT_FAILED;
    }
}

// Run only when executed as the CLI entry (not when imported by unit tests).
const isDirectRun =
    typeof require !== 'undefined' && typeof module !== 'undefined' && require.main === module;

if (isDirectRun) {
    void main().then((code) => {
        process.exitCode = code;
    });
}
