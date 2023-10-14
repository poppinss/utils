/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { extname } from 'node:path'
const JS_MODULES = ['.js', '.json', '.cjs', '.mjs']

/**
 * Returns `true` when file ends with `.js`, `.json` or
 * `.ts` but not `.d.ts`.
 */
export function isScriptFile(filePath: string) {
  const ext = extname(filePath)

  if (JS_MODULES.includes(ext)) {
    return true
  }

  if (ext === '.ts' && !filePath.endsWith('.d.ts')) {
    return true
  }

  return false
}
