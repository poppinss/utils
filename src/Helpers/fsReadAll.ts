/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import read from 'fs-readdir-recursive'
import { isScriptFile } from '../isScriptFile'

/**
 * Returns an array of file paths from the given location.
 */
export function fsReadAll(location: string, callback?: (file: string) => boolean): string[] {
  return read(location).filter(typeof callback === 'function' ? callback : isScriptFile)
}
