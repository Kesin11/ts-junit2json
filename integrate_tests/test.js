import test from 'node:test';
import assert from 'node:assert/strict';
import { exec } from 'node:child_process';

test('CLI exec with no option', (_t, done) => {
    exec("node ./dist/esm/cli.js __tests__/fixtures/android-robolectric-success.xml", (error, stdout, stderr) => {
      assert.ifError(error)
      done()
    })
});

test('CLI exec with --filter-tags', (_t, done) => {
    exec("node ./dist/esm/cli.js --filter-tags system-out __tests__/fixtures/android-robolectric-success.xml", (error, stdout, stderr) => {
      const output = JSON.parse(stdout)
      assert.ok(!output["system-out"], "system-out should not be present")
      assert.ok(output["system-err"], "system-err should be present")
      done()
    })
});