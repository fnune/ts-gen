import ts from 'typescript'

import * as primitives from './primitives'

const resultFile = ts.createSourceFile(
  '', // File name.
  '', // Source text.
  ts.ScriptTarget.Latest, // Language version.
  false, // Set parent nodes.
  ts.ScriptKind.TS, // JS, TS, etc.
)

const print = (fun: () => ts.ExpressionStatement) =>
  ts
    .createPrinter({
      newLine: ts.NewLineKind.LineFeed,
    })
    .printNode(ts.EmitHint.Unspecified, fun(), resultFile)

describe('jsverify string printer', () => {
  const result = print(primitives.createJscString)

  it('produces a result', () => {
    expect(result).toEqual('jsc.string();')
  })
})

describe('jsverify boolean printer', () => {
  const result = print(primitives.createJscBoolean)

  it('produces a result', () => {
    expect(result).toEqual('jsc.bool();')
  })
})

describe('jsverify number printer', () => {
  const result = print(primitives.createJscNumber)

  it('produces a result', () => {
    expect(result).toEqual('jsc.number();')
  })
})
