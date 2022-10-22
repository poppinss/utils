/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { flatten } from '../src/flatten.js'

test.group('flatten', () => {
  test('flatten nested object', ({ assert }) => {
    assert.deepEqual(
      flatten({
        a: 'hi',
        b: {
          a: null,
          b: ['foo', '', null, 'bar'],
          d: 'hello',
          e: {
            a: 'yo',
            b: undefined,
            c: 'sup',
            d: 0,
            f: [
              { foo: 123, bar: 123 },
              { foo: 465, bar: 456 },
            ],
          },
        },
        c: 'world',
      }),
      {
        'a': 'hi',
        'b.b.0': 'foo',
        'b.b.1': '',
        'b.b.3': 'bar',
        'b.d': 'hello',
        'b.e.a': 'yo',
        'b.e.c': 'sup',
        'b.e.d': 0,
        'b.e.f.0.foo': 123,
        'b.e.f.0.bar': 123,
        'b.e.f.1.foo': 465,
        'b.e.f.1.bar': 456,
        'c': 'world',
      }
    )
  })
})
