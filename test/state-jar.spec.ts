/*
* @poppinss/utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import test from 'japa'
import { StateJar } from '../src/StateJar'

test.group('State Jar', () => {
  test('set state inside jar', (assert) => {
    const jar = new StateJar({
      overwrite: true,
    })

    jar.set('overwrite', false)
    assert.isFalse(jar.get('overwrite'))
  })

  test('define types of the state without setting values', (assert) => {
    const jar = new StateJar<{ overwrite: boolean }>({})

    jar.set('overwrite', false)
    assert.isFalse(jar.get('overwrite'))
  })
})
