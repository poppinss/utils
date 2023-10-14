/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { assert, assertNotNull, assertUnreachable } from '../src/assert.js'

test.group('assert', () => {
  test('throw exception when value is falsy', ({ assert: testAssert }) => {
    testAssert.plan(1)

    try {
      assert(false)
    } catch (error) {
      testAssert.isTrue(true)
    }
  })

  test('throw exception when value is falsy with custom message', ({ assert: testAssert }) => {
    testAssert.plan(1)

    try {
      assert(false, 'foo')
    } catch (error) {
      testAssert.equal(error.message, 'foo')
    }
  })

  test('do not throw exception when value is truthy', () => {
    assert(true)
  })

  test('throw exception when value is null', ({ assert: testAssert }) => {
    testAssert.plan(1)

    try {
      assertNotNull(null)
    } catch (error) {
      testAssert.isTrue(true)
    }
  })

  test('throw exception when code is reached', ({ assert: testAssert }) => {
    testAssert.plan(1)

    try {
      assertUnreachable()
    } catch (error) {
      testAssert.isTrue(true)
    }
  })
})
