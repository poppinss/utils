/*
* @poppinss/utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import test from 'japa'
import { safeEqual } from '../src/safeEqual'

test.group('safeEqual', () => {
  test('compare two strings', (assert) => {
    assert.isTrue(safeEqual('hello', 'hello'))
  })
})
