/*
* @poppinss/utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { timingSafeEqual } from 'crypto'

type BufferSafeValue = ArrayBuffer
| SharedArrayBuffer
| number[]
| string
| { valueOf(): string | object }
| { [Symbol.toPrimitive](hint: 'string'): string }

/**
 * Generates a random string for a given size
 */
export function safeEqual (value: BufferSafeValue, comparisonValue: BufferSafeValue) {
  return timingSafeEqual(Buffer.from(value), Buffer.from(comparisonValue))
}
