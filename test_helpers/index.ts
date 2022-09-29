/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { normalize as pathNormalize } from 'node:path'

export function normalize(filePath: string) {
  return pathNormalize(filePath)
}
