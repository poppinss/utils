/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import string from '@poppinss/string'
import { join, relative, sep } from 'node:path'
import { readdir, stat } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { naturalSort } from '../../src/natural_sort.js'

export type ReadAllFilesOptions = {
  ignoreMissingRoot?: boolean
  filter?: (filePath: string, index: number) => boolean
  sort?: (current: string, next: string) => number
  pathType?: 'relative' | 'unixRelative' | 'absolute' | 'unixAbsolute' | 'url'
}

/**
 * Returns an array of file paths from the given location. You can
 * optionally filter and sort files by passing relevant options
 *
 * ```ts
 * await fsReadAll(new URL('./', import.meta.url))
 *
 * await fsReadAll(new URL('./', import.meta.url), {
 *   filter: (filePath) => filePath.endsWith('.js')
 * })

 * await fsReadAll(new URL('./', import.meta.url), {
 *   absolute: true,
 *   unixPaths: true
 * })
* ```
 */
export async function fsReadAll(
  location: string | URL,
  options?: ReadAllFilesOptions
): Promise<string[]> {
  const normalizedLocation = typeof location === 'string' ? location : fileURLToPath(location)
  const normalizedOptions = Object.assign({ absolute: false, sort: naturalSort }, options)
  const pathType = normalizedOptions.pathType || 'relative'

  /**
   * Check to see if the root directory exists and ignore
   * error when "ignoreMissingRoot" is set to true
   */
  try {
    await stat(normalizedLocation)
  } catch (error) {
    if (normalizedOptions.ignoreMissingRoot) {
      return []
    }

    throw error
  }

  const dirents = await readdir(normalizedLocation, { recursive: true, withFileTypes: true })
  const files = dirents
    .filter((dirent) => {
      if (!dirent.isFile()) {
        return false
      }

      if (dirent.name.startsWith('.')) {
        return false
      }

      const relativePath = relative(normalizedLocation, dirent.parentPath)
      if (relativePath && relativePath.split(sep).some((segment) => segment.startsWith('.'))) {
        return false
      }

      return true
    })
    .map((file) => {
      switch (pathType) {
        case 'relative':
          return join(relative(normalizedLocation, file.parentPath), file.name)
        case 'absolute':
          return join(file.parentPath, file.name)
        case 'unixRelative':
          return string.toUnixSlash(join(relative(normalizedLocation, file.parentPath), file.name))
        case 'unixAbsolute':
          return string.toUnixSlash(join(file.parentPath, file.name))
        case 'url':
          return pathToFileURL(join(file.parentPath, file.name)).href
      }
    })

  if (normalizedOptions.filter) {
    return files.filter(normalizedOptions.filter).sort(normalizedOptions.sort)
  }

  return files.sort(normalizedOptions.sort)
}
