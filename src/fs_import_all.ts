/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { fileURLToPath } from 'node:url'
import lodash from '@poppinss/utils/lodash'
import { extname, relative, sep } from 'node:path'

import { fsReadAll } from './fs_read_all.js'
import { ImportAllFilesOptions } from './types.js'
import { isScriptFile } from './is_script_file.js'

/**
 * Import the file and update the values collection with the default
 * export.
 */
async function importFile(
  basePath: string,
  fileURL: string,
  values: any,
  options: ImportAllFilesOptions
) {
  /**
   * Converting URL to file path
   */
  const filePath = fileURLToPath(fileURL)

  /**
   * Grab file extension
   */
  const fileExtension = extname(filePath)

  const collectionKey = relative(basePath, filePath) // Get file relative path
    .replace(new RegExp(`${fileExtension}$`), '') // Get rid of the file extension
    .split(sep) // Convert nested paths to an array of keys

  /**
   * Import module
   */
  const exportedValue =
    fileExtension === '.json'
      ? await import(fileURL, { assert: { type: 'json' } })
      : await import(fileURL)

  lodash.set(
    values,
    options.transformKeys ? options.transformKeys(collectionKey) : collectionKey,
    exportedValue.default ? exportedValue.default : { ...exportedValue }
  )
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
export async function fsImportAll(
  location: string | URL,
  options?: ImportAllFilesOptions
): Promise<any> {
  options = options || {}
  const collection: any = {}
  const normalizedLocation = typeof location === 'string' ? location : fileURLToPath(location)
  const files = await fsReadAll(normalizedLocation, {
    filter: isScriptFile,
    ...options,
    pathType: 'url',
  })

  /**
   * Parallelly import all the files and mutate the values collection
   */
  await Promise.all(files.map((file) => importFile(normalizedLocation, file, collection, options!)))

  return collection
}
