/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

type PropertyName = string | number | symbol
type PropertyNames = PropertyName | ReadonlyArray<PropertyName>

declare module 'lodash/pick' {
  export default function pick<T>(
    object: T | null | undefined,
    ...props: Array<PropertyNames>
  ): Partial<T>
}

declare module 'lodash/omit' {
  export default function omit<T extends object>(
    object: T | null | undefined,
    ...paths: Array<PropertyNames>
  ): Partial<T>
}

declare module 'lodash/has' {
  export default function has<T>(object: T, path: PropertyNames): boolean
}

declare module 'lodash/get' {
  export default function get(object: any, path: PropertyNames, defaultValue?: any): any
}

declare module 'lodash/set' {
  export default function set(object: any, path: PropertyNames, value: any): any
}

declare module 'lodash/unset' {
  export default function unset(object: any, path: PropertyNames): boolean
}

declare module 'lodash/mergeWith' {
  export default function mergeWith(object: any, ...otherArgs: any[]): any
}

declare module 'lodash/merge' {
  export default function merge(object: any, ...otherArgs: any[]): any
}

declare module 'lodash/size' {
  export default function size(collection: object | string | null | undefined): number
}

declare module 'lodash/clone' {
  export default function clone<T>(value: T): T
}

declare module 'lodash/cloneDeep' {
  export default function cloneDeep<T>(value: T): T
}

declare module 'lodash/toPath' {
  export default function toPath(value: any): string[]
}
