/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * A simple class to build an object incrementally. It is helpful when you
 * want to add properties to the object conditionally.
 *
 * Instead of writing
 * ```
 * const obj = {
 *   ...(user.id ? { id: user.id } : {}),
 *   ...(user.firstName && user.lastName ? { name: `${user.firstName} ${user.lastName}` } : {}),
 * }
 * ```
 *
 * You can write
 *
 * const obj = new ObjectBuilder()
 *   .add('id', user.id)
 *   .add(
 *     'fullName',
 *     user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : undefined
 *   )
 *   .toObject()
 */
export class ObjectBuilder {
  #ignoreNull: boolean
  value: Record<any, any> = {}

  constructor(initialValue?: Record<any, any>, ignoreNull?: boolean) {
    this.value = initialValue !== undefined ? initialValue : {}
    this.#ignoreNull = ignoreNull === true ? true : false
  }

  /**
   * Add a key-value pair to the object
   *
   * - Undefined values are ignored
   * - Null values are ignored, when `ignoreNull` is set to true
   */
  add(key: string, value: any): this {
    if (value === undefined) {
      return this
    }

    if (this.#ignoreNull === true && value === null) {
      return this
    }

    this.value[key] = value
    return this
  }

  /**
   * Remove key from the object
   */
  remove(key: string): this {
    delete this.value[key]
    return this
  }

  /**
   * Find if a value exists
   */
  has(key: string): boolean {
    return this.get(key) !== undefined
  }

  /**
   * Get the existing value for a given key
   */
  get<T extends any>(key: string): T {
    return this.value[key]
  }

  /**
   * Get the underlying constructed object
   */
  toObject() {
    return this.value
  }
}
