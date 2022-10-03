/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import lodash from '@poppinss/utils/lodash'

type Constructor = new (...args: any[]) => any
type AbstractConstructor = abstract new (...args: any[]) => any

/**
 * Define static properties on a class with inheritance in play.
 */
export function defineStaticProperty<
  T extends Constructor | AbstractConstructor,
  Prop extends keyof T
>(
  self: T,
  propertyName: Prop,
  {
    initialValue,
    strategy,
  }: {
    initialValue: T[Prop]
    strategy: 'inherit' | 'define' | ((value: T[Prop]) => T[Prop])
  }
) {
  if (!self.hasOwnProperty(propertyName)) {
    const value = self[propertyName]

    /**
     * Define the property as it is when the strategy is set
     * to "define". Or the value on the prototype chain
     * is set to undefined.
     */
    if (strategy === 'define' || value === undefined) {
      Object.defineProperty(self, propertyName, {
        value: initialValue,
        configurable: true,
        enumerable: true,
        writable: true,
      })
      return
    }

    Object.defineProperty(self, propertyName, {
      value: typeof strategy === 'function' ? strategy(value) : lodash.cloneDeep(value),
      configurable: true,
      enumerable: true,
      writable: true,
    })
  }
}
