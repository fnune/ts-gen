import fs from 'fs'
import path from 'path'
import ts from 'typescript'

import { describe } from 'describe'
import { IntermediateDescription } from 'descriptors'
import { isProcessableNode } from 'guards'

export class Reader {
  public static createProgram = (
    configFile: string,
    projectDirectory: string = path.dirname(configFile),
  ): ts.Program => {
    const config = ts.readConfigFile(configFile, ts.sys.readFile)

    if (config.error)
      throw new Error(
        [
          `Error trying to read config file from ${path.resolve(configFile)}:`,
          JSON.stringify(config.error, undefined, 2),
        ].join('\n\n'),
      )

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

  public getIntermediateDescriptions = () => this.intermediateDescriptions

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
    if (isProcessableNode(node)) {
      this.intermediateDescriptions.push(describe(node, this.checker))
    }

    ts.forEachChild(node, this.visit)
  }
}

export default Reader
