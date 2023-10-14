/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { importDefault } from '../index.js'

test.group('Import default', () => {
  test('raise error when import function does not return a default export', async ({ assert }) => {
    await assert.rejects(async () => {
      await importDefault(async () => {
        return {
          foo: 'bar',
        }
      })
    }, /Missing "export default" from lazy import/)
  })

  test('print error with filePath when specified', async ({ assert }) => {
    await assert.rejects(
      () =>
        importDefault(async () => {
          return {
            foo: 'bar',
          }
        }, './foo.ts'),
      'Missing "export default" in module "./foo.ts"'
    )
  })

  test('get default export value from a module', async ({ assert, expectTypeOf }) => {
    const value = await importDefault(async () => {
      return {
        default: {
          foo: 'bar',
        },
      }
    }, './foo.ts')

    expectTypeOf(value).toMatchTypeOf<{ foo: string }>()
    assert.deepEqual(value, {
      foo: 'bar',
    })
  })
})
