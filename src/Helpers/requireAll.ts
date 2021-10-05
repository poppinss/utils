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
 * Function to filter and keep script files only
 */
function fileFilter(file: string) {
  return isScriptFile(file)
}

/**
 * Require all files from a given directory. The method automatically looks
 * for files ending with `.ts`, `.js` and `.json`. Also files ending with
 * `.d.ts` are ignored.
 */
export function requireAll(
  location: string,
  recursive = true,
  optional = false,
  filter: (file: string) => boolean | string = fileFilter
) {
  try {
    return rAll({
      dirname: location,
      recursive,
      filter: (file: string) => {
        let result: boolean | string = true

        /**
         * Invoke user defined function
         */
        if (typeof filter === 'function') {
          result = filter(file)
        }

        /**
         * Use the default file name when file is meant to
         * be kept
         */
        if (result === true) {
          const ext = extname(file)
          return file.replace(new RegExp(`${ext}$`), '')
        }

        return result
      },
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
