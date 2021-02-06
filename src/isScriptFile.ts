/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { extname } from 'path'
const JS_MODULES = ['.js', '.json']

/**
 * Returns `true` when file ends with `.js`, `.json` or
 * `.ts` but not `.d.ts`.
 */
export function isScriptFile(file: string) {
  const ext = extname(file)

  if (JS_MODULES.includes(ext)) {
    return true
  }

  if (ext === '.ts' && !file.endsWith('.d.ts')) {
    return true
  }

  return false
}
