/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Convert windows path to unix.
 * Copied from https://github.com/sindresorhus/slash as the package is ESM only
 */
export function slash(filePath: string) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(filePath)
  const hasNonAscii = /[^\u0000-\u0080]+/.test(filePath) // eslint-disable-line no-control-regex

  if (isExtendedLengthPath || hasNonAscii) {
    return filePath
  }

  return filePath.replace(/\\/g, '/')
}
