import * as junit2json from '../src/index.js'
import * as fs from 'fs'
import * as path from 'path'

const fixturePath = (fixtureName: string) => {
  return path.join(__dirname, 'fixtures', fixtureName)
}

describe('parse snapshot', () => {
  it('all success xml', async () => {
    const xml = fs.readFileSync(fixturePath('jest-success.xml'))
    const parsed = await junit2json.parse(xml)

    expect(parsed).toMatchSnapshot()
  })

  it('jest failure xml', async () => {
    const xml = fs.readFileSync(fixturePath('jest-failure.xml'))
    const parsed = await junit2json.parse(xml)

    expect(parsed).toMatchSnapshot()
  })

  it('nunit failure xml', async () => {
    const xml = fs.readFileSync(fixturePath('nunit-failure.xml'))
    const parsed = await junit2json.parse(xml)

    expect(parsed).toMatchSnapshot()
  })

  it('Android robolectric success xml', async () => {
    const xml = fs.readFileSync(fixturePath('android-robolectric-success.xml'))
    const parsed = await junit2json.parse(xml)

    expect(parsed).toMatchSnapshot()
  })
})
