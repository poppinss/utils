/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const REDACTED = '[redacted]'

/**
 * Define a Secret value that hides itself from the logs or the console
 * statements.
 *
 * The idea is to prevent accedential leaking of sensitive information.
 * Idea borrowed from.
 * https://transcend.io/blog/keep-sensitive-values-out-of-your-logs-with-types
 */
export class Secret<T> {
  /** The secret value */
  #value: T
  #keyword: string

  constructor(value: T, redactedKeyword?: string) {
    this.#value = value
    this.#keyword = redactedKeyword || REDACTED
  }

  toJSON(): string {
    return this.#keyword
  }
  valueOf(): string {
    return this.#keyword
  }
  [Symbol.for('nodejs.util.inspect.custom')](): string {
    return this.#keyword
  }
  toLocaleString(): string {
    return this.#keyword
  }
  toString(): string {
    return this.#keyword
  }

  /**
   * Returns the original value
   */
  release(): T {
    return this.#value
  }

  /**
   * Transform the original value and create a new
   * secret from it.
   */
  map<R>(transformFunc: (value: T) => R): Secret<R> {
    return new Secret(transformFunc(this.#value))
  }
}
