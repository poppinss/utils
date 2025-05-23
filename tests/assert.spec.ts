/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import assert from '../src/assert.js'

test.group('assert', () => {
  test('throw exception when value is falsy', ({ expectTypeOf }) => {
    const value = false as string | false
    assert(value)

    expectTypeOf(value).toMatchTypeOf<string>()
  }).throws('value is falsy')

  test('throw exception with custom message when value is falsy', ({ expectTypeOf }) => {
    const value = null as string | null
    assert(value, 'Value must be defined')

    expectTypeOf(value).toMatchTypeOf<string>()
  }).throws('Value must be defined')

  test('do not throw exception when value is truthy', () => {
    assert(true)
  })
})

test.group('assertNotNull', () => {
  test('throw exception when value is null', ({ expectTypeOf }) => {
    const value = null as string | null
    assert.notNull(value)

    expectTypeOf(value).toMatchTypeOf<string>()
  }).throws('unexpected null value')

  test('throw exception with custom message when value is null', ({ expectTypeOf }) => {
    const value = null as string | null
    assert.notNull(value, 'Cannot be null')

    expectTypeOf(value).toMatchTypeOf<string>()
  }).throws('Cannot be null')

  test('do not throw when value is not null', ({ expectTypeOf }) => {
    const value = undefined as string | undefined | null
    assert.notNull(value)
    expectTypeOf(value).toMatchTypeOf<string | undefined>()
  })
})

test.group('assertIsDefined', () => {
  test('throw exception when value is undefined', ({ expectTypeOf }) => {
    const value = undefined as string | undefined
    assert.isDefined(value)

    expectTypeOf(value).toMatchTypeOf<string>()
  }).throws('unexpected undefined value')

  test('throw exception with custom message when value is undefined', ({ expectTypeOf }) => {
    const value = undefined as string | undefined
    assert.isDefined(value, 'Cannot be undefined')

    expectTypeOf(value).toMatchTypeOf<string>()
  }).throws('Cannot be undefined')

  test('do not throw when value is not undefined', ({ expectTypeOf }) => {
    const value = null as string | undefined | null
    assert.isDefined(value)
    expectTypeOf(value).toMatchTypeOf<string | null>()
  })
})

test.group('assertUnreachable', () => {
  test('throw exception when method is called', () => {
    assert.unreachable()
  }).throws('unreachable code executed: undefined')
})
