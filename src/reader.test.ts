import { ProcessableType } from 'descriptors'

import Reader from './reader'

/** This string should be included in the intermediate descriptions */
export interface MockInterface {
  isForTests?: boolean
}

describe('Reader', () => {
  describe('with a bad path to a config file', () => {
    it('throws an error', () => {
      expect(() => {
        Reader.createProgram('./bollocks.json')
      }).toThrow()
    })
  })

  describe('with a correct path to a config file', () => {
    /** A program of this library's source... so meta! */
    const program = Reader.createProgram('./tsconfig.json')
    const reader = new Reader(program)

    it('creates a valid TypeScript program', () => {
      expect(program.getCurrentDirectory()).toContain('ts-gen')
    })

    it('can parse a program and generate intermediate descriptions', () => {
      reader.generateIntermediateDescriptions()

      const mockInterfaceDescription = reader
        .getIntermediateDescriptions()
        .find(desc => desc.name === 'MockInterface')

      expect(mockInterfaceDescription).toEqual({
        documentation: ['This string should be included in the intermediate descriptions'],
        name: 'MockInterface',
        type: ProcessableType.INTERFACE,
        fields: [
          {
            description: {
              documentation: [],
              name: 'isForTests',
              type: ProcessableType.TYPE_ELEMENT,
            },
            optional: true,
          },
        ],
      })
    })
  })
})
