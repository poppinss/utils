**[@poppinss/utils](../README.md)**

[Globals](../README.md) › ["callIocReference"](_calliocreference_.md)

# External module: "callIocReference"

## Index

### Functions

* [callIocReference](_calliocreference_.md#calliocreference)

## Functions

###  callIocReference

▸ **callIocReference**<**T**>(`reference`: [IocObject](_parseiocreference_.md#iocobject) | [IocReference](_parseiocreference_.md#iocreference), `args`: any[]): *T*

Invokes the ioc reference parsed using [parseIocReference](_parseiocreference_.md#parseiocreference) using `ioc.make`
and `ioc.call` and both methods supports automatic dependency injection

**Type parameters:**

▪ **T**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`reference` | [IocObject](_parseiocreference_.md#iocobject) \| [IocReference](_parseiocreference_.md#iocreference) |
`args` | any[] |

**Returns:** *T*