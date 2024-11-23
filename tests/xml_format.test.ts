import * as junit2json from '../src/index.ts'
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('Parse various xml format tests', () => {
  it('testsuites root', async () => {
    const xml = `
    <testsuites name="testsuites" tests="1" failures="0" time="1.0">
      <testsuite name="testsuite" errors="0" failures="0" skipped="0" timestamp="2020-01-26T13:45:02" time="1.0" tests="1">
        <testcase classname="xml_format.test.ts" name="testcase" time="1.00">
        </testcase>
      </testsuite>
    </testsuites>
    `

    const parsed = await junit2json.parse(xml)

    assert.deepStrictEqual(parsed, {
      name: "testsuites",
      tests: 1,
      failures: 0,
      time: 1.0,
      testsuite: [
        {
          name: "testsuite",
          errors: 0,
          tests: 1,
          failures: 0,
          skipped: 0,
          timestamp: "2020-01-26T13:45:02",
          time: 1.0,
          testcase: [{
            classname: "xml_format.test.ts",
            name: "testcase",
            time: 1
          }]
        },
      ]
    } as junit2json.TestSuites)
  })

  it('testsuite root', async () => {
    const xml = `
    <testsuite name="testsuite" errors="0" failures="0" skipped="0" timestamp="2020-01-26T13:45:02" time="1.0" tests="1">
      <testcase classname="xml_format.test.ts" name="testcase" time="1.00">
      </testcase>
    </testsuite>
    `

    const parsed = await junit2json.parse(xml)

    assert.deepStrictEqual(parsed, {
      name: "testsuite",
      errors: 0,
      tests: 1,
      failures: 0,
      skipped: 0,
      timestamp: "2020-01-26T13:45:02",
      time: 1.0,
      testcase: [{
        classname: "xml_format.test.ts",
        name: "testcase",
        time: 1
      }]
    } as junit2json.TestSuite)

  })
})
