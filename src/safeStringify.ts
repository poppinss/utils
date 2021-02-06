/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import stringify from 'fast-safe-stringify'

/**
 * Replacer to remove Circular values all together
 */
function replacer(_: any, value: any) {
  if (value === '[Circular]') {
    return
  }

  return value
}

/**
 * Safely stringifies a Javascript native value
 */
export function safeStringify(value: any): string {
  try {
    return JSON.stringify(value)
  } catch {
    return stringify(value, replacer)
  }
}
