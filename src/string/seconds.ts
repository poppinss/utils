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
  format(seconds: number, long?: boolean): string {
    return format(seconds * 1000, long)
  },

  /**
   * Parse time expression string to seconds. The number value
   * is returned as it is, considering it is already in seconds
   */
  parse(duration: string | number): number {
    if (typeof duration === 'number') {
      return duration
    }

    const milliseconds = parse(duration)
    if (milliseconds === undefined) {
      throw new Error(`Invalid duration expression "${duration}"`)
    }

    return Math.floor(milliseconds / 1000)
  },
}
