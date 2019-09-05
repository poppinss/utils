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

import { IocObject, IocReference } from './parseIocReference'
import { deprecate } from 'util'

/**
 * Invokes the ioc reference parsed using [[parseIocReference]] using `ioc.make`
 * and `ioc.call` and both methods supports automatic dependency injection
 */
const callIocReference = deprecate(function callIocReference<T extends any = any> (
  reference: IocObject | IocReference,
  args: any[],
): T {
  let resolvedInstance: any
  if (reference.type === 'iocObject') {
    resolvedInstance = global[Symbol.for('ioc.make')](reference.value)
  } else {
    resolvedInstance = global[Symbol.for('ioc.make')](reference.namespace)
  }

  return global[Symbol.for('ioc.call')](resolvedInstance, reference.method, args)
}, 'callIocReference() is depreciated, use IocResolver instead')

export { callIocReference }
