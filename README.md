# Utils
> Collection of reusable scripts used by AdonisJS core team

[![circleci-image]][circleci-url] [![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

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
- [Lodash utilities](#lodash-utilities)
  - [Exported methods](#exported-methods)

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

throw new Error('Something went wrong', 500, 'E_RUNTIME_EXCEPTION')
throw new Error('Route not found', 404, 'E_ROUTE_NOT_FOUND')
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
  greeting: 'Hello world'
}
```

**foo.default.js**
```ts
export default {
  greeting: 'Hello world'
}
```

**foo.esm.js**
```ts
export const greeting = {
  greeting: 'hello world'
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
- [mergeWith](https://lodash.com/docs/latest#mergeWith)
- [merge](https://lodash.com/docs/latest#merge)
- [snakeCase](https://lodash.com/docs/latest#snakeCase)
- [camelCase](https://lodash.com/docs/latest#camelCase)
- [startCase](https://lodash.com/docs/latest#startCase)


[circleci-image]: https://img.shields.io/circleci/project/github/poppinss/utils/master.svg?style=for-the-badge&logo=circleci
[circleci-url]: https://circleci.com/gh/poppinss/utils "circleci"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"

[npm-image]: https://img.shields.io/npm/v/@poppinss/utils.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@poppinss/utils "npm"

[license-image]: https://img.shields.io/npm/l/@poppinss/utils?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"
