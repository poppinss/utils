/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import { safeEqual } from '../src/Helpers'

test.group('safeEqual | equals', () => {
  test('compare two strings', (assert) => {
    assert.isTrue(safeEqual('hello', 'hello'))
  })

  test('compare unicodes', (assert) => {
    assert.isTrue(safeEqual('\u00e8', '\u00e8'))
  })
})

test.group('safeEqual | not equals', () => {
  test('do not match different values of same length', (assert) => {
    assert.isFalse(safeEqual('foo', 'bar'))
  })

  test('do not match different values of different length', (assert) => {
    assert.isFalse(safeEqual('foo', 'helloworld'))
  })

  test('do not match when original value is a subset of comparison value', (assert) => {
    assert.isFalse(safeEqual('pre', 'prefix'))
  })

  test('do not match when original value is a superset of comparison value', (assert) => {
    assert.isFalse(safeEqual('prefix', 'pre'))
  })
})
