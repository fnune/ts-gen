import ts from 'typescript'

import { createJscRecord } from './interface'

const resultFile = ts.createSourceFile(
  '', // File name.
  '', // Source text.
  ts.ScriptTarget.Latest, // Language version.
  false, // Set parent nodes.
  ts.ScriptKind.TS, // JS, TS, etc.
)

const print = () =>
  ts
    .createPrinter({
      newLine: ts.NewLineKind.LineFeed,
    })
    .printNode(ts.EmitHint.Unspecified, createJscRecord(), resultFile)

describe('jsverify record printer', () => {
  const result = print()

  it('produces a result', () => {
    expect(result).toMatchSnapshot()
  })
})
