import ts from 'typescript'

import { ProcessableType, LiteralTypeDescription } from 'descriptors'

import { createJscConstant } from './constant'

const resultFile = ts.createSourceFile(
  '', // File name.
  '', // Source text.
  ts.ScriptTarget.Latest, // Language version.
  false, // Set parent nodes.
  ts.ScriptKind.TS, // JS, TS, etc.
)

const print = (description: LiteralTypeDescription) =>
  ts
    .createPrinter({
      newLine: ts.NewLineKind.LineFeed,
    })
    .printNode(ts.EmitHint.Unspecified, createJscConstant(description), resultFile)

const values: Array<ts.LiteralType['value']> = ['banana', 0, 123.12]

describe('jsverify constant printer', () => {
  values.forEach(value => {
    it(`produces the expected result for case ${value}`, () => {
      const result = print({
        documentation: [],
        type: ProcessableType.LITERAL_TYPE,
        name: null,
        value,
      })
      expect(result).toEqual(`jsc.constant(${JSON.stringify(value)})`)
    })
  })
})
