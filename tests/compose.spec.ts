/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { compose } from '../src/compose.js'
import { NormalizeConstructor } from '../src/types.js'

test.group('compose', () => {
  test('apply multiple mixins to a given base class', async ({ assert, expectTypeOf }) => {
    class BaseClass {
      constructor(public username: string) {}
      static foo = 'bar'
    }

    const UserWithEmailMixin = <T extends NormalizeConstructor<typeof BaseClass>>(
      superclass: T
    ) => {
      return class UserEmail extends superclass {
        declare email: string
        static validatesEmail = false
      }
    }

    const UserWithPasswordMixin = <T extends NormalizeConstructor<typeof BaseClass>>(
      superclass: T
    ) => {
      return class UserPassword extends superclass {
        declare password: string
        static validatesPassword = false
      }
    }

    class User extends compose(BaseClass, UserWithEmailMixin, UserWithPasswordMixin) {
      constructor(public username: string) {
        super(username)
      }
    }

    expectTypeOf(User).toMatchTypeOf<{
      validatesPassword: boolean
      validatesEmail: boolean
      foo: string
    }>()

    assert.isFalse(User.validatesPassword)
    assert.isFalse(User.validatesEmail)
    assert.equal(User.foo, 'bar')

    const user = new User('virk')
    expectTypeOf(user).toMatchTypeOf<{
      username: string
      email: string
      password: string
    }>()

    user.email = 'virk@adonisjs.com'
    user.password = 'secret'

    assert.equal(user.username, 'virk')
    assert.equal(user.email, 'virk@adonisjs.com')
    assert.equal(user.password, 'secret')
  })
})
