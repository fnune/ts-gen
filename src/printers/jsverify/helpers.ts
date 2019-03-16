import ts from 'typescript'

import identifiers from './identifiers'

/**
 * Creates a call on the jsc object via an identifier, with optional arguments
 * and type arguments. Example:
 *
 * createJscCallExpression(identifiers.string)
 *
 * Would return an AST for `jsc.string()`
 */
export function createJscCallExpression(
  identifier: ts.Identifier,
  argumentsArray: ReadonlyArray<ts.Expression> = [],
  typeArguments: ReadonlyArray<ts.TypeNode> = [],
) {
  const propertyAccessExpression = ts.createPropertyAccess(identifiers.jsc, identifier)
  const callExpression = ts.createCall(propertyAccessExpression, typeArguments, argumentsArray)
  return ts.createExpressionStatement(callExpression)
}
