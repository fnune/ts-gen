import ts from 'typescript'

export type ProcessableNode = ProcessableNamedNode | ts.TypeLiteralNode

export type ProcessableNamedNode =
  | ts.InterfaceDeclaration
  | ts.TypeAliasDeclaration
  | ts.EnumDeclaration
  | ts.TypeElement

export enum ProcessableType {
  ENUM,
  INTERFACE,
  TYPE_ALIAS,
  TYPE_LITERAL,
  TYPE_ELEMENT,
}

export interface BaseDescription {
  type?: unknown
  text: string
  name: string | null
  documentation: string[]
}

export interface EnumDescription extends BaseDescription {
  type: ProcessableType.ENUM
}

export interface InterfaceDescription extends BaseDescription {
  type: ProcessableType.INTERFACE
  fields: Array<{
    optional: boolean
    description: IntermediateDescription
  }>
}

export interface TypeAliasDescription extends BaseDescription {
  type: ProcessableType.TYPE_ALIAS
}

export interface TypeLiteralDescription extends BaseDescription {
  name: null
  type: ProcessableType.TYPE_LITERAL
}

export interface TypeElementDescription extends BaseDescription {
  type: ProcessableType.TYPE_ELEMENT
}

/**
 * An intermediate description of any interface declaration, type alias or enum
 * that is read from a project. Will be used as a source to generate the
 * requested target.
 */
export type IntermediateDescription =
  | EnumDescription
  | InterfaceDescription
  | TypeAliasDescription
  | TypeLiteralDescription
  | TypeElementDescription
