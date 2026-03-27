/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Return a new array with duplicate values removed while preserving order.
 */
export function unique<Value>(values: readonly Value[]): Value[] {
  return Array.from(new Set(values))
}
