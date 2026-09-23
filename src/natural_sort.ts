/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Create a natural sort comparator for a specific locale
 */
export function createNaturalSort({ locale }: { locale: Intl.LocalesArgument }) {
  let collator: Intl.Collator | undefined

  return function naturalSort(current: string, next: string) {
    collator ??= new Intl.Collator(locale, { numeric: true, sensitivity: 'base' })
    return collator.compare(current, next)
  }
}

/**
 * Perform natural sorting with "Array.sort()" method
 */
export const naturalSort = createNaturalSort({ locale: 'en' })
