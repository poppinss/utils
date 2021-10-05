<div align="center"><img src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1557762307/poppinss_iftxlt.jpg" width="600px"></div>

# Utils

> Collection of reusable scripts used by AdonisJS core team

[![gh-workflow-image]][gh-workflow-url] [![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url] [![synk-image]][synk-url]

This module exports a collection of re-usable utilties to avoid re-writing the same code in every other package. We also include a handful of Lodash utilities, which are used across the AdonisJS packages eco-system.

<details>
  <summary>
    <strong>Version 3.0 breaking changes</strong>
  </summary>
  
  The version 3.0 re-format the exports to expose an "helpers" subpath to be used within the AdonisJS apps as well.
  
  The idea is to separate helpers that we need to share with AdonisJS core inside its own module, accessible as `‌@poppinss/utils/build/helpers`.
 
 
 ### Inside helpers subpath
  
  Following modules are now moved to a subpath.
  
  - `MessageBuilder`
  - `base64`
  - `compose`
  - `fsReadAll`
  - `interpolate`
  - `requireAll`
  - `resolveDir`
  - `resolveFrom`
      
```ts
// Earlier
import {
  MessageBuilder,
  base64,
  compose,
  fsReadAll,
  interpolate,
  requireAll,
  resolveDir,
  resolveFrom,
  safeEqual
} from '@poppinss/utils'

// After version 3.0
import {
MessageBuilder,
base64,
compose,
fsReadAll,
interpolate,
requireAll,
resolveDir,
resolveFrom,
safeEqual
} from '@poppinss/utils/build/helpers'

````

### randomString

The `randomString` is now part of the `string` helpers.

```ts
// Earlier
import { randomString } from '@poppinss/utils'
randomString(32)

// After version 3.0
import { string } from '@poppinss/utils/build/helpers'
string.generateRandom(32)
````

### lodash

The following lodash functions have been removed with new alternatives.

- `snakeCase`
- `camelCase`
- `startCase`

```ts
// Earlier
import { lodash } from '@poppinss/utils'

lodash.snakeCase()
lodash.camelCase()
lodash.startCase()

// After version 3.0
import { string } from '@poppinss/utils/build/helpers'

string.snakeCase()
string.camelCase()
string.titleCase()
```

</details>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Installation](#installation)
- [Exception](#exception)
- [esmRequire](#esmrequire)
- [esmResolver](#esmresolver)
- [Lodash utilities](#lodash-utilities)
  - [Exported methods](#exported-methods)
- [Safe stringify](#safe-stringify)
- [Safe parse](#safe-parse)
- [defineStaticProperty](#definestaticproperty)
- [flatten](#flatten)
- [Helpers](#helpers)
  - [fsReadAll](#fsreadall)
  - [requireAll](#requireall)
  - [resolveFrom](#resolvefrom)
  - [resolveDir](#resolvedir)
  - [interpolate](#interpolate)
  - [Base 64 Encode/Decode](#base-64-encodedecode)
    - [encode](#encode)
    - [decode](#decode)
    - [urlEncode](#urlencode)
    - [urlDecode](#urldecode)
  - [Safe equal](#safe-equal)
  - [Message Builder](#message-builder)
  - [compose](#compose)
    - [Mixins gotchas](#mixins-gotchas)
  - [string](#string)
    - [camelCase](#camelcase)
    - [snakeCase](#snakecase)
    - [dashCase](#dashcase)
    - [pascalCase](#pascalcase)
    - [capitalCase](#capitalcase)
    - [sentenceCase](#sentencecase)
    - [dotCase](#dotcase)
    - [noCase](#nocase)
    - [titleCase](#titlecase)
    - [pluralize](#pluralize)
    - [truncate](#truncate)
    - [excerpt](#excerpt)
    - [condenseWhitespace](#condensewhitespace)
    - [escapeHTML](#escapehtml)
    - [encodeSymbols](#encodesymbols)
    - [toSentence](#tosentence)
    - [prettyBytes](#prettybytes)
    - [toBytes](#tobytes)
    - [prettyMs](#prettyms)
    - [toMs](#toms)
    - [ordinalize](#ordinalize)
    - [generateRandom](#generaterandom)
    - [isEmpty](#isempty)
  - [Types](#types)
    - [lookup](#lookup)
    - [isNull](#isnull)
    - [isBoolean](#isboolean)
    - [isBuffer](#isbuffer)
    - [isNumber](#isnumber)
    - [isString](#isstring)
    - [isArguments](#isarguments)
    - [isObject](#isobject)
    - [isDate](#isdate)
    - [isArray](#isarray)
    - [isRegexp](#isregexp)
    - [isError](#iserror)
    - [isFunction](#isfunction)
    - [isClass](#isclass)
    - [isInteger](#isinteger)
    - [isFloat](#isfloat)
    - [isDecimal](#isdecimal)
  - [ObjectBuilder](#objectbuilder)

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

## Lodash utilities

Lodash itself is a bulky library and most of the times, we don't need all the functions from it.

Also, all of the lodash functions are published as individual modules on npm. However, most of those individual packages are outdated and using them is not an option.

Instead, we decided to pick some individual utilities that we need inside AdonisJS ecosystem and export them from the lodash package, as each function is exposed in its own separate file.

```ts
import { lodash } from '@poppinss/utils'
lodash.get({ name: 'virk' }, 'name') // virk
```

### Exported methods

Following is the list of exported helpers.

- [pick](https://lodash.com/docs/latest#pick)
- [omit](https://lodash.com/docs/latest#omit)
- [has](https://lodash.com/docs/latest#has)
- [get](https://lodash.com/docs/latest#get)
- [set](https://lodash.com/docs/latest#set)
- [unset](https://lodash.com/docs/latest#unset)
- [mergeWith](https://lodash.com/docs/latest#mergeWith)
- [merge](https://lodash.com/docs/latest#merge)
- [size](https://lodash.com/docs/latest#size)
- [clone](https://lodash.com/docs/latest#clone)
- [cloneDeep](https://lodash.com/docs/latest#cloneDeep)

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

## flatten
Flatten an object/array. The method wraps the [flattie](https://github.com/lukeed/flattie) package.

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
      ]
    }
  },
  c: 'world'
});
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

## Helpers

The helpers module is also available in AdonisJS applications as follows:

```ts
import { fsReadAll, string, types } from '@ioc:Adonis/Core/Helpers'
```

The `@poppinss/utils` exposes this module as follows

```ts
import { fsReadAll, string, types } from '@poppinss/utils/build/helpers'
```

### fsReadAll

A utility to recursively read all script files for a given directory. This method is equivalent to
`readdir + recursive + filter (.js, .json, .ts)`.

```ts
import { fsReadAll } from '@poppinss/utils/build/helpers'

const files = fsReadAll(__dirname) // array of strings
```

You can also define your custom filter function. The filter function must return `true` for files to be included.

```ts
const files = fsReadAll(__dirname, (file) => {
  return file.endsWith('.foo.js')
})
```

### requireAll

Same as `fsReadAll`, but instead require the files. Helpful when you want to load all the config files inside a directory on app boot.

```ts
import { requireAll } from '@poppinss/utils/build/helpers'
const config = requireAll(join(__dirname, 'config'))

{
  file1: {}, // exported object
  file2: {} // exported object
}
```

The method also accepts the following options

```ts
requireAll(join(__dirname, 'config'), recursive, optional, filter)
```

- `recursive` Load all files recursively. Defaults to true.
- `optional` Do not raise exception when the root directory is missing. Defaults to false.
- `filter` Cherry pick files to require. By default, all JavaScript, TypeScript and JSON files are required.

### resolveFrom

Works similar to `require.resolve`, however it handles the absolute paths properly.

```ts
import { resolveFrom } from '@poppinss/utils/build/helpers'

resolveFrom(__dirname, 'npm-package') // returns path to package "main" file
resolveFrom(__dirname, './foo.js') // returns path to `foo.js` (if exists)
resolveFrom(__dirname, join(__dirname, './foo.js')) // returns path to `foo.js` (if exists)
```

### resolveDir

The `require.resolve` or `resolveFrom` method can only resolve paths to a given file and not the directory. For example: If you pass path to a directory, then it will search for `index.js` inside it and in case of a package, it will be search for `main` entry point.

On the other hand, the `resolveDir` method can also resolve path to directories using following resolution.

- Absolute paths are returned as it is.
- Relative paths starting with `./` or `.\` are resolved using `path.join`.
- Path to packages inside `node_modules` are resolved as follows: - Uses `require.resolve` to resolve the `package.json` file. - Then replace the `package-name` with the absolute resolved package path.

```ts
import { resolveDir } from '@poppinss/utils/build/helpers'

resolveDir(__dirname, './database/migrations')
// __dirname + /database/migrations

resolveDir(__dirname, 'some-package/database/migrations')
// {path-to-package}/database/migrations

resolveDir(__dirname, '@some/package/database/migrations')
// {path-to-package}/database/migrations
```

### interpolate

A small utility function to interpolate values inside a string.

```ts
import { interpolate } from '@poppinss/utils/build/helpers'

interpolate('hello {{ username }}', {
  username: 'virk',
})

interpolate('hello {{ users.0.username }}', {
  users: [{ username: 'virk' }],
})
```

If value is missing, it will be replaced with an `'undefined'` string.

Use the `\` to escape a mustache block from getting evaluated.

```ts
import { interpolate } from '@poppinss/utils/build/helpers'

interpolate('\\{{ username }} expression evaluates to {{ username }}', {
  username: 'virk',
})
// Output: {{ username }} expression evaluates to virk
```

### Base 64 Encode/Decode

Following helpers for base64 encoding/decoding also exists.

#### encode

```ts
import { base64 } from '@poppinss/utils/build/helpers'

base64.encode('hello world')
base64.encode(Buffer.from('hello world', 'binary'))
```

#### decode

```ts
import { base64 } from '@poppinss/utils/build/helpers'

base64.decode(base64.encode('hello world'))
base64.decode(base64.encode(Buffer.from('hello world', 'binary')), 'binary')
```

#### urlEncode

Same as `encode`, but safe for URLS and Filenames

#### urlDecode

Same as `decode`, but decodes the `urlEncode` output values

### Safe equal

Compares two values by avoid [timing attack](https://en.wikipedia.org/wiki/Timing_attack). Accepts any input that can be passed to `Buffer.from`

```ts
import { safeValue } from '@poppinss/utils/build/helpers'

if (safeValue('foo', 'foo')) {
}
```

### Message Builder

Message builder provides a sane API for stringifying objects similar to `JSON.stringify` but has a few advantages.

- It is safe from JSON poisoning vulnerability.
- You can define expiry and purpose for the encoding. The `verify` method will respect these values.

The message builder alone may seem useless, since anyone can decode the object and change its expiry or purpose. However, you can generate an hash of the stringified object and verify the tampering by validating the hash. This is what AdonisJS does for cookies.

```ts
import { MessageBuilder } from '@poppinss/utils/build/helpers'

const builder = new MessageBuilder()
const encoded = builder.build({ username: 'virk' }, '1 hour', 'login')
```

Now verify it

```ts
builder.verify(encoded) // returns null, no purpose defined
builder.verify(encoded, 'register') // returns null, purpose mismatch.
builder.verify(encoded, 'login') // return { username: 'virk' }
```

### compose

Javascript doesn't have a concept of inherting multiple classes together and neither does Typescript. However, the [official documentation](https://www.typescriptlang.org/docs/handbook/mixins.html) of Typescript does talks about the concept of mixins.

As per the Typescript docs, you can create and apply mixins as follows.

```ts
type Constructor = new (...args: any[]) => any

const UserWithEmail = <T extends Constructor>(superclass: T) => {
  return class extends superclass {
    public email: string
  }
}

const UserWithPassword = <T extends Constructor>(superclass: T) => {
  return class extends superclass {
    public password: string
  }
}

class BaseModel {}
class User extends UserWithPassword(UserWithEmail(BaseModel)) {}
```

Mixins are close to a perfect way of inherting multiple classes. I recommend reading [this article](https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/) for same.

However, the syntax of applying multiple mixins is kind of ugly, as you have to apply **mixins over mixins**, creating a nested hierarchy as shown below.

```ts
UserWithAttributes(UserWithAge(UserWithPassword(UserWithEmail(BaseModel))))
```

The `compose` method is a small utility to improve the syntax a bit.

```ts
import { compose } from '@poppinss/utils/build/helpers'

class User extends compose(
  BaseModel,
  UserWithPassword,
  UserWithEmail,
  UserWithAge,
  UserWithAttributes
) {}
```

#### Mixins gotchas

Typescript has an [open issue](https://github.com/microsoft/TypeScript/issues/37142) related to the constructor arguments of the mixin class or the base class.

Typescript expects all classes used in the mixin chain to have a constructor with only one argument of `...args: any[]`. For example: The following code will work fine at runtime, but the **typescript compiler complains about it**.

```ts
class BaseModel {
  constructor(name: string) {}
}

const UserWithEmail = <T extends typeof BaseModel>(superclass: T) => {
  return class extends superclass {
    // ERROR: A mixin class must have a constructor with a single rest parameter of type 'any[]'.ts(2545)
    public email: string
  }
}

class User extends compose(BaseModel, UserWithEmail) {}
```

You can work around this by overriding the constructor of the base class.

```ts
import { NormalizeConstructor, compose } from '@poppinss/utils/build/helpers'

const UserWithEmail = <T extends NormalizeConstructor<typeof BaseModel>>(superclass: T) => {
  return class extends superclass {
    public email: string
  }
}
```

### string

The `string` module includes a bunch of helper methods to work with strings.

#### camelCase

Convert a string to its `camelCase` version.

```ts
import { string } from '@poppinss/utils/build/helpers'

string.camelCase('hello-world') // helloWorld
```

#### snakeCase

Convert a string to its `snake_case` version.

```ts
import { string } from '@poppinss/utils/build/helpers'

string.snakeCase('helloWorld') // hello_world
```

#### dashCase

Convert a string to its `dash-case` version. Optionally, you can also capitalize the first letter of each segment.

```ts
import { string } from '@poppinss/utils/build/helpers'

string.dashCase('helloWorld') // hello-world
string.dashCase('helloWorld', { capitalize: true }) // Hello-World
```

#### pascalCase

Convert a string to its `PascalCase` version.

```ts
import { string } from '@poppinss/utils/build/helpers'

string.pascalCase('helloWorld') // HelloWorld
```

#### capitalCase

Capitalize a string

```ts
import { string } from '@poppinss/utils/build/helpers'

string.capitalCase('helloWorld') // Hello World
```

#### sentenceCase

Convert string to a sentence

```ts
import { string } from '@poppinss/utils/build/helpers'

string.sentenceCase('hello-world') // Hello world
```

#### dotCase

Convert string to its `dot.case` version.

```ts
import { string } from '@poppinss/utils/build/helpers'

string.dotCase('hello-world') // hello.world
```

#### noCase

Remove all sorts of casing

```ts
import { string } from '@poppinss/utils/build/helpers'

string.noCase('hello-world') // hello world
string.noCase('hello_world') // hello world
string.noCase('helloWorld') // hello world
```

#### titleCase

Convert a sentence to title case

```ts
import { string } from '@poppinss/utils/build/helpers'

string.titleCase('Here is a fox') // Here Is a fox
```

#### pluralize

Pluralize a word.

```ts
import { string } from '@poppinss/utils/build/helpers'

string.pluralize('box') // boxes
string.pluralize('i') // we
```

You can also define your own irregular rules using the `string.defineIrregularRule` method.

- The first argument is the singular variation
- The second argument is the plural variation

```ts
import { string } from '@poppinss/utils/build/helpers'

string.defineIrregularRule('auth', 'auth')
string.plural('auth') // auth
```

You can also define your own uncountable rules using the `string.defineUncountableRule` method.

```ts
import { string } from '@poppinss/utils/build/helpers'

string.defineUncountableRule('login')
string.plural('login') // home
```

#### truncate

Truncate a string after a given number of characters

```ts
import { string } from '@poppinss/utils/build/helpers'

string.truncate('This is a very long, maybe not that long title', 12) // This is a ve...
```

By default, the string is truncated exactly after the given characters. However, you can instruct the method to wait for the words to complete.

```ts
string.truncate('This is a very long, maybe not that long title', 12, {
  completeWords: true,
}) // This is a very...
```

Also, it is possible to customize the suffix.

```ts
string.truncate('This is a very long, maybe not that long title', 12, {
  completeWords: true,
  suffix: ' <a href="/1"> Read more </a>',
}) // This is a very <a href="/1"> Read more </a>
```

#### excerpt

The `excerpt` method is same as the `truncate` method. However, it strips the HTML from the string.

```ts
import { string } from '@poppinss/utils/build/helpers'

string.excerpt('<p>This is a <strong>very long</strong>, maybe not that long title</p>', 12) // This is a very...
```

#### condenseWhitespace

Condense whitespaces from a given string. The method removes the whitespace from the `left`, `right` and multiple whitespace in between the words.

```ts
import { string } from '@poppinss/utils/build/helpers'

string.condenseWhitespace(' hello  world ')
// hello world
```

#### escapeHTML

Escape HTML from the string

```ts
import { string } from '@poppinss/utils/build/helpers'

string.escapeHTML('<p> foo © bar </p>')
// &lt;p&gt; foo © bar &lt;/p&gt;
```

Additonally, you can also encode non-ascii symbols

```ts
import { string } from '@poppinss/utils/build/helpers'

string.escapeHTML('<p> foo © bar </p>', {
  encodeSymbols: true,
})
// &lt;p&gt; foo &#xA9; bar &lt;/p&gt;
```

#### encodeSymbols

Encode symbols. Checkout [he](https://npm.im/he) for available options

```ts
import { string } from '@poppinss/utils/build/helpers'

string.encodeSymbols('foo © bar')
// foo &#xA9; bar
```

#### toSentence

Join an array of words with a separator.

```ts
import { string } from '@poppinss/utils/build/helpers'

string.toSentence(['route', 'middleware', 'controller']) // route, middleware, and controller

string.toSentence(['route', 'middleware']) // route and middleware
```

You can also customize

- `separator`: The value between two words except the last one
- `pairSeparator`: The value between the first and the last word. Used, only when there are two words
- `lastSeparator`: The value between the second last and the last word. Used, only when there are more than two words

```ts
string.toSentence(['route', 'middleware', 'controller'], {
  separator: '/ ',
  lastSeparator: '/or ',
}) // route/ middleware/or controller
```

#### prettyBytes

Convert bytes value to a human readable string. For options, recommend the [bytes](https://www.npmjs.com/package/bytes) package.

```ts
import { string } from '@poppinss/utils/build/helpers'

string.prettyBytes(1024) // 1KB
string.prettyBytes(1024, { unitSeparator: ' ' }) // 1 KB
```

#### toBytes

Convert human readable string to bytes. This method is the opposite of the `prettyBytes` method.

```ts
import { string } from '@poppinss/utils/build/helpers'

string.toBytes('1KB') // 1024
```

#### prettyMs

Convert time in milliseconds to a human readable string

```ts
import { string } from '@poppinss/utils/build/helpers'

string.prettyMs(60000) // 1min
string.prettyMs(60000, { long: true }) // 1 minute
```

#### toMs

Convert human readable string to milliseconds. This method is the opposite of the `prettyMs` method.

```ts
import { string } from '@poppinss/utils/build/helpers'

string.toMs('1min') // 60000
```

#### ordinalize

Ordinalize a string or a number value

```ts
import { string } from '@poppinss/utils/build/helpers'

string.ordinalize(1) // 1st
string.ordinalize(99) // 99th
```

#### generateRandom

Generate a cryptographically strong random string

```ts
import { string } from '@poppinss/utils/build/helpers'

string.generateRandom(32)
```

#### isEmpty

Find if a value is empty. Also checks for empty strings with all whitespace

```ts
import { string } from '@poppinss/utils/build/helpers'

string.isEmpty('') // true
string.isEmpty('      ') // true
```

### Types

The types module allows distinguishing between different Javascript datatypes. The `typeof` returns the same type for many different values. For example:

```ts
typeof {} // object
typeof [] // object
typeof null // object
```

WHAT??? Yes, coz everything is an object in Javascript. To have better control, you can make use of the `types.lookup` method.

#### lookup

Returns a more accurate type for a given value.

```ts
import { types } from '@poppinss/utils/build/helpers'

types.lookup({}) // object
types.lookup([]) // array
types.lookup(Object.create(null)) // object
types.lookup(null) // null
types.lookup(function () {}) // function
types.lookup(class Foo {}) // class
types.lookup(new Map()) // map
```

#### isNull

Find if the given value is null

```ts
import { types } from '@poppinss/utils/build/helpers'

types.isNull(null)) // true
```

#### isBoolean

Find if the given value is a boolean

```ts
import { types } from '@poppinss/utils/build/helpers'

types.isBoolean(true)) // true
```

#### isBuffer

Find if the given value is a buffer

```ts
import { types } from '@poppinss/utils/build/helpers'

types.isBuffer(new Buffer())) // true
```

#### isNumber

Find if the given value is a number

```ts
import { types } from '@poppinss/utils/build/helpers'

types.isNumber(100)) // true
```

#### isString

Find if the given value is a string

```ts
import { types } from '@poppinss/utils/build/helpers'

types.isString('hello')) // true
```

#### isArguments

Find if the given value is an arguments object

```ts
import { types } from '@poppinss/utils/build/helpers'

function foo() {
  types.isArguments(arguments)) // true
}
```

#### isObject

Find if the given value is a plain object

```ts
import { types } from '@poppinss/utils/build/helpers'

types.isObject({})) // true
```

#### isDate

Find if the given value is a date object

```ts
import { types } from '@poppinss/utils/build/helpers'

types.isDate(new Date())) // true
```

#### isArray

Find if the given value is an array

```ts
import { types } from '@poppinss/utils/build/helpers'

types.isArray([1, 2, 3])) // true
```

#### isRegexp

Find if the given value is an regular expression

```ts
import { types } from '@poppinss/utils/build/helpers'

types.isRegexp(/[a-z]+/)) // true
```

#### isError

Find if the given value is an instance of the error object

```ts
import { types } from '@poppinss/utils/build/helpers'
import { Exception } from '@poppinss/utils'

types.isError(new Error('foo'))) // true
types.isError(new Exception('foo'))) // true
```

#### isFunction

Find if the given value is a function

```ts
import { types } from '@poppinss/utils/build/helpers'

types.isFunction(function foo() {})) // true
```

#### isClass

Find if the given value is a class constructor. Uses regex to distinguish between a function and a class.

```ts
import { types } from '@poppinss/utils/build/helpers'

class User {}

types.isClass(User) // true
types.isFunction(User) // true
```

#### isInteger

Find if the given value is an integer.

```ts
import { types } from '@poppinss/utils/build/helpers'

types.isInteger(22.0) // true
types.isInteger(22) // true
types.isInteger(-1) // true
types.isInteger(-1.0) // true

types.isInteger(22.1) // false
types.isInteger(0.3) // false
types.isInteger(-0.3) // false
```

#### isFloat

Find if the given value is an float number.

```ts
import { types } from '@poppinss/utils/build/helpers'

types.isFloat(22.1) // true
types.isFloat(-22.1) // true
types.isFloat(0.3) // true
types.isFloat(-0.3) // true

types.isFloat(22.0) // false
types.isFloat(-22.0) // false
types.isFloat(-22) // false
```

#### isDecimal

Find if the given value has a decimal. The value can be a string or a number. The number values are casted to a string by calling the `toString()` method on the value itself.

The string conversion is peformed to test the value against a regex. Since, there is no way to natively find a decimal value in Javascript.

```ts
import { types } from '@poppinss/utils/build/helpers'

types.isDecimal('22.10') // true
types.isDecimal(22.1) // true

types.isDecimal('-22.10') // true
types.isDecimal(-22.1) // true

types.isDecimal('.3') // true
types.isDecimal(0.3) // true

types.isDecimal('-.3') // true
types.isDecimal(-0.3) // true

types.isDecimal('22.00') // true
types.isDecimal(22.0) // false (gets converted to 22)

types.isDecimal('-22.00') // true
types.isDecimal(-22.0) // false (gets converted to -22)

types.isDecimal('22') // false
types.isDecimal(22) // false

types.isDecimal('0.0000000000001') // true
types.isDecimal(0.0000000000001) // false (gets converted to 1e-13)
```

### ObjectBuilder

A very simple class to conditionally builder an object. Quite often, I create a new object from an existing one and wants to avoid writing undefined values to it. For example

```ts
const obj = {
  ...(user.username ? { username: user.username } : {}),
  ...(user.id ? { id: user.id } : {}),
  ...(user.createdAt ? { createdAt: user.createdAt.toString() } : {}),
}
```

Not only the above code is harder to write. It is performance issues as well, since we are destructuring too many objects.

To address this use case, you can make use of the `ObjectBuilder` class as follows

```ts
import { ObjectBuilder } from '@poppinss/utils/build/helpers'

const obj = new ObjectBuilder()
  .add('username', user.username)
  .add('id', user.id)
  .add('createdAt', user.createdAt && user.createdAt.toString()).value // returns the underlying object
```

The `add` method ignores the value if its `undefined`. So it never gets added to the object at all. You can also ignore `null` properties by passing a boolean flag to the constructor.

```ts
new ObjectBuilder(true) // ignore null as well
```

[gh-workflow-image]: https://img.shields.io/github/workflow/status/poppinss/utils/test?style=for-the-badge
[gh-workflow-url]: https://github.com/poppinss/utils/actions/workflows/test.yml "Github action"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]: "typescript"

[npm-image]: https://img.shields.io/npm/v/@poppinss/utils.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@poppinss/utils 'npm'

[license-image]: https://img.shields.io/npm/l/@poppinss/utils?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md 'license'

[synk-image]: https://img.shields.io/snyk/vulnerabilities/github/poppinss/utils?label=Synk%20Vulnerabilities&style=for-the-badge
[synk-url]: https://snyk.io/test/github/poppinss/utils?targetFile=package.json 'synk'
