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
import { Filesystem } from '@poppinss/dev-utils'

import { fsReadAll } from '../src/fsReadAll'
const fs = new Filesystem(join(__dirname, 'app'))

test.group('read all', (group) => {
	group.afterEach(async () => {
		await fs.cleanup()
	})

	test('collect .js, .ts and .json files from the disk', async (assert) => {
		await fs.add(
			'app.ts',
			`export default {
      loaded: true
    }`
		)

		await fs.add('server.ts', 'export const loaded = true')
		await fs.add('config.js', 'module.exports = { loaded: true }')
		await fs.add('main.json', '{ "loaded": true }')

		const output = fsReadAll(fs.basePath)
		assert.deepEqual(output, ['app.ts', 'config.js', 'main.json', 'server.ts'])
	})

	test('collect files recursively', async (assert) => {
		await fs.add(
			'ts/app.ts',
			`export default {
      loaded: true
    }`
		)

		await fs.add('ts/server.ts', 'export const loaded = true')
		await fs.add('js/config.js', 'module.exports = { loaded: true }')
		await fs.add('json/main.json', '{ "loaded": true }')

		const output = fsReadAll(fs.basePath)
		assert.deepEqual(output, ['js/config.js', 'json/main.json', 'ts/app.ts', 'ts/server.ts'])
	})

	test.skipInCI('ignore .d.ts files', async (assert) => {
		await fs.add(
			'ts/app.ts',
			`export default {
      loaded: true
    }`
		)

		await fs.add('ts/server.d.ts', 'export const loaded = true')
		await fs.add('js/config.js', 'module.exports = { loaded: true }')
		await fs.add('json/main.json', '{ "loaded": true }')

		const output = fsReadAll(fs.basePath)
		assert.deepEqual(output, ['js/config.js', 'json/main.json', 'ts/app.ts'])
	})
})
