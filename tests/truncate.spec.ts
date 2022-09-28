/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { truncate } from '../src/truncate.js'

test('truncate', () => {
  test('truncate a sentence', ({ assert }) => {
    assert.equal(truncate('This is a very long, maybe not that long title', 12), 'This is a ve...')
  })

  test('truncate a sentence, but complete words', ({ assert }) => {
    assert.equal(
      truncate('This is a very long, maybe not that long title', 12, {
        completeWords: true,
      }),
      'This is a very...'
    )
  })

  test('define a custom suffix', ({ assert }) => {
    assert.equal(
      truncate('This is a very long, maybe not that long title', 12, {
        completeWords: true,
        suffix: ' <a href="/1"> Read more </a>',
      }),
      'This is a very <a href="/1"> Read more </a>'
    )
  })
})
