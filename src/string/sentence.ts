/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Convert an array of values to a sentence.
 */
export function sentence(
  values: any[],
  options?: {
    separator?: string
    pairSeparator?: string
    lastSeparator?: string
  }
): string {
  /**
   * Empty array
   */
  if (values.length === 0) {
    return ''
  }

  /**
   * Just one item
   */
  if (values.length === 1) {
    return values[0]
  }

  /**
   * Giving some love to two items, so that one can ditch comma with two items
   */
  if (values.length === 2) {
    return `${values[0]}${options?.pairSeparator || ' and '}${values[1]}`
  }

  const normalized = Object.assign({ separator: ', ', lastSeparator: ', and ' }, options)

  /**
   * Make sentence
   */
  return `${values.slice(0, -1).join(normalized.separator)}${normalized.lastSeparator}${
    values[values.length - 1]
  }`
}
