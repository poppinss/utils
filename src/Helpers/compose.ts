/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

type Constructor = new (...args: any[]) => any

/* eslint-disable no-redeclare */

/**
 * Normalizes constructor to work with mixins. There is an open bug for mixins
 * to allow constructors other than `...args: any[]`
 *
 * https://github.com/microsoft/TypeScript/issues/37142
 */
export type NormalizeConstructor<T extends Constructor> = {
  new (...args: any[]): InstanceType<T>
} & Omit<T, 'constructor'>

export interface UnaryFunction<T, R> {
  (source: T): R
}

/**
 * Compose a class by applying mixins to it.
 * The code is inspired by https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/, its
 * just that I have added the support for static types too.
 */
export function compose<T extends Constructor, A>(superclass: T, mixin: UnaryFunction<T, A>): A
export function compose<T extends Constructor, A, B>(
  superclass: T,
  mixin: UnaryFunction<T, A>,
  mixinB: UnaryFunction<A, B>
): B
export function compose<T extends Constructor, A, B, C>(
  superclass: T,
  mixin: UnaryFunction<T, A>,
  mixinB: UnaryFunction<A, B>,
  mixinC: UnaryFunction<B, C>
): C
export function compose<T extends Constructor, A, B, C, D>(
  superclass: T,
  mixin: UnaryFunction<T, A>,
  mixinB: UnaryFunction<A, B>,
  mixinC: UnaryFunction<B, C>,
  mixinD: UnaryFunction<C, D>
): D
export function compose<T extends Constructor, A, B, C, D, E>(
  superclass: T,
  mixin: UnaryFunction<T, A>,
  mixinB: UnaryFunction<A, B>,
  mixinC: UnaryFunction<B, C>,
  mixinD: UnaryFunction<C, D>,
  mixinE: UnaryFunction<D, E>
): E
export function compose<T extends Constructor, A, B, C, D, E, F>(
  superclass: T,
  mixin: UnaryFunction<T, A>,
  mixinB: UnaryFunction<A, B>,
  mixinC: UnaryFunction<B, C>,
  mixinD: UnaryFunction<C, D>,
  mixinF: UnaryFunction<E, F>
): F
export function compose<T extends Constructor, A, B, C, D, E, F, G>(
  superclass: T,
  mixin: UnaryFunction<T, A>,
  mixinB: UnaryFunction<A, B>,
  mixinC: UnaryFunction<B, C>,
  mixinD: UnaryFunction<C, D>,
  mixinF: UnaryFunction<E, F>,
  mixinG: UnaryFunction<F, G>
): G
export function compose<T extends Constructor, A, B, C, D, E, F, G, H>(
  superclass: T,
  mixin: UnaryFunction<T, A>,
  mixinB: UnaryFunction<A, B>,
  mixinC: UnaryFunction<B, C>,
  mixinD: UnaryFunction<C, D>,
  mixinF: UnaryFunction<E, F>,
  mixinG: UnaryFunction<F, G>,
  mixinH: UnaryFunction<G, H>
): H
export function compose<T extends Constructor, A, B, C, D, E, F, G, H, I>(
  superclass: T,
  mixin: UnaryFunction<T, A>,
  mixinB: UnaryFunction<A, B>,
  mixinC: UnaryFunction<B, C>,
  mixinD: UnaryFunction<C, D>,
  mixinF: UnaryFunction<E, F>,
  mixinG: UnaryFunction<F, G>,
  mixinH: UnaryFunction<G, H>,
  mixinI: UnaryFunction<H, I>
): I
export function compose(
  superclass: Constructor,
  ...mixins: Array<UnaryFunction<any, any>>
): UnaryFunction<any, any> {
  return mixins.reduce((c, mixin) => mixin(c), superclass)
}
