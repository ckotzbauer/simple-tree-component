# Interface: SimpleTreeFn

## Hierarchy

* **SimpleTreeFn**

## Callable

▸ \<K>(`selector`: Node, `mode`: K, `config?`: [Options](../globals.md#options)): [Instance](instance.md)\<K>

*Defined in [types/instance.ts:95](https://github.com/ckotzbauer/simple-tree-component/blob/4c3a2a5/src/types/instance.ts#L95)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | keyof [TreeModeNameMap](treemodenamemap.md) |

#### Parameters:

Name | Type |
------ | ------ |
`selector` | Node |
`mode` | K |
`config?` | [Options](../globals.md#options) |

**Returns:** [Instance](instance.md)\<K>

▸ \<K>(`selector`: ArrayLike\<Node>, `config?`: [Options](../globals.md#options)): [Instance](instance.md)\<K>[]

*Defined in [types/instance.ts:96](https://github.com/ckotzbauer/simple-tree-component/blob/4c3a2a5/src/types/instance.ts#L96)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | keyof [TreeModeNameMap](treemodenamemap.md) |

#### Parameters:

Name | Type |
------ | ------ |
`selector` | ArrayLike\<Node> |
`config?` | [Options](../globals.md#options) |

**Returns:** [Instance](instance.md)\<K>[]

▸ \<K>(`selector`: string, `config?`: [Options](../globals.md#options)): [Instance](instance.md)\<K> \| [Instance](instance.md)\<K>[]

*Defined in [types/instance.ts:97](https://github.com/ckotzbauer/simple-tree-component/blob/4c3a2a5/src/types/instance.ts#L97)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | keyof [TreeModeNameMap](treemodenamemap.md) |

#### Parameters:

Name | Type |
------ | ------ |
`selector` | string |
`config?` | [Options](../globals.md#options) |

**Returns:** [Instance](instance.md)\<K> \| [Instance](instance.md)\<K>[]

## Index

### Properties

* [defaultConfig](simpletreefn.md#defaultconfig)

## Properties

### defaultConfig

•  **defaultConfig**: Partial\<[BaseOptions](baseoptions.md)>

*Defined in [types/instance.ts:99](https://github.com/ckotzbauer/simple-tree-component/blob/4c3a2a5/src/types/instance.ts#L99)*
