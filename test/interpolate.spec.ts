/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import { interpolate } from '../src/interpolate'

test.group('Interpolate', () => {
	test('interpolate values inside a template', (assert) => {
		assert.equal(interpolate('hello {username}', { username: 'virk' }), 'hello virk')
	})

	test('interpolate nested values inside a template', (assert) => {
		assert.equal(interpolate('hello {user.username}', { user: { username: 'virk' } }), 'hello virk')
	})

	test('interpolate array index', (assert) => {
		assert.equal(
			interpolate('hello {users.0.username}', { users: [{ username: 'virk' }] }),
			'hello virk'
		)
	})

	test('replace keyword with undefined when value is missing', (assert) => {
		assert.equal(interpolate('hello {user.username}', { user: {} }), 'hello undefined')
	})

	test('replace keyword with undefined when parent is missing', (assert) => {
		assert.equal(interpolate('hello {user.username}', {}), 'hello undefined')
	})

	test('replace keyword with undefined when array index is missing', (assert) => {
		assert.equal(interpolate('hello {users.1.username}', { users: [] }), 'hello undefined')
	})

	test('interpolate multiline string', (assert) => {
		assert.equal(
			interpolate(
				`
			hello {username}
		`,
				{ username: 'virk' }
			).trim(),
			'hello virk'
		)
	})

	test('interpolate numeric values', (assert) => {
		assert.equal(interpolate('total is {total}', { total: 300 }), 'total is 300')
	})

	test('interpolate negative numeric values', (assert) => {
		assert.equal(interpolate('total is {total}', { total: -300 }), 'total is -300')
	})

	test('interpolate boolean values', (assert) => {
		assert.equal(interpolate('it is {state}', { state: false }), 'it is false')
	})

	test('interpolate dates', (assert) => {
		const date = new Date()
		assert.equal(interpolate('it is {date}', { date }), `it is ${date.toString()}`)
	})
})
