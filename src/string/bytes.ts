/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import bytes, { BytesOptions } from 'bytes'

export default {
  format(valueInBytes: number, options?: BytesOptions): string {
    return bytes.format(valueInBytes, options)
  },

  /**
   * Parse the unit expression to bytes. If the unit value
   * is a number, then it will be returned as it is considering
   * it is already in bytes.
   */
  parse(unit: string | number): number {
    if (typeof unit === 'number') {
      return unit
    }

    return bytes.parse(unit)
  },
}
