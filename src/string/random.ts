/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { randomBytes } from 'node:crypto'
import { base64 } from '../base64.js'

/**
 * Generates a random string of a given size
 */
export function random(size: number): string {
  const bits = (size + 1) * 6
  const buffer = randomBytes(Math.ceil(bits / 8))
  return base64.urlEncode(buffer).slice(0, size)
}
