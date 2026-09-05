/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

let collator: Intl.Collator | undefined

/**
 * Perform natural sorting with "Array.sort()" method
 */
export function naturalSort(current: string, next: string) {
  // Create the collator only when natural sorting is used, not on package import.
  collator ??= new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
  return collator.compare(current, next)
}
