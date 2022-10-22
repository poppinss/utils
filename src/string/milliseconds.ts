/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { parse, format } from '@lukeed/ms'

export default {
  format(milliseconds: number, long?: boolean): string {
    return format(milliseconds, long)
  },

  /**
   * Parse time expression string to milliseconds. The number value
   * is returned as it is, considering it is already in milliseconds
   */
  parse(duration: string | number): number {
    if (typeof duration === 'number') {
      return duration
    }

    const milliseconds = parse(duration)
    if (milliseconds === undefined) {
      throw new Error(`Invalid duration expression "${duration}"`)
    }

    return milliseconds
  },
}
