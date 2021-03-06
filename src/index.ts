import xml2js from 'xml2js'

export type TestSuites = {
  testsuite: TestSuite[]
  name?: string
  time?: number
  tests?: number
  failures?: number
  errors?: number
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
  skipped?: Array<{ message?: string }>
  error?: Array<{ message?: string, type?: string, inner?: string }>
  failure?: Array<{ message?: string, type?: string, inner?: string }>
  "system-out"?: string[]
  "system-err"?: string[]
}

export const parse = async (xmlString: xml2js.convertableToString, xml2jsOptions?: xml2js.OptionsV2): Promise<TestSuites|TestSuite> => {
  const options = xml2jsOptions ?? {
    attrValueProcessors: [xml2js.processors.parseNumbers]
  }
  const result = await xml2js.parseStringPromise(xmlString, options)

  if (result['testsuites']) {
    return _parse(result['testsuites']) as Promise<TestSuites>
  }
  else {
    return _parse(result['testsuite']) as Promise<TestSuite>
  }
}

type ObjOrArray = {[key: string]: any } | Array<ObjOrArray>
const _parse = (objOrArray: ObjOrArray): ObjOrArray => {
  if (Array.isArray(objOrArray)) {
    return objOrArray.map((_obj: ObjOrArray) => {
      // 中身がさらにネストされた配列 or $キーのobjectなら再起
      if (Array.isArray(_obj) || typeof(_obj) === 'object') {
        return _parse(_obj)
      }
      // 配列の中身が単なる文字列ならinnerキーを自分で付けてobjectで返す
      return { inner: _obj }
    })
  }
  let output: {[key: string]: any} = {}
  Object.keys(objOrArray).forEach((key) => {
    const nested = objOrArray[key]
    if (key === '$') {
      output = { ...output, ..._parse(nested) }
    }
    else if (key === 'system-out' || key === 'system-err') {
      output[key] = nested.map((inner: string) => inner)
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