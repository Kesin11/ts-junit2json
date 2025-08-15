#!/usr/bin/env node
import fs from 'node:fs'
import { parseArgs } from 'node:util'
import { parse } from './index.js'

const printHelp = () => {
  const help = `junit2json - Convert JUnit XML format to JSON

Usage:
  junit2json [options] <path>

Options:
  -p, --pretty              Output pretty formatted JSON (default: false)
  -f, --filter-tags <tags>  Comma separated XML tag names to filter out from output
  -h, --help                Show this help and exit

Examples:
  junit2json junit.xml
  junit2json -p -f system-out,system-err junit.xml`
  console.log(help)
}

const main = async () => {
  const { values, positionals } = parseArgs({
    options: {
      help: { type: 'boolean', short: 'h' },
      pretty: { type: 'boolean', short: 'p' },
      'filter-tags': { type: 'string', short: 'f' },
    },
    allowPositionals: true,
    strict: true,
  })

  if (values.help) {
    printHelp()
    process.exit(0)
  }

  const path = positionals[0]
  if (!path) {
    console.error('Error: Missing required <path> to JUnit XML file.')
    console.error('')
    printHelp()
    process.exit(1)
  }

  const xmlString = fs.readFileSync(path, 'utf8').toString()

  const filterTags = typeof values['filter-tags'] === 'string' && values['filter-tags'].length > 0
    ? values['filter-tags'].split(',')
    : []

  const filterSet = new Set<string>(filterTags)
  const _replacer = (key: any, value: any) => {
    if (filterSet.has(key)) return undefined
    return value
  }

  const indent = values.pretty ? 2 : 0
  const replacer = (filterTags.length > 0) ? _replacer : undefined

  const output = await parse(xmlString)
  console.log(JSON.stringify(output, replacer, indent))
}
main()
