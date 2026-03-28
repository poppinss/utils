/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { unique } from './unique.js'

export type ImportInfo = {
  source: string
  defaultImport?: string
  defaultTypeImport?: string
  namedImports?: string[]
  typeImports?: string[]
}

/**
 * ImportsBag manages and deduplicates imports from the same source
 */
export class ImportsBag {
  /**
   * Map of source to ImportInfo
   */
  #imports = new Map<string, ImportInfo>()

  /**
   * Generate import statement from ImportInfo
   */
  #generateImportStatement(imp: ImportInfo): string {
    const parts: string[] = []

    // Handle default import with or without named imports
    if (imp.defaultImport || (imp.namedImports && imp.namedImports.length > 0)) {
      const importParts: string[] = []

      if (imp.defaultImport) {
        importParts.push(imp.defaultImport)
      }

      if (imp.namedImports && imp.namedImports.length > 0) {
        importParts.push(`{ ${imp.namedImports.join(', ')} }`)
      }

      parts.push(`import ${importParts.join(', ')} from '${imp.source}'`)
    }

    // Handle default type import with or without type imports
    if (imp.defaultTypeImport || (imp.typeImports && imp.typeImports.length > 0)) {
      const typeImportParts: string[] = []

      if (imp.defaultTypeImport) {
        typeImportParts.push(imp.defaultTypeImport)
      }

      if (imp.typeImports && imp.typeImports.length > 0) {
        typeImportParts.push(`{ ${imp.typeImports.join(', ')} }`)
      }

      parts.push(`import type ${typeImportParts.join(', ')} from '${imp.source}'`)
    }

    return parts.join('\n')
  }

  /**
   * Add an import to the bag
   */
  add(importInfo: ImportInfo): this {
    const existing = this.#imports.get(importInfo.source)

    if (existing) {
      /**
       * Set default import (replaces existing if present)
       */
      if (importInfo.defaultImport) {
        existing.defaultImport = importInfo.defaultImport
      }

      /**
       * Set default type import (replaces existing if present)
       */
      if (importInfo.defaultTypeImport) {
        existing.defaultTypeImport = importInfo.defaultTypeImport
      }

      /**
       * Merge named imports without deduplication (deduplication happens in toArray)
       */
      if (importInfo.namedImports) {
        if (!existing.namedImports) {
          existing.namedImports = []
        }
        existing.namedImports.push(...importInfo.namedImports)
      }

      /**
       * Merge type imports without deduplication (deduplication happens in toArray)
       */
      if (importInfo.typeImports) {
        if (!existing.typeImports) {
          existing.typeImports = []
        }
        existing.typeImports.push(...importInfo.typeImports)
      }
    } else {
      this.#imports.set(importInfo.source, {
        source: importInfo.source,
        defaultImport: importInfo.defaultImport,
        defaultTypeImport: importInfo.defaultTypeImport,
        namedImports: importInfo.namedImports ? [...importInfo.namedImports] : undefined,
        typeImports: importInfo.typeImports ? [...importInfo.typeImports] : undefined,
      })
    }

    return this
  }

  /**
   * Get deduplicated imports as an array
   */
  toArray(): ImportInfo[] {
    return Array.from(this.#imports.values()).map((imp) => ({
      source: imp.source,
      defaultImport: imp.defaultImport,
      defaultTypeImport: imp.defaultTypeImport,
      namedImports: imp.namedImports ? unique(imp.namedImports) : undefined,
      typeImports: imp.typeImports ? unique(imp.typeImports) : undefined,
    }))
  }

  /**
   * Get deduplicated imports as a formatted string
   */
  toString(): string {
    return this.toArray()
      .map((imp) => this.#generateImportStatement(imp))
      .join('\n')
  }
}
