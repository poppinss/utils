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

test.group('To sentence', () => {
  test('make sentence from multiple words', ({ assert }) => {
    assert.equal(
      string.toSentence(['routes', 'controllers', 'middleware']),
      'routes, controllers, and middleware'
    )
  })

  test('customize last separator', ({ assert }) => {
    assert.equal(
      string.toSentence(['routes', 'controllers', 'middleware'], {
        lastSeparator: ', or ',
      }),
      'routes, controllers, or middleware'
    )
  })

  test('make sentence from two words', ({ assert }) => {
    assert.equal(string.toSentence(['routes', 'controllers']), 'routes and controllers')
  })

  test('make sentence from one word', ({ assert }) => {
    assert.equal(string.toSentence(['routes']), 'routes')
  })

  test('make sentence from non string values', ({ assert }) => {
    assert.equal(string.toSentence([0, 1, false], { lastSeparator: ', or ' }), '0, 1, or false')
  })
})
