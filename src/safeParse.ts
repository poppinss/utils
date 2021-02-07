/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// https://github.com/fastify/secure-json-parse
// https://github.com/hapijs/bourne
const suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/

const JsonSigRx = /^["{[]|^-?[0-9][0-9.]*$/

function jsonParseTransform(
  key: string,
  value: any,
  reviver?: (this: any, jsonKey: string, jsonValue: any) => any
): any {
  if (key === '__proto__' || key === 'constructor') {
    return
  }
  return reviver ? reviver(key, value) : value
}

/**
 * Copied directly from https://github.com/nuxt-contrib/destr/blob/master/src/index.ts but
 * instead raises the malformed JSON exceptions vs swallowing them
 */
export function safeParse(
  val: string,
  reviver?: (this: any, jsonKey: string, jsonValue: any) => any
): any {
  if (typeof val !== 'string') {
    return val
  }

  if (val === 'null') {
    return null
  }

  if (!JsonSigRx.test(val)) {
    return val
  }

  if (suspectProtoRx.test(val) || suspectConstructorRx.test(val)) {
    return JSON.parse(val, (key, value) => jsonParseTransform(key, value, reviver))
  }

  return JSON.parse(val, reviver)
}
