[**Simple Tree Component**](../../README.md)

***

[Simple Tree Component](../../modules.md) / [subscription](../README.md) / Subscription

# Interface: Subscription

Defined in: [subscription.ts:4](https://github.com/ckotzbauer/simple-tree-component/blob/7e57d5be0b13172d476124b9cc88ae4e65703768/src/types/subscription.ts#L4)

A subscription-object which is issued when `subscribe` or `subscribeOnce` is called on a tree-instance to receive different events.

## Methods

### dispose()

> **dispose**(): `void`

Defined in: [subscription.ts:8](https://github.com/ckotzbauer/simple-tree-component/blob/7e57d5be0b13172d476124b9cc88ae4e65703768/src/types/subscription.ts#L8)

Ends the subscription. No further events (this subscription was linked to) where emitted.

#### Returns

`void`
