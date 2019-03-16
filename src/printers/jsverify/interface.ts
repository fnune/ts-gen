import ts from 'typescript'

import { jsc, record } from 'printers/jsverify/identifiers'

// Can move these to a separate file as defaults, and must accept options eventually.
function createJscRecord(): ts.ExpressionStatement {
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
  const jscRecordStatement = ts.createExpressionStatement(callExpression)

  return jscRecordStatement
}

export { createJscRecord }
