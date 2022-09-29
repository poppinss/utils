/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
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

  test('escape html entities', ({ assert }) => {
    assert.equal(string.escape('<p> foo © bar </p>'), '&lt;p&gt; foo © bar &lt;/p&gt;')
  })

  test('escape html entities and encode symbols', ({ assert }) => {
    assert.equal(
      string.encode(string.escape('<p> foo © bar </p>')),
      '&lt;p&gt; foo &#xA9; bar &lt;/p&gt;'
    )
  })

  test('make sentence from multiple words', ({ assert }) => {
    assert.equal(
      string.toSentence(['routes', 'controllers', 'middleware']),
      'routes, controllers, and middleware'
    )
  })

  test('make sentence from two words', ({ assert }) => {
    assert.equal(string.toSentence(['routes', 'controllers']), 'routes and controllers')
  })

  test('make sentence from one word', ({ assert }) => {
    assert.equal(string.toSentence(['routes']), 'routes')
  })

  test('make sentence from non string values', ({ assert }) => {
    assert.equal(string.toSentence([0, 1, false], { lastSeparator: ', or ' }), '0, 1, or false')
  })

  // test('ordinalize a value', ({ assert }) => {
  //   assert.equal(string.ordinalize(1), '1st')
  //   assert.equal(string.ordinalize(2), '2nd')
  //   assert.equal(string.ordinalize(84), '84th')
  //   assert.equal(string.ordinalize(0), '0th')
  //   assert.equal(string.ordinalize(10), '10th')
  //   assert.equal(string.ordinalize(12.87), '12.87th')
  //   assert.equal(string.ordinalize(99), '99th')
  //   assert.equal(string.ordinalize(-14), '-14th')
  //   assert.throws(
  //     () => string.ordinalize(Number.POSITIVE_INFINITY),
  //     'Cannot ordinalize NAN or infinite numbers'
  //   )
  // })

  test('generate random string of given length', ({ assert }) => {
    assert.lengthOf(string.random(32), 32)
  })

  test('convert unit expression to bytes', ({ assert }) => {
    assert.equal(string.bytes.parse('1KB'), 1024)
    assert.equal(string.bytes.parse(1000), 1000)
  })

  test('convert time expression to ms', ({ assert }) => {
    assert.equal(string.milliseconds.parse('1 hour'), 60 * 60 * 1000)
    assert.equal(string.milliseconds.parse(60), 60)
  })
})
