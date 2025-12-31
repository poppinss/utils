/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { ImportsBag } from '../src/imports_bag.js'

test.group('ImportsBag | add', () => {
  test('add a single named import', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'lodash', namedImports: ['debounce'] })

    const imports = bag.toArray()
    assert.lengthOf(imports, 1)
    assert.deepEqual(imports[0], {
      source: 'lodash',
      defaultImport: undefined,
      namedImports: ['debounce'],
      typeImports: undefined,
    })
  })

  test('add a single type import', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'express', typeImports: ['Request'] })

    const imports = bag.toArray()
    assert.lengthOf(imports, 1)
    assert.deepEqual(imports[0], {
      source: 'express',
      defaultImport: undefined,
      namedImports: undefined,
      typeImports: ['Request'],
    })
  })

  test('add both named and type imports', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({
      source: 'express',
      namedImports: ['Router'],
      typeImports: ['Request', 'Response'],
    })

    const imports = bag.toArray()
    assert.lengthOf(imports, 1)
    assert.deepEqual(imports[0], {
      source: 'express',
      defaultImport: undefined,
      namedImports: ['Router'],
      typeImports: ['Request', 'Response'],
    })
  })

  test('add a single default import', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'react', defaultImport: 'React' })

    const imports = bag.toArray()
    assert.lengthOf(imports, 1)
    assert.deepEqual(imports[0], {
      source: 'react',
      defaultImport: 'React',
      namedImports: undefined,
      typeImports: undefined,
    })
  })

  test('add default import with named imports', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({
      source: 'react',
      defaultImport: 'React',
      namedImports: ['useState', 'useEffect'],
    })

    const imports = bag.toArray()
    assert.lengthOf(imports, 1)
    assert.deepEqual(imports[0], {
      source: 'react',
      defaultImport: 'React',
      namedImports: ['useState', 'useEffect'],
      typeImports: undefined,
    })
  })

  test('add default import with type imports', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({
      source: 'react',
      defaultImport: 'React',
      typeImports: ['FC', 'PropsWithChildren'],
    })

    const imports = bag.toArray()
    assert.lengthOf(imports, 1)
    assert.deepEqual(imports[0], {
      source: 'react',
      defaultImport: 'React',
      namedImports: undefined,
      typeImports: ['FC', 'PropsWithChildren'],
    })
  })

  test('add default import with both named and type imports', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({
      source: 'react',
      defaultImport: 'React',
      namedImports: ['useState'],
      typeImports: ['FC'],
    })

    const imports = bag.toArray()
    assert.lengthOf(imports, 1)
    assert.deepEqual(imports[0], {
      source: 'react',
      defaultImport: 'React',
      namedImports: ['useState'],
      typeImports: ['FC'],
    })
  })

  test('add multiple imports from different sources', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'lodash', namedImports: ['debounce'] })
    bag.add({ source: 'express', namedImports: ['Router'] })

    const imports = bag.toArray()
    assert.lengthOf(imports, 2)
  })

  test('support method chaining', ({ assert }) => {
    const bag = new ImportsBag()
    const result = bag
      .add({ source: 'lodash', namedImports: ['debounce'] })
      .add({ source: 'express', namedImports: ['Router'] })

    assert.instanceOf(result, ImportsBag)
    assert.lengthOf(bag.toArray(), 2)
  })
})

test.group('ImportsBag | deduplication', () => {
  test('deduplicate named imports from the same source', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'lodash', namedImports: ['debounce'] })
    bag.add({ source: 'lodash', namedImports: ['debounce', 'throttle'] })

    const imports = bag.toArray()
    assert.lengthOf(imports, 1)
    assert.deepEqual(imports[0].namedImports, ['debounce', 'throttle'])
  })

  test('deduplicate type imports from the same source', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'express', typeImports: ['Request'] })
    bag.add({ source: 'express', typeImports: ['Request', 'Response'] })

    const imports = bag.toArray()
    assert.lengthOf(imports, 1)
    assert.deepEqual(imports[0].typeImports, ['Request', 'Response'])
  })

  test('merge named imports when adding to existing source', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'lodash', namedImports: ['debounce'] })
    bag.add({ source: 'lodash', namedImports: ['throttle'] })

    const imports = bag.toArray()
    assert.lengthOf(imports, 1)
    assert.deepEqual(imports[0].namedImports, ['debounce', 'throttle'])
  })

  test('merge type imports when adding to existing source', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'express', typeImports: ['Request'] })
    bag.add({ source: 'express', typeImports: ['Response'] })

    const imports = bag.toArray()
    assert.lengthOf(imports, 1)
    assert.deepEqual(imports[0].typeImports, ['Request', 'Response'])
  })

  test('add type imports to existing source with only named imports', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'express', namedImports: ['Router'] })
    bag.add({ source: 'express', typeImports: ['Request'] })

    const imports = bag.toArray()
    assert.lengthOf(imports, 1)
    assert.deepEqual(imports[0], {
      source: 'express',
      defaultImport: undefined,
      namedImports: ['Router'],
      typeImports: ['Request'],
    })
  })

  test('add named imports to existing source with only type imports', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'express', typeImports: ['Request'] })
    bag.add({ source: 'express', namedImports: ['Router'] })

    const imports = bag.toArray()
    assert.lengthOf(imports, 1)
    assert.deepEqual(imports[0], {
      source: 'express',
      defaultImport: undefined,
      namedImports: ['Router'],
      typeImports: ['Request'],
    })
  })

  test('replace default import when adding to existing source', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'react', defaultImport: 'React' })
    bag.add({ source: 'react', defaultImport: 'R' })

    const imports = bag.toArray()
    assert.lengthOf(imports, 1)
    assert.equal(imports[0].defaultImport, 'R')
  })

  test('add default import to existing source with named imports', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'react', namedImports: ['useState'] })
    bag.add({ source: 'react', defaultImport: 'React' })

    const imports = bag.toArray()
    assert.lengthOf(imports, 1)
    assert.deepEqual(imports[0], {
      source: 'react',
      defaultImport: 'React',
      namedImports: ['useState'],
      typeImports: undefined,
    })
  })
})

