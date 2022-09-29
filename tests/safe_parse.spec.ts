/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import json from '../src/json/main.js'

test.group('Parser', () => {
  test('parses object string', ({ assert }) => {
    assert.deepEqual(json.safeParse('{"a": 5, "b": 6}'), { a: 5, b: 6 })
  })

  test('parses null string', ({ assert }) => {
    assert.deepEqual(json.safeParse('null'), null)
  })

  test('parses zero string', ({ assert }) => {
    assert.deepEqual(json.safeParse('0'), 0)
  })

  test('parses string string', ({ assert }) => {
    assert.deepEqual(json.safeParse('"x"'), 'x')
  })

  test('parses object string (reviver)', ({ assert }) => {
    const reviver = (_: string, value: any) => {
      return typeof value === 'number' ? value + 1 : value
    }

    assert.deepEqual(json.safeParse('{"a": 5, "b": 6}', reviver), { a: 6, b: 7 })
  })

  test('sanitizes object string (reviver, options)', ({ assert }) => {
    const reviver = (_: string, value: any) => {
      return typeof value === 'number' ? value + 1 : value
    }

    assert.deepEqual(json.safeParse('{ "a": 5, "b": 6, "__proto__": { "x": 7 } }', reviver), {
      a: 6,
      b: 7,
    })
  })

  test('sanitizes object string (options)', ({ assert }) => {
    assert.deepEqual(json.safeParse('{ "a": 5, "b": 6, "__proto__": { "x": 7 } }'), { a: 5, b: 6 })
  })

  test('sanitizes object string (undefined, options)', ({ assert }) => {
    assert.deepEqual(json.safeParse('{ "a": 5, "b": 6, "__proto__": { "x": 7 } }', undefined), {
      a: 5,
      b: 6,
    })
  })

  test('sanitizes nested object string', ({ assert }) => {
    const text =
      '{ "a": 5, "b": 6, "__proto__": { "x": 7 }, "c": { "d": 0, "e": "text", "__proto__": { "y": 8 }, "f": { "g": 2 } } }'
    assert.deepEqual(json.safeParse(text), {
      a: 5,
      b: 6,
      c: { d: 0, e: 'text', f: { g: 2 } },
    })
  })
})
