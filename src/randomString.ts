/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { randomBytes } from 'crypto'

/**
 * Normalizes base64 string by removing special chars and padding
 */
function normalizeBase64(value: string) {
  return value.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '')
}

/**
 * Generates a random string for a given size
 */
export function randomString(size: number) {
  const bits = (size + 1) * 6
  const buffer = randomBytes(Math.ceil(bits / 8))
  return normalizeBase64(buffer.toString('base64')).slice(0, size)
}
