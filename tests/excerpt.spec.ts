/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { excerpt } from '../src/excerpt.js'

test('excerpt', () => {
  test('generate excerpt by stripping html', ({ assert }) => {
    assert.equal(
      excerpt('<p>This is a <strong>very long</strong>, maybe not that long title</p>', 12),
      'This is a ve...'
    )
  })

  test('generate excerpt by stripping html, but complete words', ({ assert }) => {
    assert.equal(
      excerpt('<p>This is a <strong>very long</strong>, maybe not that long title</p>', 12, {
        completeWords: true,
      }),
      'This is a very...'
    )
  })

  test('define a custom suffix', ({ assert }) => {
    assert.equal(
      excerpt('<p>This is a <strong>very long</strong>, maybe not that long title</p>', 12, {
        completeWords: true,
        suffix: ' <a href="/1"> Read more </a>',
      }),
      'This is a very <a href="/1"> Read more </a>'
    )
  })
})
