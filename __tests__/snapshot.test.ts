import * as junit2json from '../src/index.ts'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixturePath = (fixtureName: string) => {
  return path.join(__dirname, 'fixtures', fixtureName)
}

describe('parse snapshot', () => {
  it('all success xml', async () => {
    const xml = fs.readFileSync(fixturePath('jest-success.xml'))
    const parsed = await junit2json.parse(xml)

    assert.snapshot(parsed, { description: 'all success xml snapshot' });
  })

  it('jest failure xml', async () => {
    const xml = fs.readFileSync(fixturePath('jest-failure.xml'))
    const parsed = await junit2json.parse(xml)

    assert.snapshot(parsed, { description: 'jest failure xml snapshot' });
  })

  it('nunit failure xml', async () => {
    const xml = fs.readFileSync(fixturePath('nunit-failure.xml'))
    const parsed = await junit2json.parse(xml)

    assert.snapshot(parsed, { description: 'nunit failure xml snapshot' });
  })

  it('Android robolectric success xml', async () => {
    const xml = fs.readFileSync(fixturePath('android-robolectric-success.xml'))
    const parsed = await junit2json.parse(xml)

    assert.snapshot(parsed, { description: 'Android robolectric success xml snapshot' });
  })
})
