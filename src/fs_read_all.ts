/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { join } from 'node:path'
import { readdir, stat } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { slash } from './slash.js'
import { naturalSort } from './natural_sort.js'
import { ReadAllFilesOptions } from './types.js'

/**
 * Filter to remove dot files
 */
function filterDotFiles(fileName: string) {
  return fileName[0] !== '.'
}

/**
 * Read all files from the directory recursively
 */
async function readFiles(
  root: string,
  files: string[],
  options: ReadAllFilesOptions,
  relativePath: string
): Promise<void> {
  const location = join(root, relativePath)
  const stats = await stat(location)

  if (stats.isDirectory()) {
    let locationFiles = await readdir(location)

    await Promise.all(
      locationFiles.filter(filterDotFiles).map((file) => {
        return readFiles(root, files, options, join(relativePath, file))
      })
    )

    return
  }

  switch (options.pathType) {
    case 'relative':
    default:
      files.push(relativePath)
      break
    case 'absolute':
      files.push(location)
      break
    case 'unixRelative':
      files.push(slash(relativePath))
      break
    case 'unixAbsolute':
      files.push(slash(location))
      break
    case 'url':
      files.push(pathToFileURL(location).href)
  }
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
  const files: string[] = []

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

  await readFiles(normalizedLocation, files, normalizedOptions, '')

  if (normalizedOptions.filter) {
    return files.filter(normalizedOptions.filter).sort(normalizedOptions.sort)
  }

  return files.sort(normalizedOptions.sort)
}
