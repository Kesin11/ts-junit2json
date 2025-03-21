import * as junit2json from '../src/index.ts'
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('Convert xml2js output tests', () => {
  it('returns null when XML is empty', async () => {
    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    `
    const parsed = await junit2json.parse(xml)

    assert.strictEqual(parsed, null)
  })

  it('returns undefined when XML is not a recognized element', async () => {
    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <unrecognized />
    `
    const parsed = await junit2json.parse(xml)

    assert.strictEqual(parsed, undefined)
  })

  it('returns undefined when a property is absent', async () => {
    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <testsuites>
    </testsuites>
    `
    const parsed = await junit2json.parse(xml) as junit2json.TestSuite 

    assert.strictEqual(parsed.name, undefined)
  })

  it('basic', async () => {
    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <testsuites xmlns="http://foo.com" foo="10">
    </testsuites>
    `
    const parsed = await junit2json.parse(xml)

    assert.deepStrictEqual(parsed, {
      xmlns: "http://foo.com",
      foo: 10
    })
  })

  it('array with $', async () => {
    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <testsuites>
      <testsuite failures="1" tests="2">
      </testsuite>
    </testsuites>
    `
    const parsed = await junit2json.parse(xml)

    assert.deepStrictEqual(parsed, {
        testsuite: [
          { failures: 1, tests: 2 },
        ]
    } as junit2json.TestSuites)
  })

  it('array with string array', async () => {
    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <testsuites>
      <testsuite tests="1">
        <testcase>
          <failure>inner text</failure>
        </testcase>
      </testsuite>
    </testsuites>
    `
    const parsed = await junit2json.parse(xml)

    assert.deepStrictEqual(parsed, {
        testsuite: [
          {
            tests: 1,
            testcase: [{
              failure: [
                { inner: 'inner text' }
              ]
            }],
          },
        ]
    } as junit2json.TestSuites)
  })

  it('inner', async () => {
    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <testsuites>
      <testsuite tests="1">
        <testcase>
          <failure message="hoge">failure text</failure>
        </testcase>
      </testsuite>
    </testsuites>
    `
    const parsed = await junit2json.parse(xml)

    assert.deepStrictEqual(parsed, {
      testsuite: [{
        tests: 1,
        testcase: [{
          failure: [{
            message: 'hoge',
            inner: 'failure text'
          }]
        }],
      }]
    } as junit2json.TestSuites)
  })

  it('system-out', async () => {
    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <testsuites>
      <testsuite>
        <testcase>
          <system-out>system out text</system-out>
        </testcase>
      </testsuite>
    </testsuites>
    `
    const parsed = await junit2json.parse(xml)

    assert.deepStrictEqual(parsed, {
      testsuite: [{
        testcase: [{
          "system-out": [ "system out text" ]
        }],
      }]
    } as junit2json.TestSuites)
  })

  it('system-error', async () => {
    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <testsuites>
      <testsuite>
        <testcase>
          <system-err>system error text</system-err>
        </testcase>
      </testsuite>
    </testsuites>
    `
    const parsed = await junit2json.parse(xml)

    assert.deepStrictEqual(parsed, {
      testsuite: [{
        testcase: [{
          "system-err": [ "system error text" ]
        }],
      }]
    } as junit2json.TestSuites)
  })

  it('parses properties', async () => {
    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <testsuites>
      <testsuite>
        <properties>
          <property name="hello" value="bonjour"/>
          <property name="world" value="monde"/>
        </properties>
      </testsuite>
    </testsuites>
    `
    const parsed = await junit2json.parse(xml) as junit2json.TestSuites

    assert.deepStrictEqual(parsed, {
      testsuite: [{
        properties: [
          {name: "hello", value: "bonjour"},
          {name: "world", value: "monde"}
        ]
      }]
    })
  })
})
