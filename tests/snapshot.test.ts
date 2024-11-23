import * as junit2json from '../src/index.ts'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { describe, it, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixturePath = (fixtureName: string) => {
  return path.join(__dirname, 'fixtures', fixtureName)
}

describe('parse snapshot', () => {
  test('all success xml', async (t) => {
    const xml = fs.readFileSync(fixturePath('jest-success.xml'))
    const parsed = await junit2json.parse(xml)

    t.assert.snapshot(parsed);
  })

  test('jest failure xml', async (t) => {
    const xml = fs.readFileSync(fixturePath('jest-failure.xml'))
    const parsed = await junit2json.parse(xml)

    t.assert.snapshot(parsed);
  })

  test('nunit failure xml', async (t) => {
    const xml = fs.readFileSync(fixturePath('nunit-failure.xml'))
    const parsed = await junit2json.parse(xml)

    t.assert.snapshot(parsed);
  })

  test('Android robolectric success xml', async (t) => {
    const xml = fs.readFileSync(fixturePath('android-robolectric-success.xml'))
    const parsed = await junit2json.parse(xml)

    t.assert.snapshot(parsed);
  })
})
