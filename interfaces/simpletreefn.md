# Interface: SimpleTreeFn

## Hierarchy

* **SimpleTreeFn**

## Callable

▸ <K\>(`selector`: Node, `mode`: K, `config?`: [Options](../globals.md#options)): [TreeInstance](treeinstance.md)<K\>

*Defined in [types/instance.ts:118](https://github.com/ckotzbauer/simple-tree-component/blob/111f998/src/types/instance.ts#L118)*

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

**Returns:** [TreeInstance](treeinstance.md)<K\>

▸ <K\>(`selector`: ArrayLike<Node\>, `mode`: K, `config?`: [Options](../globals.md#options)): [TreeInstance](treeinstance.md)<K\>[]

*Defined in [types/instance.ts:119](https://github.com/ckotzbauer/simple-tree-component/blob/111f998/src/types/instance.ts#L119)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | keyof [TreeModeNameMap](treemodenamemap.md) |

#### Parameters:

Name | Type |
------ | ------ |
`selector` | ArrayLike<Node\> |
`mode` | K |
`config?` | [Options](../globals.md#options) |

**Returns:** [TreeInstance](treeinstance.md)<K\>[]

▸ <K\>(`selector`: string, `mode`: K, `config?`: [Options](../globals.md#options)): [TreeInstance](treeinstance.md)<K\> \| [TreeInstance](treeinstance.md)<K\>[]

*Defined in [types/instance.ts:120](https://github.com/ckotzbauer/simple-tree-component/blob/111f998/src/types/instance.ts#L120)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | keyof [TreeModeNameMap](treemodenamemap.md) |

#### Parameters:

Name | Type |
------ | ------ |
`selector` | string |
`mode` | K |
`config?` | [Options](../globals.md#options) |

**Returns:** [TreeInstance](treeinstance.md)<K\> \| [TreeInstance](treeinstance.md)<K\>[]

## Index

### Properties

* [defaultConfig](simpletreefn.md#defaultconfig)

## Properties

### defaultConfig

•  **defaultConfig**: Partial<[BaseOptions](baseoptions.md)\>

*Defined in [types/instance.ts:122](https://github.com/ckotzbauer/simple-tree-component/blob/111f998/src/types/instance.ts#L122)*
