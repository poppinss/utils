/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import * as string from '../src/helpers/string.js'

test.group('String helpers', () => {
  test('convert string to camelCase', ({ assert }) => {
    assert.equal(string.camelCase('hello_world'), 'helloWorld')
  })

  test('convert string to snake_case', ({ assert }) => {
    assert.equal(string.snakeCase('helloWorld'), 'hello_world')
  })

  test('convert string to dash-case', ({ assert }) => {
    assert.equal(string.dashCase('helloWorld'), 'hello-world')
  })

  test('convert string to dash-case and capitalize', ({ assert }) => {
    assert.equal(string.dashCase('helloWorld', { capitalize: true }), 'Hello-World')
  })

  test('convert string to PascalCase', ({ assert }) => {
    assert.equal(string.pascalCase('helloWorld'), 'HelloWorld')
  })

  test('convert string to Capital Case', ({ assert }) => {
    assert.equal(string.capitalCase('helloWorld'), 'Hello World')
    assert.equal(string.capitalCase('Here is a fox'), 'Here Is A Fox')
  })

  test('convert string to Title Case', ({ assert }) => {
    assert.equal(string.titleCase('hello World'), 'Hello World')
    assert.equal(string.titleCase('Here is a fox'), 'Here Is a Fox')
  })

  test('convert string to Sentence case', ({ assert }) => {
    assert.equal(string.sentenceCase('hello_world_and_universe'), 'Hello world and universe')
  })

  test('convert string to dot.case', ({ assert }) => {
    assert.equal(string.dotCase('hello_world'), 'hello.world')
  })

  test('remove all cases from string', ({ assert }) => {
    assert.equal(string.noCase('hello_world'), 'hello world')
    assert.equal(string.noCase('helloWorld'), 'hello world')
    assert.equal(string.noCase('hello-world'), 'hello world')
    assert.equal(string.noCase('hello world'), 'hello world')
  })

  test('pluralize a word', ({ assert }) => {
    assert.equal(string.pluralize('box'), 'boxes')
    assert.equal(string.pluralize('i'), 'we')
  })

  test('define irregular rule', ({ assert }) => {
    string.defineIrregularRule('login', 'login')
    assert.equal(string.pluralize('login'), 'login')
  })

  test('define uncountableRule rule', ({ assert }) => {
    string.defineUncountableRule('auth')
    assert.equal(string.pluralize('auth'), 'auth')
  })

  test('singularize a word', ({ assert }) => {
    assert.equal(string.singularize('boxes'), 'box')
  })

  test('truncate a sentence', ({ assert }) => {
    assert.equal(
      string.truncate('This is a very long, maybe not that long title', 12),
      'This is a ve...'
    )
  })

  test('truncate a sentence, but complete words', ({ assert }) => {
    assert.equal(
      string.truncate('This is a very long, maybe not that long title', 12, {
        completeWords: true,
      }),
      'This is a very...'
    )
  })

  test('define a custom suffix', ({ assert }) => {
    assert.equal(
      string.truncate('This is a very long, maybe not that long title', 12, {
        completeWords: true,
        suffix: ' <a href="/1"> Read more </a>',
      }),
      'This is a very <a href="/1"> Read more </a>'
    )
  })

  test('generate excerpt by stripping html', ({ assert }) => {
    assert.equal(
      string.excerpt('<p>This is a <strong>very long</strong>, maybe not that long title</p>', 12),
      'This is a ve...'
    )
  })

  test('generate excerpt by stripping html, but complete words', ({ assert }) => {
    assert.equal(
      string.excerpt('<p>This is a <strong>very long</strong>, maybe not that long title</p>', 12, {
        completeWords: true,
      }),
      'This is a very...'
    )
  })

  test('define a custom suffix', ({ assert }) => {
    assert.equal(
      string.excerpt('<p>This is a <strong>very long</strong>, maybe not that long title</p>', 12, {
        completeWords: true,
        suffix: ' <a href="/1"> Read more </a>',
      }),
      'This is a very <a href="/1"> Read more </a>'
    )
  })

  test('condense whitespace from a string', ({ assert }) => {
    assert.equal(string.condenseWhitespace('hello world '), 'hello world')
    assert.equal(string.condenseWhitespace(' hello world '), 'hello world')
    assert.equal(
      string.condenseWhitespace('hello   world   and  universe '),
      'hello world and universe'
    )
  })

  test('escape html entities', ({ assert }) => {
    assert.equal(string.escapeHTML('<p> foo © bar </p>'), '&lt;p&gt; foo © bar &lt;/p&gt;')
  })

  test('escape html entities and encode symbols', ({ assert }) => {
    assert.equal(
      string.escapeHTML('<p> foo © bar </p>', { encodeSymbols: true }),
      '&lt;p&gt; foo &#xA9; bar &lt;/p&gt;'
    )
  })

  test('slugify string', ({ assert }) => {
    assert.equal(string.toSlug('hello world'), 'hello-world')
  })

  test('slugify string containing unicode symbols', ({ assert }) => {
    assert.equal(string.toSlug('hello ♥ world'), 'hello-love-world')
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

  test('ordinalize a value', ({ assert }) => {
    assert.equal(string.ordinalize(1), '1st')
    assert.equal(string.ordinalize(2), '2nd')
    assert.equal(string.ordinalize(84), '84th')
    assert.equal(string.ordinalize(0), '0th')
    assert.equal(string.ordinalize(10), '10th')
    assert.equal(string.ordinalize(12.87), '12.87th')
    assert.equal(string.ordinalize(99), '99th')
    assert.equal(string.ordinalize(-14), '-14th')
    assert.throw(
      () => string.ordinalize(Number.POSITIVE_INFINITY),
      'Cannot ordinalize NAN or infinite numbers'
    )
  })

  test('generate random string of given length', ({ assert }) => {
    assert.lengthOf(string.generateRandom(32), 32)
  })

  test('convert unit expression to bytes', ({ assert }) => {
    assert.equal(string.toBytes('1KB'), 1024)
    assert.equal(string.toBytes(1000), 1000)
  })

  test('convert time expression to ms', ({ assert }) => {
    assert.equal(string.toMs('1 hour'), 60 * 60 * 1000)
    assert.equal(string.toMs(60), 60)
  })
})
