# Interface: Subscription

A subscription-object which is issued when `subscribe` or `subscribeOnce` is called on a tree-instance to receive different events.

## Hierarchy

* **Subscription**

## Index

### Methods

* [dispose](subscription.md#dispose)

## Methods

### dispose

▸ **dispose**(): void

*Defined in [types/subscription.ts:8](https://github.com/ckotzbauer/simple-tree-component/blob/9038ae2/src/types/subscription.ts#L8)*

Ends the subscription. No further events (this subscription was linked to) where emitted.

**Returns:** void
