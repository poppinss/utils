/*
* @poppinss/utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as test from 'japa'
import { callIocReference } from '../src/callIocReference'
import { parseIocReference } from '../src/parseIocReference'

test.group('callIocReference', () => {
  test('call parsed ioc container binding', (assert) => {
    assert.plan(4)
    class UserController {}

    const parsed = parseIocReference('UserController.store')
    global[Symbol.for('ioc.make')] = function make (namespace) {
      assert.equal(namespace, 'UserController')
      return new UserController()
    }

    global[Symbol.for('ioc.call')] = function make (user, method, args) {
      assert.instanceOf(user, UserController)
      assert.equal(method, 'store')
      assert.deepEqual(args, [])
    }

    callIocReference(parsed, [])
  })

  test('call eagerloaded parsed ioc container binding', (assert) => {
    assert.plan(5)
    class UserController {}

    global[Symbol.for('ioc.use')] = function use (namespace) {
      assert.equal(namespace, 'UserController')
      return UserController
    }

    global[Symbol.for('ioc.make')] = function make (namespace) {
      assert.deepEqual(namespace, UserController)
      return new UserController()
    }

    global[Symbol.for('ioc.call')] = function make (user, method, args) {
      assert.instanceOf(user, UserController)
      assert.equal(method, 'store')
      assert.deepEqual(args, [])
    }

    const parsed = parseIocReference('UserController.store', undefined, undefined, true)
    callIocReference(parsed, [])
  })
})
