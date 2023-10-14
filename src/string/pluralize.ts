/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { default as pluralizePkg } from 'pluralize'

/**
 * Pluralize a word based upon the count. The method returns the
 * singular form when count is 1.
 */
export function pluralize(word: string, count?: number, inclusive?: boolean): string {
  return pluralizePkg(word, count, inclusive)
}
pluralize.addPluralRule = pluralizePkg.addPluralRule
pluralize.addSingularRule = pluralizePkg.addSingularRule
pluralize.addIrregularRule = pluralizePkg.addIrregularRule
pluralize.addUncountableRule = pluralizePkg.addUncountableRule

export const plural = pluralizePkg.plural
export const singular = pluralizePkg.singular
export const isPlural = pluralizePkg.isPlural
export const isSingular = pluralizePkg.isSingular
