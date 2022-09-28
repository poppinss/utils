/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { safeEqual } from '../src/helpers/safe_equal.js'

test.group('safeEqual', () => {
  test('return true when two strings are the same', ({ assert }) => {
    assert.isTrue(safeEqual('hello', 'hello'))
  })

  test('return true when two unicode values are the same', ({ assert }) => {
    assert.isTrue(safeEqual('\u00e8', '\u00e8'))
  })
})

test.group('safeEqual | not equals', () => {
  test('return false when two strings are different with same length', ({ assert }) => {
    assert.isFalse(safeEqual('foo', 'bar'))
  })

  test('return false when two strings are different with different length', ({ assert }) => {
    assert.isFalse(safeEqual('foo', 'helloworld'))
  })

  test('return false when expected value is a subset of actual value', ({ assert }) => {
    assert.isFalse(safeEqual('pre', 'prefix'))
  })

  test('return false when actual value is a subset of expected value', ({ assert }) => {
    assert.isFalse(safeEqual('prefix', 'pre'))
  })
})
