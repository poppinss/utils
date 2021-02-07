/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { extname } from 'path'
import rAll from 'require-all'

import { esmResolver } from '../esmResolver'
import { isScriptFile } from '../isScriptFile'

/**
 * Function to filter selected files only
 */
function fileFilter(file: string) {
  const ext = extname(file)
  if (!isScriptFile(file)) {
    return false
  }

  return file.replace(new RegExp(`${ext}$`), '')
}

/**
 * Require all files from a given directory. The method automatically looks
 * for files ending with `.ts`, `.js` and `.json`. Also files ending with
 * `.d.ts` are ignored.
 */
export function requireAll(location: string, recursive = true, optional = false) {
  try {
    return rAll({
      dirname: location,
      recursive,
      filter: fileFilter,
      resolve: esmResolver,
    })
  } catch (error) {
    if (error.code === 'ENOENT' && optional) {
      return
    } else {
      throw error
    }
  }
}
