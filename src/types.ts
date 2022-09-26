/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export type ReadAllFilesOptions = {
  filter?: (filePath: string, index: number) => boolean
  sort?: (current: string, next: string) => number
  absolute?: boolean
  unixPaths?: boolean
}
