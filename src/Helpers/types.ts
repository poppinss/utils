/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import kindOf from 'kind-of'

const toString = Function.prototype.toString

/**
 * Lookup the type for a given value
 */
export function lookup(
  value: any
):
  | 'undefined'
  | 'null'
  | 'boolean'
  | 'buffer'
  | 'number'
  | 'string'
  | 'arguments'
  | 'object'
  | 'date'
  | 'array'
  | 'regexp'
  | 'error'
  | 'function'
  | 'class'
  | 'generatorfunction'
  | 'symbol'
  | 'map'
  | 'weakmap'
  | 'set'
  | 'weakset'
  | 'int8array'
  | 'uint8array'
  | 'uint8clampedarray'
  | 'int16array'
  | 'uint16array'
  | 'int32array'
  | 'uint32array'
  | 'float32array'
  | 'float64array' {
  const kind = kindOf(value)

  if (kind === 'function' && /^class\s/.test(toString.call(value))) {
    return 'class'
  }

  return kind
}

/**
 * Find if a given value is undefined
 */
export function isUndefined(value: any): boolean {
  return lookup(value) === 'undefined'
}

/**
 * Find if a given value is null
 */
export function isNull(value: any): boolean {
  return lookup(value) === 'null'
}

/**
 * Find if a given value is a boolean
 */
export function isBoolean(value: any): boolean {
  return lookup(value) === 'boolean'
}

/**
 * Find if a given value is a buffer
 */
export function isBuffer(value: any): boolean {
  return lookup(value) === 'buffer'
}

/**
 * Find if a given value is a number
 */
export function isNumber(value: any): boolean {
  return lookup(value) === 'number'
}

/**
 * Find if a given value is a string
 */
export function isString(value: any): boolean {
  return lookup(value) === 'string'
}

/**
 * Find if a given value is function arguments
 */
export function isArguments(value: any): boolean {
  return lookup(value) === 'arguments'
}

/**
 * Find if a given value is a plain object
 */
export function isObject(value: any): boolean {
  return lookup(value) === 'object'
}

/**
 * Find if a given value is a date instance
 */
export function isDate(value: any): boolean {
  return lookup(value) === 'date'
}

/**
 * Find if a given value is an array
 */
export function isArray(value: any): boolean {
  return lookup(value) === 'array'
}

/**
 * Find if a given value is an regularExpression
 */
export function isRegexp(value: any): boolean {
  return lookup(value) === 'regexp'
}

/**
 * Find if a given value is an instance of Error class
 */
export function isError(value: any): boolean {
  return lookup(value) === 'error'
}

/**
 * Find if a given value is a Function
 */
export function isFunction(value: any): boolean {
  return lookup(value) === 'function'
}

/**
 * Find if a given value is a class. Uses regular expression, since there
 * is no way to natively distinguish a class and a function in Javascript
 */
export function isClass(value: any) {
  return lookup(value) === 'class'
}

/**
 * Find if a value is an integer or not
 */
export function isInteger(value: number): boolean {
  return Number.isInteger(value)
}

/**
 * Find if a value is float value or not. The values with more than
 * zero remainder returns true
 */
export function isFloat(value: number): boolean {
  return value !== (value | 0)
}

/**
 * Find if the value has given decimal place or not.
 *
 * Since there is no direct way in Javascript to check for decimal place. We make
 * use of regex to find it out.
 *
 * Numeric values are converted to string by calling `value.toString()` before
 * testing it against the regex.
 *
 * If this method returns `true`, then you can safely parse the string with `parseFloat`
 * method.
 */
export function isDecimal(value: string | number, options?: { decimalPlaces?: string }): boolean {
  if (typeof value === 'number') {
    value = value.toString()
  }

  const decimalPlaces = (options && options.decimalPlaces) || '1,'
  return new RegExp(`^[-+]?([0-9]+)?(\\.[0-9]{${decimalPlaces}})$`).test(value)
}
