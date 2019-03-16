import identifiers from 'printers/jsverify/identifiers'

import * as helpers from './helpers'

export const createJscString = () => helpers.createJscCallExpression(identifiers.string)
export const createJscBoolean = () => helpers.createJscCallExpression(identifiers.boolean)
export const createJscNumber = () => helpers.createJscCallExpression(identifiers.number)
