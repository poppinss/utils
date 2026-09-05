/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { naturalSort } from '../src/natural_sort.js'

test.group('natural sort', () => {
  test('sort numbers naturally and preserve the order of equivalent strings', ({ assert }) => {
    assert.deepEqual(['file10', 'file02', 'File2', 'filé2', 'file1'].sort(naturalSort), [
      'file1',
      'file02',
      'File2',
      'filé2',
      'file10',
    ])
  })

  test('match localeCompare ordering for the default locale', ({ assert }) => {
    const values = [
      '',
      'a',
      'A',
      'ä',
      'å',
      'z',
      'é',
      'e\u0301',
      'ß',
      'ss',
      'ı',
      'i',
      'İ',
      'I',
      '配置',
      '😀',
      '\ud800',
      '\udfff',
      '\u0000',
      ...['file', 'nested/item', 'with space/'].flatMap((prefix) =>
        ['0', '01', '1', '2', '10', '100', '١', '２'].map((number) => `${prefix}${number}.js`)
      ),
    ]
    const previous = (current: string, next: string) =>
      current.localeCompare(next, undefined, { numeric: true, sensitivity: 'base' })

    for (const current of values) {
      for (const next of values) {
        assert.equal(Math.sign(naturalSort(current, next)), Math.sign(previous(current, next)))
      }
    }
    assert.deepEqual([...values].sort(naturalSort), [...values].sort(previous))
    assert.deepEqual([...values].reverse().sort(naturalSort), [...values].reverse().sort(previous))
  })
})
