import xml2js from 'xml2js'

export type TestSuiteReport = {
  name?: string
  time?: number
  suites: TestSuite[]
}

export type TestSuites = {
  testsuite: TestSuite[]
  name?: string
  time?: number
  tests?: number
  failures?: number
  error?: number
  disabled?: number
}

export type TestSuite = {
  testcase: TestCase[]
  name: string
  tests: number
  failures?: number
  errors?: number
  time?: number
  disabled?: number
  skipped?: number
  timestamp?: string
  hostname?: string
  id?: string
  package?: string
  properties?: Array< {name: string, value: string } >
  "system-out"?: string[]
  "system-err"?: string[]
}

export type TestCase = {
  name: string
  classname: string
  assertions?: number
  time?: number
  status?: string
  skipped?: Array<{ message: string }>
  error?: Array<{ message: string, type?: string }>
  failure?: Array<{ message: string, type?: string }>
  "system-out"?: string[]
  "system-err"?: string[]
}

export const parse = async (xmlString: xml2js.convertableToString) => {
  const result = await xml2js.parseStringPromise(xmlString, {
    attrValueProcessors: [xml2js.processors.parseNumbers]
  })

  return _parse(result['testsuites'])
}

const _parse = (obj: any): any => {
  let output: {[key: string]: any} = {}
  if (Array.isArray(obj)) {
    return obj.map((_obj: any) => {
      // 中身がさらにネストされた配列 or $キーのobjectなら再起
      if (Array.isArray(_obj) || typeof(_obj) === 'object') {
        return _parse(_obj)
      }
      // 配列の中身が単なる文字列ならinnerキーを自分で付けてobjectで返す
      return { inner: _obj }
    })
  }
  Object.keys(obj).forEach((key) => {
    const nested = obj[key]
    if (key === '$') {
      output = { ...output, ..._parse(nested) }
    }
    else if (typeof(nested) === 'object') {
      output[key] = _parse(nested)
    }
    else if (key === '_') {
      output['inner'] = nested
    }
    else {
      output[key] = nested
    }
  })
  return output
}