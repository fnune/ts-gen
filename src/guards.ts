import ts from 'typescript'

import { ProcessableNode } from 'descriptors'

export const isProcessableNode = (node: ts.Node): node is ProcessableNode =>
  ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isEnumDeclaration(node)
