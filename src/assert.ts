/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { inspect } from 'node:util'
import { AssertionError } from 'node:assert'

/**
 * @alias "assertExists"
 */
export function assert(value: unknown, message?: string): asserts value {
  return assertExists(value, message)
}

/**
 * Assert the value is turthy or raise an exception.
 *
 * Truthy value excludes, undefined, null, and false values.
 */
export function assertExists(value: unknown, message?: string): asserts value {
  if (!value) {
    throw new AssertionError({ message: message ?? 'value is falsy' })
  }
}

/**
 * Throws error when method is called
 */
export function assertUnreachable(x?: never): never {
  throw new AssertionError({ message: `unreachable code executed: ${inspect(x)}` })
}

/**
 * Assert the value is not null.
 */
export function assertNotNull<T>(
  value: T | null,
  message?: string
): asserts value is Exclude<T, null> {
  if (value === null) {
    throw new AssertionError({ message: message ?? 'unexpected null value' })
  }
}

/**
 * Assert the value is not undefined.
 */
export function assertIsDefined<T>(
  value: T | undefined,
  message?: string
): asserts value is Exclude<T, undefined> {
  if (value === undefined) {
    throw new AssertionError({ message: message ?? 'unexpected undefined value' })
  }
}
