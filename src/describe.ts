import ts from 'typescript'

import {
  IntermediateDescription,
  ProcessableType,
  BaseDescription,
  ProcessableNode,
} from 'descriptors'

// TODO: Support type references to avoid duplicates.
export function describe(node: ProcessableNode, checker: ts.TypeChecker): IntermediateDescription {
  const symbol = 'name' in node && node.name ? checker.getSymbolAtLocation(node.name) : null
  const type = checker.getTypeAtLocation(node)

  const baseDescription: BaseDescription = {
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

  if (ts.isLiteralTypeNode(node) && type.isLiteral()) {
    return {
      ...baseDescription,
      type: ProcessableType.LITERAL_TYPE,
      value: type.value,
    }
  }

  return {
    ...baseDescription,
    name: null,
    type: ProcessableType.TYPE_LITERAL,
  }
}
