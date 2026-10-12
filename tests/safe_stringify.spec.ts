/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { safeStringify } from '../modules/json/main.js'

test.group('Stringify', () => {
  test('stringify number', ({ assert }) => {
    assert.deepEqual(safeStringify(1), '1')
  })

  test('stringify boolean', ({ assert }) => {
    assert.deepEqual(safeStringify(false), 'false')
  })

  test('stringify date/time', ({ assert }) => {
    const date = new Date()
    assert.deepEqual(safeStringify(date), `"${date.toISOString()}"`)
  })

  test('stringify object', ({ assert }) => {
    assert.deepEqual(safeStringify({ b: 2, a: 1 }), '{"b":2,"a":1}')
  })

  test('stringify object with circular reference', ({ assert }) => {
    const a: any = {
      b: 2,
    }
    a.a = a
    assert.deepEqual(safeStringify(a), '{"b":2}')
  })

  test('stringify object with bigint', ({ assert }) => {
    const a: any = {
      b: BigInt(10),
      a: 10,
    }
    assert.deepEqual(safeStringify(a), '{"b":"10","a":10}')
  })

  test('stringify object with bigint and circular reference', ({ assert }) => {
    const a: any = {
      b: BigInt(10),
    }
    a.a = a
    assert.deepEqual(safeStringify(a), '{"b":"10"}')
  })

  test('stringifies object', ({ assert }) => {
    assert.deepEqual(safeStringify({ a: 18, b: 4 }), '{"a":18,"b":4}')
  })

  test('stringifies object (replacer)', ({ assert }) => {
    const replacer = (_: any, value: any) => {
      return typeof value === 'number' ? value + 1 : value
    }

    assert.deepEqual(safeStringify({ a: 18, b: 4 }, replacer), '{"a":19,"b":5}')
  })

  test('stringifies object removing circular reference', ({ assert }) => {
    const o: any = { a: 18, b: 4 }
    o.o = o
    assert.deepEqual(safeStringify(o), '{"a":18,"b":4}')
  })

  test('stringifies object with bigint', ({ assert }) => {
    assert.deepEqual(safeStringify({ a: BigInt(18), b: 4 }), '{"a":"18","b":4}')
  })

  test('stringifies object with bigint (replacer returns bigint)', ({ assert }) => {
    const replacer = (_: any, value: any) => {
      return typeof value === 'bigint' ? value + BigInt(1) : value
    }

    assert.deepEqual(safeStringify({ a: BigInt(18), b: 4 }, replacer), '{"a":"19","b":4}')
  })

  test('stringifies object with bigint (replacer handles bigint)', ({ assert }) => {
    const replacer = (_: any, value: any) => {
      return typeof value === 'bigint' ? `${value.toString()}n` : value
    }

    assert.deepEqual(safeStringify({ a: BigInt(18), b: 4 }, replacer), '{"a":"18n","b":4}')
  })

  test('call toJSON', ({ assert }) => {
    assert.deepEqual(
      safeStringify({
        toJSON() {
          return {
            foo: 'bar',
            baz: {
              toJSON() {
                return 'baz'
              },
            },
          }
        },
      }),
      '{"foo":"bar","baz":"baz"}'
    )
  })

  test('raise exception when toJSON returns error', ({ assert }) => {
    assert.throws(
      () =>
        safeStringify({
          toJSON() {
            throw new Error('blow up')
          },
        }),
      'blow up'
    )
  })

  test('stringify nested bigints', ({ assert }) => {
    assert.equal(safeStringify({ a: { b: [BigInt(1), BigInt(2)] } }), '{"a":{"b":["1","2"]}}')
  })

  test('stringify top-level bigint', ({ assert }) => {
    assert.equal(safeStringify(BigInt(10)), '"10"')
  })

  test('stringify array with circular reference', ({ assert }) => {
    const list: any[] = [1]
    list.push(list)
    assert.equal(safeStringify(list), '[1,null]')
  })

  test('stringify shared references that are not circular', ({ assert }) => {
    const shared = { x: 1 }
    assert.equal(
      safeStringify({ a: shared, b: shared, c: [shared] }),
      '{"a":{"x":1},"b":{"x":1},"c":[{"x":1}]}'
    )
  })

  test('stringify lone surrogates as escape sequences', ({ assert }) => {
    assert.equal(safeStringify('\ud800x\udc00'), '"\\ud800x\\udc00"')
  })

  test('stringify built-in objects', ({ assert }) => {
    assert.equal(safeStringify({ m: new Map([[1, 2]]), s: new Set([1]) }), '{"m":{},"s":{}}')
    assert.equal(safeStringify(Buffer.from('hi')), '{"type":"Buffer","data":[104,105]}')
    assert.equal(safeStringify(new Error('boom')), '{}')
    assert.equal(safeStringify(/x/g), '{}')
    assert.equal(safeStringify({ d: new Date(Number.NaN) }), '{"d":null}')
  })

  test('stringify object without prototype', ({ assert }) => {
    const value = Object.create(null)
    value.a = 1
    assert.equal(safeStringify(value), '{"a":1}')
  })

  test('stringify array holes and unsupported values', ({ assert }) => {
    // eslint-disable-next-line no-sparse-arrays
    assert.equal(safeStringify([1, , undefined, () => {}, Symbol('s')]), '[1,null,null,null,null]')
    assert.equal(safeStringify([Number.NaN, Infinity, -0]), '[null,null,0]')
  })

  test('ignore symbol keys and non-enumerable properties', ({ assert }) => {
    const value = Object.defineProperty({ a: 1, [Symbol('s')]: 2 }, 'b', {
      value: 2,
      enumerable: false,
    })
    assert.equal(safeStringify(value), '{"a":1}')
  })

  test('stringify getters', ({ assert }) => {
    assert.equal(
      safeStringify({
        get g() {
          return 42
        },
      }),
      '{"g":42}'
    )
  })

  test('stringify boxed primitives as their primitive value', ({ assert }) => {
    /* eslint-disable no-new-wrappers */
    const value = { s: new String('ab'), n: new Number(1), b: new Boolean(false) }
    /* eslint-enable no-new-wrappers */
    assert.equal(safeStringify(value), '{"s":"ab","n":1,"b":false}')
  })

  test('indent output using space', ({ assert }) => {
    assert.equal(safeStringify({ a: [1] }, undefined, 2), '{\n  "a": [\n    1\n  ]\n}')
    assert.equal(safeStringify({ a: 1 }, undefined, '\t'), '{\n\t"a": 1\n}')
    assert.equal(safeStringify({ a: 1 }, undefined, -1), '{"a":1}')
  })

  test('indent output in the fallback path', ({ assert }) => {
    const value: any = { a: BigInt(1) }
    value.self = value
    assert.equal(safeStringify(value, undefined, 2), '{\n  "a": "1"\n}')
  })

  test('call the replacer with the holder as this', ({ assert }) => {
    const holders: any[] = []
    const value = { a: 1 }
    safeStringify(value, function (this: any, key, val) {
      holders.push([key, this])
      return val
    })

    assert.deepEqual(holders[0], ['', { '': value }])
    assert.strictEqual(holders[1][1], value)
  })

  test('call the replacer once per value when the value has bigints', ({ assert }) => {
    const keys: string[] = []
    const output = safeStringify({ a: BigInt(5), b: [BigInt(1)] }, (key, value) => {
      keys.push(key)
      return value
    })

    assert.equal(output, '{"a":"5","b":["1"]}')
    assert.deepEqual(keys, ['', 'a', 'b', '0'])
  })

  test('pass bigints to the replacer before converting them', ({ assert }) => {
    const received: string[] = []
    const output = safeStringify({ a: BigInt(5) }, (_, value) => {
      received.push(typeof value)
      return value
    })

    assert.equal(output, '{"a":"5"}')
    assert.deepEqual(received, ['object', 'bigint'])
  })

  test('convert bigints returned by the replacer', ({ assert }) => {
    const replacer = (_: string, value: any) => (typeof value === 'number' ? BigInt(value) : value)
    assert.equal(safeStringify({ a: 1, b: [2] }, replacer), '{"a":"1","b":["2"]}')
  })

  test('apply the replacer to the output when falling back for circular references', ({
    assert,
  }) => {
    const value: any = { a: 1, b: BigInt(2) }
    value.self = value

    const replacer = (_: string, val: any) => (typeof val === 'number' ? val * 10 : val)
    assert.equal(safeStringify(value, replacer), '{"a":10,"b":"2"}')
  })

  test('call the replacer again during the fallback for circular references', ({ assert }) => {
    const value: any = { a: 1 }
    value.self = value

    let calls = 0
    const output = safeStringify(value, (_, val) => {
      calls++
      return val
    })

    /**
     * The native pass visits "", "a" and "self" before throwing.
     * The fallback visits the same three keys.
     */
    assert.equal(output, '{"a":1}')
    assert.equal(calls, 6)
  })

  test('do not retry when the replacer throws a non TypeError', ({ assert }) => {
    let calls = 0
    assert.throws(
      () =>
        safeStringify({ a: 1 }, () => {
          calls++
          throw new Error('blow up')
        }),
      'blow up'
    )
    assert.equal(calls, 1)
  })
})
