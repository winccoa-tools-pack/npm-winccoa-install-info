import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { emitResult, parseArgs } from '../../src/cli';

test('parseArgs: returns null for --help', () => {
    const parsed = parseArgs(['node', 'cli.ts', '--help']);
    assert.equal(parsed, null);
});

test('parseArgs: returns null for -h', () => {
    const parsed = parseArgs(['node', 'cli.ts', '-h']);
    assert.equal(parsed, null);
});

test('parseArgs: returns null when no command', () => {
    const parsed = parseArgs(['node', 'cli.ts']);
    assert.equal(parsed, null);
});

test('parseArgs: parses versions with default json', () => {
    const parsed = parseArgs(['node', 'cli.ts', 'versions']);
    assert.ok(parsed);
    assert.equal(parsed.command, 'versions');
    assert.equal(parsed.json, true);
    assert.equal(parsed.resultFile, undefined);
});

test('parseArgs: parses projects --json', () => {
    const parsed = parseArgs(['node', 'cli.ts', 'projects', '--json']);
    assert.ok(parsed);
    assert.equal(parsed.command, 'projects');
    assert.equal(parsed.json, true);
});

test('parseArgs: parses --no-json', () => {
    const parsed = parseArgs(['node', 'cli.ts', 'versions', '--no-json']);
    assert.ok(parsed);
    assert.equal(parsed.command, 'versions');
    assert.equal(parsed.json, false);
});

test('parseArgs: parses --result-file path', () => {
    const parsed = parseArgs([
        'node',
        'cli.ts',
        'projects',
        '--result-file',
        'out/projects.json',
    ]);
    assert.ok(parsed);
    assert.equal(parsed.command, 'projects');
    assert.equal(parsed.resultFile, 'out/projects.json');
    assert.equal(parsed.json, true);
});

test('parseArgs: parses --result-file=path', () => {
    const parsed = parseArgs([
        'node',
        'cli.ts',
        'versions',
        '--no-json',
        '--result-file=versions.txt',
    ]);
    assert.ok(parsed);
    assert.equal(parsed.resultFile, 'versions.txt');
    assert.equal(parsed.json, false);
});

test('parseArgs: rejects --result-file without path', () => {
    const originalWrite = process.stderr.write.bind(process.stderr);
    let stderr = '';
    (process.stderr.write as unknown as (chunk: string) => boolean) = (chunk: string) => {
        stderr += chunk;
        return true;
    };

    try {
        const parsed = parseArgs(['node', 'cli.ts', 'projects', '--result-file']);
        assert.equal(parsed, null);
        assert.match(stderr, /requires a path/);
    } finally {
        process.stderr.write = originalWrite;
    }
});

test('parseArgs: rejects unknown command', () => {
    const originalWrite = process.stderr.write.bind(process.stderr);
    let stderr = '';
    (process.stderr.write as unknown as (chunk: string) => boolean) = (chunk: string) => {
        stderr += chunk;
        return true;
    };

    try {
        const parsed = parseArgs(['node', 'cli.ts', 'convert']);
        assert.equal(parsed, null);
        assert.match(stderr, /Unknown command/);
    } finally {
        process.stderr.write = originalWrite;
    }
});

test('parseArgs: rejects unknown option', () => {
    const originalWrite = process.stderr.write.bind(process.stderr);
    let stderr = '';
    (process.stderr.write as unknown as (chunk: string) => boolean) = (chunk: string) => {
        stderr += chunk;
        return true;
    };

    try {
        const parsed = parseArgs(['node', 'cli.ts', 'versions', '--timeout', '1']);
        assert.equal(parsed, null);
        assert.match(stderr, /Unknown option/);
    } finally {
        process.stderr.write = originalWrite;
    }
});

test('emitResult: writes payload to result file', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'install-info-'));
    const file = path.join(dir, 'nested', 'out.json');
    const originalWrite = process.stderr.write.bind(process.stderr);
    let stderr = '';
    (process.stderr.write as unknown as (chunk: string) => boolean) = (chunk: string) => {
        stderr += chunk;
        return true;
    };

    try {
        emitResult('{"ok":true}\n', file);
        assert.equal(fs.readFileSync(file, 'utf8'), '{"ok":true}\n');
        assert.match(stderr, /Wrote result to/);
    } finally {
        process.stderr.write = originalWrite;
        fs.rmSync(dir, { recursive: true, force: true });
    }
});
