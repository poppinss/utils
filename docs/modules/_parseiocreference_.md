**[@poppinss/utils](../README.md)**

[Globals](../README.md) › ["parseIocReference"](_parseiocreference_.md)

# External module: "parseIocReference"

## Index

### Type aliases

* [IocObject](_parseiocreference_.md#iocobject)
* [IocReference](_parseiocreference_.md#iocreference)

### Functions

* [parseIocReference](_parseiocreference_.md#parseiocreference)

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

▸ **parseIocReference**(`reference`: string, `prefixNamespace`: string | undefined, `fallbackHandler`: string | undefined, `eagerLoad`: true): *[IocObject](_parseiocreference_.md#iocobject)*

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

**Returns:** *[IocObject](_parseiocreference_.md#iocobject)*

▸ **parseIocReference**(`reference`: string, `prefixNamespace?`: undefined | string, `fallbackHandler?`: undefined | string): *[IocReference](_parseiocreference_.md#iocreference)*

Parses a string reference to make a Ioc container binding reference. In case
of `eagerLoad`, it will attempt to resolve the binding and returns the
resolved value vs just the string.

**Parameters:**

Name | Type |
------ | ------ |
`reference` | string |
`prefixNamespace?` | undefined \| string |
`fallbackHandler?` | undefined \| string |

**Returns:** *[IocReference](_parseiocreference_.md#iocreference)*