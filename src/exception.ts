/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Extended Error object with the option to set error `status` and `code`.
 * At AdonisJs, we prefer exceptions with proper error codes to handle
 * them without relying on message pattern matching.
 *
 * ```js
 * new Exception('message', 500, 'E_RUNTIME_EXCEPTION')
 * ```
 */
export class Exception extends Error {
  /**
   * Static properties to defined on the exception once
   * and then re-use them
   */
  static help?: string
  static code?: string
  static status?: number
  static message?: string

  /**
   * Name of the class that raised the exception.
   */
  name: string

  /**
   * Optional help description for the error. You can use it to define additional
   * human readable information for the error.
   */
  help?: string

  /**
   * A machine readable error code. This will allow the error handling logic
   * to narrow down exceptions based upon the error code.
   */
  code?: string

  /**
   * A status code for the error. Usually helpful when converting errors
   * to HTTP responses.
   */
  status: number

  constructor(message?: string, options?: ErrorOptions & { code?: string; status?: number }) {
    super(message, options)

    const ErrorConstructor = this.constructor as typeof Exception

    this.message = message || ErrorConstructor.message || ''
    this.code = options?.code || ErrorConstructor.code
    this.name = ErrorConstructor.name
    this.status = options?.status || ErrorConstructor.status || 500
    this.help = ErrorConstructor.help

    Error.captureStackTrace(this, ErrorConstructor)
  }

  [Symbol.toStringTag]() {
    return this.constructor.name
  }

  toString() {
    if (this.code) {
      return `${this.name} [${this.code}]: ${this.message}`
    }
    return `${this.name}: ${this.message}`
  }
}
