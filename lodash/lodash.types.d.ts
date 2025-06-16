/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

type PropertyName = string | number | symbol
type PropertyNames = PropertyName | ReadonlyArray<PropertyName>

/**
 * Instead of using lodash as a dependency (which is around 4MB), we create a
 * customized build of lodash with only the following methods.
 *
 * I know that 4MB is not a huge deal on the server, but I am okay shoving that
 * off, if the work to maintain custom build is not too much.
 *
 * How about Lodash per methods packages?
 * They are out of date from the main lodash. That is the main problem
 */
declare module '@poppinss/utils/lodash' {
  type LodashMethods = {
    pick: <T>(object: T | null | undefined, ...props: Array<PropertyNames>) => Partial<T>
    omit: <T extends object>(
      object: T | null | undefined,
      ...paths: Array<PropertyNames>
    ) => Partial<T>
    has: <T>(object: T, path: PropertyNames) => boolean
    get: (object: any, path: PropertyNames, defaultValue?: any) => any
    set: (object: any, path: PropertyNames, value: any) => any
    unset: (object: any, path: PropertyNames) => boolean
    mergeWith: (object: any, ...otherArgs: any[]) => any
    merge: (object: any, ...otherArgs: any[]) => any
    size: (collection: object | string | null | undefined) => number
    clone: <T>(value: T) => T
    cloneWith: <T>(
      value: T,
      customizer: (
        value: any,
        key: number | string | undefined,
        object: TObject | undefined,
        stack: any
      ) => T | undefined
    ) => T
    cloneDeep: <T>(value: T) => T
    cloneDeepWith: <T>(
      value: T,
      customizer: (
        value: any,
        key: number | string | undefined,
        object: TObject | undefined,
        stack: any
      ) => T | undefined
    ) => T
    toPath: (value: any) => string[]
  }

  const lodash: LodashMethods
  export default lodash
}
