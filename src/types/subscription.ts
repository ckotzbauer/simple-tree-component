/**
 * A subscription-object which is issued when `subscribe` or `subscribeOnce` is called on a tree-instance to receive different events.
 */
export interface Subscription {
    /**
     * Ends the subscription. No further events (this subscription was linked to) where emitted.
     */
    dispose(): void;
}
