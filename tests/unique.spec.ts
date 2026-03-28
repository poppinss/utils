/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { unique } from '../src/unique.js'

test.group('unique', () => {
  test('remove duplicate values while preserving order', ({ assert }) => {
    assert.deepEqual(unique(['a', 'b', 'a', 'c', 'b']), ['a', 'b', 'c'])
  })

  test('keep object uniqueness by reference', ({ assert }) => {
    const user = { username: 'virk' }

    assert.deepEqual(unique([user, user, { username: 'virk' }]), [user, { username: 'virk' }])
  })

  test('returns a mutable array from readonly input', ({ expectTypeOf }) => {
    const values = ['a', 'b', 'a'] as const
    const result = unique(values)

    expectTypeOf(result).toEqualTypeOf<('a' | 'b')[]>()
  })
})
