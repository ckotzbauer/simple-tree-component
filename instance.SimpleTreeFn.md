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

[instance.ts:161](https://github.com/ckotzbauer/simple-tree-component/blob/bbc7fa7/src/types/instance.ts#L161)

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

[instance.ts:162](https://github.com/ckotzbauer/simple-tree-component/blob/bbc7fa7/src/types/instance.ts#L162)

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

[instance.ts:163](https://github.com/ckotzbauer/simple-tree-component/blob/bbc7fa7/src/types/instance.ts#L163)

## Table of contents

### Properties

- [defaultConfig](instance.SimpleTreeFn.md#defaultconfig)

## Properties

### defaultConfig

• **defaultConfig**: `Partial`<[`BaseOptions`](options.BaseOptions.md)\>

#### Defined in

[instance.ts:164](https://github.com/ckotzbauer/simple-tree-component/blob/bbc7fa7/src/types/instance.ts#L164)
