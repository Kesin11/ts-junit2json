import * as junit2json from '../src/index'

describe('convert xml2js output', () => {
  it('basic', async () => {
    const obj = { 
      '$': {
        "xmlns": "http://foo.com",
        "foo": 10
      }
    }  
    const parsed = junit2json._parse(obj)

    expect(parsed).toEqual({
      xmlns: "http://foo.com",
      foo: 10
    })
  })

  it('array with $', async () => {
    const obj = { 
      testsuite: [
        { '$': {
          failures: 1,
          tests: 2,
        }}
      ]
    }  
    const parsed = junit2json._parse(obj)

    expect(parsed).toEqual({
        testsuite: [
          { failures: 1, tests: 2 },
        ]
    })
  })

  it('array with string array', async () => {
    const obj = { 
      testsuite: [
        { '$': {
            tests: 1,
          },
          failure: [ 'inner text' ],
        }
      ]
    }  
    const parsed = junit2json._parse(obj)

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
    const obj = { 
      testsuite: {
        $: {
          tests: 1,
        },   
        failure: {
          _: 'failure text' 
        }
      }
    };  
    const parsed = junit2json._parse(obj)

    expect(parsed).toEqual({
      testsuite: {
        tests: 1,
        failure: {
          inner: 'failure text'
        }
      }
    })
  })
})