test.group('ImportsBag | toArray', () => {
  test('return empty array when no imports added', ({ assert }) => {
    const bag = new ImportsBag()
    assert.deepEqual(bag.toArray(), [])
  })

  test('return array of import info objects', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'lodash', namedImports: ['debounce'] })
    bag.add({ source: 'express', typeImports: ['Request'] })

    const imports = bag.toArray()
    assert.isArray(imports)
    assert.lengthOf(imports, 2)
  })
})

test.group('ImportsBag | toString', () => {
  test('return empty string when no imports added', ({ assert }) => {
    const bag = new ImportsBag()
    assert.equal(bag.toString(), '')
  })

  test('generate import statement for named imports', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'lodash', namedImports: ['debounce'] })

    assert.equal(bag.toString(), "import { debounce } from 'lodash'")
  })

  test('generate import statement for type imports', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'express', typeImports: ['Request'] })

    assert.equal(bag.toString(), "import type { Request } from 'express'")
  })

  test('generate import statement for multiple named imports', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'lodash', namedImports: ['debounce', 'throttle'] })

    assert.equal(bag.toString(), "import { debounce, throttle } from 'lodash'")
  })

  test('generate import statement for multiple type imports', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'express', typeImports: ['Request', 'Response'] })

    assert.equal(bag.toString(), "import type { Request, Response } from 'express'")
  })

  test('generate separate statements for named and type imports from same source', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({
      source: 'express',
      namedImports: ['Router'],
      typeImports: ['Request', 'Response'],
    })

    const expected = [
      "import { Router } from 'express'",
      "import type { Request, Response } from 'express'",
    ].join('\n')

    assert.equal(bag.toString(), expected)
  })

  test('generate statements for multiple sources', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'lodash', namedImports: ['debounce'] })
    bag.add({ source: 'express', typeImports: ['Request'] })

    const result = bag.toString()
    assert.include(result, "import { debounce } from 'lodash'")
    assert.include(result, "import type { Request } from 'express'")
  })

  test('handle deduplicated imports in output', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'lodash', namedImports: ['debounce'] })
    bag.add({ source: 'lodash', namedImports: ['throttle'] })
    bag.add({ source: 'lodash', namedImports: ['debounce'] }) // Duplicate

    assert.equal(bag.toString(), "import { debounce, throttle } from 'lodash'")
  })

  test('generate import statement for default import', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({ source: 'react', defaultImport: 'React' })

    assert.equal(bag.toString(), "import React from 'react'")
  })

  test('generate import statement for default and named imports', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({
      source: 'react',
      defaultImport: 'React',
      namedImports: ['useState', 'useEffect'],
    })

    assert.equal(bag.toString(), "import React, { useState, useEffect } from 'react'")
  })

  test('generate import statement for default and type imports', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({
      source: 'react',
      defaultImport: 'React',
      typeImports: ['FC', 'PropsWithChildren'],
    })

    const expected = [
      "import React from 'react'",
      "import type { FC, PropsWithChildren } from 'react'",
    ].join('\n')

    assert.equal(bag.toString(), expected)
  })

  test('generate import statement for default, named, and type imports', ({ assert }) => {
    const bag = new ImportsBag()
    bag.add({
      source: 'react',
      defaultImport: 'React',
      namedImports: ['useState'],
      typeImports: ['FC'],
    })

    const expected = [
      "import React, { useState } from 'react'",
      "import type { FC } from 'react'",
    ].join('\n')

    assert.equal(bag.toString(), expected)
  })
})
