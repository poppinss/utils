# @poppinss/utils

> A toolkit of utilities used across all the AdonisJS, Edge, and Japa packages

[![gh-workflow-image]][gh-workflow-url] [![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

## Why does this package exist?

My open-source projects (including AdonisJS) use many single-purpose utility packages from npm. Over the years, I have faced the following challenges when using these packages.

- Finding the perfect package for the use case takes a lot of time. The package should be well maintained, have good test coverage, and not accumulate debt by supporting some old versions of Node.js.
- Some packages are great, but they end up pulling a lot of unnecessary dependencies like [(requiring TypeScript as a prod dependency)](https://github.com/blakeembrey/change-case/issues/281)
- Sometimes, I use different packages for the same utility (because I cannot remember what I used last time in that other package). So I want to spend time once choosing the one I need and then bundle it inside `@poppinss/utils`.
- Some authors introduce breaking changes too often (not a criticism). Therefore, I prefer wrapping their packages with my external API only to absorb breaking changes in one place.
- The rest are some handwritten utilities that fit my needs.

## Re-exported packages

The following packages are re-exported as it is and you must consult their documentation for usage instructions.

| Package                                                                  | Subpath export              |
| ------------------------------------------------------------------------ | --------------------------- |
| [@poppinss/exception](https://www.npmjs.com/package/@poppinss/exception) | `@poppinss/utils/exception` |
| [@poppinss/string](https://www.npmjs.com/package/@poppinss/string)       | `@poppinss/utils/string`    |
| [@poppinss/types](https://www.npmjs.com/package/@poppinss/types)         | `@poppinss/utils/types`     |

## Other packages to use

A note to self and others to consider the following packages.

| Package                                                            | Description                                                                    |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| [he](https://www.npmjs.com/package/he)                             | For escaping HTML entities and encoding Unicode symbols. Has zero dependencies |
| [@sindresorhus/is](https://www.npmjs.com/package/@sindresorhus/is) | For advanced type checking. Has zero dependencies                              |
| [moize](https://www.npmjs.com/package/moize)                       | For memoizing functions with complex parameters                                |

## Package size

Even though I do not care much about package size (most of my work is consumed on the server side), I am mindful of the utilities and ensure that I do not end up using really big packages for smaller use cases.

Here's the last checked install size of this package.

<a href="https://pkg-size.dev/@poppinss/utils@next"><img src="https://pkg-size.dev/badge/install/370120" title="Install size for @poppinss/utils"></a>

## Installation

Install the package from the npm registry as follows:

```sh
npm i @poppinss/utils

# Yarn lovers
yarn add @poppinss/utils
```

## JSON helpers

Safely parse and stringify JSON values. These helpers are thin wrappers over [secure-json-parse](https://github.com/fastify/secure-json-parse) and [safe-stable-stringify](https://github.com/BridgeAR/safe-stable-stringify) packages.

### safeParse

The native implementation of `JSON.parse` opens up the possibility for [prototype poisoning](https://medium.com/intrinsic-blog/javascript-prototype-poisoning-vulnerabilities-in-the-wild-7bc15347c96). The `safeParse` method protects you from that by removing the `__proto__` and the `constructor.prototype` properties from the JSON string at the time of parsing it.

```ts
import { safeParse } from '@poppinss/utils/json'

safeParse('{ "a": 5, "b": 6, "__proto__": { "x": 7 } }')
// { a: 5, b: 6 }
```

### safeStringify

The native implementation of `JSON.stringify` cannot handle circular references or language-specific data types like `BigInt`. The `safeStringify` method removes circular references and converts BigInts to strings.
The `safeStringify` method accepts the same set of parameters as the `JSON.stringify` method.

```ts
import { safeStringify } from '@poppinss/utils/json'

const value = {
  b: 2,
  c: BigInt(10),
}

// Circular reference
value.a = value

safeStringify(value)
// '{"b":2,"c":"10"}'
```

## Lodash helpers

Lodash is quite a big library, and we do not use all its helper methods. Therefore, we create a custom build using the lodash CLI and bundle only the needed ones.

> **Why not use something else**: All other helpers I have used are not as accurate or well implemented as lodash.

- pick
- omit
- has
- get
- set
- unset
- mergeWith
- merge
- size
- clone
- cloneWith
- cloneDeep
- cloneDeepWith
- toPath

You can use the methods as follows.

```ts
import lodash from '@poppinss/utils/lodash'

lodash.pick(collection, keys)
```

## FS helpers

### fsReadAll

Get a recursive list of all files from a given directory. This method is similar to the Node.js `readdir` method, with the following differences.

- Dot files and directories are ignored.
- Only files are returned (not directories).
- You can define how the output paths should be returned. The supported types are `relative`, `absolute`, `unixRelative`, `unixAbsolute`, and `url`.

```ts
import { fsReadAll } from '@poppinss/utils/fs'

const basePath = new URL('./config', import.meta.url)
const files = await fsReadAll(basePath, { pathType: 'url' })

console.log(files)
```

#### OPTIONS

<dl>
  <dt>ignoreMissingRoot</dt>
  <dd>By default, an exception is raised when the root directory is missing. Setting <code>ignoreMissingRoot</code> to true will not result in an error, and an empty array will be returned.</dd>

  <dt>filter</dt>
  <dd>Define a filter to ignore certain paths. The method is called on the final list of files.</dd>

  <dt>sort</dt>
  <dd>Define a custom method to sort file paths. By default, the files are sorted using natural sort.</dd>

  <dt>pathType</dt>
  <dd>Define how to return the collected paths. By default, OS-specific relative paths are returned. If you want to import the collected files, you must set the <code>pathType = 'url'</code></dd>
</dl>

### fsImportAll

The `fsImportAll` method recursively imports all the JavaScript, TypeScript, and JSON files from a given directory and returns their exported values as an object of key-value pairs.

- If there are nested directories, then the output will also contain nested objects.
- Value is the exported values from the module. Only the default value is used if a module exports both the `default` and `named` values.

```ts
import { fsImportAll } from '@poppinss/utils/fs'

const configDir = new URL('./config', import.meta.url)
const collection = await fsImportAll(configDir)

console.log(collection)
```

```sh
// title: Directory structure
├── js
│   └── config.cjs
├── json
│   └── main.json
└── ts
    ├── app.ts
    └── server.ts
```

```ts
// title: Output
{
  ts: {
    app: {},
    server: {},
  },
  js: {
    config: {},
  },
  json: {
    main: {},
  },
}
```

#### OPTIONS

<dl>
  <dt>ignoreMissingRoot</dt>
  <dd>By default, an exception is raised when the root directory is missing. Setting <code>ignoreMissingRoot</code> to true will not result in an error, and an empty object will be returned.</dd>

  <dt>filter</dt>
  <dd>Define a filter to ignore certain paths. By default only files ending with <code>.js</code>, <code>.ts</code>, <code>.json</code>, <code>.cjs</code>, and <code>.mjs</code> are imported.</dd>

  <dt>sort</dt>
  <dd>Define a custom method to sort file paths. By default, the files are sorted using natural sort.</dd>

  <dt>transformKeys</dt>
  <dd>Define a callback method to transform the keys for the final object. The method receives an array of nested keys and must return an array back.</dd>
</dl>

## Assertion helpers

The following assertion methods offer a type-safe approach for writing conditionals and throwing errors when the variable has unexpected values.

### assertExists

Throws [AssertionError](https://nodejs.org/api/assert.html#new-assertassertionerroroptions) when the value is `false`, `null`, or `undefined`.

```ts
import { assertExists } from '@poppinss/utils/assert'

const value = false as string | false
assertExists(value)

// value is a string
```

### assertNotNull

Throws [AssertionError](https://nodejs.org/api/assert.html#new-assertassertionerroroptions) when the value is `null`.

```ts
import { assertNotNull } from '@poppinss/utils/assert'

const value = null as string | null
assertNotNull(value)

// value is a string
```

### assertIsDefined

Throws [AssertionError](https://nodejs.org/api/assert.html#new-assertassertionerroroptions) when the value is `undefined`.

```ts
import { assertIsDefined } from '@poppinss/utils/assert'

const value = undefined as string | undefined
assertIsDefined(value)

// value is a string
```

### assertUnreachable

Throws [AssertionError](https://nodejs.org/api/assert.html#new-assertassertionerroroptions) when the method is invoked. In other words, this method always throws an exception.

```ts
import { assertUnreachable } from '@poppinss/utils/assert'
assertUnreachable()
```

## Base64 encoding

### encode

Base64 encodes a string or a Buffer value.

```ts
import base64 from '@poppinss/utils/base64'

base64.encode('hello world')
// aGVsbG8gd29ybGQ=
```

### urlEncode

The `urlEncode` method returns a base64 string safe for use inside a URL. The following characters are replaced.

- The `+` character is replaced with `-`.
- The `/` character is replaced with `_`.
- Trailing `=` sign is removed.

```ts
base64.urlEncode('hello world')
// aGVsbG8gd29ybGQ
```

### decode

Decode a previously encoded base64 string. By default, a `null` value is returned when the string cannot be decoded. However, you can turn on the strict mode to throw an exception instead.

```ts
base64.decode(base64.encode('hello world'))

base64.decode('foo') // null
base64.decode('foo', true) // throws error
```

### urlDecode

Decode a previously URL-encoded base64 string. By default, a `null` value is returned when the string cannot be decoded. However, you can turn on the strict mode to throw an exception instead.

```ts
base64.urlDecode(base64.urlEncode('hello world'))

base64.urlDecode('foo') // null
base64.urlDecode('foo', true) // throws error
```

## compose

The `compose` helper allows you to use TypeScript class mixins with a cleaner API. Following is an example of mixin usage without the compose helper.

```ts
class User extends UserWithAttributes(UserWithAge(UserWithPassword(UserWithEmail(BaseModel)))) {}
```

The following is an example of the `compose` helper. As you can notice, the `compose` removes nesting and applies mixins from left to right.

```ts
import { compose } from '@poppinss/utils'

class User extends compose(
  BaseModel,
  UserWithEmail,
  UserWithPassword,
  UserWithAge,
  UserWithAttributes
) {}
```

## defineStaticProperty

### PROBLEM STATEMENT

If you use class inheritance alongside static properties, you will either share properties by reference or define them directly on the parent class.

**Redefining a property**\
In the following example, we re-define the `static columns` member on the `UserModel` class.

```ts
class AppModel {
  static columns = ['id']
}

class UserModel extends AppModel {
  static columns = ['username']
}
```

**Sharing by reference**\
In the following example, we are share the `static columns` between the `AppModel` and the `UserModel` classes. However, mutating the property via the `UserModel` will also impact the `AppModel` (not something we want).

```ts
class AppModel {
  static columns = ['id']
}

class UserModel extends AppModel {}
UserModel.columns.push('username')
```

### SOLUTION

To solve the mutation side-effect, you must deep-clone the `columns` array from the parent class and re-define them on `UserModel` class.

```ts
import lodash from '@poppinss/utils/lodash'

class AppModel {
  static columns = ['id']
}

class UserModel extends AppModel {
  static columns = lodash.cloneDeep(AppModel.columns)
}

UserModel.columns.push('username')
```

The `defineStaticProperty` method abstracts the logic of cloning the values. Member values are only cloned when the same member is not defined as an `ownProperty`.

```ts
import { defineStaticProperty } from '@poppinss/utils'

class AppModel {
  static columns = ['id']
}

class UserModel extends AppModel {}
defineStaticProperty(UserModel, 'columns', {
  strategy: 'inherit',
  initialValue: [],
})
```

#### AVAILABLE STRATEGIES

<dl>
  <dt>inherit</dt>
  <dd>The <code>inherit</code> strategy clones the value from the parent class.</dd>

  <dt>define</dt>
  <dd>The <code>define</code> strategy always re-defines the property, discarding any values on the parent class.</dd>

  <dt>callback</dt>
  <dd>The <code>strategy</code> value can be a function to perform custom clone operations.</dd>
</dl>

## flatten

Create a flat object from a nested object/array. The nested keys are combined with a dot notation (`.`). The method is exported from the [flattie](https://www.npmjs.com/package/flattie) package.

```ts
import { flatten } from '@poppinss/utils'

flatten({
  a: 'hi',
  b: {
    a: null,
    b: ['foo', '', null, 'bar'],
    d: 'hello',
    e: {
      a: 'yo',
      b: undefined,
      c: 'sup',
      d: 0,
      f: [
        { foo: 123, bar: 123 },
        { foo: 465, bar: 456 },
      ],
    },
  },
  c: 'world',
})

// {
//   'a': 'hi',
//   'b.b.0': 'foo',
//   'b.b.1': '',
//   'b.b.3': 'bar',
//   'b.d': 'hello',
//   'b.e.a': 'yo',
//   'b.e.c': 'sup',
//   'b.e.d': 0,
//   'b.e.f.0.foo': 123,
//   'b.e.f.0.bar': 123,
//   'b.e.f.1.foo': 465,
//   'b.e.f.1.bar': 456,
//   'c': 'world'
// }
```

## isScriptFile

A filter to know if the file path ends with `.js`, `.json`, `.cjs`, `.mjs`, or `.ts`. In the case of `.ts` files, the `.d.ts` returns false.

```ts
import { isScriptFile } from '@poppinss/utils'

isScriptFile('foo.js') // true
isScriptFile('foo/bar.cjs') // true
isScriptFile('foo/bar.mjs') // true
isScriptFile('foo.json') // true

isScriptFile('foo/bar.ts') // true
isScriptFile('foo/bar.d.ts') // false
```

## importDefault

Returns the default exported value from a dynamic import function. An exception is thrown when the module does not have a `default` export.

```ts
import { importDefault } from '@poppinss/utils'
const defaultVal = await importDefault(() => import('./some_module.js'))
```

## naturalSort

Sort values of an Array using natural sort.

```ts
import { naturalSort } from '@poppinss/utils'

const values = ['1_foo_bar', '12_foo_bar'].sort()
// Default sorting: ['12_foo_bar', '1_foo_bar']

const values = ['1_foo_bar', '12_foo_bar'].sort(naturalSort)
// Default sorting: ['1_foo_bar', '12_foo_bar']
```

## safeEqual

Check if two buffer or string values are the same. This method does not leak any timing information and prevents [timing attack](https://javascript.plainenglish.io/what-are-timing-attacks-and-how-to-prevent-them-using-nodejs-158cc7e2d70c).

Under the hood, this method uses Node.js [crypto.timeSafeEqual](https://nodejs.org/api/crypto.html#cryptotimingsafeequala-b) method, with support for comparing string values. _(crypto.timeSafeEqual does not support string comparison)_

```ts
import { safeEqual } from '@poppinss/utils'

/**
 * The trusted value. Might be saved inside the db
 */
const trustedValue = 'hello world'

/**
 * Untrusted user input
 */
const userInput = 'hello'

if (safeEqual(trustedValue, userInput)) {
  //Both are the same
} else {
  // value mismatch
}
```

## MessageBuilder

The `MessageBuilder` is used to stringify values with an encoded expiry date and purpose.

```ts
import { MessageBuilder } from '@poppinss/utils'

const builder = new MessageBuilder()
const encoded = builder.build(
  {
    token: string.random(32),
  },
  '1 hour',
  'email_verification'
)

/**
 * {
 *   "message": {
 *    "token":"GZhbeG5TvgA-7JCg5y4wOBB1qHIRtX6q"
 *   },
 *   "purpose":"email_verification",
 *   "expiryDate":"2022-10-03T04:07:13.860Z"
 * }
 */
```

Once you have the JSON string with the expiration and purpose, you can encrypt it or sign it (to prevent tampering) and share it with the client.

Later, when the encrypted value is presented to perform an action, you must decrypt or unsign it and verify it using the `MessageBuilder`.

```ts
const decoded = builder.verify(decryptedValue, 'email_verification')
if (!decoded) {
  return 'Invalid token'
}

console.log(decoded.token)
```

## Secret

Wrap a value inside a Secret object to prevent it from leaking inside log statements or serialized payloads.

For example, you issue an opaque token to a user and persist its hash inside the database. The plain token (aka raw value) is shared with the user and should only be visible once (for security reasons).

```ts
class Token {
  generate() {
    return {
      value: 'opaque_raw_token',
      hash: 'hash_of_raw_token_inside_db',
    }
  }
}

const token = new Token().generate()
return response.send(token)
```

At the same time, you want to drop a log statement inside your application that you can later use to debug its flow.

```ts
const token = new Token().generate()

logger.log('token generated %O', token)
// token generated {"value":"opaque_raw_token","hash":"hash_of_raw_token_inside_db"}

return response.send(token)
```

As you can notice above, logging the token also logs its raw value. Now, anyone monitoring the logs can grab raw token values from the log and use them to perform the actions on behalf of the user.

To prevent this from happening, you can wrap the secret values like an opaque token inside the `Secret` utility class. Logging an instance of the `Secret` class will redact the underlying value.

```ts
import { Secret } from '@poppinss/utils'

class Token {
  generate() {
    return {
      // THIS LINE 👇
      value: new Secret('opaque_raw_token'),
      hash: 'hash_of_raw_token_inside_db',
    }
  }
}

const token = new Token().generate()

logger.log('token generated %O', token)
// AND THIS LOG 👇
// token generated {"value":"[redacted]","hash":"hash_of_raw_token_inside_db"}

return response.send(token)
```

**Need the original value back?**\
You can call the `release` method to regain the original value. The idea is not to prevent your code from accessing the raw value. It's to stop the logging and serialization layer from reading it.

```ts
const secret = new Secret('opaque_raw_token')
const rawValue = secret.release()

rawValue === opaque_raw_token // true
```

[gh-workflow-image]: https://img.shields.io/github/actions/workflow/status/poppinss/utils/checks.yml?style=for-the-badge
[gh-workflow-url]: https://github.com/poppinss/utils/actions/workflows/checks.yml 'Github action'
[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]: "typescript"
[npm-image]: https://img.shields.io/npm/v/@poppinss/utils.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@poppinss/utils 'npm'
[license-image]: https://img.shields.io/npm/l/@poppinss/utils?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md 'license'
