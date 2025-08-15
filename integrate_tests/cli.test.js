import path from 'node:path'
import fs from 'node:fs';
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { exec } from 'node:child_process';
import url from "node:url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('CLI exec with no option should complete', () => {
    const fixtureDir = path.resolve(__dirname, "../tests/fixtures/")
    for (const file of fs.readdirSync(fixtureDir)) {
      test(file, (_t, done) => {
        exec("node ./dist/esm/cli.js " + path.join(fixtureDir, file), (error, _stdout, _stderr) => {
          assert.ifError(error)
          done()
        })
      })
    }
});

describe('CLI exec with --filter-tags', () => {
  test('single tag', (_t, done) => {
      exec("node ./dist/esm/cli.js --filter-tags system-out tests/fixtures/android-robolectric-success.xml", (_error, stdout, _stderr) => {
        const output = JSON.parse(stdout)
        assert.ok(!output["system-out"], "system-out should not be present")
        assert.ok(output["system-err"], "system-err should be present")
        done()
      })
  });

  test('multiple tags', (_t, done) => {
      exec("node ./dist/esm/cli.js --filter-tags system-out,system-err tests/fixtures/android-robolectric-success.xml", (_error, stdout, _stderr) => {
        const output = JSON.parse(stdout)
        assert.ok(!output["system-out"], "system-out should not be present")
        assert.ok(!output["system-err"], "system-err should not be present")
        done()
      })
  });
})
