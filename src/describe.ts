import ts from 'typescript'

import {
  IntermediateDescription,
  ProcessableType,
  BaseDescription,
  ProcessableNode,
} from 'descriptors'

export function describe(node: ProcessableNode, checker: ts.TypeChecker): IntermediateDescription {
  const symbol = 'name' in node && node.name ? checker.getSymbolAtLocation(node.name) : null

  const baseDescription: BaseDescription = {
    text: node.getText(),
    name: symbol ? symbol.name : null,
    documentation: symbol
      ? symbol.getDocumentationComment(checker).map(comment => comment.text)
      : [],
  }

  if (ts.isInterfaceDeclaration(node)) {
    return {
      ...baseDescription,
      type: ProcessableType.INTERFACE,
      fields: node.members.map(member => ({
        optional: Boolean(member.questionToken),
        // TODO: Support type references to avoid duplicates.
        description: describe(member, checker),
      })),
    }
  }

  if (ts.isEnumDeclaration(node)) {
    return {
      ...baseDescription,
      type: ProcessableType.ENUM,
    }
  }

  if (ts.isTypeAliasDeclaration(node)) {
    return {
      ...baseDescription,
      type: ProcessableType.TYPE_ALIAS,
    }
  }

  if (ts.isTypeElement(node)) {
    return {
      ...baseDescription,
      type: ProcessableType.TYPE_ELEMENT,
    }
  }

  return {
    ...baseDescription,
    name: null,
    type: ProcessableType.TYPE_LITERAL,
  }
}
