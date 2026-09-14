#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

import { stopWatchingProjectRegistries } from '@winccoa-tools-pack/npm-winccoa-core/types/project/ProjEnvProjectRegistry';

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
    /** When set, write the command payload here instead of stdout. */
    resultFile?: string;
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
            '  --json                    Emit machine-readable JSON (default)',
            '  --no-json                 Prefer a simple human-readable table',
            '  --result-file <path>      Write payload to a file (not stdout).',
            '                            Use this when core logs pollute stdout;',
            '                            diagnostics still go to the console.',
            '  -h, --help                Show this help message',
            '',
            'Examples:',
            `  ${BIN} versions --json`,
            `  ${BIN} projects --json`,
            `  ${BIN} projects --result-file projects.json`,
            `  ${BIN} versions --no-json --result-file versions.txt`,
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
    let resultFile: string | undefined;

    for (let i = 1; i < args.length; i++) {
        const a = args[i];
        if (a === '--json') {
            json = true;
        } else if (a === '--no-json') {
            json = false;
        } else if (a === '--result-file' || a.startsWith('--result-file=')) {
            let value: string | undefined;
            if (a.startsWith('--result-file=')) {
                value = a.slice('--result-file='.length);
            } else {
                value = args[i + 1];
                if (value === undefined || value.startsWith('-')) {
                    process.stderr.write('Error: --result-file requires a path argument.\n');
                    return null;
                }
                i += 1;
            }
            if (!value || value.trim() === '') {
                process.stderr.write('Error: --result-file requires a non-empty path.\n');
                return null;
            }
            resultFile = value;
        } else if (a === '-h' || a === '--help') {
            return null;
        } else {
            process.stderr.write(`Error: Unknown option "${a}".\n`);
            return null;
        }
    }

    return { command, json, resultFile };
}

function formatVersionsHuman(versions: InstallInfoVersion[]): string {
    if (versions.length === 0) {
        return 'No WinCC OA versions found.\n';
    }
    return versions.map((v) => `${v.version}\t${v.installationPath ?? ''}`).join('\n') + '\n';
}

function formatProjectsHuman(projects: InstallInfoProject[]): string {
    if (projects.length === 0) {
        return 'No registered projects found.\n';
    }
    return (
        projects
            .map((p) => {
                const runnable = p.runnable ? 'runnable' : 'not-runnable';
                return `${p.id}\t${runnable}\t${p.winccOaVersion ?? ''}\t${p.installationPath}`;
            })
            .join('\n') + '\n'
    );
}

function formatPayload(
    data: InstallInfoVersion[] | InstallInfoProject[],
    command: CliCommand,
    json: boolean,
): string {
    if (json) {
        return `${JSON.stringify(data, null, 2)}\n`;
    }
    return command === 'versions'
        ? formatVersionsHuman(data as InstallInfoVersion[])
        : formatProjectsHuman(data as InstallInfoProject[]);
}

/**
 * Emit the command payload to stdout, or to --result-file when set.
 * Core may still log to stdout/stderr; the file is the clean automation artifact.
 */
export function emitResult(payload: string, resultFile?: string): void {
    if (!resultFile) {
        process.stdout.write(payload);
        return;
    }

    const resolved = path.resolve(resultFile);
    const dir = path.dirname(resolved);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(resolved, payload, 'utf8');
    // Small confirmation on stderr so scripts watching stdout are not mixed with core logs.
    process.stderr.write(`Wrote result to ${resolved}\n`);
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
        const data = parsed.command === 'versions' ? listVersions() : listProjects();
        const payload = formatPayload(data, parsed.command, parsed.json);
        emitResult(payload, parsed.resultFile);
        return EXIT_OK;
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        process.stderr.write(`Error: ${message}\n`);
        return EXIT_FAILED;
    } finally {
        // Core starts an fs.watch on pvssInst.conf when reading the project
        // registry; without closing it the Node process never exits.
        stopWatchingProjectRegistries();
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
