/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import json from './json/main.js'
import milliseconds from './string/milliseconds.js'

/**
 * Message builder exposes an API to "JSON.stringify" values by
 * encoding purpose and expiry date inside them.
 *
 * The return value must be further encrypted to prevent tempering.
 */
export class MessageBuilder {
  #getExpiryDate(expiresIn?: string | number): undefined | Date {
    if (!expiresIn) {
      return undefined
    }

    const expiryMs = milliseconds.parse(expiresIn)
    return new Date(Date.now() + expiryMs)
  }

  /**
   * Returns a boolean telling, if message has been expired or not
   */
  #isExpired(message: any) {
    if (!message.expiryDate) {
      return false
    }

    try {
      const expiryDate = new Date(message.expiryDate)
      return Number.isNaN(expiryDate.getTime()) || expiryDate < new Date()
    } catch (error) {
      return true
    }
  }

  /**
   * Builds a message by encoding expiry date and purpose inside it.
   */
  build(message: any, expiresIn?: string | number, purpose?: string): string {
    const expiryDate = this.#getExpiryDate(expiresIn)
    return json.safeStringify({ message, purpose, expiryDate })
  }

  /**
   * Verifies the message for expiry and purpose.
   */
  verify<T extends any>(message: any, purpose?: string): null | T {
    const parsed = json.safeParse(message)

    /**
     * Safe parse returns the value as it is when unable to JSON.parse it. However, in
     * our case if value was correctly parsed, it should never match the input
     */
    if (parsed === message) {
      return null
    }

    /**
     * Missing ".message" property
     */
    if (!parsed.message) {
      return null
    }

    /**
     * Ensure purposes are same.
     */
    if (parsed.purpose !== purpose) {
      return null
    }

    /**
     * Ensure isn't expired
     */
    if (this.#isExpired(parsed)) {
      return null
    }

    return parsed.message
  }
}
