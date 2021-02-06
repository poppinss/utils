/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Helper class to base64 encode/decode values with option
 * for url encoding and decoding
 */
class Base64 {
  /**
   * Base64 encode Buffer or string
   */
  public encode(arrayBuffer: ArrayBuffer | SharedArrayBuffer): string
  public encode(data: string, encoding?: BufferEncoding): string
  public encode(data: ArrayBuffer | SharedArrayBuffer | string, encoding?: BufferEncoding): string {
    if (typeof data === 'string') {
      return Buffer.from(data, encoding).toString('base64')
    }
    return Buffer.from(data).toString('base64')
  }

  /**
   * Base64 decode a previously encoded string or Buffer.
   */
  public decode(encode: string, encoding: BufferEncoding, strict: true): string | null
  public decode(encode: string, encoding: undefined, strict: true): string | null
  public decode(encode: string, encoding?: BufferEncoding, strict?: false): string
  public decode(encode: Buffer, encoding?: BufferEncoding): string
  public decode(
    encoded: string | Buffer,
    encoding: BufferEncoding = 'utf-8',
    strict: boolean = false
  ): string | null {
    if (Buffer.isBuffer(encoded)) {
      return encoded.toString(encoding)
    }

    const decoded = Buffer.from(encoded, 'base64').toString(encoding)
    if (strict && this.encode(decoded, encoding) !== encoded) {
      return null
    }

    return decoded
  }

  /**
   * Base64 encode Buffer or string to be URL safe. (RFC 4648)
   */
  public urlEncode(arrayBuffer: ArrayBuffer | SharedArrayBuffer): string
  public urlEncode(data: string, encoding?: BufferEncoding): string
  public urlEncode(
    data: ArrayBuffer | SharedArrayBuffer | string,
    encoding?: BufferEncoding
  ): string {
    const encoded = typeof data === 'string' ? this.encode(data, encoding) : this.encode(data)
    return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '')
  }

  /**
   * Base64 URL decode a previously encoded string or Buffer. (RFC 4648)
   */
  public urlDecode(encode: string, encoding: BufferEncoding, strict: true): string | null
  public urlDecode(encode: string, encoding: undefined, strict: true): string | null
  public urlDecode(encode: string, encoding?: BufferEncoding, strict?: false): string
  public urlDecode(encode: Buffer, encoding?: BufferEncoding): string
  public urlDecode(
    encoded: string | Buffer,
    encoding: BufferEncoding = 'utf-8',
    strict: boolean = false
  ): string | null {
    if (Buffer.isBuffer(encoded)) {
      return encoded.toString(encoding)
    }

    const decoded = Buffer.from(encoded, 'base64').toString(encoding)
    if (strict && this.urlEncode(decoded, encoding) !== encoded) {
      return null
    }

    return decoded
  }
}

export const base64 = new Base64()
