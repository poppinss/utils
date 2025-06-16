# @poppinss/utils

> A toolkit of utilities used across all the AdonisJS, Edge, and Japa packages

[![gh-workflow-image]][gh-workflow-url] [![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

## Why this package exists?

Many of my open source projects (including AdonisJS) use many single-purpose utility packages from npm. Over the years, I have faced the following challenges when using these packages.

- It takes a lot of time to find a perfect package for the use case. The package should be well maintained, have good test coverage, and not accumulate debt by supporting some old versions of Node.js.
- Some packages are great, but they end up pulling a lot of unnecessary dependencies like [(requiring TypeScript as a prod dependency)](https://github.com/blakeembrey/change-case/issues/281)
- Sometimes I end up using different packages for the same utility (because, I cannot remember what I used last time in that other package). So I want to spend time once choosing the one I need and then bundle it inside `@poppinss/utils`.
- Some authors introduce breaking changes too often (not a criticism). Therefore, I prefer wrapping their packages with my external API only to absorb breaking changes in one place.
- Rest are some handwritten utilities to fit my needs

> **Note**: If you are creating an AdonisJS package, I highly recommend using this package since it is already part of the user's project dependencies.

> **Warning**: This package is not for general use (outside the AdonisJS ecosystem). I will not add new helpers or remove any to cater to a broader audience.

## Other packages to use

A note to self and others to consider the following packages.

| Package                                                            | Description                                                                    |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| [he](https://www.npmjs.com/package/he)                             | For escaping HTML entities and encoding unicode symbols. Has zero dependencies |
| [@sindresorhus/is](https://www.npmjs.com/package/@sindresorhus/is) | For advanced type checking. Has zero dependencies                              |

## Package size

Even though I do not care much about the package size (most of work is consumed on server side), I am mindful around the utilities and ensure not end up using really big packages for smaller use-cases.

Here's the last checked install size of this package.

<a href="https://pkg-size.dev/@poppinss/utils@next">
  <img src="https://pkg-size.dev/badge/install/319382" title="Install size for @poppinss/utils">
</a>

## Installation

Install the package from the npm registry as follows:

```sh
npm i @poppinss/utils

# Yarn lovers
yarn add @poppinss/utils
```

## Exported modules

Following are the exported modules. Only the generic helpers are shipped from the main path. The rest of the helpers are grouped inside sub-modules.

```ts
// string sub-module
import string from '@poppinss/utils/string'

// string builder
import string from '@poppinss/utils/string_builder'

// json sub-module
import json from '@poppinss/utils/json'

// lodash sub-module
import lodash from '@poppinss/utils/lodash'

// assert sub-module
import assert from '@poppinss/utils/assert'

// main module
import { base64, fsReadAll } from '@poppinss/utils'

// types sub-module
import { ReadAllFilesOptions } from '@poppinss/utils/types'
```

### String helpers

A collection of helpers to perform operations on/related to a string value.

```ts
import string from '@poppinss/utils/string'
```

#### excerpt

Generate an excerpt from a string value. If the input value contains HTML tags, we will remove them from the excerpt.

```ts
const html = `<p>AdonisJS is a Node.js framework, and hence it requires Node.js to be installed on your computer. To be precise, we need at least the latest release of <code>Node.js v14</code>.</p>`

console.log(string.excerpt(html, 70))
// AdonisJS is a Node.js framework, and hence it requires Node.js to be i...
```

| Argument                | Type    | Description                                                                                                                      |
| ----------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `sentence`              | string  | The value for which to generate excerpt                                                                                          |
| `charactersLimit`       | string  | The number of characters to keep                                                                                                 |
| `options.completeWords` | boolean | When set to `true`, the truncation will happen only after complete words. This option might go over the defined characters limit |
| `options.suffix`        | string  | The value to append after the truncated string. Defaults to three dots `...`                                                     |

#### truncate

Truncate a string value to a certain length. The method is the same as the `excerpt` method but does not remove any HTML tags. It is a great fit when you are truncating a non-HTML string.

```ts
const text = `AdonisJS is a Node.js framework, and hence it requires Node.js to be installed on your computer. To be precise, we need at least the latest release of Node.js 14.`

console.log(string.truncate(text, 70))
// AdonisJS is a Node.js framework, and hence it requires Node.js to be i...
```

| Argument                | Type    | Description                                                                                                                      |
| ----------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `sentence`              | string  | The value to truncate                                                                                                            |
| `charactersLimit`       | string  | The number of characters to keep                                                                                                 |
| `options.completeWords` | boolean | When set to `true`, the truncation will happen only after complete words. This option might go over the defined characters limit |
| `options.suffix`        | string  | The value to append after the truncated string. Defaults to three dots `...`                                                     |

#### slug

Generate slug for a string value. The method is exported directly from the [slugify](https://www.npmjs.com/package/slugify) package.

Please check the package documentation for [available options](https://www.npmjs.com/package/slugify#options).

```ts
console.log(string.slug('hello ♥ world'))
// hello-love-world
```

You can add custom replacements for Unicode values as follows.

```ts
string.slug.extend({ '☢': 'radioactive' })

console.log(string.slug('unicode ♥ is ☢'))
// unicode-love-is-radioactive
```

#### interpolate

Interpolate variables inside a string. The variables must be inside double curly braces.

```ts
string.interpolate('hello {{ user.username }}', { user: { username: 'virk' } })

// hello virk
```

You can also replace array values by mentioning the array index.

```ts
string.interpolate('hello {{ users.0 }}', { users: ['virk'] })

// hello virk
```

You can escape the curly braces by prefixing them with `\\`.

```ts
string.interpolate('hello \\{{ users.0 }}', {})

// hello {{ users.0 }}
```

#### plural

Convert a word to its plural form. The method is exported directly from the [pluralize](https://www.npmjs.com/package/pluralize) package.

```ts
string.plural('test')
// tests
```

#### singular

Convert a word to its singular form. The method is exported directly from the [pluralize](https://www.npmjs.com/package/pluralize) package.

```ts
string.singular('tests')
// test
```

#### pluralize

This method combines the `singular` and `plural` methods and uses one or the other based on the count. For example:

```ts
string.pluralize('box', 1) // box
string.pluralize('box', 2) // boxes
string.pluralize('box', 0) // boxes

string.pluralize('boxes', 1) // box
string.pluralize('boxes', 2) // boxes
string.pluralize('boxes', 0) // boxes
```

The `addPluralRule`, `addSingularRule`, `addIrregularRule`, and `addUncountableRule` methods exposed by the pluralize package can be called as follows.

```ts
string.pluralize.addUncountableRule('paper')
string.pluralize.addSingularRule(/singles$/i, 'singular')
```

#### isPlural

Find if a word is already in plural form. The method is exported directly from the [pluralize](https://www.npmjs.com/package/pluralize) package.

```ts
string.isPlural('tests') // true
```

#### isSingular

Find if a word is already in a singular form. The method is exported directly from the [pluralize](https://www.npmjs.com/package/pluralize) package.

```ts
string.isSingular('test') // true
```

#### camelCase

Convert a string value to camelcase.

```ts
string.camelCase('user_name') // userName
```

Following are some of the conversion examples.

| Input            | Output        |
| ---------------- | ------------- |
| 'test'           | 'test'        |
| 'test string'    | 'testString'  |
| 'Test String'    | 'testString'  |
| 'TestV2'         | 'testV2'      |
| '_foo_bar_'      | 'fooBar'      |
| 'version 1.2.10' | 'version1210' |
| 'version 1.21.0' | 'version1210' |

#### capitalCase

Convert a string value to a capital case.

```ts
string.capitalCase('helloWorld') // Hello World
```

Following are some of the conversion examples.

| Input            | Output           |
| ---------------- | ---------------- |
| 'test'           | 'Test'           |
| 'test string'    | 'Test String'    |
| 'Test String'    | 'Test String'    |
| 'TestV2'         | 'Test V 2'       |
| 'version 1.2.10' | 'Version 1.2.10' |
| 'version 1.21.0' | 'Version 1.21.0' |

#### dashCase

Convert a string value to a dash case.

```ts
string.dashCase('helloWorld') // hello-world
```

Optionally, you can capitalize the first letter of each word.

```ts
string.dashCase('helloWorld', { capitalize: true }) // Hello-World
```

Following are some of the conversion examples.

| Input            | Output         |
| ---------------- | -------------- |
| 'test'           | 'test'         |
| 'test string'    | 'test-string'  |
| 'Test String'    | 'test-string'  |
| 'Test V2'        | 'test-v2'      |
| 'TestV2'         | 'test-v-2'     |
| 'version 1.2.10' | 'version-1210' |
| 'version 1.21.0' | 'version-1210' |

#### dotCase

Convert a string value to a dot case.

```ts
string.dotCase('helloWorld') // hello.World
```

Optionally, you can also convert the first letter of all the words to lowercase.

```ts
string.dotCase('helloWorld', { lowerCase: true }) // hello.world
```

Following are some of the conversion examples.

| Input            | Output         |
| ---------------- | -------------- |
| 'test'           | 'test'         |
| 'test string'    | 'test.string'  |
| 'Test String'    | 'Test.String'  |
| 'dot.case'       | 'dot.case'     |
| 'path/case'      | 'path.case'    |
| 'TestV2'         | 'Test.V.2'     |
| 'version 1.2.10' | 'version.1210' |
| 'version 1.21.0' | 'version.1210' |

#### noCase

Remove all sorts of casing from a string value.

```ts
string.noCase('helloWorld') // hello world
```

Following are some of the conversion examples.

| Input                  | Output                 |
| ---------------------- | ---------------------- |
| 'test'                 | 'test'                 |
| 'TEST'                 | 'test'                 |
| 'testString'           | 'test string'          |
| 'testString123'        | 'test string123'       |
| 'testString_1_2_3'     | 'test string 1 2 3'    |
| 'ID123String'          | 'id123 string'         |
| 'foo bar123'           | 'foo bar123'           |
| 'a1bStar'              | 'a1b star'             |
| 'CONSTANT_CASE '       | 'constant case'        |
| 'CONST123_FOO'         | 'const123 foo'         |
| 'FOO_bar'              | 'foo bar'              |
| 'XMLHttpRequest'       | 'xml http request'     |
| 'IQueryAArgs'          | 'i query a args'       |
| 'dot.case'             | 'dot case'             |
| 'path/case'            | 'path case'            |
| 'snake_case'           | 'snake case'           |
| 'snake_case123'        | 'snake case123'        |
| 'snake_case_123'       | 'snake case 123'       |
| '"quotes"'             | 'quotes'               |
| 'version 0.45.0'       | 'version 0 45 0'       |
| 'version 0..78..9'     | 'version 0 78 9'       |
| 'version 4_99/4'       | 'version 4 99 4'       |
| ' test '               | 'test'                 |
| 'something_2014_other' | 'something 2014 other' |
| 'amazon s3 data'       | 'amazon s3 data'       |
| 'foo_13_bar'           | 'foo 13 bar'           |

#### pascalCase

Convert a string value to pascal case. Great for generating JavaScript class names.

```ts
string.pascalCase('user team') // UserTeam
```

Following are some of the conversion examples.

| Input            | Output        |
| ---------------- | ------------- |
| 'test'           | 'Test'        |
| 'test string'    | 'TestString'  |
| 'Test String'    | 'TestString'  |
| 'TestV2'         | 'TestV2'      |
| 'version 1.2.10' | 'Version1210' |
| 'version 1.21.0' | 'Version1210' |

#### sentenceCase

Convert a value to a sentence.

```ts
string.sentenceCase('getting-started-with-adonisjs')
// Getting started with adonisjs
```

Following are some of the conversion examples.

| Input            | Output           |
| ---------------- | ---------------- |
| 'test'           | 'Test'           |
| 'test string'    | 'Test string'    |
| 'Test String'    | 'Test string'    |
| 'TestV2'         | 'Test v2'        |
| 'version 1.2.10' | 'Version 1 2 10' |
| 'version 1.21.0' | 'Version 1 21 0' |

#### snakeCase

Convert value to snake case.

```ts
string.snakeCase('user team') // user_team
```

Following are some of the conversion examples.

| Input            | Output         |
| ---------------- | -------------- |
| '\_id'           | 'id'           |
| 'test'           | 'test'         |
| 'test string'    | 'test_string'  |
| 'Test String'    | 'test_string'  |
| 'Test V2'        | 'test_v2'      |
| 'TestV2'         | 'test_v_2'     |
| 'version 1.2.10' | 'version_1210' |
| 'version 1.21.0' | 'version_1210' |

#### titleCase

Convert a string value to title case.

```ts
string.titleCase('small word ends on')
// Small Word Ends On
```

Following are some of the conversion examples.

| Input                              | Output                             |
| ---------------------------------- | ---------------------------------- |
| 'one. two.'                        | 'One. Two.'                        |
| 'a small word starts'              | 'A Small Word Starts'              |
| 'small word ends on'               | 'Small Word Ends On'               |
| 'we keep NASA capitalized'         | 'We Keep NASA Capitalized'         |
| 'pass camelCase through'           | 'Pass camelCase Through'           |
| 'follow step-by-step instructions' | 'Follow Step-by-Step Instructions' |
| 'this vs. that'                    | 'This vs. That'                    |
| 'this vs that'                     | 'This vs That'                     |
| 'newcastle upon tyne'              | 'Newcastle upon Tyne'              |
| 'newcastle \*upon\* tyne'          | 'Newcastle \*upon\* Tyne'          |

#### random

Generate a cryptographically secure random string of a given length. The output value is URL safe base64 encoded string.

```ts
string.random(32)
// 8mejfWWbXbry8Rh7u8MW3o-6dxd80Thk
```

#### toSentence

Convert an array of words to a comma-separated sentence.

```ts
string.toSentence(['routes', 'controllers', 'middleware'])
// routes, controllers, and middleware
```

You can replace the `and` with an `or` by specifying the `options.lastSeparator` property.

```ts
string.toSentence(['routes', 'controllers', 'middleware'], {
  lastSeparator: ', or ',
})
```

In the following example, the two words are combined using the `and` separator, not the comma (usually advocated in English). However, you can use a custom separator for a pair of words.

```ts
string.toSentence(['routes', 'controllers'])
// routes and controllers

string.toSentence(['routes', 'controllers'], {
  pairSeparator: ', and ',
})
// routes, and controllers
```

#### condenseWhitespace

Remove multiple whitespaces from a string to a single whitespace.

```ts
string.condenseWhitespace('hello  world')
// hello world

string.condenseWhitespace('  hello  world  ')
// hello world
```

#### ordinal

Get the ordinal letter for a given number.

```ts
string.ordinal(1) // 1st
string.ordinal(2) // '2nd'
string.ordinal(3) // '3rd'
string.ordinal(4) // '4th'

string.ordinal(23) // '23rd'
string.ordinal(24) // '24th'
```

#### seconds.(parse/format)

Parse a string-based time expression to seconds.

```ts
string.seconds.parse('10h') // 36000
string.seconds.parse('1 day') // 86400
```

Passing a numeric value to the `parse` method is returned as it is, assuming the value is already in seconds.

```ts
string.seconds.parse(180) // 180
```

You can format seconds to a pretty string using the `format` method.

```ts
string.seconds.format(36000) // 10h
string.seconds.format(36000, true) // 10 hours
```

#### milliseconds.(parse/format)

Parse a string-based time expression to milliseconds.

```ts
string.milliseconds.parse('1 h') // 3.6e6
string.milliseconds.parse('1 day') // 8.64e7
```

Passing a numeric value to the `parse` method is returned as it is, assuming the value is already in milliseconds.

```ts
string.milliseconds.parse(180) // 180
```

Using the `format` method, you can format milliseconds to a pretty string.

```ts
string.seconds.format(3.6e6) // 1h
string.seconds.format(3.6e6, true) // 1 hour
```

#### bytes.(parse/format)

Parse a string-based unit expression to bytes.

```ts
string.bytes.parse('1KB') // 1024
string.bytes.parse('1MB') // 1048576
```

Passing a numeric value to the `parse` method is returned as it is, assuming the value is already in bytes.

```ts
string.bytes.parse(1024) // 1024
```

Using the `format` method, you can format bytes to a pretty string. The method is exported directly from the [bytes](https://www.npmjs.com/package/bytes) package. Please reference the package README for available options.

```ts
string.bytes.format(1048576) // 1MB
string.bytes.format(1024 * 1024 * 1000) // 1000MB
string.bytes.format(1024 * 1024 * 1000, { thousandsSeparator: ',' }) // 1,000MB
```

### String builder

The string builder offers a fluent API for applying a set of transforms on a string value. You can create an instance of the string builder as follows.

```ts
import StringBuilder from '@poppinss/utils/string_builder'
const builder = new StringBuilder('hello world')

const value = builder.snakeCase().suffix('_controller').toString()
assert(value === 'hello_world_controller')
```

### JSON helpers

Following are the helpers we use to `stringify` and `parse` JSON.

#### safeParse

The native implementation of `JSON.parse` opens up the possibility for [prototype poisoning](https://medium.com/intrinsic-blog/javascript-prototype-poisoning-vulnerabilities-in-the-wild-7bc15347c96). The `safeParse` method removes the `__proto__` and the `constructor.prototype` properties from the JSON string at the time of parsing it.

The method is a wrapper over [secure-json-parse](https://github.com/fastify/secure-json-parse) package.

#### safeStringify

The native implementation of `JSON.stringify` cannot handle circular references or language-specific data types like `BigInt`.

Therefore, we use the [safe-stable-stringify](https://github.com/BridgeAR/safe-stable-stringify) package under the hood to overcome the limitations of native implementation.

```ts
import { safeStringify } from '@poppinss/utils/json'

const value = {
  b: 2,
  c: BigInt(10),
}

// Circular reference
value.a = value

safeStringify(value)
// '{"b":2,"c":10}'
```

- The circular references are removed from the final JSON string.
- The BigInt values are converted to a string.

The `safeStringify` API is the same as the `JSON.stringify` method.

- You can pass a replacer function as the second parameter.
- And number of spaces as the third parameter.

### Lodash helpers

Lodash is quite a big library, and we do not use all its helper methods. Therefore we create a custom build using the lodash CLI and bundle only the once we need.

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

### Assertion helpers

The following assertion methods offers type-safe approach for writing conditionals and throwing error when the variable has unexpected values.

#### assertExists(message?: string)

Throws [AssertionError](https://nodejs.org/api/assert.html#new-assertassertionerroroptions) when the value is `false`, `null`, or `undefined`.

```ts
import { assertExists } from '@poppinss/utils/assert'

const value = false as string | false
assertExists(value)

// value is string
```

#### assertNotNull(value: unknown, message?: string)

Throws [AssertionError](https://nodejs.org/api/assert.html#new-assertassertionerroroptions) when the value is `null`.

```ts
import { assertNotNull } from '@poppinss/utils/assert'

const value = null as string | null
assertNotNull(value)

// value is string
```

#### assertIsDefined(value: unknown, message?: string)

Throws [AssertionError](https://nodejs.org/api/assert.html#new-assertassertionerroroptions) when the value is `undefined`.

```ts
import { assertIsDefined } from '@poppinss/utils/assert'

const value = undefined as string | undefined
assertIsDefined(value)

// value is string
```

#### assertUnreachable(value: unknown)

Throws [AssertionError](https://nodejs.org/api/assert.html#new-assertassertionerroroptions) when the method is invoked. In other words, this method always throws an exception.

```ts
import { assertUnreachable } from '@poppinss/utils/assert'
assertUnreachable()
```

### All other helpers

The following helpers are exported from the package main module.

```ts
import { base64, compose } from '@poppinss/utils'
```

#### base64

Utility methods to base64 encode and decode values.

```ts
import { base64 } from '@poppinss/utils'

base64.encode('hello world')
// aGVsbG8gd29ybGQ=
```

Similar to the `encode` method, you can use the `urlEncode` to generate a base64 string safe to pass in a URL.

The `urlEncode` method performs the following replacements.

- Replace `+` with `-`.
- Replace `/` with `_`.
- And remove the `=` sign from the end of the string.

```ts
base64.urlEncode('hello world')
// aGVsbG8gd29ybGQ
```

You can use the `decode` and the `urlDecode` methods to decode a previously encoded base64 string.

```ts
base64.decode(base64.encode('hello world'))
// hello world

base64.urlDecode(base64.urlEncode('hello world'))
// hello world
```

The `decode` and the `urlDecode` methods return `null` when the input value is an invalid base64 string. You can turn on the `strict` mode to raise an exception instead.

```ts
base64.decode('hello world') // null
base64.decode('hello world', 'utf-8', true) // raises exception
```

#### compose

The `compose` helper allows you to use TypeScript class mixins with a cleaner API. Following is an example of mixins usage without the compose helper.

```ts
class User extends UserWithAttributes(UserWithAge(UserWithPassword(UserWithEmail(BaseModel)))) {}
```

Following is an example with the `compose` helper.

- There is no nesting.
- The order of mixins is from left to right. Whereas earlier, it was inside out.

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

#### defineStaticProperty

The `defineStaticProperty` method allows you to define static properties on a class with different reference strategies.

If you use class inheritance alongside static properties, then either, you will share properties by reference, or you will define them directly on the parent class.

In the following example, we are not inherting `columns` from the `AppModel`. Instead, we define a new set of columns on the `UserModel`.

```ts
class AppModel {
  static columns = ['id']
}

class UserModel extends AppModel {
  static columns = ['username']
}
```

In the following example, we are inherting `columns` from the `AppModel`. However, the mutations (array.push) from the `UserModel` will reflect on the `AppModel` as well.

```ts
class AppModel {
  static columns = ['id']
}

class UserModel extends AppModel {}
UserModel.columns.push('username')
```

The ideal behavior is to deep clone the `columns` array and then push new values to it.

```ts
import lodash from '@poppinss/utils/lodash'

class AppModel {
  static columns = ['id']
}

const inheritedColumns = lodash.cloneDeep(AppModel.columns)
class UserModel extends AppModel {
  static columns = inheritedColumns.push('username')
}
```

The `defineStaticProperty` method abstracts the logic to clone and also performs some interal checks to see if the value is already defined as an `ownProperty` or not.

```ts
class UserModel extends AppModel {}

defineStaticProperty(UserModel, 'columns', {
  strategy: 'inherit',
  initialValue: [],
})
```

- The `inherit` strategy clones the value from the parent class.
- The `define` strategy always re-defines the property, discarding any values on the parent class.
- The `strategy` value can be function to perform a custom clone operations.

#### Exception

A custom exception class with support for defining the error status, error code, and help description. This class aims to standardize exceptions within your projects.

```ts
import { Exception } from '@poppinss/utils/exception'

class ResourceNotFound extends Exception {
  static code = 'E_RESOURCE_NOT_FOUND'
  static status = 404
  static message = 'Unable to find resource'
}

throw new ResourceNotFound()
```

#### Anonymous error classes

You can also create an anonymous exception class using the `createError` method. The return value is a class
constructor that accepts an array of values to use for interpolation.

The interpolation of error message is performed using the `util.format` message.

```ts
import { createError } from '@poppinss/utils/exception'
const E_RESOURCE_NOT_FOUND = createError(
  'Unable to find resource with id %d',
  'E_RESOURCE_NOT_FOUND'
)

const id = 1
throw new E_RESOURCE_NOT_FOUND([id])
```

#### flatten

Create a flat object from a nested object/array. The nested keys are combined with a dot-notation (`.`). The method is exported from the [flattie](https://www.npmjs.com/package/flattie) package.

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

#### fsReadAll

Get a list of all the files from a directory. The method recursively fetches files from the main and the sub-folders. The dotfiles are ignored implicitly.

```ts
import { fsReadAll } from '@poppinss/utils'

const files = await fsReadAll(new URL('./config', import.meta.url), { pathType: 'url' })
await Promise.all(files.map((file) => import(file)))
```

You can also pass the options along with the directory path as the second argument.

```ts
type Options = {
  ignoreMissingRoot?: boolean
  filter?: (filePath: string, index: number) => boolean
  sort?: (current: string, next: string) => number
  pathType?: 'relative' | 'unixRelative' | 'absolute' | 'unixAbsolute' | 'url'
}

const options: Partial<Options> = {}
await fsReadAll(location, options)
```

| Argument            | Type    | Description                                                                                                                                                                   |
| ------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ignoreMissingRoot` | boolean | By default, an exception is raised when the root directory is missing. Setting `ignoreMissingRoot` to true will not result in an error and an empty array is returned back.   |
| `filter`            | method  | Define a filter to ignore certain paths. The method is called on the final list of files.                                                                                     |
| `sort`              | method  | Define a custom method to sort file paths. By default, the files are sorted using natural sort.                                                                               |
| `pathType`          | enum    | Define how to return the collected paths. By default, OS-specific relative paths are returned. If you want to import the collected files, you must set the `pathType = 'url'` |

#### fsImportAll

The `fsImportAll` method imports all the files recursively from a given directory and set the exported value from each module on an object.

```ts
import { fsImportAll } from '@poppinss/utils'

const collection = await fsImportAll(new URL('./config', import.meta.url))
console.log(collection)
```

- Collection is an object with a tree of key-value pair.
- The key is the nested object created from the file path.
- Value is the exported values from the module. If a module exports both the `default` and `named` values, then only the default values are used.

The second param is the options to customize the import behavior.

| Argument            | Type    | Description                                                                                                                                                                  |
| ------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ignoreMissingRoot` | boolean | By default, an exception is raised when the root directory is missing. Setting `ignoreMissingRoot` to true will not result in an error and an empty object is returned back. |
| `filter`            | method  | Define a filter to ignore certain paths. By default only files ending with `.js`, `.ts`, `.json`, `.cjs`, and `.mjs` are imported.                                           |
| `sort`              | method  | Define a custom method to sort file paths. By default, the files are sorted using natural sort.                                                                              |
| `transformKeys`     | method  | Define a callback method to transform the keys for the final object. The method receives an array of nested keys and must return an array back.                              |

#### isScriptFile

A filter to know if the file path ends with `.js`, `.json`, `.cjs`, `.mjs` or `.ts`. In the case of `.ts` files, the `.d.ts` returns false.

```ts
import { isScriptFile } from '@poppinss/utils'

isScriptFile('foo.js') // true
isScriptFile('foo/bar.cjs') // true
isScriptFile('foo/bar.mjs') // true
isScriptFile('foo.json') // true

isScriptFile('foo/bar.ts') // true
isScriptFile('foo/bar.d.ts') // false
```

The goal of this method is to use it as a filter with the `fsReadAll` method.

```ts
import { fsReadAll, isScriptFile } from '@poppinss/utils'

const dir = new URL('./config', import.meta.url)
const options = { pathType: 'url', filter: isScriptFile }

const files = await fsReadAll(dir, options)

await Promise.all(
  files.map((file) => {
    if (file.endsWith('.json')) {
      return import(file, { with: { type: 'json' } })
    }

    return import(file)
  })
)
```

#### importDefault

A helper function that assert a lazy import function output to have a `default export`, otherwise raises an exception.

We use dynamic default exports a lot in AdonisJS apps, so extracting the check to a helper function.

```ts
import { importDefault } from '@poppinss/utils'
const defaultVal = await importDefault(() => import('./some_module.js'))
```

#### naturalSort

A sorting function to use natural sort for ordering an array.

```ts
import { naturalSort } from '@poppinss/utils'

const values = ['1_foo_bar', '12_foo_bar'].sort()
// Default sorting: ['12_foo_bar', '1_foo_bar']

const values = ['1_foo_bar', '12_foo_bar'].sort(naturalSort)
// Default sorting: ['1_foo_bar', '12_foo_bar']
```

#### safeEqual

Check if two buffer or string values are the same. This method does not leak any timing information and prevents [timing attack](https://javascript.plainenglish.io/what-are-timing-attacks-and-how-to-prevent-them-using-nodejs-158cc7e2d70c).

Under the hood, this method uses Node.js [crypto.timeSafeEqual](https://nodejs.org/api/crypto.html#cryptotimingsafeequala-b) method, with support for comparing string values. _(crypto.timeSafeEqual does not support string comparison)_

```ts
import { safeEqual } from '@poppinss/utils'

/**
 * The trusted value, it might be saved inside the db
 */
const trustedValue = 'hello world'

/**
 * Untrusted user input
 */
const userInput = 'hello'

if (safeEqual(trustedValue, userInput)) {
  // both are same
} else {
  // value mis-match
}
```

#### slash

Convert OS-specific file paths to Unix file paths. Credits [https://github.com/sindresorhus/slash](https://github.com/sindresorhus/slash)

```ts
import { slash } from '@poppinss/utils/slash'
slash('foo\\bar') // foo/bar
```

#### MessageBuilder

Message builder is a convenience layer to stringify JavaScript values with an expiry date and a purpose. For example:

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

Once you have the JSON string with the expiry and the purpose, you can encrypt it (to prevent tampering) and share it with the client.

During the email verification, you can decrypt the key and then ask the `MessageBuilder` to verify the payload.

```ts
const decoded = builder.verify(value, 'email_verification')
if (!decoded) {
  return 'Invalid token'
}

console.log(decoded.token)
```

Now let's imagine someone presents the same token to reset their account password. In the following example, the validation will fail since the purpose of the original token is not the same as the purpose set during the `verify` method call.

```ts
const decoded = builder.verify(value, 'reset_password')
```

#### ObjectBuilder

The `ObjectBuilder` is a convenience class to create an object with dynamic properties. Consider the following example, where we wrap our code inside conditionals before adding the property `b` to the `startingObject`.

```ts
const startingObject = {
  a: 1
  // Add "b", if it exists
  ...(b ? { b } : {})
}

// OR
if (b) {
  startingObject.b = b
}
```

Instead of writing conditionals, you can consider using the Object builder fluent API.

```ts
const builder = new ObjectBuilder({ a: 1 })

const plainObject = builder.add('b', b).toObject()
```

By default, only the `undefined` values are ignored. However, you can also ignore `null` values.

```ts
const ignoreNullValues = true
const builder = new ObjectBuilder({ a: 1 }, ignoreNullValues)
```

Following are the available methods on the `ObjectBuilder` class.

```ts
builder.remove(key)
builder.has(key)
builder.get(key)
builder.add(key)

builder.toObject() // get plain object
```

#### Secret

Creates a secret value that prevents itself from getting logged inside `console.log` statements, during JSON serialization, and string concatenation.

To understand why you need a special `Secret` object, you need to understand the root of the problem. Let's start with an example.

Given that you have a `Token` class that generates an opaque token for a user and persists its hash inside the database. The plain token (aka raw value) is shared with the user and it should only be visible once (for security reasons). Here is a dummy implementation of the same.

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

At the same time, you want to drop a log statement inside your application that you can later use to debug the flow of the application, and this is how you log the token.

```ts
const token = new Token().generate()

logger.log('token generated %O', token)
// token generated {"value":"opaque_raw_token","hash":"hash_of_raw_token_inside_db"}

return response.send(token)
```

BOOM! You have weakened the security of your app. Now, anyone monitoring the logs can grab raw token values from the log and use them to perform the actions on behalf of the user.

Now, to prevent this from happening, you **should work with a branded data type**. Our [old friend PHP has it](https://www.php.net/manual/en/class.sensitiveparametervalue.php), so we need it as well.

This is what exactly the `Secret` utility class does for you. Create values that prevent themselves from leaking inside logs or during JSON serialization.

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

**Need the original value back?**
You can call the `release` method to get the secret value back. Again, the idea is not to prevent your code from accessing the raw value. It's to stop the logging and serialization layer from reading it.

```ts
const secret = new Secret('opaque_raw_token')
const rawValue = secret.release()

rawValue === opaque_raw_token // true
```

> Shoutout to [https://transcend.io/blog/keep-sensitive-values-out-of-your-logs-with-types](transcend.io's article) to helping me design the API. In fact, I have ripped their implementation for my personal use.

#### dirname/filename

ES modules does not have magic variables `__filename` and `__dirname`. You can use these helpers to get the current directory and filenames as follows.

```ts
import { getDirname, getFilename } from '@poppinss/utils'

const dirname = getDirname(import.meta.url)
const filename = getFilename(import.meta.url)
```

#### joinToURL

Similar to the Node.js `path.join`, but instead expects the first parameter to be a URL instance or a string with the `file:///` protocol.

The return value is an absolute file system path without the `file:///` protocol.

```ts
import { joinToURL } from '@poppinss/utils'

// With URL as a string
const APP_PATH = joinToURL(import.meta.url, 'app')

// With URL instance
const APP_PATH = joinToURL(new URL('./', import.meta.url), 'app')
```

[gh-workflow-image]: https://img.shields.io/github/actions/workflow/status/poppinss/utils/checks.yml?style=for-the-badge
[gh-workflow-url]: https://github.com/poppinss/utils/actions/workflows/checks.yml 'Github action'
[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]: "typescript"
[npm-image]: https://img.shields.io/npm/v/@poppinss/utils.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@poppinss/utils 'npm'
[license-image]: https://img.shields.io/npm/l/@poppinss/utils?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md 'license'
