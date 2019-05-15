[@poppinss/utils](../README.md) > [@poppinss/utils](../modules/_poppinss_utils.md) > [Exception](../classes/_poppinss_utils.exception.md)

# Class: Exception

Extended Error object with the option to set error `status` and `code`. At AdonisJs, we prefer exceptions with proper error codes to handle them without relying on message pattern matching.

```js
new Exception('message', 500, 'E_RUNTIME_EXCEPTION')
```

## Hierarchy

 `Error`

**↳ Exception**

## Index

### Constructors

* [constructor](_poppinss_utils.exception.md#constructor)

### Properties

* [code](_poppinss_utils.exception.md#code)
* [message](_poppinss_utils.exception.md#message)
* [name](_poppinss_utils.exception.md#name)
* [stack](_poppinss_utils.exception.md#stack)
* [status](_poppinss_utils.exception.md#status)
* [Error](_poppinss_utils.exception.md#error)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Exception**(message: *`string`*, status?: *`number`*, code?: *`undefined` \| `string`*): [Exception](_poppinss_utils.exception.md)

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| message | `string` | - |
| `Default value` status | `number` | 500 |
| `Optional` code | `undefined` \| `string` | - |

**Returns:** [Exception](_poppinss_utils.exception.md)

___

## Properties

<a id="code"></a>

### `<Optional>` code

**● code**: *`undefined` \| `string`*

___
<a id="message"></a>

###  message

**● message**: *`string`*

___
<a id="name"></a>

###  name

**● name**: *`string`*

___
<a id="stack"></a>

### `<Optional>` stack

**● stack**: *`undefined` \| `string`*

___
<a id="status"></a>

###  status

**● status**: *`number`*

___
<a id="error"></a>

### `<Static>` Error

**● Error**: *`ErrorConstructor`*

___

