#!/usr/bin/env node
import fs from 'fs'
import yargs from 'yargs'
import { parse } from '.'

type Argv = {
  pretty: boolean
  filterTags?: string[]
  path: string
}

const argv = yargs
  .usage('Usage: $0 [path]')
  .command('$0 <path>', 'Convert JUnit XML format to JSON', (yargs) => {
    yargs.options({
      p: { type: 'boolean', alias: 'pretty', describe: 'Output pretty JSON' },
      f: { type: 'string', alias: 'filter-tags', describe: 'Filter XML tag names' },
    })
    yargs.coerce('f', (filter?: string) => filter?.split(',') )
    yargs.positional('path', {
      describe: 'JUnit XML path',
      type: 'string'
    })
    .example('$0 -p -f system-out,system-err junit.xml', 'Output pretty JSON with filter <system-out> and <system-err> tags.')
  })
  .strict()
  .argv as unknown as Argv

const main = async () => {
  const xmlString = fs.readFileSync(argv.path, 'utf8').toString()

  const filterSet = new Set(argv.filterTags)
  const _replacer = (key: any, value: any) => {
    if (filterSet.has(key)) return undefined
    return value
  }

  const indent = (argv.pretty) ? 2 : 0
  const replacer = (argv.filterTags && argv.filterTags.length > 0) ? _replacer : undefined

  const output = await parse(xmlString)
  console.log(JSON.stringify(output, replacer, indent))
}
main()