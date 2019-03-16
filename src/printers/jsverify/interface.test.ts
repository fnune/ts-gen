import ts from 'typescript'

import { InterfaceDescription, ProcessableType } from 'descriptors'

import { createJscRecord } from './interface'

const resultFile = ts.createSourceFile(
  '', // File name.
  '', // Source text.
  ts.ScriptTarget.Latest, // Language version.
  false, // Set parent nodes.
  ts.ScriptKind.TS, // JS, TS, etc.
)

const print = (description: InterfaceDescription) =>
  ts
    .createPrinter({
      newLine: ts.NewLineKind.LineFeed,
    })
    .printNode(ts.EmitHint.Unspecified, createJscRecord(description), resultFile)

describe('jsverify record printer', () => {
  it('produces a result with an empty object', () => {
    const result = print({
      documentation: [],
      type: ProcessableType.INTERFACE,
      name: null,
      fields: [],
    })
    expect(result).toEqual('jsc.record({})')
  })

  it('produces a result with an object with literal types', () => {
    const result = print({
      documentation: [],
      type: ProcessableType.INTERFACE,
      name: null,
      fields: [
        {
          optional: false,
          description: {
            documentation: [],
            name: 'favoriteFruit',
            type: ProcessableType.LITERAL_TYPE,
            value: 'banana',
          },
        },
        {
          optional: false,
          description: {
            documentation: [],
            name: 'favoriteFruit',
            type: ProcessableType.LITERAL_TYPE,
            value: 123,
          },
        },
      ],
    })
    expect(result).toMatchSnapshot()
  })

  // TODO: Implement
  xit('produces a result with an object with primitive types', () => {
    const result = print({
      documentation: [],
      type: ProcessableType.INTERFACE,
      name: null,
      fields: [],
    })
    expect(result).toEqual('banana')
  })
})
