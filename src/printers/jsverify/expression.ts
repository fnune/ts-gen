import ts from 'typescript'

import { createJscConstant } from './constant'
import { createJscRecord } from './interface'

import { IntermediateDescription } from 'descriptors'
import * as guards from 'guards'

export function createJscExpression(description: IntermediateDescription): ts.Expression {
  if (guards.isEnumDescription(description)) {
    // TODO: Implement
    return ts.createFalse()
  }

  if (guards.isInterfaceDescription(description)) {
    return createJscRecord(description)
  }

  if (guards.isTypeAliasDescription(description)) {
    // TODO: Implement
    return ts.createFalse()
  }

  if (guards.isTypeElementDescription(description)) {
    // TODO: Implement
    return ts.createFalse()
  }

  if (guards.isTypeLiteralDescription(description)) {
    // TODO: Implement
    return ts.createFalse()
  }

  if (guards.isLiteralTypeDescription(description)) {
    return createJscConstant(description)
  }

  // TODO: Implement
  return ts.createFalse()
}
