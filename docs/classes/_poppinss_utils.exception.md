**[@poppinss/utils](../README.md)**

[Globals](../README.md) › [@poppinss/utils](../modules/_poppinss_utils.md) › [Exception](_poppinss_utils.exception.md)

# Class: Exception

Extended Error object with the option to set error `status` and `code`.
At AdonisJs, we prefer exceptions with proper error codes to handle
them without relying on message pattern matching.

```js
new Exception('message', 500, 'E_RUNTIME_EXCEPTION')
```

## Hierarchy

* Error

  * **Exception**

## Index

### Constructors

* [constructor](_poppinss_utils.exception.md#constructor)

### Properties

* [code](_poppinss_utils.exception.md#optional-code)
* [message](_poppinss_utils.exception.md#message)
* [name](_poppinss_utils.exception.md#name)
* [stack](_poppinss_utils.exception.md#optional-stack)
* [status](_poppinss_utils.exception.md#status)
* [Error](_poppinss_utils.exception.md#static-error)

## Constructors

###  constructor

\+ **new Exception**(`message`: string, `status`: number, `code?`: undefined | string): *[Exception](_poppinss_utils.exception.md)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`message` | string | - |
`status` | number | 500 |
`code?` | undefined \| string | - |

**Returns:** *[Exception](_poppinss_utils.exception.md)*

## Properties

### `Optional` code

• **code**? : *undefined | string*

___

###  message

• **message**: *string*

*Overrides void*

___

###  name

• **name**: *string*

*Overrides void*

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from void*

*Overrides void*

___

###  status

• **status**: *number*

___

### `Static` Error

▪ **Error**: *ErrorConstructor*