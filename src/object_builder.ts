/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { OmitProperties } from './types.js'

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
export class ObjectBuilder<
  ReturnType extends Record<string, any>,
  IgnoreNull extends boolean = false,
> {
  #ignoreNull: boolean
  values: ReturnType

  constructor(initialValue: ReturnType, ignoreNull?: IgnoreNull) {
    this.values = initialValue
    this.#ignoreNull = ignoreNull === true ? true : false
  }

  /**
   * Add a key-value pair to the object
   *
   * - Undefined values are ignored
   * - Null values are ignored, when `ignoreNull` is set to true
   */
  add<Prop extends string>(key: Prop, value: undefined): this
  add<Prop extends string, Value>(
    key: Prop,
    value: Value
  ): ObjectBuilder<ReturnType & { [P in Prop]: Value }, IgnoreNull>
  add<Prop extends string, Value>(key: Prop, value: Value): this {
    if (value === undefined) {
      return this
    }

    if (this.#ignoreNull === true && value === null) {
      return this
    }

    ;(this.values as any)[key] = value
    return this
  }

  /**
   * Remove key from the object
   */
  remove<K extends keyof ReturnType>(key: K): this {
    delete this.values[key]
    return this
  }

  /**
   * Find if a value exists
   */
  has<K extends keyof ReturnType>(key: K): boolean {
    return this.get(key) !== undefined
  }

  /**
   * Get the existing value for a given key
   */
  get<K extends keyof ReturnType>(key: K): ReturnType[K] {
    return this.values[key]
  }

  /**
   * Get the underlying constructed object
   */
  toObject(): IgnoreNull extends true
    ? { [K in keyof OmitProperties<ReturnType, null>]: ReturnType[K] }
    : { [K in keyof ReturnType]: ReturnType[K] } {
    return this.values
  }
}
