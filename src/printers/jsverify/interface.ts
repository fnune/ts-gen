import ts from 'typescript'

// Can move these to a separate file as defaults, and must accept options eventually.
const record = ts.createIdentifier('record')
const jsc = ts.createIdentifier('jsc')

function makeJscRecord() {
  const propertyAccessExpression = ts.createPropertyAccess(jsc, record)

  // Must be able to accept type arguments eventually.
  const recordTypeArguments = undefined
  const recordArguments = [
    ts.createObjectLiteral(
      // Map over passed interface fields.
      // Here's where we need to start taking into account the passed description.
      [ts.createPropertyAssignment('field', ts.createTrue())],
      true, // Multiline.
    ),
  ]

  const callExpression = ts.createCall(
    propertyAccessExpression,
    recordTypeArguments,
    recordArguments,
  )
  const expressionStatement = ts.createExpressionStatement(callExpression)

  return expressionStatement
}

const printJscRecord = (file: ts.SourceFile) =>
  ts
    .createPrinter({
      newLine: ts.NewLineKind.LineFeed,
    })
    .printNode(ts.EmitHint.Unspecified, makeJscRecord(), file)

export default printJscRecord
