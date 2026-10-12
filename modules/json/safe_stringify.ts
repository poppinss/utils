/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { configure } from 'safe-stable-stringify'

export type JSONReplacer = (this: any, key: string, value: any) => any

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
 * references and bigints.
 *
 * Uses the native `JSON.stringify` first and falls back to
 * "safe-stable-stringify" only when it throws a TypeError, which
 * is what V8 raises for circular references and bigints. The fast
 * path covers most values and is several times faster.
 *
 * When a replacer is defined, bigints are converted inside the
 * native pass. Only circular references trigger the fallback, and
 * in that case the replacer runs a second time.
 *
 * On Node.js 25+, a V8 bug in the fast path of `JSON.stringify`
 * makes it take several milliseconds to reject a circular plain
 * object. Values with circular references are slower than before
 * on these versions until V8 fixes it.
 * See https://issues.chromium.org/issues/572287937
 */
export function safeStringify(
  value: any,
  replacer?: JSONReplacer,
  space?: string | number
): string | undefined {
  const replacerFn = replacer ? jsonStringifyReplacer(replacer) : undefined

  try {
    return JSON.stringify(value, replacerFn, space)
  } catch (error) {
    if (!(error instanceof TypeError)) {
      throw error
    }
    return stringify(value, replacerFn ?? jsonStringifyReplacer(), space)
  }
}
