/*
* @poppinss/utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import test from 'japa'
import { join } from 'path'

import { resolveFrom } from '../src/resolveFrom'

test.group('resolve from', () => {
  test('resolve relative path from a base directory', (assert) => {
    assert.equal(resolveFrom(__dirname, '../src/requireAll'), join(__dirname, '../src', 'requireAll.ts'))
  })

  test('resolve package', (assert) => {
    assert.equal(resolveFrom(__dirname, 'japa'), join(__dirname, '..', 'node_modules', 'japa/build/index.js'))
  })

  test('return absolute paths as it is', (assert) => {
    assert.equal(resolveFrom(__dirname, __dirname), join(__dirname))
  })
})
