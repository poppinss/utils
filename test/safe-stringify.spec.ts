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

test.group('Stringify', () => {
  test('stringify object', (assert) => {
    assert.deepEqual(safeStringify({ b: 2, a: 1 }), '{"b":2,"a":1}')
  })

  test('stringify object with circular reference', (assert) => {
    const a: any = {
      b: 2,
    }
    a.a = a
    assert.deepEqual(safeStringify(a), '{"b":2}')
  })

  test('stringify object with bigint', (assert) => {
    const a: any = {
      b: BigInt(10),
      a: 10,
    }
    assert.deepEqual(safeStringify(a), '{"b":"10","a":10}')
  })

  test('stringify object with bigint and circular reference', (assert) => {
    const a: any = {
      b: BigInt(10),
    }
    a.a = a
    assert.deepEqual(safeStringify(a), '{"b":"10"}')
  })
})
