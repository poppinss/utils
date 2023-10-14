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

test.group('Slugify', () => {
  test('slugify string', ({ assert }) => {
    assert.equal(string.slug('hello world'), 'hello-world')
  })

  test('slugify string containing unicode symbols', ({ assert }) => {
    assert.equal(string.slug('hello ♥ world'), 'hello-love-world')
  })

  test('extend to add custom replacements for unicode values', ({ assert }) => {
    string.slug.extend({ '☢': 'radioactive' })
    assert.equal(string.slug('unicode ♥ is ☢'), 'unicode-love-is-radioactive')
  })
})
