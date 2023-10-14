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
export function safeEqual<T extends BufferSafeValue, U extends BufferSafeValue>(
  trustedValue: T,
  userInput: U
): boolean {
  if (typeof trustedValue === 'string' && typeof userInput === 'string') {
    /**
     * The length of the comparison value.
     */
    const trustedLength = Buffer.byteLength(trustedValue)

    /**
     * Expected value
     */
    const trustedValueBuffer = Buffer.alloc(trustedLength, 0, 'utf-8')
    trustedValueBuffer.write(trustedValue)

    /**
     * Actual value (taken from user input)
     */
    const userValueBuffer = Buffer.alloc(trustedLength, 0, 'utf-8')
    userValueBuffer.write(userInput)

    /**
     * Ensure values are same and also have same length
     */
    return (
      timingSafeEqual(trustedValueBuffer, userValueBuffer) &&
      trustedLength === Buffer.byteLength(userInput)
    )
  }

  return timingSafeEqual(
    Buffer.from(trustedValue as ArrayBuffer | SharedArrayBuffer),
    Buffer.from(userInput as ArrayBuffer | SharedArrayBuffer)
  )
}
