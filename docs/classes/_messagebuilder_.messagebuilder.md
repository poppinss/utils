[@poppinss/utils](../README.md) › ["MessageBuilder"](../modules/_messagebuilder_.md) › [MessageBuilder](_messagebuilder_.messagebuilder.md)

# Class: MessageBuilder

Message builder exposes an API to JSON.stringify values by encoding purpose
and expiryDate inside them. It returns a readable string, which is the
output of `JSON.stringify`.

Why use this over `JSON.stringify`?

- It protects you from JSON poisioning
- Allows encoding expiry dates to the message. It means, the message builer is
  helpful, when you want to encode a message and pass it around, but also control
  the TTL of the message
- Allows encoding purpose. Again, useful for distribution.

## Hierarchy

* **MessageBuilder**

## Index

### Methods

* [build](_messagebuilder_.messagebuilder.md#build)
* [verify](_messagebuilder_.messagebuilder.md#verify)

## Methods

###  build

▸ **build**(`message`: any, `expiresIn?`: string | number, `purpose?`: undefined | string): *string*

Builds a message by encoding expiry and purpose inside it

**Parameters:**

Name | Type |
------ | ------ |
`message` | any |
`expiresIn?` | string &#124; number |
`purpose?` | undefined &#124; string |

**Returns:** *string*

___

###  verify

▸ **verify**<**T**>(`message`: any, `purpose?`: undefined | string): *null | T*

Verifies the message for expiry and purpose

**Type parameters:**

▪ **T**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`message` | any |
`purpose?` | undefined &#124; string |

**Returns:** *null | T*
