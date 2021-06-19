# Interface: SimpleTreeFn

[instance](../modules/instance.md).SimpleTreeFn

## Callable

### SimpleTreeFn

▸ **SimpleTreeFn**<K\>(`selector`, `mode`, `config?`): [TreeInstance](instance.treeinstance.md)<K\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | `K`: keyof [TreeModeNameMap](instance.treemodenamemap.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | `Node` |
| `mode` | `K` |
| `config?` | `Partial`<[BaseOptions](options.baseoptions.md)\> |

#### Returns

[TreeInstance](instance.treeinstance.md)<K\>

#### Defined in

[instance.ts:118](https://github.com/ckotzbauer/simple-tree-component/blob/0e3e17d/src/types/instance.ts#L118)

### SimpleTreeFn

▸ **SimpleTreeFn**<K\>(`selector`, `mode`, `config?`): [TreeInstance](instance.treeinstance.md)<K\>[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | `K`: keyof [TreeModeNameMap](instance.treemodenamemap.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | `ArrayLike`<Node\> |
| `mode` | `K` |
| `config?` | `Partial`<[BaseOptions](options.baseoptions.md)\> |

#### Returns

[TreeInstance](instance.treeinstance.md)<K\>[]

#### Defined in

[instance.ts:119](https://github.com/ckotzbauer/simple-tree-component/blob/0e3e17d/src/types/instance.ts#L119)

### SimpleTreeFn

▸ **SimpleTreeFn**<K\>(`selector`, `mode`, `config?`): [TreeInstance](instance.treeinstance.md)<K\> \| [TreeInstance](instance.treeinstance.md)<K\>[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | `K`: keyof [TreeModeNameMap](instance.treemodenamemap.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | `string` |
| `mode` | `K` |
| `config?` | `Partial`<[BaseOptions](options.baseoptions.md)\> |

#### Returns

[TreeInstance](instance.treeinstance.md)<K\> \| [TreeInstance](instance.treeinstance.md)<K\>[]

#### Defined in

[instance.ts:120](https://github.com/ckotzbauer/simple-tree-component/blob/0e3e17d/src/types/instance.ts#L120)

## Table of contents

### Properties

- [defaultConfig](instance.simpletreefn.md#defaultconfig)

## Properties

### defaultConfig

• **defaultConfig**: `Partial`<[BaseOptions](options.baseoptions.md)\>

#### Defined in

[instance.ts:122](https://github.com/ckotzbauer/simple-tree-component/blob/0e3e17d/src/types/instance.ts#L122)
