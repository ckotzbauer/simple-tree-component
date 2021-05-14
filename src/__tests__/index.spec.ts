import { initialize, beforeEachTest, createInstance } from "../test-utils";
import simpleTree from "../index";
import { TreeView } from "../ui/tree-view";
import { SingleSelectDropdown } from "../ui/single-select-dropdown";

const ctx = initialize();

describe("simpleTree", () => {
    beforeEach(() => beforeEachTest(ctx));

    describe("init", () => {
        it("should gracefully handle no elements", () => {
            expect(simpleTree([], "tree")).toEqual([]);
        });

        it("should use default options (by selector)", () => {
            const tree = createInstance(ctx, "tree", undefined, "input");
            expect(tree instanceof TreeView).toBeTruthy();
            expect(tree.options).toEqual(
                expect.objectContaining({
                    searchBar: true,
                })
            );
        });

        it("should use default options (by element)", () => {
            const tree = createInstance(ctx, "tree");
            expect(tree instanceof TreeView).toBeTruthy();
            expect(tree.options).toEqual(
                expect.objectContaining({
                    searchBar: true,
                })
            );
        });

        it("should overwrite options correctly", () => {
            const tree = createInstance(ctx, "singleSelectDropdown", { searchBar: false });
            expect(tree instanceof SingleSelectDropdown).toBeTruthy();
            expect(tree.options).toEqual(
                expect.objectContaining({
                    searchBar: false,
                })
            );
        });
    });
});
