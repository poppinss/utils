**[@poppinss/utils](../README.md)**

[Globals](../README.md) › ["depreciated/parseIocReference"](_depreciated_parseiocreference_.md)

# External module: "depreciated/parseIocReference"

## Index

### Type aliases

* [IocObject](_depreciated_parseiocreference_.md#iocobject)
* [IocReference](_depreciated_parseiocreference_.md#iocreference)

### Functions

* [parseIocReference](_depreciated_parseiocreference_.md#parseiocreference)

## Type aliases

###  IocObject

Ƭ **IocObject**: *object*

#### Type declaration:

___

###  IocReference

Ƭ **IocReference**: *object*

#### Type declaration:

## Functions

###  parseIocReference

▸ **parseIocReference**(`reference`: string, `prefixNamespace`: string | undefined, `fallbackHandler`: string | undefined, `eagerLoad`: true): *[IocObject](_depreciated_parseiocreference_.md#iocobject)*

Parses a string reference to make a Ioc container binding reference. In case
of `eagerLoad`, it will attempt to resolve the binding and returns the
resolved value vs just the string.

**Parameters:**

Name | Type |
------ | ------ |
`reference` | string |
`prefixNamespace` | string \| undefined |
`fallbackHandler` | string \| undefined |
`eagerLoad` | true |

**Returns:** *[IocObject](_depreciated_parseiocreference_.md#iocobject)*

▸ **parseIocReference**(`reference`: string, `prefixNamespace?`: undefined | string, `fallbackHandler?`: undefined | string): *[IocReference](_depreciated_parseiocreference_.md#iocreference)*

Parses a string reference to make a Ioc container binding reference. In case
of `eagerLoad`, it will attempt to resolve the binding and returns the
resolved value vs just the string.

**Parameters:**

Name | Type |
------ | ------ |
`reference` | string |
`prefixNamespace?` | undefined \| string |
`fallbackHandler?` | undefined \| string |

**Returns:** *[IocReference](_depreciated_parseiocreference_.md#iocreference)*