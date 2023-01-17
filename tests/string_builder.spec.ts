/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { StringBuilder } from '../src/string_builder.js'

test.group('String builder', () => {
  test('change string casing', ({ assert }) => {
    assert.equal(new StringBuilder('usersController').snakeCase().toString(), 'users_controller')
    assert.equal(new StringBuilder('usersController').pascalCase().toString(), 'UsersController')
    assert.equal(new StringBuilder('usersController').dashCase().toString(), 'users-controller')
    assert.equal(new StringBuilder('usersController').titleCase().toString(), 'usersController')
    assert.equal(new StringBuilder('usersController').dotCase().toString(), 'users.Controller')
    assert.equal(new StringBuilder('usersController').camelCase().toString(), 'usersController')
    assert.equal(new StringBuilder('usersController').capitalCase().toString(), 'Users Controller')
    assert.equal(new StringBuilder('usersController').sentenceCase().toString(), 'Users controller')
    assert.equal(new StringBuilder('usersController').noCase().toString(), 'users controller')
  })

  test('convert string to slug', ({ assert }) => {
    assert.equal(new StringBuilder('hello world').slugify().toString(), 'hello-world')
  })

  test('apply transformation to existing string builder', ({ assert }) => {
    const value = new StringBuilder('user').plural()
    assert.equal(
      new StringBuilder(value).snakeCase().suffix('_controller').toString(),
      'users_controller'
    )
  })

  test('add suffix to string', ({ assert }) => {
    assert.equal(
      new StringBuilder('user').suffix('Controller').snakeCase().toString(),
      'user_controller'
    )

    assert.equal(
      new StringBuilder('userController').suffix('Controller').snakeCase().toString(),
      'user_controller'
    )

    assert.equal(
      new StringBuilder('usercontroller').suffix('Controller').snakeCase().toString(),
      'user_controller'
    )
  })

  test('convert to plural case', ({ assert }) => {
    assert.equal(
      new StringBuilder('user')
        .removeSuffix('controller')
        .plural()
        .snakeCase()
        .suffix('_controller')
        .toString(),
      'users_controller'
    )

    assert.equal(
      new StringBuilder('userController')
        .removeSuffix('controller')
        .plural()
        .snakeCase()
        .suffix('_controller')
        .toString(),
      'users_controller'
    )

    assert.equal(
      new StringBuilder('usercontroller')
        .removeSuffix('controller')
        .plural()
        .snakeCase()
        .suffix('_controller')
        .toString(),
      'users_controller'
    )

    assert.equal(
      new StringBuilder('user_controller')
        .removeSuffix('controller')
        .plural()
        .snakeCase()
        .suffix('_controller')
        .toString(),
      'users_controller'
    )
  })

  test('convert to singluar case', ({ assert }) => {
    assert.equal(
      new StringBuilder('users').removeSuffix('model').singular().snakeCase().toString(),
      'user'
    )

    assert.equal(
      new StringBuilder('userModel').removeSuffix('model').singular().snakeCase().toString(),
      'user'
    )

    assert.equal(
      new StringBuilder('usermodel').removeSuffix('model').singular().snakeCase().toString(),
      'user'
    )

    assert.equal(
      new StringBuilder('user_model').removeSuffix('model').singular().snakeCase().toString(),
      'user'
    )
  })

  test('add prefix to string', ({ assert }) => {
    assert.equal(new StringBuilder('user').prefix('make_').snakeCase().toString(), 'make_user')
    assert.equal(
      new StringBuilder('makeUser').removePrefix('make').prefix('make_').snakeCase().toString(),
      'make_user'
    )
    assert.equal(
      new StringBuilder('makeuser').removePrefix('make').prefix('make_').snakeCase().toString(),
      'make_user'
    )
  })

  test('add extname', ({ assert }) => {
    assert.equal(
      new StringBuilder('usersController').snakeCase().ext('.ts').toString(),
      'users_controller.ts'
    )

    assert.equal(
      new StringBuilder('usersController.js').removeExtension().snakeCase().ext('.ts').toString(),
      'users_controller.ts'
    )
  })
})
