<div align="center">
  <img src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1557762307/poppinss_iftxlt.jpg" width="600px">
</div>

# Utils
[![circleci-image]][circleci-url] [![npm-image]][npm-url] ![](https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript)

This module exports a collection of re-usable utilties to avoid re-writing the same code in every other package. Do make sure to check the API docs as well.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Usage](#usage)
    - [Exception](#exception)
    - [esmRequire](#esmrequire)
    - [requireAll](#requireall)
- [Change log](#change-log)
- [Contributing](#contributing)
- [Authors & License](#authors--license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage
Install the package from npm as follows:

```sh
npm i @poppinss/utils

# yarn
yarn add @poppinss/utils
```

and then use it as follows

```ts
import { Exception, requireAll, esmRequire } from '@poppinss/utils'
```

The module exports the following methods/classes.

#### Exception
Raise an exception with custom status code and error code.

```ts
import { Exception } from '@poppinss/utils'
new Exception('Route not found', 404, 'E_ROUTE_NOT_FOUND')
```

#### esmRequire
Require a module and returns the `default` export if module is an `esModule` or returns the actual value in case of CommonJs.

The method is helpful when you don't know that you are requiring a CommonJs module or a ESM module.

**TS module (user.ts)**
```ts
export default {
  username: 'foo'
}
```

```ts
import { esmRequire } from '@poppinss/utils'
esmRequire('./user') // returns { username: 'foo' }
```

#### requireAll
Require all `.js` and `.json` and `.ts` files from a given directory.

```ts
import { join } from 'path'
import { requireAll } from '@poppinss/utils'

requireAll(join(__dirname, 'config'))

// Disable recursive
requireAll(join(__dirname, 'config'), false)

// Ignore error when directory is missing
requireAll(join(__dirname, 'config'), true, true)
```

## Change log

The change log can be found in the [CHANGELOG.md](CHANGELOG.md) file.

## Contributing

Everyone is welcome to contribute. Please go through the following guides, before getting started.

1. [Contributing](https://adonisjs.com/contributing)
2. [Code of conduct](https://adonisjs.com/code-of-conduct)


## Authors & License
[Harminder virk](https://github.com/thetutlage) and [contributors](https://github.com/poppinss/utils/graphs/contributors).

MIT License, see the included [MIT](LICENSE.md) file.

[circleci-image]: https://img.shields.io/circleci/project/github/poppinss/utils/master.svg?style=for-the-badge&logo=circleci
[circleci-url]: https://circleci.com/gh/poppinss/utils "circleci"

[npm-image]: https://img.shields.io/npm/v/@poppinss/utils.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@poppinss/utils "npm"
