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
import { resolveDir } from '../src/helpers/resolve_dir.js'

test.group('resolve dir', () => {
  test('resolve relative path from the base directory', ({ assert }) => {
    assert.equal(
      resolveDir(dirname(import.meta.url), '../src'),
      join(dirname(import.meta.url), '../src')
    )
  })

  test('resolve path inside a package without index.js file', ({ assert }) => {
    assert.equal(
      resolveDir(dirname(import.meta.url), 'japa/build/src'),
      join(dirname(import.meta.url), '../node_modules', 'japa', 'build', 'src')
    )
  })

  test('raise error when unable to locale package', ({ assert }) => {
    const fn = () => resolveDir(dirname(import.meta.url), 'foo/build/src')
    assert.throws(fn, 'Cannot locate directory "foo/build/src"')
  })
})
