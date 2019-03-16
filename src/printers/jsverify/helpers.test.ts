import ts from 'typescript'

import * as helpers from './helpers'
import identifiers from './identifiers'

const resultFile = ts.createSourceFile(
  '', // File name.
  '', // Source text.
  ts.ScriptTarget.Latest, // Language version.
  false, // Set parent nodes.
  ts.ScriptKind.TS, // JS, TS, etc.
)

const print = (fun: () => ts.Expression) =>
  ts
    .createPrinter({
      newLine: ts.NewLineKind.LineFeed,
    })
    .printNode(ts.EmitHint.Unspecified, fun(), resultFile)

describe('jsverify call expression helper', () => {
  it('works for the simple, identifier-only case', () => {
    const result = print(() => helpers.createJscCallExpression(identifiers.string))
    expect(result).toEqual('jsc.string()')
  })

  it('works with passed arguments', () => {
    const result = print(() =>
      helpers.createJscCallExpression(identifiers.record, [
        ts.createObjectLiteral(),
        ts.createTrue(),
      ]),
    )
    expect(result).toEqual('jsc.record({}, true)')
  })

  it('works with type arguments', () => {
    const result = print(() =>
      helpers.createJscCallExpression(
        identifiers.record,
        [ts.createObjectLiteral(), ts.createTrue()],
        [ts.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword), ts.createTypeLiteralNode([])],
      ),
    )
    expect(result).toEqual('jsc.record<unknown, {}>({}, true)')
  })
})
