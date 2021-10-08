[Simple Tree Component](../README.md) / [Modules](../modules.md) / [instance](instance.md) / SimpleTreeFn

# Interface: SimpleTreeFn

[instance](instance.md).SimpleTreeFn

## Callable

### SimpleTreeFn

▸ **SimpleTreeFn**<`K`\>(`selector`, `mode`, `config?`): [`TreeInstance`](instance.TreeInstance.md)<`K`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`TreeModeNameMap`](instance.TreeModeNameMap.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | `Node` |
| `mode` | `K` |
| `config?` | `Partial`<[`BaseOptions`](options.BaseOptions.md)\> |

#### Returns

[`TreeInstance`](instance.TreeInstance.md)<`K`\>

#### Defined in

[instance.ts:121](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L121)

### SimpleTreeFn

▸ **SimpleTreeFn**<`K`\>(`selector`, `mode`, `config?`): [`TreeInstance`](instance.TreeInstance.md)<`K`\>[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`TreeModeNameMap`](instance.TreeModeNameMap.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | `ArrayLike`<`Node`\> |
| `mode` | `K` |
| `config?` | `Partial`<[`BaseOptions`](options.BaseOptions.md)\> |

#### Returns

[`TreeInstance`](instance.TreeInstance.md)<`K`\>[]

#### Defined in

[instance.ts:122](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L122)

### SimpleTreeFn

▸ **SimpleTreeFn**<`K`\>(`selector`, `mode`, `config?`): [`TreeInstance`](instance.TreeInstance.md)<`K`\> \| [`TreeInstance`](instance.TreeInstance.md)<`K`\>[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`TreeModeNameMap`](instance.TreeModeNameMap.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | `string` |
| `mode` | `K` |
| `config?` | `Partial`<[`BaseOptions`](options.BaseOptions.md)\> |

#### Returns

[`TreeInstance`](instance.TreeInstance.md)<`K`\> \| [`TreeInstance`](instance.TreeInstance.md)<`K`\>[]

#### Defined in

[instance.ts:123](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L123)

## Table of contents

### Properties

- [defaultConfig](instance.SimpleTreeFn.md#defaultconfig)

## Properties

### defaultConfig

• **defaultConfig**: `Partial`<[`BaseOptions`](options.BaseOptions.md)\>

#### Defined in

[instance.ts:124](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L124)
