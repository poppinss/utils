/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

function uncurryThis(fn: any) {
  return function (...args: any[]) {
    return Function.call.apply(fn, args)
  }
}
const hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty)

/**
 * Parses prop
 */
function parseProp(data: any, key: string) {
  const tokens = key.split('.')
  while (tokens.length) {
    if (data === null || typeof data !== 'object') {
      return
    }
    const token = tokens.shift()!
    data = hasOwnProperty(data, token) ? data[token] : undefined
  }
  return data
}

/**
 * A simple function interpolate values inside curly braces.
 *
 * @example
 * `interpolate('hello {{ username }}', { username: 'virk' })`
 */
export function interpolate(input: string, data: any) {
  return input.replace(/{{(.*?)}}/g, (_, key) => parseProp(data, key.trim()))
}
