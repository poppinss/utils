/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { encode, decode, escape, unescape } from 'he'

import bytes from './bytes.js'
import seconds from './seconds.js'
import { slug } from './slugify.js'
import { random } from './random.js'
import { excerpt } from './excerpt.js'
import { ordinal } from './ordinal.js'
import { truncate } from './truncate.js'
import milliseconds from './milliseconds.js'
import { toSentence } from './to_sentence.js'
import { interpolate } from './interpolate.js'
import { plural, pluralize, singular, isPlural, isSingular } from './pluralize.js'
import {
  noCase,
  dotCase,
  dashCase,
  camelCase,
  snakeCase,
  titleCase,
  pascalCase,
  capitalCase,
  sentenceCase,
} from './change_case.js'

/**
 * Condense multiple whitespaces from a string
 */
function condenseWhitespace(value: string): string {
  return value.trim().replace(/\s{2,}/g, ' ')
}

export default {
  excerpt,
  truncate,
  slug,
  interpolate,
  plural,
  pluralize,
  singular,
  isPlural,
  isSingular,
  camelCase,
  capitalCase,
  dashCase,
  dotCase,
  noCase,
  pascalCase,
  sentenceCase,
  snakeCase,
  titleCase,
  encode,
  decode,
  escape,
  unescape,
  random,
  toSentence,
  condenseWhitespace,
  seconds,
  milliseconds,
  bytes,
  ordinal,
}
