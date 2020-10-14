/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import { safeStringify } from '../src/safeStringify'

test.group('safeStringify', () => {
	test('stringifies object', (assert) => {
		assert.deepEqual(safeStringify({ a: 18, b: 4 }), '{"a":18,"b":4}')
	})

	test('stringifies object (replacer)', (assert) => {
		const replacer = (_, value) => {
			return typeof value === 'number' ? value + 1 : value
		}

		assert.deepEqual(safeStringify({ a: 18, b: 4 }, replacer), '{"a":19,"b":5}')
	})

	test('stringifies object removing circular reference', (assert) => {
		const o: any = { a: 18, b: 4 }
		o.o = o
		assert.deepEqual(safeStringify(o), '{"a":18,"b":4}')
	})

	test('stringifies object with bigint', (assert) => {
		assert.deepEqual(safeStringify({ a: BigInt(18), b: 4 }), '{"a":"18","b":4}')
	})

	test('stringifies object with bigint (replacer returns bigint)', (assert) => {
		const replacer = (_, value) => {
			return typeof value === 'bigint' ? value + BigInt(1) : value
		}

		assert.deepEqual(safeStringify({ a: BigInt(18), b: 4 }, replacer), '{"a":"19","b":4}')
	})

	test('stringifies object with bigint (replacer handles bigint)', (assert) => {
		const replacer = (_, value) => {
			return typeof value === 'bigint' ? `${value.toString()}n` : value
		}

		assert.deepEqual(safeStringify({ a: BigInt(18), b: 4 }, replacer), '{"a":"18n","b":4}')
	})
})
