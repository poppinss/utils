/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import string from '../src/string/main.js'

test.group('Ordinal', () => {
  test('ordinalize a value', ({ assert }) => {
    assert.equal(string.ordinal(1), '1st')
    assert.equal(string.ordinal(2), '2nd')
    assert.equal(string.ordinal(84), '84th')
    assert.equal(string.ordinal(0), '0th')
    assert.equal(string.ordinal(10), '10th')
    assert.equal(string.ordinal(12.87), '12.87th')
    assert.equal(string.ordinal(99), '99th')
    assert.equal(string.ordinal(-14), '-14th')
    assert.throws(
      () => string.ordinal(Number.POSITIVE_INFINITY),
      'Cannot ordinalize invalid or infinite numbers'
    )
  })
})
