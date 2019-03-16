import ts from 'typescript'

import {
  ProcessableNode,
  IntermediateDescription,
  EnumDescription,
  ProcessableType,
  InterfaceDescription,
  TypeAliasDescription,
  TypeLiteralDescription,
  TypeElementDescription,
  LiteralTypeDescription,
} from 'descriptors'

export const isProcessableNode = (node: ts.Node): node is ProcessableNode =>
  ts.isInterfaceDeclaration(node) ||
  ts.isTypeAliasDeclaration(node) ||
  ts.isEnumDeclaration(node) ||
  ts.isTypeLiteralNode(node) ||
  ts.isTypeElement(node)

export const isEnumDescription = (
  description: IntermediateDescription,
): description is EnumDescription => description.type === ProcessableType.ENUM

export const isInterfaceDescription = (
  description: IntermediateDescription,
): description is InterfaceDescription => description.type === ProcessableType.INTERFACE

export const isTypeAliasDescription = (
  description: IntermediateDescription,
): description is TypeAliasDescription => description.type === ProcessableType.TYPE_ALIAS

export const isTypeLiteralDescription = (
  description: IntermediateDescription,
): description is TypeLiteralDescription => description.type === ProcessableType.TYPE_LITERAL

export const isTypeElementDescription = (
  description: IntermediateDescription,
): description is TypeElementDescription => description.type === ProcessableType.TYPE_ELEMENT

export const isLiteralTypeDescription = (
  description: IntermediateDescription,
): description is LiteralTypeDescription => description.type === ProcessableType.LITERAL_TYPE

export const isNamedDescription = (description: IntermediateDescription): description is any =>
  !!description.name
