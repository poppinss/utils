/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export function assert(value: unknown, message?: string): asserts value {
  if (!value) {
    throw new Error(message ?? 'value is falsy')
  }
}

export function assertUnreachable(x?: never): never {
  throw new Error(`unreachable code executed: ${String(x)}`)
}

export function assertNotNull<T>(value: T | null): asserts value is Exclude<T, null> {
  if (value === null) {
    throw new Error('unexpected null value')
  }
}
