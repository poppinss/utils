/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import ms from 'ms'
import { randomBytes } from 'node:crypto'
import he, { EncodeOptions } from 'he'
import bytes, { BytesOptions } from 'bytes'

/**
 * Normalizes base64 string by removing special chars and padding
 */
function normalizeBase64(value: string) {
  return value.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '')
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
