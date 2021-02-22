/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import * as lodash from '../src/lodash'

test.group('Lodash', () => {
  test('use lodash methods', (assert) => {
    const obj = { name: 'virk' }
    const cloned = lodash.clone(obj)

    assert.deepEqual(lodash.get(obj, 'name'), 'virk')
    assert.notStrictEqual(cloned, obj)
    assert.notStrictEqual(lodash.cloneDeep(obj), obj)
    lodash.set(obj, 'age', 28)

    assert.deepEqual(obj as any, { name: 'virk', age: 28 })
    assert.deepEqual(cloned, { name: 'virk' })
    assert.deepEqual(lodash.pick(obj, ['name']), { name: 'virk' })
  })
})
