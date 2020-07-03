/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { timingSafeEqual } from 'crypto'
import alloc from 'buffer-alloc'

type BufferSafeValue =
	| ArrayBuffer
	| SharedArrayBuffer
	| number[]
	| string
	| { valueOf(): string | object }
	| { [Symbol.toPrimitive](hint: 'string'): string }

/**
 * Generates a random string for a given size
 */
export function safeEqual<T extends BufferSafeValue>(value: T, comparisonValue: T) {
	if (typeof value === 'string' && typeof comparisonValue === 'string') {
		/**
		 * The length of the main value to ensure that we compare equal strings
		 * against each other to get a constant time.
		 */
		const expectedLength = Buffer.byteLength(value)

		/**
		 * Value A
		 */
		const valueBuffer = alloc(expectedLength, 0, 'utf-8')
		valueBuffer.write(value)

		/**
		 * Value B
		 */
		const comparisonValueBuffer = alloc(expectedLength, 0, 'utf-8')
		comparisonValueBuffer.write(comparisonValue)

		/**
		 * Ensure values are same and also have same length
		 */
		return timingSafeEqual(valueBuffer, comparisonValueBuffer) && expectedLength === Buffer.byteLength(comparisonValue)
	}

	return timingSafeEqual(Buffer.from(value), Buffer.from(comparisonValue))
}
