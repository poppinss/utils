/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export declare const pick: (source: any, ...keys: (string | string[])[]) => any
export declare const omit: (source: any, ...keys: (string | string[])[]) => any
export declare const has: (source: any, key: string | string[]) => boolean
export declare const get: (source: any, key: string | string[], defaultValue?: any) => any
export declare const set: (source: any, key: string | string[], value: any) => any
export declare const unset: (source: any, key: string | string[]) => boolean
export declare const mergeWith: (source: any) => any
export declare const merge: (source: any, ...rest: any[]) => any
export declare const size: (source: any) => number
export declare const clone: (source: any) => any
export declare const cloneDeep: (source: any) => any
