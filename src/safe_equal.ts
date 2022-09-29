/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Buffer } from 'node:buffer'
import { timingSafeEqual } from 'node:crypto'

type BufferSafeValue =
  | ArrayBuffer
  | SharedArrayBuffer
  | number[]
  | string
  | { valueOf(): string | object }
  | { [Symbol.toPrimitive](hint: 'string'): string }

/**
 * Compare two values to see if they are equal. The comparison is done in
 * a way to avoid timing-attacks.
 */
export function safeEqual<T extends BufferSafeValue>(expected: T, actual: T) {
  if (typeof expected === 'string' && typeof actual === 'string') {
    /**
     * The length of the comparison value.
     */
    const expectedLength = Buffer.byteLength(expected)

    /**
     * Expected value
     */
    const expectedValueBuffer = Buffer.alloc(expectedLength, 0, 'utf-8')
    expectedValueBuffer.write(expected)

    /**
     * Actual value (taken from user input)
     */
    const actualValueBuffer = Buffer.alloc(expectedLength, 0, 'utf-8')
    actualValueBuffer.write(actual)

    /**
     * Ensure values are same and also have same length
     */
    return (
      timingSafeEqual(expectedValueBuffer, actualValueBuffer) &&
      expectedLength === Buffer.byteLength(actual)
    )
  }

  return timingSafeEqual(
    Buffer.from(expected as ArrayBuffer | SharedArrayBuffer),
    Buffer.from(actual as ArrayBuffer | SharedArrayBuffer)
  )
}
