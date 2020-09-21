<div align="center"><img src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1557762307/poppinss_iftxlt.jpg" width="600px"></div>

# Utils

> Collection of reusable scripts used by AdonisJS core team

[![circleci-image]][circleci-url] [![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url] [![audit-report-image]][audit-report-url]

This module exports a collection of re-usable utilties to avoid re-writing the same code in every other package. We also include a handful of Lodash utilities, which are used across the AdonisJS packages eco-system.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Installation](#installation)
- [Exception](#exception)
- [fsReadAll](#fsreadall)
- [requireAll](#requireall)
- [esmRequire](#esmrequire)
- [esmResolver](#esmresolver)
- [resolveFrom](#resolvefrom)
- [resolveDir](#resolvedir)
- [interpolate](#interpolate)
- [Lodash utilities](#lodash-utilities)
  - [Exported methods](#exported-methods)
- [Base 64 Encode/Decode](#base-64-encodedecode)
    - [encode](#encode)
    - [decode](#decode)
    - [urlEncode](#urlencode)
    - [urlDecode](#urldecode)
- [Random String](#random-string)
- [Safe equal](#safe-equal)
- [Safe stringify](#safe-stringify)
- [Safe parse](#safe-parse)
- [Message Builder](#message-builder)
- [defineStaticProperty](#definestaticproperty)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

Install the package from npm registry as follows:

```sh
npm i @poppinss/utils

# yarn
yarn add @poppinss/utils
```

and then use it as follows:

```ts
import { requireAll } from '@poppinss/utils'
requireAll(__dirname)
```

## Exception

A custom exception class that extends the `Error` class to add support for defining `status` and `error codes`.

```ts
import { Exception } from '@poppinss/utils'

throw new Exception('Something went wrong', 500, 'E_RUNTIME_EXCEPTION')
throw new Exception('Route not found', 404, 'E_ROUTE_NOT_FOUND')
```

## fsReadAll

A utility to recursively read all script files for a given directory. This method is equivalent to
`readdir + recursive + filter (.js, .json, .ts)`.

```ts
import { fsReadAll } from '@poppinss/utils'

const files = fsReadAll(__dirname) // array of strings
```

You can also define your custom filter function. The filter function must return `true` for files to be included.

```ts
const files = fsReadAll(__dirname, (file) => {
  return file.endsWith('.foo.js')
})
```

## requireAll

Same as `fsReadAll`, but instead require the files. Helpful when you want to load all the config files inside a directory on app boot.

```ts
import { requireAll } from '@poppinss/utils'
const config = requireAll(join(__dirname, 'config'))

{
  file1: {}, // exported object
  file2: {} // exported object
}
```

## esmRequire

Utility to require script files wihtout worrying about `CommonJs` and `ESM` exports. This is how it works.

- Returns the exported value for `module.exports`.
- Returns the default value is an ESM module has `export default`.
- Returns all exports if is an ESM module and doesn't have `export default`.

**foo.js**

```ts
module.exports = {
  greeting: 'Hello world',
}
```

**foo.default.js**

```ts
export default {
  greeting: 'Hello world',
}
```

**foo.esm.js**

```ts
export const greeting = {
  greeting: 'hello world',
}
```

```ts
import { esmRequire } from '@poppinss/utils'

esmRequire('./foo.js') // { greeting: 'hello world' }
esmRequire('./foo.default.js') // { greeting: 'hello world' }
esmRequire('./foo.esm.js') // { greeting: { greeting: 'hello world' } }
```

## esmResolver

The `esmResolver` method works similar to `esmRequire`. However, instead of requiring the file, it accepts the object and returns the exported as per the same logic defined above.

```ts
import { esmRequire } from '@poppinss/utils'

esmResolver({ greeting: 'hello world' }) // { greeting: 'hello world' }

esmResolver({
  default: { greeting: 'hello world' },
  __esModule: true,
}) // { greeting: 'hello world' }

esmResolver({
  greeting: { greeting: 'hello world' },
  __esModule: true,
}) // { greeting: { greeting: 'hello world' } }
```

## resolveFrom

Works similar to `require.resolve`, however it handles the absolute paths properly.

```ts
import { resolveFrom } from '@poppinss/utils'

resolveFrom(__dirname, 'npm-package') // returns path to package "main" file
resolveFrom(__dirname, './foo.js') // returns path to `foo.js` (if exists)
resolveFrom(__dirname, join(__dirname, './foo.js')) // returns path to `foo.js` (if exists)
```

## resolveDir

The `require.resolve` or `resolveFrom` method can only resolve paths to a given file and not the directory. For example: If you pass path to a directory, then it will search for `index.js` inside it and in case of a package, it will be search for `main` entry point.

On the other hand, the `resolveDir` method can also resolve path to directories using following resolution.

- Absolute paths are returned as it is.
- Relative paths starting with `./` or `.\` are resolved using `path.join`.
- Path to packages inside `node_modules` are resolved as follows: - Uses `require.resolve` to resolve the `package.json` file. - Then replace the `package-name` with the absolute resolved package path.

```ts
import { resolveDir } from '@poppinss/utils'

resolveDir(__dirname, './database/migrations')
// __dirname + /database/migrations

resolveDir(__dirname, 'some-package/database/migrations')
// {path-to-package}/database/migrations

resolveDir(__dirname, '@some/package/database/migrations')
// {path-to-package}/database/migrations
```

## interpolate

A small utility function to interpolate values inside a string.

```
import { interpolate } from '@poppinss/utils'

interpolate('hello {{ username }}', { username: 'virk' })
interpolate('hello {{ users.0.username }}', { users: [{ username: 'virk' }] })
```

If value is missing, it will be replaced with an `undefined` string.

## Lodash utilities

Lodash itself is a bulky library and most of the times, we don't need all the functions from it. For this purpose, the lodash team decided to publish individual methods to npm as packages. However, most of those individual packages are outdated.

At this point, whether we should use the complete lodash build or use outdated individual packages. Both are not acceptable.

Instead, we make use of `lodash-cli` to create a custom build of all the utilities we ever need inside the AdonisJS eco-system and export it as part of this package. Why part of this package?

Well, creating custom builds in multiple packages will cause friction, so it's better to keep it at a single place.

> **Do note: There are no Typescript types for the lodash methods, since their CLI doesn't generate one and the one published on `@types/lodash` package are again maintained by community and not the lodash core team, so at times, they can also be outdated.**

```ts
import { lodash } from '@poppinss/utils'
lodash.snakeCase('HelloWorld') // hello_world
```

### Exported methods

Following is the list of exported helpers.

- [pick](https://lodash.com/docs/latest#pick)
- [omit](https://lodash.com/docs/latest#omit)
- [get](https://lodash.com/docs/latest#get)
- [set](https://lodash.com/docs/latest#set)
- [unset](https://lodash.com/docs/latest#unset)
- [mergeWith](https://lodash.com/docs/latest#mergeWith)
- [merge](https://lodash.com/docs/latest#merge)
- [snakeCase](https://lodash.com/docs/latest#snakeCase)
- [camelCase](https://lodash.com/docs/latest#camelCase)
- [startCase](https://lodash.com/docs/latest#startCase)

## Base 64 Encode/Decode

Following helpers for base64 encoding/decoding also exists.

#### encode

```ts
import { base64 } from '@poppinss/utils'
base64.encode('hello world')
base64.encode(Buffer.from('hello world', 'binary'))
```

#### decode

```ts
import { base64 } from '@poppinss/utils'
base64.decode(base64.encode('hello world'))
base64.decode(base64.encode(Buffer.from('hello world', 'binary')), 'binary')
```

#### urlEncode

Same as `encode`, but safe for URLS and Filenames

#### urlDecode

Same as `decode`, but decodes the `urlEncode` output values

## Random String

A helper to generate random strings of a given length. Uses `crypto` under the hood.

```ts
import { randomString } from '@poppinss/utils'
randomString(32)
randomString(128)
```

## Safe equal

Compares two values by avoid [timing attack](https://en.wikipedia.org/wiki/Timing_attack). Accepts any input that can be passed to `Buffer.from`

```ts
import { safeValue } from '@poppinss/utils'
if (safeValue('foo', 'foo')) {
}
```

## Safe stringify

Similar to `JSON.stringify`, but also handles Circular references by removing them.

```ts
import { safeStringify } from '@poppinss/utils'

const o = { b: 1, a: 0 }
o.o = o

console.log(safeStringify(o))
// { "b":1,"a":0 }

console.log(JSON.stringify(o))
// TypeError: Converting circular structure to JSON
```

## Safe parse

Similar to `JSON.parse`, but protects against [Prototype Poisoning](https://medium.com/intrinsic/javascript-prototype-poisoning-vulnerabilities-in-the-wild-7bc15347c96)

```ts
import { safeParse } from '@poppinss/utils'

const input = '{ "user": { "__proto__": { "isAdmin": true } } }'

JSON.parse(input)
// { user: { __proto__: { isAdmin: true } } }

safeParse(input)
// { user: {} }
```

## Message Builder

Message builder provides a sane API for stringifying objects similar to `JSON.stringify` but has a few advantages.

- It is safe from JSON poisoning vulnerability.
- You can define expiry and purpose for the encoding. The `verify` method will respect these values.

The message builder alone may seem useless, since anyone can decode the object and change its expiry or purpose. However, you can generate an hash of the stringified object and verify for tampering by validating the hash. This is what AdonisJS does for cookies.

```ts
import { MessageBuilder } from '@poppinss/utils'
const builder = new MessageBuilder()
const encoded = builder.build({ username: 'virk' }, '1 hour', 'login')
```

Now verify it

```ts
builder.verify(encoded) // returns null, no purpose defined
builder.verify(encoded, 'register') // returns null, purpose mismatch.
builder.verify(encoded, 'login') // return { username: 'virk' }
```

## defineStaticProperty
Explicitly define static properties on a class by checking for `hasOwnProperty`. In case of inheritance, the properties from the parent class are cloned vs following the prototypal inheritance.

We use/need this copy from parent class behavior a lot in AdonisJS. Here's an example of Lucid models

You create an application wide base model

```ts
class AppModel extends BaseModel {
  @column.datetime()
  public createdAt: DateTime
}
```

AdonisJS will create the `$columnDefinitions` property on the `AppModel` class, that holds all the columns

```ts
AppModel.$columnDefinitions // { createdAt: { columName: created_at } }
```

Now, lets create another model inheriting the `AppModel`

```ts
class User extends AppModel {
  @column()
  public id: number
}
```

As per the Javascript prototypal inheritance. The `User` model will not contain the columns from the `AppModel`, because we just re-defined the `$columnDefinitions` property. However, we don't want this behavior and instead want to copy the columns from the `AppModel` and then add new columns to it.

Voila! Use the `defineStaticProperty` helper from this class.

```ts
class LucidBaseModel {
  static boot() {
    defineStaticProperty(this, LucidBaseModel, {
      propertyName: '$columnDefinitions',
      defaultValue: {},
      strategy: 'inherit',
    })
  }
}
```

The `defineStaticProperty` takes a total of three arguments.

- The first argument is always `this`.
- The second argument is the root level base class. This will usually be the class exported by your package or module.
- The third argument takes the `propertyName`, `defaultValue (in case, there is nothing to copy)`, and the `strategy`.
- The `inherit` strategy will copy the properties from the base class.
- The `define` strategy will always use the `defaultValue` to define the property on the class. In other words, there is no copy behavior, but prototypal inheritance chain is also breaked by explicitly re-defining the property.

[circleci-image]: https://img.shields.io/circleci/project/github/poppinss/utils/master.svg?style=for-the-badge&logo=circleci
[circleci-url]: https://circleci.com/gh/poppinss/utils 'circleci'
[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]: "typescript"
[npm-image]: https://img.shields.io/npm/v/@poppinss/utils.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@poppinss/utils 'npm'
[license-image]: https://img.shields.io/npm/l/@poppinss/utils?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md 'license'
[audit-report-image]: https://img.shields.io/badge/-Audit%20Report-blueviolet?style=for-the-badge
[audit-report-url]: https://htmlpreview.github.io/?https://github.com/poppinss/utils/blob/develop/npm-audit.html 'audit-report'
