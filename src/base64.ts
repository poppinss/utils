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
  public encode (arrayBuffer: ArrayBuffer | SharedArrayBuffer): string
  public encode (data: string, encoding?: BufferEncoding): string
  public encode (
    data: ArrayBuffer | SharedArrayBuffer | string,
    encoding?: BufferEncoding,
  ): string {
    if (typeof (data) === 'string') {
      return Buffer.from(data, encoding).toString('base64')
    }
    return Buffer.from(data).toString('base64')
  }

  /**
   * Base64 decode a previously encoded string or Buffer.
   */
  public decode (encoded: string | Buffer, encoding: BufferEncoding = 'utf-8'): string {
    return Buffer.isBuffer(encoded)
      ? encoded.toString(encoding)
      : Buffer.from(encoded, 'base64').toString(encoding)
  }

  /**
   * Base64 encode Buffer or string to be URL safe. (RFC 4648)
   */
  public urlEncode (arrayBuffer: ArrayBuffer | SharedArrayBuffer): string
  public urlEncode (data: string, encoding?: BufferEncoding): string
  public urlEncode (
    data: ArrayBuffer | SharedArrayBuffer | string,
    encoding?: BufferEncoding,
  ): string {
    const encoded = typeof (data) === 'string' ? this.encode(data, encoding) : this.encode(data)
    return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '')
  }

  /**
   * Base64 URL decode a previously encoded string or Buffer. (RFC 4648)
   */
  public urlDecode (encoded: string | Buffer, encoding: BufferEncoding = 'utf-8'): string {
    return this.decode(encoded, encoding)
  }
}

export const base64 = new Base64()
