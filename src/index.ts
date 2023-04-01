import { parseStringPromise, processors } from 'xml2js'
import type { convertableToString, OptionsV2  } from 'xml2js'

export type TestSuites = {
  testsuite?: TestSuite[]
  name?: string
  time?: number
  tests?: number
  failures?: number
  errors?: number
  disabled?: number
}

export type TestCase = {
  name?: string
  classname?: string
  assertions?: number
  time?: number
  status?: string
  skipped?: Skipped[]
  error?: Details[]
  failure?: Details[]
  "system-out"?: string[]
  "system-err"?: string[]
}

export type TestSuite = {
  testcase?: TestCase[]
  name?: string
  tests?: number
  failures?: number
  errors?: number
  time?: number
  disabled?: number
  skipped?: number
  timestamp?: string
  hostname?: string
  id?: string
  package?: string
  properties?: Property[]
  "system-out"?: string[]
  "system-err"?: string[]
}

export type Property = { name?: string, value?: string }
export type Skipped = { message?: string }
export type Details = { message?: string, type?: string, inner?: string }

export const parse = async (xmlString: convertableToString, xml2jsOptions?: OptionsV2): Promise<TestSuites|TestSuite|undefined|null> => {
  const options = xml2jsOptions ?? {
    attrValueProcessors: [processors.parseNumbers]
  }
  const result = await parseStringPromise(xmlString, options)
  if (result === null) return null

  if ('testsuites' in result) {
    return _parse(result['testsuites']) as Promise<TestSuites>
  }
  else if('testsuite' in result) {
    return _parse(result['testsuite']) as Promise<TestSuite>
  }
}

type ObjOrArray = Record<string, any> | Array<ObjOrArray>
const _parse = (objOrArray: ObjOrArray): ObjOrArray => {
  if (Array.isArray(objOrArray)) {
    return objOrArray.map((_obj: ObjOrArray) => {
      // Do recursive call when _obj is nested array OR object that key is "$"
      if (Array.isArray(_obj) || typeof(_obj) === 'object') {
        return _parse(_obj)
      }
      // Return object that has only "inner" field when _obj is String
      return { inner: _obj }
    })
  }
  let output: Record<string, any> = {}
  Object.keys(objOrArray).forEach((key) => {
    const nested = objOrArray[key]
    if (key === '$') {
      output = { ...output, ..._parse(nested) }
    }
    else if (key === 'system-out' || key === 'system-err') {
      output[key] = nested.map((inner: string) => inner)
    }
    else if (key === 'properties') {
      output[key] = _parse(nested[0]?.property || [])
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
