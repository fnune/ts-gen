import * as fs from 'fs'
import * as path from 'path'
import * as ts from 'typescript'

/**
 * An intermediate description of any interface declaration, type alias or enum
 * that is read from a project. Will be used as a source to generate the
 * requested target.
 */
interface IntermediateDescription {
  text: string
  documentation: string | null
}

export class Reader {
  public static createProgram = (
    configFile: string,
    projectDirectory: string = path.dirname(configFile),
  ): ts.Program => {
    const config = ts.readConfigFile(configFile, ts.sys.readFile)

    const parseConfigHost: ts.ParseConfigHost = {
      fileExists: fs.existsSync,
      readDirectory: ts.sys.readDirectory,
      readFile: file => fs.readFileSync(file, 'utf8'),
      useCaseSensitiveFileNames: true,
    }

    const parsed = ts.parseJsonConfigFileContent(
      config.config,
      parseConfigHost,
      path.resolve(projectDirectory),
      { noEmit: true },
    )

    const host = ts.createCompilerHost(parsed.options, true)

    return ts.createProgram(parsed.fileNames, parsed.options, host)
  }

  private checker: ts.TypeChecker
  private intermediateDescriptions: IntermediateDescription[]

  constructor(private program: ts.Program) {
    this.intermediateDescriptions = []
    this.checker = this.program.getTypeChecker()
  }

  public generateIntermediateDescriptions = (): void => {
    const sourceFiles = this.program.getSourceFiles()

    sourceFiles
      .filter(sourceFile => !sourceFile.isDeclarationFile)
      .forEach(sourceFile => {
        ts.forEachChild(sourceFile, this.visit)
      })
  }

  /** Naïve implementation of a step through the AST */
  private visit = (node: ts.Node) => {
    if (
      ts.isInterfaceDeclaration(node) ||
      ts.isTypeAliasDeclaration(node) ||
      ts.isEnumDeclaration(node)
    ) {
      const symbol = this.checker.getSymbolAtLocation(node.name)

      this.intermediateDescriptions.push({
        text: node.getText(),
        documentation: symbol ? JSON.stringify(symbol.getDocumentationComment(this.checker)) : null,
      })
    }

    ts.forEachChild(node, this.visit)
  }
}
