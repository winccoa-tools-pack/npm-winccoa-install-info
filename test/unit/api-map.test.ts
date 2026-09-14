import test from 'node:test';
import assert from 'node:assert/strict';

import { mapRegistryToInstallInfoProject } from '../../src/api';

test('mapRegistryToInstallInfoProject: maps core registry fields', () => {
    const mapped = mapRegistryToInstallInfoProject({
        id: 'MyPlant',
        installationDir: 'D:/WinCC_OA_Proj',
        installationDate: '2024-01-01T00:00:00.000Z',
        notRunnable: false,
        name: 'My Plant',
        company: 'ACME',
        description: 'Demo',
        currentProject: true,
        installationVersion: '3.20',
        invalidReason: '',
    });

    assert.equal(mapped.id, 'MyPlant');
    assert.equal(mapped.name, 'My Plant');
    assert.equal(mapped.runnable, true);
    assert.equal(mapped.installationPath, 'D:/WinCC_OA_Proj/MyPlant');
    assert.equal(mapped.winccOaVersion, '3.20');
    assert.equal(mapped.currentProject, true);
    assert.equal(mapped.company, 'ACME');
    assert.equal(mapped.description, 'Demo');
    assert.equal(mapped.invalidReason, undefined);
});

test('mapRegistryToInstallInfoProject: notRunnable becomes runnable false', () => {
    const mapped = mapRegistryToInstallInfoProject({
        id: 'Sub',
        installationDir: 'C:/proj/Sub',
        installationDate: '',
        notRunnable: true,
        invalidReason: 'missing config',
    });

    assert.equal(mapped.runnable, false);
    assert.equal(mapped.installationPath, 'C:/proj/Sub');
    assert.equal(mapped.name, 'Sub');
    assert.equal(mapped.winccOaVersion, null);
    assert.equal(mapped.invalidReason, 'missing config');
});
