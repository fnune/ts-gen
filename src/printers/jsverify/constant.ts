import ts from 'typescript'

import { LiteralTypeDescription } from 'descriptors'
import identifiers from 'printers/jsverify/identifiers'

import * as helpers from './helpers'

// Can move these to a separate file as defaults, and must accept options eventually.
export function createJscConstant(description: LiteralTypeDescription): ts.Expression {
  const constantTypeArguments = undefined
  const constantArguments = [ts.createLiteral(description.value)]
  return helpers.createJscCallExpression(
    identifiers.constant,
    constantArguments,
    constantTypeArguments,
  )
}
