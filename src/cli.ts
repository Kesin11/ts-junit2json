#!/usr/bin/env node
import fs from 'fs'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { parse } from '.'

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 [path]')
  .command('$0 <path>', 'Convert JUnit XML format to JSON')
  .options({
    p: { type: 'boolean', alias: 'pretty', describe: 'Output pretty JSON', default: false },
    f: { type: 'string', alias: 'filter-tags', describe: 'Filter XML tag names' },
  })
  .alias('p', 'pretty')
  .alias('f', 'filter-tags')
  .coerce('f', (filter?: string) => filter?.split(',') )
  .positional('path', {
    describe: 'JUnit XML path',
    type: 'string',
    demandOption: true,
  })
  .example('$0 -p -f system-out,system-err junit.xml', 'Output pretty JSON with filter <system-out> and <system-err> tags.')
  .strict()
  .parseSync()

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