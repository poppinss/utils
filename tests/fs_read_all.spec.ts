/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import string from '@poppinss/string'
import { join, normalize } from 'node:path'
import { ensureDir, remove, outputFile } from 'fs-extra'
import { fsReadAll } from '../modules/fs/fs_read_all.js'

const BASE_PATH = join(import.meta.dirname, 'app')

test.group('FS read all | relative paths', (group) => {
  group.each.setup(async () => {
    await ensureDir(BASE_PATH)
    return () => remove(BASE_PATH)
  })

  test('get a list of all files from a directory', async ({ assert, expectTypeOf }) => {
    await outputFile(join(BASE_PATH, 'app.ts'), '')
    await outputFile(join(BASE_PATH, 'server.ts'), '')
    await outputFile(join(BASE_PATH, 'config.js'), '')
    await outputFile(join(BASE_PATH, 'main.json'), '')

    const files = await fsReadAll(BASE_PATH)

    expectTypeOf(files).toEqualTypeOf<string[]>()
    assert.deepEqual(files, ['app.ts', 'config.js', 'main.json', 'server.ts'].map(normalize))
  })

  test('get a list of all files from a URL', async ({ assert, expectTypeOf }) => {
    await outputFile(join(BASE_PATH, 'app.ts'), '')
    await outputFile(join(BASE_PATH, 'server.ts'), '')
    await outputFile(join(BASE_PATH, 'config.js'), '')
    await outputFile(join(BASE_PATH, 'main.json'), '')

    const files = await fsReadAll(new URL('./app', import.meta.url))

    expectTypeOf(files).toEqualTypeOf<string[]>()
    assert.deepEqual(files, ['app.ts', 'config.js', 'main.json', 'server.ts'].map(normalize))
  })

  test('recursively get a list of all files from a directory', async ({ assert, expectTypeOf }) => {
    await outputFile(join(BASE_PATH, 'app.ts'), '')
    await outputFile(join(BASE_PATH, 'app/server.ts'), '')
    await outputFile(join(BASE_PATH, 'config/config.js'), '')
    await outputFile(join(BASE_PATH, 'config/main.json'), '')

    const files = await fsReadAll(BASE_PATH)

    expectTypeOf(files).toEqualTypeOf<string[]>()
    assert.deepEqual(
      files,
      ['app.ts', 'app/server.ts', 'config/config.js', 'config/main.json'].map(normalize)
    )
  })

  test('ignore dot files and directories', async ({ assert, expectTypeOf }) => {
    await outputFile(join(BASE_PATH, 'app.ts'), '')
    await outputFile(join(BASE_PATH, '.gitignore'), '')
    await outputFile(join(BASE_PATH, 'app/.gitignore'), '')
    await outputFile(join(BASE_PATH, '.github/workflow.yaml'), '')
    await outputFile(join(BASE_PATH, 'app/server.ts'), '')
    await outputFile(join(BASE_PATH, 'config/config.js'), '')
    await outputFile(join(BASE_PATH, 'config/main.json'), '')

    const files = await fsReadAll(BASE_PATH)

    expectTypeOf(files).toEqualTypeOf<string[]>()
    assert.deepEqual(
      files,
      ['app.ts', 'app/server.ts', 'config/config.js', 'config/main.json'].map(normalize)
    )
  })

  test('should not filter files when the root absolute path contains a dot directory', async ({
    assert,
  }) => {
    const dotParentPath = join(BASE_PATH, '.hidden-parent', 'project', 'config')
    await outputFile(join(dotParentPath, 'app.ts'), '')
    await outputFile(join(dotParentPath, 'logger.ts'), '')

    const files = await fsReadAll(dotParentPath)

    assert.deepEqual(files, ['app.ts', 'logger.ts'].map(normalize))
  })

  test('apply filter to ignore certain files', async ({ assert, expectTypeOf }) => {
    await outputFile(join(BASE_PATH, 'app.ts'), '')
    await outputFile(join(BASE_PATH, '.gitignore'), '')
    await outputFile(join(BASE_PATH, 'app/.gitignore'), '')
    await outputFile(join(BASE_PATH, '.github/workflow.yaml'), '')
    await outputFile(join(BASE_PATH, 'app/server.ts'), '')
    await outputFile(join(BASE_PATH, 'config/config.js'), '')
    await outputFile(join(BASE_PATH, 'config/main.json'), '')

    const files = await fsReadAll(BASE_PATH, {
      filter: (filePath) => filePath.endsWith('.ts'),
    })

    expectTypeOf(files).toEqualTypeOf<string[]>()
    assert.deepEqual(files, ['app.ts', 'app/server.ts'].map(normalize))
  })

  test('apply custom sort', async ({ assert, expectTypeOf }) => {
    await outputFile(join(BASE_PATH, 'app.ts'), '')
    await outputFile(join(BASE_PATH, '.gitignore'), '')
    await outputFile(join(BASE_PATH, 'app/.gitignore'), '')
    await outputFile(join(BASE_PATH, '.github/workflow.yaml'), '')
    await outputFile(join(BASE_PATH, 'app/server.ts'), '')
    await outputFile(join(BASE_PATH, 'config/config.js'), '')
    await outputFile(join(BASE_PATH, 'config/main.json'), '')

    const files = await fsReadAll(BASE_PATH, {
      sort: (current, next) => {
        if (next < current) {
          return -1
        }

        return 0
      },
    })

    expectTypeOf(files).toEqualTypeOf<string[]>()
    assert.deepEqual(
      files,
      ['config/main.json', 'config/config.js', 'app/server.ts', 'app.ts'].map(normalize)
    )
  })

  test('get unix paths', async ({ assert, expectTypeOf }) => {
    await outputFile(join(BASE_PATH, 'app.ts'), '')
    await outputFile(join(BASE_PATH, 'app/server.ts'), '')
    await outputFile(join(BASE_PATH, 'config/config.js'), '')
    await outputFile(join(BASE_PATH, 'config/main.json'), '')

    const files = await fsReadAll(BASE_PATH, { pathType: 'unixRelative' })

    expectTypeOf(files).toEqualTypeOf<string[]>()
    assert.deepEqual(files, ['app.ts', 'app/server.ts', 'config/config.js', 'config/main.json'])
  })
})

