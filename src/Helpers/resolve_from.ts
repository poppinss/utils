/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { isAbsolute } from 'node:path'
import resolveFromMain from 'resolve-from'

/**
 * Resolves module from a given directory. It is similar to `require.resolve`
 * but carefull handles the absolute paths.
 */
export function resolveFrom(fromLocation: string, modulePath: string) {
  if (isAbsolute(modulePath)) {
    return modulePath
  }

  return resolveFromMain(fromLocation, modulePath)
}
