import { initialize, beforeEachTest, createInstance, createTreeNode, openDropdown, clickTreeNode } from "../test-utils";
import constants from "../ui/ui-constants";
import { TreeNode } from "../types/tree-node";

const treeCtx = initialize<"tree">();
const singleCtx = initialize<"singleSelectDropdown">();
const multiCtx = initialize<"multiSelectDropdown">();

describe("simpleTree", () => {
    beforeEach(() => {
        beforeEachTest(treeCtx);
        beforeEachTest(singleCtx);
        beforeEachTest(multiCtx);
    });

    describe("event", () => {
        it("should be thrown if a single item is selected (tree-view, single mode)", () => {
            let called = false;
            let selectedNode!: TreeNode | TreeNode[] | null;

            const tree = createInstance<"tree">(treeCtx, "tree", {
                nodes: [createTreeNode("node1", "node1"), createTreeNode("node2", "node2"), createTreeNode("node3", "node3")],
            });
            tree.subscribe("selectionChanged", (s: TreeNode | TreeNode[] | null) => {
                called = true;
                selectedNode = s;
            });

            clickTreeNode(tree.getNode("node1"));
            const node: TreeNode = selectedNode as TreeNode;

            expect(called).toBeTruthy();
            expect(node).not.toBeNull();
            expect(node.value).toEqual("node1");
        });

        it("should be thrown if multiple items are selected (tree-view, checkbox mode)", () => {
            let called = false;
            let selectedNodes!: TreeNode | TreeNode[] | null;

            const tree = createInstance<"tree">(treeCtx, "tree", {
                nodes: [createTreeNode("node1", "node1"), createTreeNode("node2", "node2"), createTreeNode("node3", "node3")],
                checkboxes: {
                    active: true,
                },
            });
            tree.subscribe("selectionChanged", (s: TreeNode | TreeNode[] | null) => {
                called = true;
                selectedNodes = s;
            });

            clickTreeNode(tree.getNode("node1"));
            const nodes: TreeNode[] = selectedNodes as TreeNode[];

            expect(called).toBeTruthy();
            expect(nodes).toHaveLength(1);
            expect(nodes[0].value).toBe("node1");
        });

        it("should be thrown if multiple items are selected (tree-view, checkbox mode, recursive)", () => {
            let called = false;
            let selectedNodes!: TreeNode | TreeNode[] | null;

            const tree = createInstance<"tree">(treeCtx, "tree", {
                nodes: [
                    createTreeNode("node1", "node1", [createTreeNode("node11", "node11"), createTreeNode("node12", "node12")]),
                    createTreeNode("node2", "node2"),
                    createTreeNode("node3", "node3"),
                ],
                checkboxes: {
                    active: true,
                    recursive: true,
                },
            });
            tree.subscribe("selectionChanged", (s: TreeNode | TreeNode[] | null) => {
                called = true;
                selectedNodes = s;
            });

            clickTreeNode(tree.getNode("node1"));
            const nodes: TreeNode[] = selectedNodes as TreeNode[];

            expect(called).toBeTruthy();
            expect(nodes).toHaveLength(3);
            expect(nodes.every((n) => n.value === "node1" || n.value === "node11" || n.value === "node12")).toBeTruthy();
        });

        it("should be thrown if a single item is selected (single select)", () => {
            let called = false;
            let selectedNode!: TreeNode | null;

            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [createTreeNode("node1", "node1"), createTreeNode("node2", "node2"), createTreeNode("node3", "node3")],
            });
            tree.subscribe("selectionChanged", (s: TreeNode | null) => {
                called = true;
                selectedNode = s;
            });

            openDropdown(singleCtx, constants.classNames.SimpleTreeSingleSelectBox);
            clickTreeNode(tree.getNode("node2"));

            expect(tree.getSelected()?.value).toEqual("node2");
            expect(called).toBeTruthy();
            expect(selectedNode?.value).toEqual("node2");
        });

        it("should not select node when nodeSelected-event is prevented (single select)", () => {
            let called = false;
            let selectedNode!: TreeNode | TreeNode[] | null;

            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [createTreeNode("node1", "node1"), createTreeNode("node2", "node2"), createTreeNode("node3", "node3")],
            });
            // eslint-disable-next-line @typescript-eslint/naming-convention
            tree.subscribe("nodeSelected", (s: TreeNode | TreeNode[] | null, _evt: string, e?: Event) => {
                called = true;
                selectedNode = s;
                e?.preventDefault();
            });

            openDropdown(singleCtx, constants.classNames.SimpleTreeSingleSelectBox);
            clickTreeNode(tree.getNode("node1"));
            const node: TreeNode = selectedNode as TreeNode;

            expect(called).toBeTruthy();
            expect(node).not.toBeNull();
            expect(node.value).toEqual("node1");
            expect(tree.getSelected()).toBeNull();
        });

        it("should be thrown if multiple items are selected (multi select)", () => {
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

        it("should not select node when nodeSelected-event is prevented (multi select)", () => {
            let called = false;
            let selectedNode!: TreeNode | TreeNode[] | null;

            const tree = createInstance<"multiSelectDropdown">(multiCtx, "multiSelectDropdown", {
                nodes: [createTreeNode("node1", "node1"), createTreeNode("node2", "node2"), createTreeNode("node3", "node3")],
            });
            // eslint-disable-next-line @typescript-eslint/naming-convention
            tree.subscribe("nodeSelected", (s: TreeNode | TreeNode[] | null, _evt: string, e?: Event) => {
                called = true;
                selectedNode = s;
                e?.preventDefault();
            });

            openDropdown(multiCtx, constants.classNames.SimpleTreeMultiSelectBox);
            clickTreeNode(tree.getNode("node1"));
            const node: TreeNode = selectedNode as TreeNode;

            expect(called).toBeTruthy();
            expect(node).not.toBeNull();
            expect(node.value).toEqual("node1");
            expect(tree.getSelected()).toEqual([]);
        });

        it("should not select node when nodeSelected-event is prevented (tree-view)", () => {
            let called = false;
            let selectedNode!: TreeNode | TreeNode[] | null;

            const tree = createInstance<"tree">(treeCtx, "tree", {
                nodes: [createTreeNode("node1", "node1"), createTreeNode("node2", "node2"), createTreeNode("node3", "node3")],
            });
            // eslint-disable-next-line @typescript-eslint/naming-convention
            tree.subscribe("nodeSelected", (s: TreeNode | TreeNode[] | null, _evt: string, e?: Event) => {
                called = true;
                selectedNode = s;
                e?.preventDefault();
            });

            clickTreeNode(tree.getNode("node1"));
            const node: TreeNode = selectedNode as TreeNode;

            expect(called).toBeTruthy();
            expect(node).not.toBeNull();
            expect(node.value).toEqual("node1");
            expect(tree.getSelected()).toBeNull();
        });
    });
});
