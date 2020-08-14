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

import { resolveDir } from '../src/resolveDir'

test.group('resolve dir', () => {
	test('resolve relative path from the base directory', (assert) => {
		assert.equal(resolveDir(__dirname, '../src'), join(__dirname, '../src'))
	})

	test('resolve path inside a package without index.js file', (assert) => {
		assert.equal(
			resolveDir(__dirname, 'japa/build/src'),
			join(__dirname, '../node_modules', 'japa', 'build', 'src')
		)
	})

	test('raise error when unable to locale package', (assert) => {
		const fn = () => resolveDir(__dirname, 'foo/build/src')
		assert.throw(fn, 'Cannot locate directory "foo/build/src"')
	})
})
