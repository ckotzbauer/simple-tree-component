[Simple Tree Component](../README.md) / [Exports](../modules.md) / [instance](instance.md) / SimpleTreeFn

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

[instance.ts:119](https://github.com/ckotzbauer/simple-tree-component/blob/5395451/src/types/instance.ts#L119)

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

[instance.ts:120](https://github.com/ckotzbauer/simple-tree-component/blob/5395451/src/types/instance.ts#L120)

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

[instance.ts:121](https://github.com/ckotzbauer/simple-tree-component/blob/5395451/src/types/instance.ts#L121)

## Table of contents

### Properties

- [defaultConfig](instance.SimpleTreeFn.md#defaultconfig)

## Properties

### defaultConfig

• **defaultConfig**: `Partial`<[`BaseOptions`](options.BaseOptions.md)\>

#### Defined in

[instance.ts:122](https://github.com/ckotzbauer/simple-tree-component/blob/5395451/src/types/instance.ts#L122)
