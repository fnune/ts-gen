import ts from 'typescript'

import { InterfaceDescription } from 'descriptors'
import { isNamedDescription } from 'guards'
import identifiers from 'printers/jsverify/identifiers'

import { createJscExpression } from './expression'
import * as helpers from './helpers'

// Can move these to a separate file as defaults, and must accept options eventually.
export function createJscRecord(description: InterfaceDescription): ts.Expression {
  const jscFields = description.fields
    .map(field => field.description)
    .filter(isNamedDescription)
    .map(desc => ts.createPropertyAssignment(desc.name, createJscExpression(desc)))

  // Must be able to accept type arguments eventually.
  const recordTypeArguments = undefined
  const recordArguments = [
    ts.createObjectLiteral(
      jscFields,
      true, // Multiline.
    ),
  ]
  return helpers.createJscCallExpression(identifiers.record, recordArguments, recordTypeArguments)
}
