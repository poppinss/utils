/*
* @poppinss/utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import test from 'japa'
import { Ioc } from '@adonisjs/fold'
import { IoCResolver } from '../src/IocResolver'

test.group('Ioc Resolver', () => {
  test('call namespace expression', (assert) => {
    class UserController {
      public handle () {
        return 'foo'
      }
    }

    const ioc = new Ioc()
    ioc.bind('App/UserController', () => new UserController())

    const resolver = new IoCResolver(ioc)
    assert.equal(resolver.call('App/UserController', []), 'foo')
  })

  test('call namespace expression with method', (assert) => {
    class UserController {
      public getUser () {
        return 'foo'
      }
    }

    const ioc = new Ioc()
    ioc.bind('App/UserController', () => new UserController())

    const resolver = new IoCResolver(ioc)
    assert.equal(resolver.call('App/UserController.getUser', []), 'foo')
  })

  test('call async namespace expression', async (assert) => {
    class UserController {
      public async getUser () {
        return 'foo'
      }
    }

    const ioc = new Ioc()
    ioc.bind('App/UserController', () => new UserController())

    const resolver = new IoCResolver(ioc)
    const value = await resolver.call('App/UserController.getUser', [])
    assert.equal(value, 'foo')
  })

  test('raise exception when unable to lookup namespace', async (assert) => {
    const ioc = new Ioc()
    const resolver = new IoCResolver(ioc)

    const fn = () => resolver.call('App/UserController.getUser', [])
    assert.throw(fn, 'Unable to resolve App/UserController namespace from IoC container')
  })
})
