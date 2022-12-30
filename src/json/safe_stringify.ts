/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { configure } from 'safe-stable-stringify'
import { JSONReplacer } from '../types.js'

const stringify = configure({
  bigint: false,
  circularValue: undefined,
  deterministic: false,
})

/**
 * Replacer to handle custom data types.
 *
 * - Bigints are converted to string
 */
function jsonStringifyReplacer(replacer?: JSONReplacer): JSONReplacer {
  return function (key, value) {
    const val = replacer ? replacer.call(this, key, value) : value

    if (typeof val === 'bigint') {
      return val.toString()
    }

    return val
  }
}

/**
 * String Javascript values to a JSON string. Handles circular
 * references and bigints
 */
export function safeStringify(
  value: any,
  replacer?: JSONReplacer,
  space?: string | number
): string | undefined {
  return stringify(value, jsonStringifyReplacer(replacer), space)
}
