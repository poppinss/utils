/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from './Exception'

/**
 * A simple class to raise consistent exceptions for invalid config
 * for driver based implementations.
 */
export class ManagerConfigValidator {
	constructor(private config: any, private serviceName: string, private configLocation: string) {}

	/**
	 * Validates that the default key name is defined inside the config
	 * for a given module/service
	 */
	public validateDefault(keyName: string) {
		if (!this.config[keyName]) {
			throw new Exception(
				[
					`Invalid "${this.serviceName}" config. Missing value for "${keyName}".`,
					`Make sure set it inside "${this.configLocation}"`,
				].join(' ')
			)
		}
	}

	/**
	 * Validates that the list to ensure that is is defined and the default
	 * key name is also part of the list.
	 */
	public validateList(listName: string, keyName: string) {
		if (!this.config[listName]) {
			throw new Exception(
				[
					`Invalid "${this.serviceName}" config. Missing value for "${listName}".`,
					`Make sure set it inside "${this.configLocation}"`,
				].join(' ')
			)
		}

		const defaultValue = this.config[keyName]
		if (!this.config[listName][defaultValue]) {
			throw new Exception(
				[
					`Invalid "${this.serviceName}" config. "${defaultValue}" is not defined inside "${listName}".`,
					`Make sure set it inside "${this.configLocation}"`,
				].join(' ')
			)
		}
	}
}
