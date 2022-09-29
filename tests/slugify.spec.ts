/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { slugify } from '../src/slugify.js'

test.group('Stringify', () => {
  test('slugify string', ({ assert }) => {
    assert.equal(slugify('hello world'), 'hello-world')
  })

  test('slugify string containing unicode symbols', ({ assert }) => {
    assert.equal(slugify('hello ♥ world'), 'hello-love-world')
  })
})
