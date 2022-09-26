/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { ObjectBuilder } from '../src/helpers/object_builder.js'

test.group('ObjectBuilder', () => {
  test('add value to the object', ({ assert }) => {
    assert.deepEqual(new ObjectBuilder().add('name', 'virk').value, {
      name: 'virk',
    })
  })

  test('ignore if value is undefined', ({ assert }) => {
    assert.deepEqual(new ObjectBuilder().add('name', undefined).value, {})
  })

  test('add null values', ({ assert }) => {
    assert.deepEqual(new ObjectBuilder().add('name', null).value, { name: null })
  })

  test('ignore null values', ({ assert }) => {
    assert.deepEqual(new ObjectBuilder(true).add('name', null).value, {})
  })

  test('get existing value', ({ assert }) => {
    const obj = new ObjectBuilder()
    obj.add('name', 'virk')

    assert.equal(obj.get('name'), 'virk')
    assert.isUndefined(obj.get('age'))
  })

  test('find if a value exists', ({ assert }) => {
    const obj = new ObjectBuilder()
    obj.add('name', 'virk')

    assert.isTrue(obj.has('name'))
    assert.isFalse(obj.has('age'))
  })

  test('remove value', ({ assert }) => {
    const obj = new ObjectBuilder()
    obj.add('name', 'virk')
    obj.remove('name')

    assert.isFalse(obj.has('name'))
    assert.isFalse(obj.has('age'))
    assert.deepEqual(obj.value, {})
  })
})
