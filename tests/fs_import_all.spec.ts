/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { join } from 'node:path'
import { test } from '@japa/runner'
import { ensureDir, remove, outputFile } from 'fs-extra'

import { getDirname } from '../index.js'
import { fsImportAll } from '../src/fs_import_all.js'

const BASE_PATH = join(getDirname(import.meta.url), 'app')

test.group('importAll', (group) => {
  group.tap((t) => t.skip(import.meta.url.endsWith('.js'), 'Need ts-node'))

  group.each.setup(async () => {
    await ensureDir(BASE_PATH)
    return () => remove(BASE_PATH)
  })

  test('import script files from the disk', async ({ assert }) => {
    await outputFile(
      join(BASE_PATH, 'app.ts'),
      `export default {
      loaded: true
    }`
    )

    await outputFile(join(BASE_PATH, 'server.ts'), 'export const loaded = true')
    await outputFile(join(BASE_PATH, 'config.cjs'), 'module.exports = { loaded: true }')
    await outputFile(join(BASE_PATH, 'main.json'), '{ "loaded": true }')

    const collection = await fsImportAll(BASE_PATH)
    assert.deepEqual(collection, {
      app: { loaded: true },
      server: { loaded: true },
      config: { loaded: true },
      main: { loaded: true },
    })
  })

  test('import files recursively', async ({ assert }) => {
    await outputFile(
      join(BASE_PATH, 'ts/app.ts'),
      `export default {
      loaded: true
    }`
    )

    await outputFile(join(BASE_PATH, 'ts/server.ts'), 'export const loaded = true')
    await outputFile(join(BASE_PATH, 'js/config.cjs'), 'module.exports = { loaded: true }')
    await outputFile(join(BASE_PATH, 'json/main.json'), '{ "loaded": true }')

    const collection = await fsImportAll(BASE_PATH)
    assert.deepEqual(collection, {
      ts: {
        app: { loaded: true },
        server: { loaded: true },
      },
      js: {
        config: { loaded: true },
      },
      json: {
        main: { loaded: true },
      },
    })
  })

  test('ignore .d.ts files', async ({ assert }) => {
    await outputFile(
      join(BASE_PATH, 'ts/app.ts'),
      `export default {
      loaded: true
    }`
    )

    await outputFile(join(BASE_PATH, 'ts/server.d.ts'), 'export const loaded = true')
    await outputFile(join(BASE_PATH, 'js/config.cjs'), 'module.exports = { loaded: true }')
    await outputFile(join(BASE_PATH, 'json/main.json'), '{ "loaded": true }')

    const collection = await fsImportAll(BASE_PATH)
    assert.deepEqual(collection, {
      ts: {
        app: { loaded: true },
      },
      js: {
        config: { loaded: true },
      },
      json: {
        main: { loaded: true },
      },
    })
  })

  test('raise error when root directory is missing', async ({ assert }) => {
    const fn = () => fsImportAll(join(BASE_PATH, 'foo'))
    await assert.rejects(fn, `ENOENT: no such file or directory, stat '${join(BASE_PATH, 'foo')}'`)
  })

  test('allow missing root directory', async ({ assert }) => {
    const collection = await fsImportAll(join(BASE_PATH, 'foo'), { ignoreMissingRoot: true })
    assert.deepEqual(collection, {})
  })

  test('define custom filter', async ({ assert }) => {
    await outputFile(
      join(BASE_PATH, 'app.ts'),
      `export default {
      loaded: true
    }`
    )

    await outputFile(join(BASE_PATH, 'server.ts'), 'export const loaded = true')
    await outputFile(join(BASE_PATH, 'config.js'), 'module.exports = { loaded: true }')
    await outputFile(join(BASE_PATH, 'main.json'), '{ "loaded": true }')

    const collection = await fsImportAll(BASE_PATH, {
      filter: (filePath) => filePath.endsWith('.json'),
    })

    assert.deepEqual(collection, {
      main: { loaded: true },
    })
  })

  test('define key name for the file', async ({ assert }) => {
    await outputFile(join(BASE_PATH, 'foo/bar/main.json'), '{ "loaded": true }')

    const collection = await fsImportAll(BASE_PATH, {
      transformKeys: (keys) => {
        return keys.map((key) => key.toUpperCase())
      },
    })

    assert.deepEqual(collection, {
      FOO: {
        BAR: {
          MAIN: { loaded: true },
        },
      },
    })
  })
})
