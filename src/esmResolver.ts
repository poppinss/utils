/*
* @poppinss/utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export function esmResolver (output: any) {
  return output && output.__esModule && output.default ? output.default : output
}
