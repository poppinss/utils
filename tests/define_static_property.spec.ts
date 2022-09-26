/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { defineStaticProperty } from '../src/define_static_property.js'

test.group('Define static property', () => {
  test('define property on class extending the base class', ({ assert }) => {
    class Base {
      static hooks: any

      static boot() {
        defineStaticProperty(this, Base, {
          propertyName: 'hooks',
          defaultValue: {},
          strategy: 'inherit',
        })
      }
    }

    class Main extends Base {}
    Main.boot()

    assert.deepEqual(Main.hooks, {})
  })

  test('copy property when not inherting from the real base class', ({ assert }) => {
    class Base {
      static hooks: any

      static boot() {
        defineStaticProperty(this, Base, {
          propertyName: 'hooks',
          defaultValue: {},
          strategy: 'inherit',
        })
      }
    }

    class MyBase extends Base {}
    MyBase.boot()
    MyBase.hooks.run = true

    class Main extends MyBase {}
    Main.boot()
    Main.hooks.jump = true

    assert.deepEqual(Main.hooks, { run: true, jump: true })
    assert.deepEqual(MyBase.hooks, { run: true })
  })

  test('re define property when not inherting from the real base class', ({ assert }) => {
    class Base {
      static hooks: any

      static boot() {
        defineStaticProperty(this, Base, {
          propertyName: 'hooks',
          defaultValue: {},
          strategy: 'define',
        })
      }
    }

    class MyBase extends Base {}
    MyBase.boot()
    MyBase.hooks.run = true

    class Main extends MyBase {}
    Main.boot()
    Main.hooks.jump = true

    assert.deepEqual(Main.hooks, { jump: true })
    assert.deepEqual(MyBase.hooks, { run: true })
  })

  test('handle deep inheritance', ({ assert }) => {
    class Base {
      static hooks: any

      static boot() {
        defineStaticProperty(this, Base, {
          propertyName: 'hooks',
          defaultValue: {},
          strategy: 'inherit',
        })
      }
    }

    class MyBase extends Base {}
    MyBase.boot()
    MyBase.hooks.run = true

    class MySuperBase extends MyBase {}
    MySuperBase.boot()
    MySuperBase.hooks.crawl = true

    class MyAppBase extends MySuperBase {}
    MyAppBase.boot()
    MyAppBase.hooks.hide = true

    class Main extends MyAppBase {}
    Main.boot()
    Main.hooks.jump = true

    assert.deepEqual(Main.hooks, { run: true, jump: true, crawl: true, hide: true })
    assert.deepEqual(MyAppBase.hooks, { run: true, crawl: true, hide: true })
    assert.deepEqual(MySuperBase.hooks, { run: true, crawl: true })
    assert.deepEqual(MyBase.hooks, { run: true })
  })

  test('handle cross inheritance', ({ assert }) => {
    class Base {
      static hooks: any

      static boot() {
        defineStaticProperty(this, Base, {
          propertyName: 'hooks',
          defaultValue: {},
          strategy: 'inherit',
        })
      }
    }

    class MyBase extends Base {}
    MyBase.boot()
    MyBase.hooks.run = true

    class MySuperBase extends MyBase {}
    MySuperBase.boot()
    MySuperBase.hooks.crawl = true

    class MyAppBase extends MyBase {}
    MyAppBase.boot()
    MyAppBase.hooks.hide = true

    class Main extends MyAppBase {}
    Main.boot()
    Main.hooks.jump = true

    assert.deepEqual(Main.hooks, { run: true, jump: true, hide: true })
    assert.deepEqual(MyAppBase.hooks, { run: true, hide: true })
    assert.deepEqual(MySuperBase.hooks, { run: true, crawl: true })
    assert.deepEqual(MyBase.hooks, { run: true })
  })

  test('allow overwriting the defined property', ({ assert }) => {
    class Base {
      static hooks: any

      static boot() {
        defineStaticProperty(this, Base, {
          propertyName: 'hooks',
          defaultValue: {},
          strategy: 'inherit',
        })
      }
    }

    class MyBase extends Base {}
    MyBase.boot()
    MyBase.hooks.run = true

    class Main extends MyBase {}
    Main.boot()
    Main.hooks = { run: false, jump: true }

    assert.deepEqual(Main.hooks, { run: false, jump: true })
    assert.deepEqual(MyBase.hooks, { run: true })
  })

  test('define a custom strategy function for defining the merge value', ({ assert }) => {
    class Base {
      static hooks: {
        before: Set<string>
        after: Set<string>
      }

      static boot() {
        defineStaticProperty(this, Base, {
          propertyName: 'hooks',
          defaultValue: {
            before: new Set<string>(),
            after: new Set<string>(),
          },
          strategy: (value) => {
            return {
              before: value.before,
              after: value.after,
            }
          },
        })
      }
    }

    class Main extends Base {}
    Main.boot()

    assert.deepEqual(Main.hooks.before, new Set())
    assert.deepEqual(Main.hooks.after, new Set())
  })

  test('define property on abstract class extending the base class', ({ assert }) => {
    abstract class Base {
      static hooks: any

      static boot() {
        defineStaticProperty(this, Base, {
          propertyName: 'hooks',
          defaultValue: {},
          strategy: 'inherit',
        })
      }
    }

    class Main extends Base {}
    Main.boot()

    assert.deepEqual(Main.hooks, {})
  })
})
