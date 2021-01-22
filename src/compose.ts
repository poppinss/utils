/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

type Constructor = new (...args: any[]) => any

/**
 * Converting unions to intersection
 */
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any
	? R
	: never

/**
 * Normalizes constructor to work with mixins. There is an open bug for mixins
 * to allow constructors other than `...args: any[]`
 *
 * https://github.com/microsoft/TypeScript/issues/37142
 */
export type NormalizeConstructor<T extends Constructor> = {
	new (...args: any[]): InstanceType<T>
} & Omit<T, 'constructor'>

/**
 * Compose a class by applying mixins to it.
 * The code is inspired by https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/, its
 * just that I have added the support for static types too.
 */
export const compose = <
	SuperClass extends Constructor,
	M extends ((superclass: SuperClass) => Constructor)[]
>(
	superclass: SuperClass,
	...mixins: M
): SuperClass & UnionToIntersection<ReturnType<M[number]>> => {
	return mixins.reduce((c, mixin) => mixin(c), superclass) as SuperClass &
		UnionToIntersection<ReturnType<M[number]>>
}
