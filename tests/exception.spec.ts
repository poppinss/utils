/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { EOL } from 'node:os'
import { test } from '@japa/runner'
import { Exception } from '../src/exception.js'

test.group('Exception', () => {
  test('create exception with error code', ({ assert }) => {
    const error = new Exception('Some message', {
      code: 'E_SOME_MESSAGE',
    })

    assert.equal(error.message, 'Some message')
    assert.equal(error.status, 500)
    assert.equal(error.code, 'E_SOME_MESSAGE')
  })

  test('create exception with error status', ({ assert }) => {
    const error = new Exception('Some message', {
      code: 'E_SOME_MESSAGE',
      status: 401,
    })

    assert.equal(error.message, 'Some message')
    assert.equal(error.status, 401)
    assert.equal(error.code, 'E_SOME_MESSAGE')
  })

  test('point stack trace to correct file', ({ assert }) => {
    assert.plan(1)

    try {
      throw new Exception('Some message')
    } catch (error) {
      console.log(error.stack.split(EOL))
      assert.match(error.stack.split(EOL)[1], new RegExp(import.meta.url))
    }
  })

  test('point stack trace to correct file with a sub-class', ({ assert }) => {
    assert.plan(1)

    class UserNotFound extends Exception {
      static message = 'Unable to find user'
      static status = 404
    }

    try {
      throw new UserNotFound(UserNotFound.message)
    } catch (error) {
      console.log(error.stack.split(EOL))
      assert.match(error.stack.split(EOL)[1], new RegExp(import.meta.url))
    }
  })

  test('point stack trace to correct file with a sub-class', ({ assert }) => {
    assert.plan(1)

    class UserNotFound extends Exception {
      static message = 'Unable to find user'
      static status = 404
    }

    try {
      throw new UserNotFound(UserNotFound.message)
    } catch (error) {
      console.log(error.stack.split(EOL))
      assert.match(error.stack.split(EOL)[1], new RegExp(import.meta.url))
    }
  })

  test('use static properties', ({ assert }) => {
    class UserNotFound extends Exception {
      static message = 'Unable to find user'
      static status = 404
      static code = 'E_USER_NOT_FOUND'
    }

    const error = new UserNotFound(UserNotFound.message)
    assert.equal(error.message, 'Unable to find user')
    assert.equal(error.status, 404)
    assert.equal(error.code, 'E_USER_NOT_FOUND')
  })

  test('define error help description', ({ assert }) => {
    class UserNotFound extends Exception {
      static message = 'Unable to find user'
      static status = 404
      static code = 'E_USER_NOT_FOUND'
      static help = 'Make sure the user exists in the table'
    }

    const error = new UserNotFound(UserNotFound.message)
    assert.equal(error.message, 'Unable to find user')
    assert.equal(error.status, 404)
    assert.equal(error.code, 'E_USER_NOT_FOUND')
    assert.equal(error.help, 'Make sure the user exists in the table')
  })

  test('set error cause', ({ assert }) => {
    class UserNotFound extends Exception {
      static message = 'Unable to find user'
    }

    const error = new UserNotFound(UserNotFound.message, { cause: new Error('foo') })
    assert.equal(error.message, 'Unable to find user')
    assert.equal((error.cause as any).message, 'foo')
  })

  test('create error without runtime error message', ({ assert }) => {
    class UserNotFound extends Exception {
      static message = 'Unable to find user'
    }

    const error = new UserNotFound()
    assert.equal(error.message, 'Unable to find user')
    assert.match(error.stack!, /UserNotFound: Unable to find user/)
  })
})
