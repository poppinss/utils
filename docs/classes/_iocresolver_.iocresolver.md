**[@poppinss/utils](../README.md)**

[Globals](../README.md) › ["IocResolver"](../modules/_iocresolver_.md) › [IoCResolver](_iocresolver_.iocresolver.md)

# Class: IoCResolver

Exposes the API to resolve and call bindings from the IoC container. The resolver
internally caches the IoC container lookup nodes to boost performance.

## Hierarchy

* **IoCResolver**

## Index

### Constructors

* [constructor](_iocresolver_.iocresolver.md#constructor)

### Methods

* [call](_iocresolver_.iocresolver.md#call)
* [resolve](_iocresolver_.iocresolver.md#resolve)

## Constructors

###  constructor

\+ **new IoCResolver**(`_container`: IocContract, `_rcNamespaceKey?`: undefined | string, `_fallbackNamespace?`: undefined | string): *[IoCResolver](_iocresolver_.iocresolver.md)*

**Parameters:**

Name | Type |
------ | ------ |
`_container` | IocContract |
`_rcNamespaceKey?` | undefined \| string |
`_fallbackNamespace?` | undefined \| string |

**Returns:** *[IoCResolver](_iocresolver_.iocresolver.md)*

## Methods

###  call

▸ **call**<**T**>(`namespace`: string, `prefixNamespace?`: undefined | string, `args?`: any[]): *T*

Calls the namespace.method expression with any arguments that needs to
be passed. Also supports type-hinting dependencies.

**Type parameters:**

▪ **T**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`namespace` | string |
`prefixNamespace?` | undefined \| string |
`args?` | any[] |

**Returns:** *T*

___

###  resolve

▸ **resolve**(`namespace`: string, `prefixNamespace`: string | undefined): *object*

Resolves the namespace and returns it's lookup node

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`namespace` | string | - |
`prefixNamespace` | string \| undefined |  this._prefixNamespace |

**Returns:** *object*