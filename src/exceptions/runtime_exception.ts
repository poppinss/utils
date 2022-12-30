/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '../exception.js'

export class RuntimeException extends Exception {
  static code = 'E_RUNTIME_EXCEPTION'
  static status = 500
}

export class InvalidArgumentExceptiom extends Exception {
  static code = 'E_INVALID_ARGUMENTS_EXCEPTION'
  static status = 500
}
