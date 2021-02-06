/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import { compose, NormalizeConstructor } from '../src/compose'

test.group('compose', () => {
  test('apply multiple mixins to a given base class', async (assert) => {
    class BaseClass {
      constructor(public username: string) {}
      public static foo = 'bar'
    }

    const UserWithEmailMixin = <T extends NormalizeConstructor<typeof BaseClass>>(
      superclass: T
    ) => {
      return class UserEmail extends superclass {
        public email: string
        public static validatesEmail = false
      }
    }

    const UserWithPasswordMixin = <T extends NormalizeConstructor<typeof BaseClass>>(
      superclass: T
    ) => {
      return class UserPassword extends superclass {
        public password: string
        public static validatesPassword = false
      }
    }

    class User extends compose(BaseClass, UserWithEmailMixin, UserWithPasswordMixin) {
      public email = 'virk@adonisjs.com'
      public password = 'secret'

      constructor(public username: string) {
        super(username)
      }
    }

    assert.isFalse(User.validatesPassword)
    assert.isFalse(User.validatesEmail)
    assert.equal(User.foo, 'bar')

    const user = new User('virk')
    assert.equal(user.username, 'virk')
    assert.equal(user.email, 'virk@adonisjs.com')
    assert.equal(user.password, 'secret')
  })
})
