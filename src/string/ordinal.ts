/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Ordinalize a give number or string
 */
export function ordinal(value: string | number): string {
  const transformedValue = Math.abs(typeof value === 'string' ? Number.parseInt(value) : value)
  if (!Number.isFinite(transformedValue) || Number.isNaN(transformedValue)) {
    throw new Error('Cannot ordinalize invalid or infinite numbers')
  }

  const percent = transformedValue % 100
  if (percent >= 10 && percent <= 20) {
    return `${value}th`
  }

  const decimal = transformedValue % 10
  switch (decimal) {
    case 1:
      return `${value}st`
    case 2:
      return `${value}nd`
    case 3:
      return `${value}rd`
    default:
      return `${value}th`
  }
}
