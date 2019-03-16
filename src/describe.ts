import ts from 'typescript'

import {
  IntermediateDescription,
  ProcessableType,
  BaseDescription,
  ProcessableNode,
} from 'descriptors'

export function describe(node: ProcessableNode, checker: ts.TypeChecker): IntermediateDescription {
  const symbol = 'name' in node ? checker.getSymbolAtLocation(node.name) : null

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
        name: member.name,
        optional: !!member.questionToken,
        // TODO: Transform members into processable nodes.
        description: describe(member as any, checker),
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

  return {
    ...baseDescription,
    name: null,
    type: ProcessableType.TYPE_LITERAL,
  }
}
