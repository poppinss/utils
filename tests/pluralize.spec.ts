/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import {
  plural,
  singular,
  pluralize,
  addIrregularRule,
  addUncountableRule,
} from '../src/pluralize.js'

test.group('Pluralize', () => {
  test('get plural form', ({ assert }) => {
    assert.equal(plural('box'), 'boxes')
    assert.equal(plural('i'), 'we')
  })

  test('add irregular rule', ({ assert }) => {
    addIrregularRule('login', 'login')
    assert.equal(plural('login'), 'login')
  })

  test('add uncountableRule rule', ({ assert }) => {
    addUncountableRule('auth')
    assert.equal(plural('auth'), 'auth')
  })

  test('get singular form', ({ assert }) => {
    assert.equal(singular('boxes'), 'box')
  })

  test('pluralize based on count', ({ assert }) => {
    assert.equal(pluralize('box', 2), 'boxes')
    assert.equal(pluralize('box', 1), 'box')
    assert.equal(pluralize('boxes', 1), 'box')
  })
})
