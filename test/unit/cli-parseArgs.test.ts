import test from 'node:test';
import assert from 'node:assert/strict';

import { parseArgs } from '../../src/cli';

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
