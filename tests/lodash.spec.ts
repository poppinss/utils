/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import lodash from '@poppinss/utils/lodash'

test.group('Lodash', () => {
  test('pick method', ({ assert }) => {
    assert.deepEqual(lodash.pick({ username: 'virk', email: 'virk@adonisjs.com' }, ['username']), {
      username: 'virk',
    })
  })

  test('omit method', ({ assert }) => {
    assert.deepEqual(lodash.omit({ username: 'virk', email: 'virk@adonisjs.com' }, ['username']), {
      email: 'virk@adonisjs.com',
    })
  })

  test('has method', ({ assert }) => {
    assert.isTrue(lodash.has({ username: 'virk', email: 'virk@adonisjs.com' }, ['username']))
    assert.isFalse(lodash.has({ username: 'virk', email: 'virk@adonisjs.com' }, ['age']))
  })

  test('get method', ({ assert }) => {
    assert.equal(lodash.get({ username: 'virk', email: 'virk@adonisjs.com' }, 'username'), 'virk')
    assert.equal(lodash.get({ username: 'virk', email: 'virk@adonisjs.com' }, 'age'), undefined)
    assert.equal(lodash.get({ username: 'virk', email: 'virk@adonisjs.com' }, 'age', 28), 28)
  })

  test('set method', ({ assert }) => {
    const collection = { username: 'virk', email: 'virk@adonisjs.com' }
    lodash.set(collection, 'username', 'nikk')
    assert.equal(lodash.get(collection, 'username'), 'nikk')
  })

  test('unset method', ({ assert }) => {
    const collection = { username: 'virk', email: 'virk@adonisjs.com' }
    lodash.unset(collection, 'username')
    assert.equal(lodash.get(collection, 'username'), undefined)
  })

  test('size method', ({ assert }) => {
    assert.equal(lodash.size([1, 2, 3, 4]), 4)
    assert.equal(lodash.size({ username: 'virk', email: 'virk@adonisjs.com' }), 2)
  })

  test('merge method', ({ assert }) => {
    const collection = { username: 'virk' }
    lodash.merge(collection, { email: 'virk@adonisjs.com' })

    assert.deepEqual(collection, { username: 'virk', email: 'virk@adonisjs.com' })
  })

  test('clone method', ({ assert }) => {
    const collection = { username: 'virk' }
    const cloned = lodash.clone(collection)
    lodash.merge(cloned, { email: 'virk@adonisjs.com' })

    assert.deepEqual(collection, { username: 'virk' })
    assert.deepEqual(cloned, { username: 'virk', email: 'virk@adonisjs.com' })
  })

  test('toPath method', ({ assert }) => {
    assert.deepEqual(lodash.toPath('a.b.c'), ['a', 'b', 'c'])
  })
})
