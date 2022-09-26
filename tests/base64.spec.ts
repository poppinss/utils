/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { base64 } from '../src/helpers/base64.js'

const base64String =
  'AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w=='

const base64UrlEncodedString =
  'AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0-P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn-AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq-wsbKztLW2t7i5uru8vb6_wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t_g4eLj5OXm5-jp6uvs7e7v8PHy8_T19vf4-fr7_P3-_w'

const binaryData = unescape(
  '%00%01%02%03%04%05%06%07%08%09%0A%0B%0C%0D%0E%0F%10%11%12%13%14%15%16%17%18%19%1A%1B%1C%1D%1E%1F%20%21%22%23%24%25%26%27%28%29*+%2C-./0123456789%3A%3B%3C%3D%3E%3F@ABCDEFGHIJKLMNOPQRSTUVWXYZ%5B%5C%5D%5E_%60abcdefghijklmnopqrstuvwxyz%7B%7C%7D%7E%7F%80%81%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%93%94%95%96%97%98%99%9A%9B%9C%9D%9E%9F%A0%A1%A2%A3%A4%A5%A6%A7%A8%A9%AA%AB%AC%AD%AE%AF%B0%B1%B2%B3%B4%B5%B6%B7%B8%B9%BA%BB%BC%BD%BE%BF%C0%C1%C2%C3%C4%C5%C6%C7%C8%C9%CA%CB%CC%CD%CE%CF%D0%D1%D2%D3%D4%D5%D6%D7%D8%D9%DA%DB%DC%DD%DE%DF%E0%E1%E2%E3%E4%E5%E6%E7%E8%E9%EA%EB%EC%ED%EE%EF%F0%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FB%FC%FD%FE%FF'
)

test.group('Base 64 | encode', () => {
  test('encode binary data', ({ assert }) => {
    assert.equal(base64.urlEncode(binaryData, 'binary'), base64UrlEncodedString)
    assert.equal(base64.encode(binaryData, 'binary'), base64String)
  })

  test('encode hex value', ({ assert }) => {
    const value = Buffer.from(binaryData, 'binary').toString('hex')

    assert.equal(base64.urlEncode(value, 'hex'), base64UrlEncodedString)
    assert.equal(base64.encode(value, 'hex'), base64String)
  })

  test('encode buffer', ({ assert }) => {
    const value = Buffer.from(binaryData, 'binary')

    assert.equal(base64.urlEncode(value), base64UrlEncodedString)
    assert.equal(base64.encode(value), base64String)
  })
})

test.group('Base 64 | urlDecode', () => {
  test('decode as binary value', ({ assert }) => {
    assert.equal(base64.urlDecode(base64UrlEncodedString, 'binary'), binaryData)
    assert.equal(base64.decode(base64String, 'binary'), binaryData)
  })

  test('decode as hex value', ({ assert }) => {
    const expectedValue = Buffer.from(binaryData, 'binary').toString('hex')

    assert.equal(base64.urlDecode(base64UrlEncodedString, 'hex'), expectedValue)
    assert.equal(base64.decode(base64String, 'hex'), expectedValue)
  })

  test('decode as plain string', ({ assert }) => {
    const value = 'hello+world'
    assert.equal(base64.urlDecode(base64.urlEncode(value)), value)
    assert.equal(base64.decode(base64.encode(value)), value)
  })

  test('return corrupt value when unable to decode (strict: false)', ({ assert }) => {
    const value = 'hello+world'
    assert.isNotNull(base64.urlDecode(value, 'utf-8'))
    assert.isNotNull(base64.decode(value, 'utf-8'))
  })

  test('return null value when unable to decode (strict: true)', ({ assert }) => {
    const value = 'hello+world'
    assert.isNull(base64.urlDecode(value, 'utf-8', true))
    assert.isNull(base64.decode(value, 'utf-8', true))
  })
})
