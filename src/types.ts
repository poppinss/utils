/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

type PickKeysByValue<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T]
export type OmitProperties<T, P> = Omit<T, PickKeysByValue<T, P>>

type ScanFsBaseOptions = {
  ignoreMissingRoot?: boolean
  filter?: (filePath: string, index: number) => boolean
  sort?: (current: string, next: string) => number
}
export type ImportAllFilesOptions = ScanFsBaseOptions & {
  /**
   * A custom method to transform collection keys
   */
  transformKeys?: (keys: string[]) => string[]
}

export type ReadAllFilesOptions = ScanFsBaseOptions & {
  pathType?: 'relative' | 'unixRelative' | 'absolute' | 'unixAbsolute' | 'url'
}

export type JSONReplacer = (this: any, key: string, value: any) => any
export type JSONReviver = (this: any, key: string, value: any) => any

export type Constructor = new (...args: any[]) => any

/**
 * Normalizes constructor to work with mixins. There is an open bug for mixins
 * to allow constructors other than `...args: any[]`
 *
 * https://github.com/microsoft/TypeScript/issues/37142
 */
export type NormalizeConstructor<T extends Constructor> = {
  new (...args: any[]): InstanceType<T>
} & Omit<T, 'constructor'>

declare const opaqueProp: unique symbol
export type Opaque<T, K> = T & { [opaqueProp]: K }
