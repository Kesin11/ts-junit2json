#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { parse } from './index.js'

const printHelp = () => {
  const help = `junit2json - Convert JUnit XML format to JSON

Positionals:
  path  JUnit XML path                                                  [string]

Options:
      --help                        Show help                          [boolean]
      --version                     Show version number                [boolean]
  -p, --pretty                      Output pretty JSON[boolean] [default: false]
  -f, --filter-tags                 Filter XML tag names                [string]

Examples:
  cli.js -p -f system-out,system-err        Output pretty JSON with filter
  junit.xml                                 <system-out> and <system-err> tags.`
  console.log(help)
}

const main = async () => {
  const { values, positionals } = parseArgs({
    options: {
      help: { type: 'boolean', short: 'h' },
      pretty: { type: 'boolean', short: 'p' },
      'filter-tags': { type: 'string', short: 'f' },
      version: { type: 'boolean' },
    },
    allowPositionals: true,
    strict: true,
  })

  if (values.help) {
    printHelp()
    process.exit(0)
  }
  if (values.version) {
    try {
      const cliDir = path.dirname(process.argv[1] || '.')
      const pkgPath = path.resolve(cliDir, '../../package.json')
      const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
      console.log(pkgJson.version)
      process.exit(0)
    } catch {
      // Fallback: no version available
      console.log('')
      process.exit(0)
    }
  }

  const inputPath = positionals[0]
  if (!inputPath) {
    console.error('Error: Missing required <path> to JUnit XML file.')
    console.error('')
    printHelp()
    process.exit(1)
  }

  const xmlString = fs.readFileSync(inputPath, 'utf8').toString()

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
