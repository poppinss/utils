/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
    data = Object.hasOwn(data, token) ? data[token] : undefined
  }
  return data
}

/**
 * A simple function interpolate values inside curly braces.
 *
 * ```
 * interpolate('hello {{ username }}', { username: 'virk' })
 * ```
 */
export function interpolate(input: string, data: any) {
  return input.replace(/(\\)?{{(.*?)}}/g, (_, escapeChar, key) => {
    if (escapeChar) {
      return `{{${key}}}`
    }

    return parseProp(data, key.trim())
  })
}
