import * as cli from 'commander'

import { Reader } from './reader'

// tslint:disable no-console

cli
  .version('0.1.0')
  .usage('<file ...>')
  .parse(process.argv)

if (cli.args[0]) {
  const program = Reader.createProgram(cli.args[0])
  const reader = new Reader(program)

  console.log(
    reader
      .generateIntermediateDescriptions()
      .map(desc => [
        desc.symbol ? desc.symbol.escapedName : 'NO_NAME',
        desc.node.getSourceFile().fileName,
      ]),
  )
}
