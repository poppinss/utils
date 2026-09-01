/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Collection of number helpers to clamp and parse numeric values.
 *
 * @example
 * number.clamp(15, 0, 10)  // 10
 * number.between(5, 0, 10) // true
 * number.parse('42')       // 42
 * number.toFinite('abc', 0) // 0
 */
const number = {
  /**
   * Constrain a number to stay within the given bounds.
   *
   * @param value - The number to constrain
   * @param min - The lower bound
   * @param max - The upper bound
   *
   * @example
   * number.clamp(15, 0, 10) // 10
   * number.clamp(-2, 0, 10) // 0
   * number.clamp(5, 0, 10)  // 5
   */
  clamp(value: number, min: number, max: number): number {
    if (value < min) {
      return min
    } else if (value > max) {
      return max
    } else {
      return value
    }
  },

  /**
   * Check if a number is inside an inclusive range. The bounds may be
   * passed in either order.
   *
   * @param value - The number to test
   * @param min - One end of the range
   * @param max - The other end of the range
   *
   * @example
   * number.between(5, 0, 10)  // true
   * number.between(0, 0, 10)  // true
   * number.between(11, 0, 10) // false
   * number.between(5, 10, 0)  // true
   */
  between(value: number, min: number, max: number): boolean {
    const lo = Math.min(min, max)
    const hi = Math.max(min, max)
    return value >= lo && value <= hi
  },

  /**
   * Convert a value to a finite number. Returns the fallback when the
   * result is `NaN` or `Infinity`.
   *
   * @param value - The value to convert
   * @param fallback - Value to return when conversion fails. Defaults to `0`
   *
   * @example
   * number.toFinite(5)                        // 5
   * number.toFinite('42')                     // 42
   * number.toFinite(Number.NaN)               // 0
   * number.toFinite(Number.POSITIVE_INFINITY) // 0
   * number.toFinite('abc', 10)                // 10
   */
  toFinite(value: unknown, fallback = 0): number {
    const n = typeof value === 'number' ? value : Number(value)
    return Number.isFinite(n) ? n : fallback
  },

  /**
   * Parse a value into a finite number. Returns `null` for empty input,
   * `NaN`, and `Infinity` instead of substituting a fallback.
   *
   * @param value - The value to parse
   *
   * @example
   * number.parse(5)                        // 5
   * number.parse('42')                     // 42
   * number.parse('')                       // null
   * number.parse(null)                    // null
   * number.parse(Number.NaN)              // null
   * number.parse(Number.POSITIVE_INFINITY) // null
   */
  parse(value: unknown): number | null {
    if (value === null || value === undefined || value === '') {
      return null
    }

    const n = typeof value === 'number' ? value : Number(value)
    return Number.isFinite(n) ? n : null
  },
}

export default number
