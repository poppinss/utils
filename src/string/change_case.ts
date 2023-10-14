/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as changeCase from 'case-anything'

// Support camel case ("camelCase" -> "camel Case" and "CAMELCase" -> "CAMEL Case").
const NO_CASE_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g]

// Remove all non-word characters.
const NO_CASE_STRIP_REGEXP = /[^A-Z0-9]+/gi

const SMALL_WORDS =
  /\b(?:an?d?|a[st]|because|but|by|en|for|i[fn]|neither|nor|o[fnr]|only|over|per|so|some|tha[tn]|the|to|up|upon|vs?\.?|versus|via|when|with|without|yet)\b/i
const TOKENS = /[^\s:–—-]+|./g
const WHITESPACE = /\s/
const IS_MANUAL_CASE = /.(?=[A-Z]|\..)/
const ALPHANUMERIC_PATTERN = /[A-Za-z0-9\u00C0-\u00FF]/

/**
 * The method is a copy/paste from the "title-case" package. They have
 * a dependency on "tslib", which I don't want.
 */
export function titleCase(input: string) {
  let output = ''
  let result: RegExpExecArray | null

  while ((result = TOKENS.exec(input)) !== null) {
    const { 0: token, index } = result

    if (
      !IS_MANUAL_CASE.test(token) &&
      (!SMALL_WORDS.test(token) || index === 0 || index + token.length === input.length) &&
      (input.charAt(index + token.length) !== ':' ||
        WHITESPACE.test(input.charAt(index + token.length + 1)))
    ) {
      output += token.replace(ALPHANUMERIC_PATTERN, (char) => char.toUpperCase())
      continue
    }

    output += token
  }

  return output
}

/**
 * Convert string to camelcase
 */
export function camelCase(value: string): string {
  return changeCase.camelCase(value)
}

/**
 * Convert string to snakecase
 */
export function snakeCase(value: string): string {
  return changeCase.snakeCase(value)
}

/**
 * Convert string to dashcase
 */
export function dashCase(value: string, options?: { capitalize?: boolean }): string {
  if (options && options.capitalize) {
    return changeCase.trainCase(value)
  }

  return changeCase.kebabCase(value)
}

/**
 * Convert string to pascal case
 */
export function pascalCase(value: string): string {
  return changeCase.pascalCase(value)
}

/**
 * Convert string to capital case
 */
export function capitalCase(value: string): string {
  return changeCase.capitalCase(value)
}

/**
 * Convert string to sentence case
 */
export function sentenceCase(value: string): string {
  return noCase(value, (input, index) => {
    const result = input.toLowerCase()
    if (index === 0) {
      return input.charAt(0).toUpperCase() + input.substring(1)
    }
    return result
  })
}

/**
 * Convert string to dot case
 */
export function dotCase(value: string, options?: { lowerCase?: boolean }): string {
  const transformedValue = changeCase.dotNotation(value)
  if (options && options.lowerCase) {
    return transformedValue.toLowerCase()
  }

  return transformedValue
}

/**
 * Remove all sort of casing from the string. Copy-pasted from
 * "no-case" package with slight modifications.
 */
export function noCase(
  value: string,
  transform?: (part: string, index: number, parts: string[]) => string
): string {
  let result = NO_CASE_SPLIT_REGEXP.reduce((input, regex) => input.replace(regex, '$1\0$2'), value)
  result = result.replace(NO_CASE_STRIP_REGEXP, '\0')

  let start = 0
  let end = result.length

  // Trim the delimiter from around the output string.
  while (result.charAt(start) === '\0') {
    start++
  }
  while (result.charAt(end - 1) === '\0') {
    end--
  }

  return result
    .slice(start, end)
    .split('\0')
    .map(transform || ((input) => input.toLowerCase()))
    .join(' ')
}