test.group('FS read all | absolute paths', (group) => {
  group.each.setup(async () => {
    await ensureDir(BASE_PATH)
    return () => remove(BASE_PATH)
  })

  test('get a list of all files from a directory', async ({ assert, expectTypeOf }) => {
    await outputFile(join(BASE_PATH, 'app.ts'), '')
    await outputFile(join(BASE_PATH, 'server.ts'), '')
    await outputFile(join(BASE_PATH, 'config.js'), '')
    await outputFile(join(BASE_PATH, 'main.json'), '')

    const files = await fsReadAll(BASE_PATH, {
      pathType: 'absolute',
    })

    expectTypeOf(files).toEqualTypeOf<string[]>()
    assert.deepEqual(
      files,
      ['app.ts', 'config.js', 'main.json', 'server.ts'].map((filePath) =>
        join(BASE_PATH, normalize(filePath))
      )
    )
  })

  test('recursively get a list of all files from a directory', async ({ assert, expectTypeOf }) => {
    await outputFile(join(BASE_PATH, 'app.ts'), '')
    await outputFile(join(BASE_PATH, 'app/server.ts'), '')
    await outputFile(join(BASE_PATH, 'config/config.js'), '')
    await outputFile(join(BASE_PATH, 'config/main.json'), '')

    const files = await fsReadAll(BASE_PATH, {
      pathType: 'absolute',
    })

    expectTypeOf(files).toEqualTypeOf<string[]>()
    assert.deepEqual(
      files,
      ['app.ts', 'app/server.ts', 'config/config.js', 'config/main.json'].map((filePath) =>
        join(BASE_PATH, normalize(filePath))
      )
    )
  })

  test('ignore dot files and directories', async ({ assert, expectTypeOf }) => {
    await outputFile(join(BASE_PATH, 'app.ts'), '')
    await outputFile(join(BASE_PATH, '.gitignore'), '')
    await outputFile(join(BASE_PATH, 'app/.gitignore'), '')
    await outputFile(join(BASE_PATH, '.github/workflow.yaml'), '')
    await outputFile(join(BASE_PATH, 'app/server.ts'), '')
    await outputFile(join(BASE_PATH, 'config/config.js'), '')
    await outputFile(join(BASE_PATH, 'config/main.json'), '')

    const files = await fsReadAll(BASE_PATH, {
      pathType: 'absolute',
    })

    expectTypeOf(files).toEqualTypeOf<string[]>()
    assert.deepEqual(
      files,
      ['app.ts', 'app/server.ts', 'config/config.js', 'config/main.json'].map((filePath) =>
        join(BASE_PATH, normalize(filePath))
      )
    )
  })

  test('apply filter to ignore certain files', async ({ assert, expectTypeOf }) => {
    await outputFile(join(BASE_PATH, 'app.ts'), '')
    await outputFile(join(BASE_PATH, '.gitignore'), '')
    await outputFile(join(BASE_PATH, 'app/.gitignore'), '')
    await outputFile(join(BASE_PATH, '.github/workflow.yaml'), '')
    await outputFile(join(BASE_PATH, 'app/server.ts'), '')
    await outputFile(join(BASE_PATH, 'config/config.js'), '')
    await outputFile(join(BASE_PATH, 'config/main.json'), '')

    const files = await fsReadAll(BASE_PATH, {
      pathType: 'absolute',
      filter: (filePath) => filePath.endsWith('.ts'),
    })

    expectTypeOf(files).toEqualTypeOf<string[]>()
    assert.deepEqual(
      files,
      ['app.ts', 'app/server.ts'].map((filePath) => join(BASE_PATH, normalize(filePath)))
    )
  })

  test('apply custom sort', async ({ assert, expectTypeOf }) => {
    await outputFile(join(BASE_PATH, 'app.ts'), '')
    await outputFile(join(BASE_PATH, '.gitignore'), '')
    await outputFile(join(BASE_PATH, 'app/.gitignore'), '')
    await outputFile(join(BASE_PATH, '.github/workflow.yaml'), '')
    await outputFile(join(BASE_PATH, 'app/server.ts'), '')
    await outputFile(join(BASE_PATH, 'config/config.js'), '')
    await outputFile(join(BASE_PATH, 'config/main.json'), '')

    const files = await fsReadAll(BASE_PATH, {
      pathType: 'absolute',
      sort: (current, next) => {
        if (next < current) {
          return -1
        }

        return 0
      },
    })

    expectTypeOf(files).toEqualTypeOf<string[]>()
    assert.deepEqual(
      files,
      ['config/main.json', 'config/config.js', 'app/server.ts', 'app.ts'].map((filePath) =>
        join(BASE_PATH, normalize(filePath))
      )
    )
  })

  test('get unix paths', async ({ assert, expectTypeOf }) => {
    await outputFile(join(BASE_PATH, 'app.ts'), '')
    await outputFile(join(BASE_PATH, 'app/server.ts'), '')
    await outputFile(join(BASE_PATH, 'config/config.js'), '')
    await outputFile(join(BASE_PATH, 'config/main.json'), '')

    const files = await fsReadAll(BASE_PATH, {
      pathType: 'unixAbsolute',
    })

    expectTypeOf(files).toEqualTypeOf<string[]>()
    assert.deepEqual(
      files,
      ['app.ts', 'app/server.ts', 'config/config.js', 'config/main.json'].map(
        (filePath) => `${string.toUnixSlash(BASE_PATH)}/${filePath}`
      )
    )
  })
})
