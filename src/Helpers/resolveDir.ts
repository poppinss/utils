/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import resolveFromMain from 'resolve-from'
import { isAbsolute, sep, join, dirname } from 'path'

/**
 * Resolves path to a given directory. The method is similar to `require.resolve`,
 * but also works for directories with no `index.js` file.
 */
export function resolveDir(fromLocation: string, dirPath: string) {
  if (isAbsolute(dirPath)) {
    return dirPath
  }

  /**
   * Relative paths are made by joining the baseDir
   */
  if (dirPath.startsWith('./') || dirPath.startsWith(`.${sep}`)) {
    return join(fromLocation, dirPath)
  }

  /**
   * From here on, we are dealing with a package inside node module.
   */
  let packageName: string = ''
  const tokens = dirPath.replace(/\\/g, '/').split('/')

  if (tokens.length && tokens[0].startsWith('@')) {
    packageName = `${tokens.shift()}/`
  }

  packageName += tokens.shift()
  const resolved = resolveFromMain.silent(fromLocation, join(packageName, 'package.json'))

  if (!resolved) {
    throw new Error(`Cannot locate directory "${dirPath}"`)
  }

  return join(dirname(resolved), tokens.join('/'))
}
