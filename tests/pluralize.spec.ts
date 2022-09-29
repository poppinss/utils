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

test.group('Pluralize', () => {
  test('get plural form', ({ assert }) => {
    assert.equal(string.plural('box'), 'boxes')
    assert.equal(string.plural('i'), 'we')
  })

  test('add irregular rule', ({ assert }) => {
    string.pluralize.addIrregularRule('login', 'login')
    assert.equal(string.plural('login'), 'login')
  })

  test('add uncountableRule rule', ({ assert }) => {
    string.pluralize.addUncountableRule('auth')
    assert.equal(string.plural('auth'), 'auth')
  })

  test('get singular form', ({ assert }) => {
    assert.equal(string.singular('boxes'), 'box')
  })

  test('pluralize based on count', ({ assert }) => {
    assert.equal(string.pluralize('box', 2), 'boxes')
    assert.equal(string.pluralize('box', 1), 'box')
    assert.equal(string.pluralize('boxes', 1), 'box')
  })
})
