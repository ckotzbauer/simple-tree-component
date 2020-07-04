import { initialize, beforeEachTest, createInstance, createTreeNode, simulate } from "../test-utils";
import constants from "../ui/ui-constants";
import { TreeNode } from "../types/tree-node";

const singleCtx = initialize<"singleSelectDropdown">();
const multiCtx = initialize<"multiSelectDropdown">();

describe("simpleTree", () => {
    beforeEach(() => {
        beforeEachTest(singleCtx);
        beforeEachTest(multiCtx);
    });

    describe("event", () => {
        it("should be thrown if a single item is selected", () => {
            let called = false;
            let selectedNode!: TreeNode;

            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [createTreeNode("node1", "node1"), createTreeNode("node2", "node2"), createTreeNode("node3", "node3")],
                events: {
                    onSelectionChanged: (s: TreeNode) => {
                        called = true;
                        selectedNode = s;
                    },
                },
            });

            // open dropdown
            simulate("click", singleCtx.elem?.querySelector(`.${constants.classNames.SimpleTreeSingleSelectBox}`) as HTMLElement);
            // click second item
            simulate(
                "click",
                Array.from(
                    document.getElementById(`${constants.nodeIdPrefix}node2`)?.firstChild?.childNodes as any
                )[1] as HTMLElement
            );

            expect(tree.getSelected().value).toEqual("node2");
            expect(called).toBeTruthy();
            expect(selectedNode?.value).toEqual("node2");
        });

        it("should be thrown if multiple items are selected", () => {
            let called = false;
            let selectedNodes!: TreeNode[];

            const tree = createInstance<"multiSelectDropdown">(multiCtx, "multiSelectDropdown", {
                nodes: [createTreeNode("node1", "node1"), createTreeNode("node2", "node2"), createTreeNode("node3", "node3")],
                events: {
                    onSelectionChanged: (s: TreeNode[]) => {
                        called = true;
                        selectedNodes = s;
                    },
                },
            });

            // open dropdown
            simulate("click", multiCtx.elem?.querySelector(`.${constants.classNames.SimpleTreeMultiSelectBox}`) as HTMLElement);
            // click second item
            simulate(
                "click",
                Array.from(
                    document.getElementById(`${constants.nodeIdPrefix}node2`)?.firstChild?.childNodes as any
                )[1] as HTMLElement
            );

            expect(tree.getSelected().map((s) => s.value)).toContain("node2");
            expect(called).toBeTruthy();
            expect(selectedNodes.map((s) => s.value)).toContain("node2");

            // click third item
            simulate(
                "click",
                Array.from(
                    document.getElementById(`${constants.nodeIdPrefix}node3`)?.firstChild?.childNodes as any
                )[1] as HTMLElement
            );

            expect(tree.getSelected().map((s) => s.value)).toContain("node2");
            expect(tree.getSelected().map((s) => s.value)).toContain("node3");
            expect(called).toBeTruthy();
            expect(selectedNodes.map((s) => s.value)).toContain("node2");
            expect(selectedNodes.map((s) => s.value)).toContain("node3");
        });

        // TODO: add unit-test for view-only mode
    });
});
