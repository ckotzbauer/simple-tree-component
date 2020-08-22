import { initialize, beforeEachTest, createInstance, createTreeNode, openDropdown, clickTreeNode } from "../test-utils";
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
            });
            tree.subscribe("selectionChanged", (s: TreeNode) => {
                called = true;
                selectedNode = s;
            });

            openDropdown(singleCtx, constants.classNames.SimpleTreeSingleSelectBox);
            clickTreeNode(tree.getNode("node2"));

            expect(tree.getSelected().value).toEqual("node2");
            expect(called).toBeTruthy();
            expect(selectedNode?.value).toEqual("node2");
        });

        it("should be thrown if multiple items are selected", () => {
            let called = false;
            let selectedNodes!: TreeNode[];

            const tree = createInstance<"multiSelectDropdown">(multiCtx, "multiSelectDropdown", {
                nodes: [createTreeNode("node1", "node1"), createTreeNode("node2", "node2"), createTreeNode("node3", "node3")],
            });
            tree.subscribe("selectionChanged", (s: TreeNode[]) => {
                called = true;
                selectedNodes = s;
            });

            openDropdown(multiCtx, constants.classNames.SimpleTreeMultiSelectBox);
            clickTreeNode(tree.getNode("node2"));

            expect(tree.getSelected().map((s) => s.value)).toContain("node2");
            expect(called).toBeTruthy();
            expect(selectedNodes.map((s) => s.value)).toContain("node2");

            clickTreeNode(tree.getNode("node3"));

            expect(tree.getSelected().map((s) => s.value)).toContain("node2");
            expect(tree.getSelected().map((s) => s.value)).toContain("node3");
            expect(called).toBeTruthy();
            expect(selectedNodes.map((s) => s.value)).toContain("node2");
            expect(selectedNodes.map((s) => s.value)).toContain("node3");
        });

        // TODO: add unit-test for view-only mode
    });
});
