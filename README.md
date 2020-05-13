# ts-junit2json
![CI](https://github.com/Kesin11/ts-junit2json/workflows/Node%20CI/badge.svg)

ts-juni2json provides a converter to convert JUnit XML format to JSON and it written by TypeScript.

# Purpose
ts-junit2json is created for storing test result data in BigQuery.

Many languages and test frameworks support output tests result data as JUnit XML format that de fact standard in today. On the other hand, BigQuery does not support to import XML but does support JSON.

You notice that you can store data in BigQuery with converting XML to JSON. ts-junit2json provides a simple JUnit XML to JSON converter for that purpose.

# What is deference for other XML to JSON tools?
The purpose of other similar tools is handling common XML format. As a result, output JSON structure is sometimes redundant and not suitable for store in BigQuery.

ts-junit2json only supports JUnit XML schema, but reconstructs original XML structure into a BigQuery friendly structure. More detail will be explaiend later.

# Usage
```ts
import { parse } from 'junit2json'

const main = async () => {
  const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
  <testsuites name="gcf_junit_xml_to_bq_dummy" tests="2" failures="1" time="1.506">
    <testsuite name="__tests__/basic.test.ts" errors="0" failures="0" skipped="0" timestamp="2020-01-26T13:45:02" time="1.019" tests="1">
      <testcase classname="convert xml2js output basic" name="convert xml2js output basic" time="0.01">
      </testcase>
    </testsuite>
    <testsuite name="__tests__/snapshot.test.ts" errors="0" failures="1" skipped="0" timestamp="2020-01-26T13:45:02" time="1.105" tests="1">
      <testcase classname="parse snapshot nunit failure xml" name="parse snapshot nunit failure xml" time="0.013">
        <failure>Error: Something wrong.</failure>
      </testcase>
    </testsuite>
  </testsuites>
  `

  const output = await parse(xmlString)
  console.log(JSON.stringify(output, null, 2))
}
main()
```

# Sample output
```json
{
  "name": "gcf_junit_xml_to_bq_dummy",
  "tests": 2,
  "failures": 1,
  "time": 1.506,
  "testsuite": [
    {
      "name": "__tests__/basic.test.ts",
      "errors": 0,
      "failures": 0,
      "skipped": 0,
      "timestamp": "2020-01-26T13:45:02",
      "time": 1.019,
      "tests": 1,
      "testcase": [
        {
          "classname": "convert xml2js output basic",
          "name": "convert xml2js output basic",
          "time": 0.01
        }
      ]
    },
    {
      "name": "__tests__/snapshot.test.ts",
      "errors": 0,
      "failures": 1,
      "skipped": 0,
      "timestamp": "2020-01-26T13:45:02",
      "time": 1.105,
      "tests": 1,
      "testcase": [
        {
          "classname": "parse snapshot nunit failure xml",
          "name": "parse snapshot nunit failure xml",
          "time": 0.013,
          "failure": [
            {
              "inner": "Error: Something wrong."
            }
          ]
        }
      ]
    }
  ]
}
```

# Filter some tags
If you want to filter some tags like `<system-out>` or `<system-err>`, you can use `replacer` function argument in [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).

```ts
const output = await parse(xmlString)
const replacer = (key: any, value: any) => {
  if (key === 'system-out' || key === 'system-err') return undefined
  return value
}
console.log(JSON.stringify(output, replacer, 2))
```

# Notice
ts-junit2json reconstructs some tags constructure for simple and consitent structure.

- Tag inner text are store to the value of 'inner' key.
  - The only exceptions are `<system-out>` and `<system-err>`, whose inner text are store to the string array.

# CLI
```bash
npx ts-junit2json cli.js -p -f system-out,system-err junit.xml
```

```
cli.js <path>

Convert JUnit XML format to JSON

Positionals:
  path  JUnit XML path                                                  [string]

Options:
  --help             Show help                                         [boolean]
  --version          Show version number                               [boolean]
  -p, --pretty       Output pretty JSON                                [boolean]
  -f, --filter-tags  Filter XML tag names                               [string]

Examples:
  cli.js -p -f system-out,system-err        Output pretty JSON with filter
  junit.xml                                 <system-out> and <system-err> tags.
```

## Example with `jq`
Count testcases.

```bash
npx junit2json junit.xml | jq .tests
```

Show testsuite names.

```bash
npx junit2json junit.xml | jq .testsuite[].name
```

Show testcase classnames.

```bash
npx junit2json junit.xml | jq .testsuite[].testcase[].classname
```

# License
MIT
