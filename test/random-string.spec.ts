/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import { randomString } from '../src/randomString'

test.group('randomString', () => {
  test('generate random string of given length', (assert) => {
    assert.lengthOf(randomString(32), 32)
  })
})
