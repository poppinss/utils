/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Perform natural sorting with "Array.sort()" method
 */
export function naturalSort(current: string, next: string) {
  return current.localeCompare(next, undefined, { numeric: true, sensitivity: 'base' })
}
