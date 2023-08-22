/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { fileURLToPath } from 'node:url'
import { dirname as pathDirname } from 'node:path'

export { assert, assertNotNull, assertUnreachable } from './src/assert.js'
export { base64 } from './src/base64.js'
export { compose } from './src/compose.js'
export { importDefault } from './src/import_default.js'
export { defineStaticProperty } from './src/define_static_property.js'
export { Exception, createError } from './src/exception.js'
export { flatten } from './src/flatten.js'
export { fsImportAll } from './src/fs_import_all.js'
export { fsReadAll } from './src/fs_read_all.js'
export { isScriptFile } from './src/is_script_file.js'
export { MessageBuilder } from './src/message_builder.js'
export { naturalSort } from './src/natural_sort.js'
export { ObjectBuilder } from './src/object_builder.js'
export { safeEqual } from './src/safe_equal.js'
export { slash } from './src/slash.js'
export { RuntimeException } from './src/exceptions/runtime_exception.js'
export { InvalidArgumentsException } from './src/exceptions/invalid_arguments_exception.js'

/**
 * Get dirname for a given file path URL
 */
export function getDirname(url: string | URL) {
  return pathDirname(getFilename(url))
}

/**
 * Get filename for a given file path URL
 */
export function getFilename(url: string | URL) {
  return fileURLToPath(url)
}
