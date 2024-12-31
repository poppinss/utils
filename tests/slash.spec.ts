/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { slash } from '../src/slash.js'

test('convert backwards-slash paths to forward slash paths', ({ assert }) => {
  assert.equal(slash('c:/aaaa\\bbbb'), 'c:/aaaa/bbbb')
  assert.equal(slash('c:\\aaaa\\bbbb'), 'c:/aaaa/bbbb')
  assert.equal(slash('c:\\aaaa\\bbbb\\★'), 'c:/aaaa/bbbb/★')
})

test('not convert extended-length paths', ({ assert }) => {
  const path = '\\\\?\\c:\\aaaa\\bbbb'
  assert.equal(slash(path), path)
})
