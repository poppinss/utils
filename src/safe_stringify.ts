/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { stringify, ReplacerFn } from './fast_safe_stringify.js'

/**
 * Replacer to handle bigints and remove Circular values all together
 */
function jsonStringifyReplacer(replacer?: ReplacerFn, removeCircular?: boolean): ReplacerFn {
  return function (key, value) {
    if (removeCircular && value === '[Circular]') {
      return
    }

    const val = replacer ? replacer.call(this, key, value) : value

    if (typeof val === 'bigint') {
      return val.toString()
    }

    return val
  }
}

/**
 * Safely stringifies a Javascript native value
 */
export function safeStringify(value: any, replacer?: ReplacerFn, space?: string | number): string {
  try {
    return JSON.stringify(value, jsonStringifyReplacer(replacer, false), space)
  } catch {
    return stringify(value, jsonStringifyReplacer(replacer, true), space)
  }
}
