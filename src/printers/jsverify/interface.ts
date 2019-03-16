import ts from 'typescript'

import identifiers from 'printers/jsverify/identifiers'

import * as helpers from './helpers'

// Can move these to a separate file as defaults, and must accept options eventually.
export function createJscRecord(): ts.ExpressionStatement {
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
  return helpers.createJscCallExpression(identifiers.record, recordArguments, recordTypeArguments)
}
