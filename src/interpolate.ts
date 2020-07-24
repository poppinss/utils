/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * A simple function interpolate values inside curly braces. The function assumes
 * it will be used in good faith and hence doesn't validate the inputs.
 *
 * @example
 * `interpolate('hello {username}', { username: 'virk' })`
 */
export function interpolate(input: string, data: any) {
	return input.replace(/{(.*?)}/g, (_, key) => {
		let result = data
		for (const prop of key.split('.')) {
			result = result && result[prop]
		}

		return String(result)
	})
}
