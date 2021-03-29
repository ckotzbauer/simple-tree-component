# Interface: SimpleTreeFn

[instance](../modules/instance.md).SimpleTreeFn

## Callable

▸ **SimpleTreeFn**<K\>(`selector`: Node, `mode`: K, `config?`: *Partial*<[*BaseOptions*](options.baseoptions.md)\>): [*TreeInstance*](instance.treeinstance.md)<K\>

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | keyof [*TreeModeNameMap*](instance.treemodenamemap.md) |

#### Parameters:

Name | Type |
:------ | :------ |
`selector` | Node |
`mode` | K |
`config?` | *Partial*<[*BaseOptions*](options.baseoptions.md)\> |

**Returns:** [*TreeInstance*](instance.treeinstance.md)<K\>

Defined in: [instance.ts:118](https://github.com/ckotzbauer/simple-tree-component/blob/8798469/src/types/instance.ts#L118)

▸ **SimpleTreeFn**<K\>(`selector`: *ArrayLike*<Node\>, `mode`: K, `config?`: *Partial*<[*BaseOptions*](options.baseoptions.md)\>): [*TreeInstance*](instance.treeinstance.md)<K\>[]

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | keyof [*TreeModeNameMap*](instance.treemodenamemap.md) |

#### Parameters:

Name | Type |
:------ | :------ |
`selector` | *ArrayLike*<Node\> |
`mode` | K |
`config?` | *Partial*<[*BaseOptions*](options.baseoptions.md)\> |

**Returns:** [*TreeInstance*](instance.treeinstance.md)<K\>[]

Defined in: [instance.ts:119](https://github.com/ckotzbauer/simple-tree-component/blob/8798469/src/types/instance.ts#L119)

▸ **SimpleTreeFn**<K\>(`selector`: *string*, `mode`: K, `config?`: *Partial*<[*BaseOptions*](options.baseoptions.md)\>): [*TreeInstance*](instance.treeinstance.md)<K\> \| [*TreeInstance*](instance.treeinstance.md)<K\>[]

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | keyof [*TreeModeNameMap*](instance.treemodenamemap.md) |

#### Parameters:

Name | Type |
:------ | :------ |
`selector` | *string* |
`mode` | K |
`config?` | *Partial*<[*BaseOptions*](options.baseoptions.md)\> |

**Returns:** [*TreeInstance*](instance.treeinstance.md)<K\> \| [*TreeInstance*](instance.treeinstance.md)<K\>[]

Defined in: [instance.ts:120](https://github.com/ckotzbauer/simple-tree-component/blob/8798469/src/types/instance.ts#L120)

## Table of contents

### Properties

- [defaultConfig](instance.simpletreefn.md#defaultconfig)

## Properties

### defaultConfig

• **defaultConfig**: *Partial*<[*BaseOptions*](options.baseoptions.md)\>

Defined in: [instance.ts:122](https://github.com/ckotzbauer/simple-tree-component/blob/8798469/src/types/instance.ts#L122)
