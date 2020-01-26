import * as junit2json from '../src/index'

describe('convert xml2js output', () => {
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
    })
  })

  it('array with string array', async () => {
    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <testsuites>
      <testsuite tests="1">
        <failure>inner text</failure>
      </testsuite>
    </testsuites>
    `
    const parsed = await junit2json.parse(xml)

    expect(parsed).toEqual({
        testsuite: [
          {
            tests: 1,
            failure: [
              { inner: 'inner text' }
            ]
          },
        ]
    })
  })

  it('inner', async () => {
    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <testsuites>
      <testsuite tests="1">
        <failure name="hoge">failure text</failure>
      </testsuite>
    </testsuites>
    `
    const parsed = await junit2json.parse(xml)

    expect(parsed).toEqual({
      testsuite: [{
        tests: 1,
        failure: [{
          name: 'hoge',
          inner: 'failure text'
        }]
      }]
    })
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
    })
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
    })
  })
})
