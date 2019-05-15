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

import { esmResolver } from './esmResolver'

/**
 * Handles ESM `default` exports and common js vanilla exports. The `default`
 * exports are only entertained, when `esmEnabled` is set to true.
 */
export function esmRequire (filePath: string) {
  return esmResolver(require(filePath))
}
