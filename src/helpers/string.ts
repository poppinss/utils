/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import ms from 'ms'
import truncatise from 'truncatise'
import { randomBytes } from 'node:crypto'
import he, { EncodeOptions } from 'he'
import * as changeCase from 'change-case'
import bytes, { BytesOptions } from 'bytes'
import * as pluralizePkg from 'pluralize'

export { default as toSlug } from 'slugify'

const SMALL_WORDS =
  /\b(?:an?d?|a[st]|because|but|by|en|for|i[fn]|neither|nor|o[fnr]|only|over|per|so|some|tha[tn]|the|to|up|upon|vs?\.?|versus|via|when|with|without|yet)\b/i
const TOKENS = /[^\s:–—-]+|./g
const WHITESPACE = /\s/
const IS_MANUAL_CASE = /.(?=[A-Z]|\..)/
const ALPHANUMERIC_PATTERN = /[A-Za-z0-9\u00C0-\u00FF]/

/**
 * The method is a copy/paste from the "title-case" package. They have
 * a dependency on "tslib", which I don't want.
 */
export function titleCase(input: string) {
  let output = ''
  let result: RegExpExecArray | null

  while ((result = TOKENS.exec(input)) !== null) {
    const { 0: token, index } = result

    if (
      !IS_MANUAL_CASE.test(token) &&
      (!SMALL_WORDS.test(token) || index === 0 || index + token.length === input.length) &&
      (input.charAt(index + token.length) !== ':' ||
        WHITESPACE.test(input.charAt(index + token.length + 1)))
    ) {
      output += token.replace(ALPHANUMERIC_PATTERN, (char) => char.toUpperCase())
      continue
    }

    output += token
  }

  return output
}

/**
 * Normalizes base64 string by removing special chars and padding
 */
function normalizeBase64(value: string) {
  return value.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '')
}

/**
 * Define an irregular rule
 */
export function defineIrregularRule(singleValue: string, pluralValue: string) {
  pluralize.addIrregularRule(singleValue, pluralValue)
}

/**
 * Define uncountable rule
 */
export function defineUncountableRule(word: string) {
  pluralizePkg.addUncountableRule(word)
}

/**
 * Convert string to camelcase
 */
export function camelCase(value: string): string {
  return changeCase.camelCase(value)
}

/**
 * Convert string to snakecase
 */
export function snakeCase(value: string): string {
  return changeCase.snakeCase(value)
}

/**
 * Convert string to dashcase
 */
export function dashCase(value: string, options?: { capitalize?: boolean }): string {
  if (options && options.capitalize) {
    return changeCase.headerCase(value)
  }

  return changeCase.paramCase(value)
}

/**
 * Convert string to pascal case
 */
export function pascalCase(value: string): string {
  return changeCase.pascalCase(value)
}

/**
 * Convert string to capital case
 */
export function capitalCase(value: string): string {
  return changeCase.capitalCase(value)
}

/**
 * Convert string to sentence case
 */
export function sentenceCase(value: string): string {
  return changeCase.sentenceCase(value)
}

/**
 * Convert string to dot case
 */
export function dotCase(value: string): string {
  return changeCase.dotCase(value)
}

/**
 * Remove all sort of casing from the string
 */
export function noCase(value: string): string {
  return changeCase.noCase(value)
}

/**
 * Pluralize a word
 */
export function pluralize(word: string): string {
  return pluralizePkg.plural(word)
}

/**
 * Singularize a word
 */
export function singularize(word: string): string {
  return pluralizePkg.singular(word)
}

/**
 * Truncate a sentence till a give limit of characters
 */
export function truncate(
  sentence: string,
  charactersLimit: number,
  options?: {
    completeWords?: boolean
    suffix?: string
  }
): string {
  return truncatise(sentence, {
    TruncateLength: charactersLimit,
    /**
     * Do not complete words when "completeWords" is not explicitly set
     * to true
     */
    Strict: options && options.completeWords === true ? false : true,
    StripHTML: false,
    TruncateBy: 'characters',
    Suffix: options && options.suffix,
  })
}

/**
 * Same as truncate, but strips out the HTML
 */
export function excerpt(
  sentence: string,
  charactersLimit: number,
  options?: {
    completeWords?: boolean
    suffix?: string
  }
): string {
  return truncatise(sentence, {
    TruncateLength: charactersLimit,
    /**
     * Do not complete words when "completeWords" is not explicitly set
     * to true
     */
    Strict: options && options.completeWords === true ? false : true,
    StripHTML: true,
    TruncateBy: 'characters',
    Suffix: options && options.suffix,
  })
}

/**
 * Condenses multiple whitespaces from a string
 */
export function condenseWhitespace(value: string): string {
  return value.trim().replace(/\s{2,}/g, ' ')
}

/**
 * Escape HTML entities
 */
export function escapeHTML(value: string, options?: { encodeSymbols?: boolean }): string {
  value = he.escape(value)
  if (options && options.encodeSymbols) {
    value = encodeSymbols(value, { allowUnsafeSymbols: true })
  }

  return value
}

/**
 * Encode symbols that aren’t printable ASCII symbols
 */
export function encodeSymbols(value: string, options?: EncodeOptions): string {
  return he.encode(value, options)
}

/**
 * Convert array of values to a sentence
 */
export function toSentence(
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
   * Giving some love to two items, so that one can use oxford comma's
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

/**
 * Convert a number to a human readable string
 */
export function prettyBytes(value: number, options?: BytesOptions): string {
  return bytes.format(value, options)
}

/**
 * Convert milliseconds to a human readable string
 */
export function prettyMs(value: number, options?: { long: boolean }): string {
  return ms(value, options)
}

/**
 * Find if a string is empty. Including any number of whitespaces
 */
export function isEmpty(value: string): boolean {
  return value.trim().length === 0
}

/**
 * Ordinalize a give number or string
 */
export function ordinalize(value: string | number): string {
  const transformedValue = Math.abs(typeof value === 'string' ? Number.parseInt(value) : value)
  if (!Number.isFinite(transformedValue) || Number.isNaN(transformedValue)) {
    throw new Error('Cannot ordinalize NAN or infinite numbers')
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

/**
 * Converts unit expression to bytes
 */
export function toBytes(value: string | number): number {
  if (typeof value === 'number') {
    return value
  }

  return bytes.parse(value)
}

/**
 * Converts time expression to milliseconds
 */
export function toMs(value: string | number): number {
  if (typeof value === 'number') {
    return value
  }

  return ms(value)
}

/**
 * Generates a random string for a given size
 */
export function generateRandom(size: number) {
  const bits = (size + 1) * 6
  const buffer = randomBytes(Math.ceil(bits / 8))
  return normalizeBase64(buffer.toString('base64')).slice(0, size)
}
