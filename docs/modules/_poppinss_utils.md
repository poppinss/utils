[@poppinss/utils](../README.md) > [@poppinss/utils](../modules/_poppinss_utils.md)

# External module: @poppinss/utils

## Index

### Classes

* [Exception](../classes/_poppinss_utils.exception.md)

### Functions

* [esmRequire](_poppinss_utils.md#esmrequire)
* [requireAll](_poppinss_utils.md#requireall)

---

## Functions

<a id="esmrequire"></a>

###  esmRequire

▸ **esmRequire**(filePath: *`string`*): `any`

Handles ESM `default` exports and common js vanilla exports. The `default` exports are only entertained, when `esmEnabled` is set to true.

**Parameters:**

| Name | Type |
| ------ | ------ |
| filePath | `string` |

**Returns:** `any`

___
<a id="requireall"></a>

###  requireAll

▸ **requireAll**(location: *`string`*, recursive?: *`boolean`*, optional?: *`boolean`*): `any`

Require all files from a given directory. The method automatically looks for files ending with `.ts`, `.js` and `.json`. Also files ending with `.d.ts` are ignored.

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| location | `string` | - |
| `Default value` recursive | `boolean` | true |
| `Default value` optional | `boolean` | false |

**Returns:** `any`

___

