[@poppinss/utils](../README.md) › ["StateJar"](../modules/_statejar_.md) › [StateJar](_statejar_.statejar.md)

# Class: StateJar <**T**>

A simple wrapper to manage internal state of an object or class.
Mainly used for lazy evaluated methods chain.

## Type parameters

▪ **T**: *any*

## Hierarchy

* **StateJar**

## Index

### Constructors

* [constructor](_statejar_.statejar.md#constructor)

### Methods

* [get](_statejar_.statejar.md#get)
* [set](_statejar_.statejar.md#set)

## Constructors

###  constructor

\+ **new StateJar**(`state`: Partial‹T›): *[StateJar](_statejar_.statejar.md)*

**Parameters:**

Name | Type |
------ | ------ |
`state` | Partial‹T› |

**Returns:** *[StateJar](_statejar_.statejar.md)*

## Methods

###  get

▸ **get**<**K**>(`key`: K): *T[K]*

**Type parameters:**

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`key` | K |

**Returns:** *T[K]*

___

###  set

▸ **set**<**K**>(`key`: K, `value`: T[K]): *void*

**Type parameters:**

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`key` | K |
`value` | T[K] |

**Returns:** *void*
