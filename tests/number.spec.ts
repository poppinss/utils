/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import number from '../modules/number.js'

test.group('Number helpers', () => {
  test('clamp value between min and max', ({ assert }) => {
    assert.equal(number.clamp(15, 0, 10), 10)
    assert.equal(number.clamp(-2, 0, 10), 0)
    assert.equal(number.clamp(5, 0, 10), 5)
  })

  test('check if number is between min and max', ({ assert }) => {
    assert.isTrue(number.between(5, 0, 10))
    assert.isTrue(number.between(0, 0, 10))
    assert.isTrue(number.between(10, 0, 10))
    assert.isFalse(number.between(-1, 0, 10))
    assert.isFalse(number.between(11, 0, 10))
    assert.isTrue(number.between(5, 10, 0))
  })

  test('convert value to a finite number', ({ assert }) => {
    assert.equal(number.toFinite(5), 5)
    assert.equal(number.toFinite('42'), 42)
    assert.equal(number.toFinite(Number.NaN), 0)
    assert.equal(number.toFinite(Number.POSITIVE_INFINITY), 0)
    assert.equal(number.toFinite(Number.NEGATIVE_INFINITY, 3), 3)
    assert.equal(number.toFinite('abc', 10), 10)
    assert.equal(number.toFinite(undefined), 0)
    assert.equal(number.toFinite(Symbol('value'), 10), 10)
    assert.equal(number.toFinite(Object.create(null), 10), 10)
  })

  test('parse value into a finite number or null', ({ assert }) => {
    assert.equal(number.parse(5), 5)
    assert.equal(number.parse('42'), 42)
    assert.isNull(number.parse(''))
    assert.isNull(number.parse(null))
    assert.isNull(number.parse(undefined))
    assert.isNull(number.parse(Number.NaN))
    assert.isNull(number.parse(Number.POSITIVE_INFINITY))
    assert.isNull(number.parse('abc'))
    assert.isNull(number.parse(Symbol('value')))
    assert.isNull(number.parse(Object.create(null)))
  })
})
