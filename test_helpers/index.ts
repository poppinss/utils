/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { fileURLToPath } from 'node:url'
import { dirname as pathDirname, normalize as pathNormalize } from 'node:path'

export function dirname(url: string) {
  return pathDirname(filename(url))
}

export function normalize(filePath: string) {
  return pathNormalize(filePath)
}

export function filename(url: string) {
  return fileURLToPath(url)
}
