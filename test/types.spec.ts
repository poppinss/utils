/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import { types } from '../src/Helpers'

test.group('Types', () => {
  test('check values for float', (assert) => {
    assert.isTrue(types.isFloat(parseFloat('22.10')))
    assert.isTrue(types.isFloat(22.1))

    assert.isTrue(types.isFloat(parseFloat('-22.10')))
    assert.isTrue(types.isFloat(-22.1))

    assert.isTrue(types.isFloat(parseFloat('.3')))
    assert.isTrue(types.isFloat(0.3))

    assert.isTrue(types.isFloat(parseFloat('-.3')))
    assert.isTrue(types.isFloat(-0.3))

    assert.isFalse(types.isFloat(parseFloat('22.00')))
    assert.isFalse(types.isFloat(22.0))

    assert.isFalse(types.isFloat(parseFloat('-22.00')))
    assert.isFalse(types.isFloat(-22.0))

    assert.isFalse(types.isFloat(parseFloat('22')))
    assert.isFalse(types.isFloat(22))

    assert.isFalse(types.isFloat(parseFloat('-22')))
    assert.isFalse(types.isFloat(-22))
  })

  test('check values for integer', (assert) => {
    assert.isFalse(types.isInteger(parseFloat('22.10')))
    assert.isFalse(types.isInteger(22.1))

    assert.isFalse(types.isInteger(parseFloat('-22.10')))
    assert.isFalse(types.isInteger(-22.1))

    assert.isFalse(types.isInteger(parseFloat('.3')))
    assert.isFalse(types.isInteger(0.3))

    assert.isFalse(types.isInteger(parseFloat('-.3')))
    assert.isFalse(types.isInteger(-0.3))

    assert.isTrue(types.isInteger(parseFloat('22.00')))
    assert.isTrue(types.isInteger(22.0))

    assert.isTrue(types.isInteger(parseFloat('-22.00')))
    assert.isTrue(types.isInteger(-22.0))

    assert.isTrue(types.isInteger(parseFloat('22')))
    assert.isTrue(types.isInteger(22))

    assert.isTrue(types.isInteger(parseFloat('-22')))
    assert.isTrue(types.isInteger(-22))
  })

  test('check values for decimal', (assert) => {
    assert.isTrue(types.isDecimal('22.10'))
    assert.isTrue(types.isDecimal(22.1))

    assert.isTrue(types.isDecimal('-22.10'))
    assert.isTrue(types.isDecimal(-22.1))

    assert.isTrue(types.isDecimal('.3'))
    assert.isTrue(types.isDecimal(0.3))

    assert.isTrue(types.isDecimal('-.3'))
    assert.isTrue(types.isDecimal(-0.3))

    assert.isTrue(types.isDecimal('22.00'))
    assert.isFalse(types.isDecimal(22.0))

    assert.isTrue(types.isDecimal('-22.00'))
    assert.isFalse(types.isDecimal(-22.0))

    assert.isFalse(types.isDecimal('22'))
    assert.isFalse(types.isDecimal(22))

    assert.isTrue(types.isDecimal('0.0000000000001'))
    assert.isFalse(types.isDecimal(0.0000000000001))
  })
})
