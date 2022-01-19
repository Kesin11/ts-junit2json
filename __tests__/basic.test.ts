import * as junit2json from '../src/index'

describe('Convert xml2js output tests', () => {
  it('basic', async () => {
    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <testsuites xmlns="http://foo.com" foo="10">
    </testsuites>
    `
    const parsed = await junit2json.parse(xml)

    expect(parsed).toEqual({
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

    expect(parsed).toEqual({
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

    expect(parsed).toEqual({
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

    expect(parsed).toEqual({
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

    expect(parsed).toEqual({
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

    expect(parsed).toEqual({
      testsuite: [{
        testcase: [{
          "system-err": [ "system error text" ]
        }],
      }]
    } as junit2json.TestSuites)
  })
})
