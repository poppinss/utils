/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { inspect } from 'node:util'
import { test } from '@japa/runner'
import { LoggerFactory } from '@adonisjs/logger/factories'

import { Secret } from '../index.js'

test.group('Secret', () => {
  test('create a secret value and release it', ({ assert }) => {
    const secret = new Secret('asecretkey')
    assert.equal(secret.release(), 'asecretkey')
  })

  test('transform value to create a new secret', ({ assert }) => {
    const secret = new Secret('asecretkey')
    assert.equal(secret.map((value) => value.toUpperCase()).release(), 'ASECRETKEY')
  })

  test('prevent secret from leaking inside sprintf transformations', ({ assert }) => {
    const logsCollections: string[] = []
    const logger = new LoggerFactory().merge({ enabled: true }).pushLogsTo(logsCollections).create()

    class Token {
      generate() {
        return {
          value: new Secret('asecretkey'),
          hash: 'value persisted to db',
        }
      }
    }

    const token = new Token().generate()
    logger.info('token generated %O', token)

    assert.lengthOf(logsCollections, 1)
    assert.deepEqual(
      JSON.parse(logsCollections[0]).msg,
      `token generated {"value":"[redacted]","hash":"value persisted to db"}`
    )
  })

  test('prevent secret from leaking inside log data', ({ assert }) => {
    const logsCollections: string[] = []
    const logger = new LoggerFactory().merge({ enabled: true }).pushLogsTo(logsCollections).create()

    class Token {
      generate() {
        return {
          value: new Secret('asecretkey'),
          hash: 'value persisted to db',
        }
      }
    }

    const token = new Token().generate()
    logger.info({ token }, 'token generated')

    assert.lengthOf(logsCollections, 1)
    assert.deepEqual(JSON.parse(logsCollections[0]).token, {
      hash: 'value persisted to db',
      value: '[redacted]',
    })
  })

  test('hide secret value from serialization', ({ assert }) => {
    const secret = new Secret('asecretkey')

    assert.equal(inspect(secret), '[redacted]')
    assert.equal(JSON.stringify(secret), '"[redacted]"')
    assert.equal(`${secret}world`, '[redacted]world')
    // @ts-expect-error
    assert.equal(new Secret(4) + 2, '[redacted]2')
    assert.equal(secret.toLocaleString(), '[redacted]')
  })
})
