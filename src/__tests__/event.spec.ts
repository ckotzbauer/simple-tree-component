import { EventManager } from "../event/event-manager";

describe("simpleTree", () => {
    describe("event", () => {
        describe("subscribe", () => {
            it("should throw error on null event", () => {
                const em = new EventManager();
                expect(() => em.subscribe(null as unknown as string, () => null)).toThrow();
            });

            it("should not remove another callback when dispose called twice", () => {
                const em = new EventManager();
                let data = 0;

                const subscription = em.subscribe("dinner", () => null);
                em.subscribe("dinner", function () {
                    data = 1;
                });

                subscription.dispose();
                subscription.dispose();

                em.publish("dinner");

                expect(data).toBe(1);
            });

            it("adds event with callback to the eventLookup object", () => {
                const em = new EventManager();
                const callback = () => null;
                em.subscribe("dinner", callback);

                expect(em.eventLookup.dinner.length).toBe(1);
                expect(em.eventLookup.dinner[0]).toBe(callback);
            });

            it("adds multiple callbacks the same event", () => {
                const em = new EventManager();
                const callback = () => null;
                em.subscribe("dinner", callback);

                const callback2 = () => null;
                em.subscribe("dinner", callback2);

                expect(em.eventLookup.dinner.length).toBe(2);
                expect(em.eventLookup.dinner[0]).toBe(callback);
                expect(em.eventLookup.dinner[1]).toBe(callback2);
            });

            it("removes the callback after execution", () => {
                const em = new EventManager();

                const callback = () => null;
                const subscription = em.subscribe("dinner", callback);

                const callback2 = () => null;
                const subscription2 = em.subscribe("dinner", callback2);

                expect(em.eventLookup.dinner.length).toBe(2);
                expect(em.eventLookup.dinner[0]).toBe(callback);
                expect(em.eventLookup.dinner[1]).toBe(callback2);

                subscription.dispose();

                expect(em.eventLookup.dinner.length).toBe(1);
                expect(em.eventLookup.dinner[0]).toBe(callback2);

                subscription2.dispose();
                expect(em.eventLookup.dinner.length).toBe(0);
            });

            it("will respond to an event any time it is published", () => {
                const em = new EventManager();
                const callback = () => null;
                em.subscribe("dinner", callback);

                expect(em.eventLookup.dinner.length).toBe(1);
                expect(em.eventLookup.dinner[0]).toBe(callback);

                em.publish("dinner");
                em.publish("dinner");
                em.publish("dinner");

                expect(em.eventLookup.dinner.length).toBe(1);
                expect(em.eventLookup.dinner[0]).toBe(callback);
            });

            it("will pass published data to the callback function", () => {
                const em = new EventManager();
                let data = null;
                const callback = (d: unknown) => (data = d);
                em.subscribe("dinner", callback);

                expect(em.eventLookup.dinner.length).toBe(1);
                expect(em.eventLookup.dinner[0]).toBe(callback);

                em.publish("dinner", { foo: "bar" });
                expect((data as any).foo).toBe("bar");
            });
        });

        describe("subscribeOnce", () => {
            it("adds event with an anynomous function that will execute the callback to the eventLookup object", () => {
                const em = new EventManager();
                const callback = () => null;
                em.subscribeOnce("dinner", callback);

                expect(em.eventLookup.dinner.length).toBe(1);
                expect(em.eventLookup.dinner[0] === callback).toBe(false);
                expect(typeof em.eventLookup.dinner[0] === "function").toBe(true);
            });

            it("adds multiple callbacks the same event", () => {
                const em = new EventManager();
                const callback = () => null;
                em.subscribeOnce("dinner", callback);

                const callback2 = () => null;
                em.subscribeOnce("dinner", callback2);

                expect(em.eventLookup.dinner.length).toBe(2);
                expect(em.eventLookup.dinner[0] === callback).toBe(false);
                expect(typeof em.eventLookup.dinner[0] === "function").toBe(true);
                expect(em.eventLookup.dinner[1] === callback).toBe(false);
                expect(typeof em.eventLookup.dinner[1] === "function").toBe(true);
            });

            it("removes the callback after execution", () => {
                const em = new EventManager();
                const callback = () => null;
                const subscription = em.subscribeOnce("dinner", callback);

                const callback2 = () => null;
                const subscription2 = em.subscribeOnce("dinner", callback2);

                expect(em.eventLookup.dinner.length).toBe(2);
                expect(em.eventLookup.dinner[0] === callback).toBe(false);
                expect(typeof em.eventLookup.dinner[0] === "function").toBe(true);
                expect(em.eventLookup.dinner[1] === callback2).toBe(false);
                expect(typeof em.eventLookup.dinner[1] === "function").toBe(true);

                subscription.dispose();

                expect(em.eventLookup.dinner.length).toBe(1);
                expect(typeof em.eventLookup.dinner[0] === "function").toBe(true);

                subscription2.dispose();
                expect(em.eventLookup.dinner.length).toBe(0);
            });

            it("will respond to an event only once", () => {
                const em = new EventManager();
                let data = null;

                const callback = () => (data = "something");
                em.subscribeOnce("dinner", callback);

                expect(em.eventLookup.dinner.length).toBe(1);
                expect(em.eventLookup.dinner[0] === callback).toBe(false);
                expect(typeof em.eventLookup.dinner[0] === "function").toBe(true);

                em.publish("dinner");
                expect(data).toBe("something");

                expect(em.eventLookup.dinner.length).toBe(0);

                data = null;
                em.publish("dinner");
                expect(data).toBe(null);
            });

            it("will pass published data to the callback function", () => {
                const em = new EventManager();

                let data = null;
                const callback = (d: unknown) => (data = d);
                em.subscribeOnce("dinner", callback);

                expect(em.eventLookup.dinner.length).toBe(1);
                expect(em.eventLookup.dinner[0] === callback).toBe(false);
                expect(typeof em.eventLookup.dinner[0] === "function").toBe(true);

                em.publish("dinner", { foo: "bar" });
                expect((data as any).foo).toBe("bar");

                data = null;
                em.publish("dinner");
                expect(data).toBe(null);
            });
        });

        describe("publish", () => {
            it("should throw error on null event", () => {
                const em = new EventManager();
                expect(() => em.publish(null as unknown as string, () => null)).toThrow();
            });

            it("calls the callback functions for the event", () => {
                const em = new EventManager();

                let someData, someData2;

                const callback = (data: unknown) => (someData = data);
                em.subscribe("dinner", callback);

                const callback2 = (data: unknown) => (someData2 = data);
                em.subscribe("dinner", callback2);

                const data = { foo: "bar" };
                em.publish("dinner", data);

                expect(someData).toBe(data);
                expect(someData2).toBe(data);
            });

            it("does not call the callback functions if subscriber does not exist", () => {
                const em = new EventManager();

                let someData;

                const callback = (data: unknown) => (someData = data);
                em.subscribe("dinner", callback);

                em.publish("garbage", {});

                expect(someData).toBeUndefined();
            });

            it("handles errors in subscriber callbacks", () => {
                const em = new EventManager();

                let someMessage;

                const crash = () => {
                    throw new Error("oops");
                };

                const callback = (message: unknown) => (someMessage = message);

                const data = { foo: "bar" };

                em.subscribe("dinner", crash);
                em.subscribe("dinner", callback);
                em.subscribe("dinner", crash);

                em.publish("dinner", data);

                expect(someMessage).toBe(data);
            });
        });
    });
});
