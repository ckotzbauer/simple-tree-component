/* eslint-disable @typescript-eslint/ban-types */
export interface Subscription {
    dispose(): void;
}

export class EventManager {
    public eventLookup: { [event: string]: Function[] } = {};

    public publish(event: string, data?: unknown): void {
        let subscribers;
        let i;

        if (!event) {
            throw new Error("Event was invalid.");
        }

        subscribers = this.eventLookup[event];
        if (subscribers) {
            subscribers = subscribers.slice();
            i = subscribers.length;

            while (i--) {
                try {
                    subscribers[i](data, event);
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }

    public subscribe(event: string, callback: Function): Subscription {
        const handler = callback;
        let subscribers: Function[] = [];

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

    public subscribeOnce(event: string, callback: Function): Subscription {
        const sub = this.subscribe(event, (a: unknown, b: unknown) => {
            sub.dispose();
            return callback(a, b);
        });

        return sub;
    }
}
