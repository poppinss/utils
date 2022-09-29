/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { flattie } from 'flattie'

/**
 * Recursively flatten an object/array.
 */
export function flatten<X = Record<string, any>, Y = unknown>(
  input: Y,
  glue?: string,
  keepNullish?: boolean
): X {
  return flattie(input, glue, keepNullish)
}
