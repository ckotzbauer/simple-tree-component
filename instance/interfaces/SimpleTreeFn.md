[**Simple Tree Component**](../../README.md)

***

[Simple Tree Component](../../modules.md) / [instance](../README.md) / SimpleTreeFn

# Interface: SimpleTreeFn()

Defined in: [instance.ts:160](https://github.com/ckotzbauer/simple-tree-component/blob/cbc12bff8120340238c0d1586198651ba1fd8873/src/types/instance.ts#L160)

## Call Signature

> **SimpleTreeFn**\<`K`\>(`selector`, `mode`, `config?`): [`TreeInstance`](TreeInstance.md)\<`K`\>

Defined in: [instance.ts:161](https://github.com/ckotzbauer/simple-tree-component/blob/cbc12bff8120340238c0d1586198651ba1fd8873/src/types/instance.ts#L161)

### Type Parameters

#### K

`K` *extends* keyof [`TreeModeNameMap`](TreeModeNameMap.md)

### Parameters

#### selector

`Node`

#### mode

`K`

#### config?

`Partial`\<[`BaseOptions`](../../options/interfaces/BaseOptions.md)\>

### Returns

[`TreeInstance`](TreeInstance.md)\<`K`\>

## Call Signature

> **SimpleTreeFn**\<`K`\>(`selector`, `mode`, `config?`): [`TreeInstance`](TreeInstance.md)\<`K`\>[]

Defined in: [instance.ts:162](https://github.com/ckotzbauer/simple-tree-component/blob/cbc12bff8120340238c0d1586198651ba1fd8873/src/types/instance.ts#L162)

### Type Parameters

#### K

`K` *extends* keyof [`TreeModeNameMap`](TreeModeNameMap.md)

### Parameters

#### selector

`ArrayLike`\<`Node`\>

#### mode

`K`

#### config?

`Partial`\<[`BaseOptions`](../../options/interfaces/BaseOptions.md)\>

### Returns

[`TreeInstance`](TreeInstance.md)\<`K`\>[]

## Call Signature

> **SimpleTreeFn**\<`K`\>(`selector`, `mode`, `config?`): [`TreeInstance`](TreeInstance.md)\<`K`\> \| [`TreeInstance`](TreeInstance.md)\<`K`\>[]

Defined in: [instance.ts:163](https://github.com/ckotzbauer/simple-tree-component/blob/cbc12bff8120340238c0d1586198651ba1fd8873/src/types/instance.ts#L163)

### Type Parameters

#### K

`K` *extends* keyof [`TreeModeNameMap`](TreeModeNameMap.md)

### Parameters

#### selector

`string`

#### mode

`K`

#### config?

`Partial`\<[`BaseOptions`](../../options/interfaces/BaseOptions.md)\>

### Returns

[`TreeInstance`](TreeInstance.md)\<`K`\> \| [`TreeInstance`](TreeInstance.md)\<`K`\>[]

## Properties

### defaultConfig

> **defaultConfig**: `Partial`\<[`BaseOptions`](../../options/interfaces/BaseOptions.md)\>

Defined in: [instance.ts:164](https://github.com/ckotzbauer/simple-tree-component/blob/cbc12bff8120340238c0d1586198651ba1fd8873/src/types/instance.ts#L164)
