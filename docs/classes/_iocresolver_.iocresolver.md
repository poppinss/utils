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

▸ **call**<**T**>(`namespace`: string | [IocResolverLookupNode](../modules/_iocresolver_.md#iocresolverlookupnode), `prefixNamespace?`: undefined | string, `args?`: any[]): *T*

Calls the namespace.method expression with any arguments that needs to
be passed. Also supports type-hinting dependencies.

**Type parameters:**

▪ **T**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`namespace` | string \| [IocResolverLookupNode](../modules/_iocresolver_.md#iocresolverlookupnode) |
`prefixNamespace?` | undefined \| string |
`args?` | any[] |

**Returns:** *T*

___

###  resolve

▸ **resolve**(`namespace`: string, `prefixNamespace`: string | undefined): *[IocResolverLookupNode](../modules/_iocresolver_.md#iocresolverlookupnode)*

Resolves the namespace and returns it's lookup node

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`namespace` | string | - |
`prefixNamespace` | string \| undefined |  this._prefixNamespace |

**Returns:** *[IocResolverLookupNode](../modules/_iocresolver_.md#iocresolverlookupnode)*