/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { join } from 'node:path'

import { dirname } from '../test_helpers/index.js'
import { resolveFrom } from '../src/helpers/resolve_from.js'

test.group('resolve from', () => {
  test('resolve relative path from a base directory', ({ assert }) => {
    assert.equal(
      resolveFrom(dirname(import.meta.url), '../src/Helpers/requireAll'),
      join(dirname(import.meta.url), '../src', 'Helpers', 'requireAll.ts')
    )
  })

  test('resolve package', ({ assert }) => {
    assert.equal(
      resolveFrom(dirname(import.meta.url), 'japa'),
      join(dirname(import.meta.url), '..', 'node_modules', 'japa/build/index.js')
    )
  })

  test('return absolute paths as it is', ({ assert }) => {
    assert.equal(
      resolveFrom(dirname(import.meta.url), dirname(import.meta.url)),
      join(dirname(import.meta.url))
    )
  })

  test('raise error when package is missing', ({ assert }) => {
    const fn = () => resolveFrom(dirname(import.meta.url), 'foo')
    assert.throws(fn, `Cannot find module 'foo'`)
  })
})
