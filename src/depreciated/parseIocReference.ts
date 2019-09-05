/**
 * @module @poppinss/utils
 */

/*
* @poppinss/utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Exception } from '../Exception'

export type IocReference = { type: 'iocReference', namespace: string, method: string }
export type IocObject = { type: 'iocObject', value: any, method: string }

export function parseIocReference (
  reference: string,
  prefixNamespace: string | undefined,
  fallbackHandler: string | undefined,
  eagerLoad: true,
): IocObject

export function parseIocReference (
  reference: string,
  prefixNamespace?: string,
  fallbackHandler?: string,
): IocReference

/**
 * Parses a string reference to make a Ioc container binding reference. In case
 * of `eagerLoad`, it will attempt to resolve the binding and returns the
 * resolved value vs just the string.
 */
export function parseIocReference (
  reference: string,
  prefixNamespace?: string,
  fallbackHandler?: string,
  eagerLoad?: boolean,
): IocReference | IocObject {
  let [namespace, method] = reference.split('.')

  namespace = namespace.trim()
  method = (method || fallbackHandler) as string

  /**
   * Ensure namespace is defined
   */
  if (!namespace) {
    throw new Exception(
      'Empty string cannot be used as IoC container reference',
      500,
      'E_INVALID_IOC_NAMESPACE',
    )
  }

  /**
   * Ensure namespace has a method or fallback method
   * exists.
   */
  if (!method) {
    throw new Exception(
      `Missing method reference on {${namespace}} namespace`,
      500,
      'E_INVALID_IOC_NAMESPACE',
    )
  }

  /**
   * Build complete namespace
   */
  if (namespace.startsWith('/')) {
    namespace = namespace.substr(1)
  } else if (prefixNamespace) {
    namespace = `${prefixNamespace.replace(/\/$/, '')}/${namespace}`
  }

  /**
   * In case of eagerload, fetch the binding from the IoC container.
   */
  if (eagerLoad) {
    const resolved = global[Symbol.for('ioc.use')](namespace)
    return {
      type: 'iocObject',
      value: resolved,
      method,
    }
  }

  /**
   * Otherwise return the complete namespace and
   * method.
   */
  return {
    type: 'iocReference',
    namespace: namespace,
    method,
  }
}
