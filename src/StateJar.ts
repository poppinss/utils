/*
* @poppinss/utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * A simple wrapper to manage internal state of an object or class.
 * Mainly used for lazy evaluated methods chain.
 */
export class StateJar<T extends any> {
  constructor (private state: Partial<T>) {
  }

  public get<K extends keyof T> (key: K): T[K] {
    return this.state[key]
  }

  public set<K extends keyof T> (key: K, value: T[K]): void {
    this.state[key] = value
  }
}
