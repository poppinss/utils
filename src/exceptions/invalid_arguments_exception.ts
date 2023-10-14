/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '../exception.js'

export class InvalidArgumentsException extends Exception {
  static code = 'E_INVALID_ARGUMENTS_EXCEPTION'
  static status = 500
}
