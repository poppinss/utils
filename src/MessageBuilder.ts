/*
 * @adonisjs/encryption
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import ms from 'ms'
import { safeParse } from './safeParse'
import { safeStringify } from './safeStringify'

/**
 * Message builder exposes an API to JSON.stringify values by encoding purpose
 * and expiryDate inside them. It returns a readable string, which is the
 * output of `JSON.stringify`.
 *
 * Why use this over `JSON.stringify`?
 *
 * - It protects you from JSON poisioning
 * - Allows encoding expiry dates to the message. It means, the message builer is
 *   helpful, when you want to encode a message and pass it around, but also control
 *   the TTL of the message
 * - Allows encoding purpose. Again, useful for distribution.
 */
export class MessageBuilder {
  private getExpiryDate(expiresIn?: string | number): undefined | Date {
    if (!expiresIn) {
      return undefined
    }

    const expiryMs = typeof expiresIn === 'string' ? ms(expiresIn) : expiresIn
    if (expiryMs === undefined || expiryMs === null) {
      throw new Error(`Invalid value for expiresIn "${expiresIn}"`)
    }

    return new Date(Date.now() + expiryMs)
  }

  /**
   * Returns a boolean telling, if message has been expired or not
   */
  private isExpired(message: any) {
    if (!message.expiryDate) {
      return false
    }

    try {
      const expiryDate = new Date(message.expiryDate)
      return isNaN(expiryDate.getTime()) || expiryDate < new Date()
    } catch (error) {
      return true
    }
  }

  /**
   * Builds a message by encoding expiry and purpose inside it
   */
  public build(message: any, expiresIn?: string | number, purpose?: string) {
    const expiryDate = this.getExpiryDate(expiresIn)
    return safeStringify({ message, purpose, expiryDate })
  }

  /**
   * Verifies the message for expiry and purpose
   */
  public verify<T extends any>(message: any, purpose?: string): null | T {
    const parsed = safeParse(message)

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
    if (this.isExpired(parsed)) {
      return null
    }

    return parsed.message
  }
}
