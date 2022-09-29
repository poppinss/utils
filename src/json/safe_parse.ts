/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { parse } from 'secure-json-parse'
import { JSONReviver } from '../types.js'

/**
 * A drop-in replacement for JSON.parse with prototype poisoning protection.
 */
export function safeParse(jsonString: string, reviver?: JSONReviver): any {
  return parse(jsonString, reviver, {
    protoAction: 'remove',
    constructorAction: 'remove',
  })
}
