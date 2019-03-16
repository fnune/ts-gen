import ts from 'typescript'

import printJscRecord from './interface'

const resultFile = ts.createSourceFile(
  '', // File name.
  '', // Source text.
  ts.ScriptTarget.Latest, // Language version.
  false, // Set parent nodes.
  ts.ScriptKind.TS, // JS, TS, etc.
)

describe('jsverify record printer', () => {
  const result = printJscRecord(resultFile)

  it('produces a result', () => {
    expect(result).toMatchSnapshot()
  })
})
