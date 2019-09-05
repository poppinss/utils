/*
* @poppinss/utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import test from 'japa'
import { parseIocReference } from '../src/depreciated/parseIocReference'

test.group('parseIocReference', () => {
  test('raise error when reference is empty string', (assert) => {
    const fn = () => parseIocReference('')
    assert.throw(fn, 'E_INVALID_IOC_NAMESPACE: Empty string cannot be used as IoC container reference')
  })

  test('raise error when method is missing', (assert) => {
    const fn = () => parseIocReference('UserController')
    assert.throw(fn, 'E_INVALID_IOC_NAMESPACE: Missing method reference on {UserController} namespace')
  })

  test('return binding when method is defined', (assert) => {
    assert.deepEqual(parseIocReference('UserController.store'), {
      type: 'iocReference',
      namespace: 'UserController',
      method: 'store',
    })
  })

  test('use fallback method when actual method is missing', (assert) => {
    assert.deepEqual(parseIocReference('UserMiddleware', undefined, 'handle'), {
      type: 'iocReference',
      namespace: 'UserMiddleware',
      method: 'handle',
    })
  })

  test('prefix custom namespace', (assert) => {
    assert.deepEqual(parseIocReference('UserController.store', 'App/Controllers/Http'), {
      type: 'iocReference',
      namespace: 'App/Controllers/Http/UserController',
      method: 'store',
    })
  })

  test('do not use custom prefix when reference starts with /', (assert) => {
    assert.deepEqual(parseIocReference('/UserController.store', 'App/Controllers/Http'), {
      type: 'iocReference',
      namespace: 'UserController',
      method: 'store',
    })
  })

  test('eagerload value from container', (assert) => {
    global[Symbol.for('ioc.use')] = function use () {
      return { hello: 'world' }
    }

    assert.deepEqual(parseIocReference('UserController.store', undefined, undefined, true), {
      type: 'iocObject',
      value: { hello: 'world' },
      method: 'store',
    })
  })
})
