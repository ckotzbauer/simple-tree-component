import { initialize, beforeEachTest, createInstance } from "../test-utils";
import simpleTree from "../index";

const ctx = initialize();

describe("simpleTree", () => {
    beforeEach(() => beforeEachTest(ctx));

    describe("init", () => {
        it("should gracefully handle no elements", () => {
            expect(simpleTree([])).toEqual([]);
        });

        it("should use default options", () => {
            const tree = createInstance(ctx);
            expect(tree.options).toEqual(
                expect.objectContaining({
                    mode: "view",
                    searchBar: true,
                })
            );
        });

        it("should overwrite options correctly", () => {
            const tree = createInstance(ctx, { mode: "singleSelectDropdown" });
            expect(tree.options).toEqual(
                expect.objectContaining({
                    mode: "singleSelectDropdown",
                    searchBar: true,
                })
            );
        });
    });
});
