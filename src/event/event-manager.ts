import { Subscription } from "../types/subscription";

export class EventManager {
    public eventLookup: { [event: string]: ((d: unknown, evt: string, e?: Event) => void)[] } = {};

    public publish<T>(evt: string, data?: T, e?: Event): void {
        let subscribers;
        let i;

        if (!evt) {
            throw new Error("Event was invalid.");
        }

        subscribers = this.eventLookup[evt];
        if (subscribers) {
            subscribers = subscribers.slice();
            i = subscribers.length;

            while (i--) {
                try {
                    subscribers[i](data, evt, e);
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }

    public subscribe<T>(event: string, callback: (d: T, evt: string, e?: Event) => void): Subscription {
        const handler = callback;
        let subscribers: ((d: T, evt: string, e?: Event) => void)[] = [];

        if (!event) {
            throw new Error("Event channel/type was invalid.");
        }

        subscribers = this.eventLookup[event] || (this.eventLookup[event] = []);
        subscribers.push(handler);

        return {
            dispose() {
                const idx = subscribers.indexOf(handler);
                if (idx !== -1) {
                    subscribers.splice(idx, 1);
                }
            },
        };
    }

    public subscribeOnce<T>(event: string, callback: (d: T, evt: string, e?: Event) => void): Subscription {
        const sub = this.subscribe(event, (a: T, b: string, e?: Event) => {
            sub.dispose();
            return callback(a, b, e);
        });

        return sub;
    }
}
