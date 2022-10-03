/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import string from '../src/string/main.js'

test.group('String helpers', () => {
  test('condense whitespace from a string', ({ assert }) => {
    assert.equal(string.condenseWhitespace('hello world '), 'hello world')
    assert.equal(string.condenseWhitespace(' hello world '), 'hello world')
    assert.equal(
      string.condenseWhitespace('hello   world   and  universe '),
      'hello world and universe'
    )
  })

  test('generate random string of given length', ({ assert }) => {
    assert.lengthOf(string.random(32), 32)
  })

  test('convert unit expression to bytes', ({ assert }) => {
    assert.equal(string.bytes.parse('1KB'), 1024)
    assert.equal(string.bytes.parse('1MB'), 1048576)
    assert.equal(string.bytes.parse(1000), 1000)
  })

  test('format bytes to pretty bytes string expression', ({ assert }) => {
    assert.equal(string.bytes.format(1024), '1KB')
    assert.equal(string.bytes.format(1024 * 1024 * 1000, {}), '1000MB')
  })

  test('convert time expression to ms', ({ assert }) => {
    assert.equal(string.milliseconds.parse('1 hour'), 60 * 60 * 1000)
    assert.equal(string.milliseconds.parse(60), 60)
  })

  test('format milliseconds to pretty time string expression', ({ assert }) => {
    assert.equal(string.milliseconds.format(3.6e6), '1h')
    assert.equal(string.milliseconds.format(3.6e6, true), '1 hour')
  })

  test('convert time expression to seconds', ({ assert }) => {
    assert.equal(string.seconds.parse('10 hour'), 36000)
    assert.equal(string.seconds.parse(60), 60)
  })

  test('format seconds to pretty time string expression', ({ assert }) => {
    assert.equal(string.seconds.format(36000), '10h')
    assert.equal(string.seconds.format(36000, true), '10 hours')
  })
})
