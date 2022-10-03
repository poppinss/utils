/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
