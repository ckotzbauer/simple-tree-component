import {
    initialize,
    beforeEachTest,
    createInstance,
    createTreeNode,
    openDropdown,
    clickTreeNode,
    expectObjectsInArray,
} from "../test-utils";
import { TreeNode } from "../types/tree-node";
import constants from "../ui/ui-constants";

const singleCtx = initialize<"singleSelectDropdown">();
const multiCtx = initialize<"multiSelectDropdown">();
const treeOnlyCtx = initialize<"tree">();

describe("simpleTree", () => {
    beforeEach(() => {
        beforeEachTest(singleCtx);
        beforeEachTest(multiCtx);
        beforeEachTest(treeOnlyCtx);
    });

    describe("singleSelection", () => {
        it("should respect initial selection.", () => {
            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [
                    createTreeNode("node1", "node1"),
                    createTreeNode("node2", "node2"),
                    createTreeNode("node3", "node3", [], true),
                ],
            });

            expect(tree.getSelected()).toEqual(expect.objectContaining({ selected: true, value: "node3" }));
            multiCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node3"));
        });

        it("should handle null on setSelected api-call correctly.", () => {
            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [createTreeNode("node1", "node1"), createTreeNode("node2", "node2"), createTreeNode("node3", "node3")],
            });

            const node2 = tree.getNode("node2");
            expect(node2).not.toBeNull();
            tree.setSelected(node2 as TreeNode);

            tree.setSelected(null);
            expect(tree.getSelected()).toBeNull();
            singleCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBeFalsy());
        });

        it("item should be selected on setSelected api-call.", () => {
            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [
                    createTreeNode("node1", "node1", [createTreeNode("node4", "node4"), createTreeNode("node5", "node5")]),
                    createTreeNode("node2", "node2"),
                    createTreeNode("node3", "node3"),
                ],
            });

            const node2 = tree.getNode("node2");
            expect(node2).not.toBeNull();
            tree.setSelected(node2 as TreeNode);
            expect(tree.getSelected()).toEqual(expect.objectContaining({ selected: true, value: "node2" }));
            singleCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node2"));

            const node4 = tree.getNode("node4");
            expect(node4).not.toBeNull();
            tree.setSelected(node4 as TreeNode);
            expect(tree.getSelected()).toEqual(expect.objectContaining({ selected: true, value: "node4" }));
            singleCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node4"));
        });

        it("items should be selectable depending on their selectable state via api-call.", () => {
            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [
                    createTreeNode("node1", "node1"),
                    createTreeNode("node2", "node2", [], false, false),
                    createTreeNode("node3", "node3"),
                ],
            });

            const node1 = tree.getNode("node1");
            expect(node1).not.toBeNull();
            tree.setSelected(node1 as TreeNode);
            expect(tree.getSelected()).toEqual(expect.objectContaining({ selected: true, value: "node1" }));
            singleCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node1"));

            const node2 = tree.getNode("node2");
            expect(node2).not.toBeNull();
            tree.setSelected(node2 as TreeNode);
            expect(tree.getSelected()).toBeNull();
        });

        it("item should be selected when clicked.", () => {
            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [
                    createTreeNode("node1", "node1", [createTreeNode("node4", "node4"), createTreeNode("node5", "node5")]),
                    createTreeNode("node2", "node2"),
                    createTreeNode("node3", "node3"),
                ],
            });

            openDropdown(singleCtx, constants.classNames.SimpleTreeSingleSelectBox);
            clickTreeNode(tree.getNode("node2"));
            expect(tree.getSelected()).toEqual(expect.objectContaining({ selected: true, value: "node2" }));
            singleCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node2"));

            openDropdown(singleCtx, constants.classNames.SimpleTreeSingleSelectBox);
            clickTreeNode(tree.getNode("node4"));
            expect(tree.getSelected()).toEqual(expect.objectContaining({ selected: true, value: "node4" }));
            singleCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node4"));
        });

        it("items should be selectable depending on their selectable state when clicked.", () => {
            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [
                    createTreeNode("node1", "node1"),
                    createTreeNode("node2", "node2", [], false, false),
                    createTreeNode("node3", "node3"),
                ],
            });

            openDropdown(singleCtx, constants.classNames.SimpleTreeSingleSelectBox);
            clickTreeNode(tree.getNode("node1"));
            expect(tree.getSelected()).toEqual(expect.objectContaining({ selected: true, value: "node1" }));
            singleCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node1"));

            openDropdown(singleCtx, constants.classNames.SimpleTreeSingleSelectBox);
            clickTreeNode(tree.getNode("node2"));
            expect(tree.getSelected()).toEqual(expect.objectContaining({ selected: true, value: "node1" }));
            singleCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node1"));
        });
    });

    describe("multiSelection", () => {
        it("should respect initial selection.", () => {
            const tree = createInstance<"multiSelectDropdown">(multiCtx, "multiSelectDropdown", {
                nodes: [
                    createTreeNode("node1", "node1", [], true),
                    createTreeNode("node2", "node2"),
                    createTreeNode("node3", "node3", [], true),
                ],
            });

            expectObjectsInArray(tree.getSelected(), { selected: true, value: "node1" }, { selected: true, value: "node3" });
            multiCtx.dataService
                ?.getAllNodes()
                .forEach((n) => expect(n.selected).toBe(n.value === "node1" || n.value === "node3"));
        });

        it("items should be selected on setSelected api-call.", () => {
            const tree = createInstance<"multiSelectDropdown">(multiCtx, "multiSelectDropdown", {
                nodes: [createTreeNode("node1", "node1"), createTreeNode("node2", "node2"), createTreeNode("node3", "node3")],
            });

            const node2 = tree.getNode("node2");
            expect(node2).not.toBeNull();
            tree.setSelected([node2 as TreeNode]);
            expectObjectsInArray(tree.getSelected(), { selected: true, value: "node2" });
            multiCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node2"));

            const node1 = tree.getNode("node1");
            expect(node1).not.toBeNull();
            tree.setSelected([node1 as TreeNode, node2 as TreeNode]);
            expectObjectsInArray(tree.getSelected(), { selected: true, value: "node1" }, { selected: true, value: "node2" });
            multiCtx.dataService
                ?.getAllNodes()
                .forEach((n) => expect(n.selected).toBe(n.value === "node1" || n.value === "node2"));

            tree.setSelected([]);
            expect(tree.getSelected()).toEqual([]);
            multiCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBeFalsy());
        });

        it("items should be selectable depending on their selectable state via api-call.", () => {
            const tree = createInstance<"multiSelectDropdown">(multiCtx, "multiSelectDropdown", {
                nodes: [
                    createTreeNode("node1", "node1"),
                    createTreeNode("node2", "node2", [], false, false),
                    createTreeNode("node3", "node3"),
                ],
            });

            const node1 = tree.getNode("node1");
            const node2 = tree.getNode("node2");
            expect(node1).not.toBeNull();
            expect(node2).not.toBeNull();
            tree.setSelected([node1 as TreeNode, node2 as TreeNode]);
            expectObjectsInArray(tree.getSelected(), { selected: true, value: "node1" });
            multiCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node1"));
        });

        it("items should be selected or unselected when clicked.", () => {
            const tree = createInstance<"multiSelectDropdown">(multiCtx, "multiSelectDropdown", {
                nodes: [
                    createTreeNode("node1", "node1", [createTreeNode("node4", "node4"), createTreeNode("node5", "node5")]),
                    createTreeNode("node2", "node2"),
                    createTreeNode("node3", "node3"),
                ],
            });

            openDropdown(multiCtx, constants.classNames.SimpleTreeMultiSelectBox);
            clickTreeNode(tree.getNode("node2"));
            expectObjectsInArray(tree.getSelected(), { selected: true, value: "node2" });
            multiCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node2"));

            openDropdown(multiCtx, constants.classNames.SimpleTreeMultiSelectBox);
            clickTreeNode(tree.getNode("node4"));
            expectObjectsInArray(tree.getSelected(), { selected: true, value: "node4" }, { selected: true, value: "node2" });
            multiCtx.dataService
                ?.getAllNodes()
                .forEach((n) => expect(n.selected).toBe(n.value === "node4" || n.value === "node2"));

            openDropdown(multiCtx, constants.classNames.SimpleTreeMultiSelectBox);
            clickTreeNode(tree.getNode("node2"));
            expect(tree.getSelected().map((n) => n.value)).not.toContain("node2");
            multiCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node4"));
        });

        it("items should be selectable depending on their selectable state when clicked.", () => {
            const tree = createInstance<"multiSelectDropdown">(multiCtx, "multiSelectDropdown", {
                nodes: [
                    createTreeNode("node1", "node1"),
                    createTreeNode("node2", "node2", [], false, false),
                    createTreeNode("node3", "node3"),
                ],
            });

            openDropdown(multiCtx, constants.classNames.SimpleTreeMultiSelectBox);
            clickTreeNode(tree.getNode("node1"));
            expectObjectsInArray(tree.getSelected(), { selected: true, value: "node1" });
            multiCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node1"));

            openDropdown(multiCtx, constants.classNames.SimpleTreeMultiSelectBox);
            clickTreeNode(tree.getNode("node2"));
            expectObjectsInArray(tree.getSelected(), { selected: true, value: "node1" });
            multiCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node1"));
        });
    });

    describe("treeOnlySelection", () => {
        it("should respect initial selection (single-mode).", () => {
            const tree = createInstance<"tree">(treeOnlyCtx, "tree", {
                nodes: [
                    createTreeNode("node1", "node1"),
                    createTreeNode("node2", "node2"),
                    createTreeNode("node3", "node3", [], true),
                ],
            });

            expect(tree.getSelected() as TreeNode).toEqual(expect.objectContaining({ selected: true, value: "node3" }));
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node3"));
        });

        it("should respect initial selection (checkbox-mode).", () => {
            const tree = createInstance<"tree">(treeOnlyCtx, "tree", {
                nodes: [
                    createTreeNode("node1", "node1", [], true),
                    createTreeNode("node2", "node2"),
                    createTreeNode("node3", "node3", [], true),
                ],
                treeViewCheckboxes: true,
            });

            expectObjectsInArray(
                tree.getSelected() as TreeNode[],
                { selected: true, value: "node1" },
                { selected: true, value: "node3" }
            );
            treeOnlyCtx.dataService
                ?.getAllNodes()
                .forEach((n) => expect(n.selected).toBe(n.value === "node1" || n.value === "node3"));
        });

        it("item should be selected on setSelected api-call (single-mode).", () => {
            const tree = createInstance<"tree">(treeOnlyCtx, "tree", {
                nodes: [createTreeNode("node1", "node1"), createTreeNode("node2", "node2"), createTreeNode("node3", "node3")],
            });

            const node2 = tree.getNode("node2");
            expect(node2).not.toBeNull();
            tree.setSelected(node2 as TreeNode);
            expect(tree.getSelected() as TreeNode).toEqual(expect.objectContaining({ selected: true, value: "node2" }));
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node2"));

            const node1 = tree.getNode("node1");
            expect(node1).not.toBeNull();
            tree.setSelected(node1 as TreeNode);
            expect(tree.getSelected() as TreeNode).toEqual(expect.objectContaining({ selected: true, value: "node1" }));
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node1"));
        });

        it("items should be selectable depending on their selectable state via api-call (single-mode).", () => {
            const tree = createInstance<"tree">(treeOnlyCtx, "tree", {
                nodes: [
                    createTreeNode("node1", "node1"),
                    createTreeNode("node2", "node2", [], false, false),
                    createTreeNode("node3", "node3"),
                ],
            });

            const node1 = tree.getNode("node1");
            expect(node1).not.toBeNull();
            tree.setSelected(node1 as TreeNode);
            expect(tree.getSelected() as TreeNode).toEqual(expect.objectContaining({ selected: true, value: "node1" }));
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node1"));

            const node2 = tree.getNode("node2");
            expect(node2).not.toBeNull();
            tree.setSelected(node2 as TreeNode);
            expect(tree.getSelected()).toHaveLength(0);
        });

        it("item should be selected on setSelected api-call (checkbox-mode).", () => {
            const tree = createInstance<"tree">(treeOnlyCtx, "tree", {
                nodes: [
                    createTreeNode("node1", "node1", [createTreeNode("node4", "node4"), createTreeNode("node5", "node5")]),
                    createTreeNode("node2", "node2"),
                    createTreeNode("node3", "node3"),
                ],
                treeViewCheckboxes: true,
            });

            const node2 = tree.getNode("node2");
            expect(node2).not.toBeNull();
            const node4 = tree.getNode("node4");
            expect(node4).not.toBeNull();
            tree.setSelected([node2 as TreeNode, node4 as TreeNode]);
            expectObjectsInArray(
                tree.getSelected() as TreeNode[],
                { selected: true, value: "node2" },
                { selected: true, value: "node4" }
            );
            treeOnlyCtx.dataService
                ?.getAllNodes()
                .forEach((n) => expect(n.selected).toBe(n.value === "node2" || n.value === "node4"));

            tree.setSelected([node4 as TreeNode]);
            expect((tree.getSelected() as TreeNode[]).map((n) => n.value)).not.toContain("node2");
            expectObjectsInArray(tree.getSelected() as TreeNode[], { selected: true, value: "node4" });
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node4"));
        });

        it("items should be selectable depending on their selectable state via api-call (checkbox-mode).", () => {
            const tree = createInstance<"tree">(treeOnlyCtx, "tree", {
                nodes: [
                    createTreeNode("node1", "node1"),
                    createTreeNode("node2", "node2", [], false, false),
                    createTreeNode("node3", "node3"),
                ],
                treeViewCheckboxes: true,
            });

            const node1 = tree.getNode("node1");
            const node2 = tree.getNode("node2");
            expect(node1).not.toBeNull();
            expect(node2).not.toBeNull();
            tree.setSelected([node1 as TreeNode, node2 as TreeNode]);

            expectObjectsInArray(tree.getSelected() as TreeNode[], { selected: true, value: "node1" });
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node1"));
        });

        it("item should be selected on setSelected api-call (checkbox-mode, recursive).", () => {
            const tree = createInstance<"tree">(treeOnlyCtx, "tree", {
                nodes: [
                    createTreeNode("node1", "node1", [createTreeNode("node4", "node4"), createTreeNode("node5", "node5")]),
                    createTreeNode("node2", "node2"),
                    createTreeNode("node3", "node3"),
                ],
                treeViewCheckboxes: true,
                checkboxRecursiveSelect: true,
            });

            const node1 = tree.getNode("node1");
            expect(node1).not.toBeNull();
            tree.setSelected([node1 as TreeNode]);
            expectObjectsInArray(
                tree.getSelected() as TreeNode[],
                { selected: true, value: "node1" },
                { selected: true, value: "node4" },
                { selected: true, value: "node5" }
            );
            treeOnlyCtx.dataService
                ?.getAllNodes()
                .forEach((n) => expect(n.selected).toBe(n.value === "node1" || n.value === "node4" || n.value === "node5"));

            const node2 = tree.getNode("node2");
            expect(node2).not.toBeNull();
            tree.setSelected([node2 as TreeNode]);
            expect((tree.getSelected() as TreeNode[]).map((n) => n.value)).not.toContain("node1");
            expectObjectsInArray(tree.getSelected() as TreeNode[], { selected: true, value: "node2" });
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node2"));
        });

        it("items should be selectable regardless of their selectable state via api-call (checkbox-mode, recursive).", () => {
            const tree = createInstance<"tree">(treeOnlyCtx, "tree", {
                nodes: [
                    createTreeNode("node1", "node1", [createTreeNode("node11", "node11", [], false, false)]),
                    createTreeNode("node2", "node2"),
                    createTreeNode("node3", "node3"),
                ],
                treeViewCheckboxes: true,
                checkboxRecursiveSelect: true,
            });

            const node11 = tree.getNode("node11");
            expect(node11).not.toBeNull();
            tree.setSelected([node11 as TreeNode]);
            expectObjectsInArray(
                tree.getSelected() as TreeNode[],
                { selected: true, value: "node1" },
                { selected: true, value: "node11" }
            );

            treeOnlyCtx.dataService
                ?.getAllNodes()
                .forEach((n) => expect(n.selected).toBe(n.value === "node1" || n.value === "node11"));
        });

        it("items should be selected or unselected when clicked (single-mode).", () => {
            const tree = createInstance<"tree">(treeOnlyCtx, "tree", {
                nodes: [createTreeNode("node1", "node1"), createTreeNode("node2", "node2"), createTreeNode("node3", "node3")],
            });

            clickTreeNode(tree.getNode("node1"));
            expect(tree.getSelected() as TreeNode).toEqual(expect.objectContaining({ selected: true, value: "node1" }));
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node1"));

            clickTreeNode(tree.getNode("node2"));
            expect(tree.getSelected() as TreeNode).toEqual(expect.objectContaining({ selected: true, value: "node2" }));
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node2"));

            clickTreeNode(tree.getNode("node2"));
            expect(tree.getSelected()).toBeNull();
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBeFalsy());
        });

        it("items should be selected or unselected when clicked (checkbox-mode).", () => {
            const tree = createInstance<"tree">(treeOnlyCtx, "tree", {
                nodes: [
                    createTreeNode("node1", "node1", [createTreeNode("node4", "node4"), createTreeNode("node5", "node5")]),
                    createTreeNode("node2", "node2"),
                    createTreeNode("node3", "node3"),
                ],
                treeViewCheckboxes: true,
            });

            clickTreeNode(tree.getNode("node4"));
            clickTreeNode(tree.getNode("node2"));
            expectObjectsInArray(
                tree.getSelected() as TreeNode[],
                { selected: true, value: "node4" },
                { selected: true, value: "node2" }
            );
            treeOnlyCtx.dataService
                ?.getAllNodes()
                .forEach((n) => expect(n.selected).toBe(n.value === "node4" || n.value === "node2"));

            clickTreeNode(tree.getNode("node2"));
            expect((tree.getSelected() as TreeNode[]).map((n) => n.value)).not.toContain("node2");
            expectObjectsInArray(tree.getSelected() as TreeNode[], { selected: true, value: "node4" });
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node4"));
        });

        it("items should be selectable depending on their selectable state when clicked (checkbox-mode).", () => {
            const tree = createInstance<"tree">(treeOnlyCtx, "tree", {
                nodes: [
                    createTreeNode("node1", "node1"),
                    createTreeNode("node2", "node2", [], false, false),
                    createTreeNode("node3", "node3"),
                ],
                treeViewCheckboxes: true,
            });

            clickTreeNode(tree.getNode("node1"));
            clickTreeNode(tree.getNode("node2"));
            expectObjectsInArray(tree.getSelected() as TreeNode[], { selected: true, value: "node1" });
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node1"));
        });

        it("items should be selected or unselected when clicked (checkbox-mode, recursive) 1.", () => {
            const tree = createInstance<"tree">(treeOnlyCtx, "tree", {
                nodes: [
                    createTreeNode("node1", "node1", [createTreeNode("node4", "node4"), createTreeNode("node5", "node5")]),
                    createTreeNode("node2", "node2"),
                    createTreeNode("node3", "node3"),
                ],
                treeViewCheckboxes: true,
                checkboxRecursiveSelect: true,
            });

            clickTreeNode(tree.getNode("node1"));
            clickTreeNode(tree.getNode("node2"));
            expectObjectsInArray(
                tree.getSelected() as TreeNode[],
                { selected: true, value: "node1" },
                { selected: true, value: "node4" },
                { selected: true, value: "node5" },
                { selected: true, value: "node2" }
            );
            treeOnlyCtx.dataService
                ?.getAllNodes()
                .forEach((n) =>
                    expect(n.selected).toBe(
                        n.value === "node1" || n.value === "node7" || n.value === "node5" || n.value === "node2"
                    )
                );

            clickTreeNode(tree.getNode("node1"));
            expect((tree.getSelected() as TreeNode[]).map((n) => n.value)).not.toContain("node1");
            expectObjectsInArray(tree.getSelected() as TreeNode[], { selected: true, value: "node2" });
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node2"));
        });

        it("items should be selected or unselected when clicked (checkbox-mode, recursive) 2.", () => {
            const tree = createInstance<"tree">(treeOnlyCtx, "tree", {
                nodes: [
                    createTreeNode("node1", "node1", [createTreeNode("node4", "node4"), createTreeNode("node5", "node5")]),
                    createTreeNode("node2", "node2"),
                    createTreeNode("node3", "node3"),
                ],
                treeViewCheckboxes: true,
                checkboxRecursiveSelect: true,
            });

            clickTreeNode(tree.getNode("node1"));
            expectObjectsInArray(
                tree.getSelected() as TreeNode[],
                { selected: true, value: "node1" },
                { selected: true, value: "node4" },
                { selected: true, value: "node5" }
            );
            treeOnlyCtx.dataService
                ?.getAllNodes()
                .forEach((n) => expect(n.selected).toBe(n.value === "node1" || n.value === "node4" || n.value === "node5"));

            clickTreeNode(tree.getNode("node4"));
            expect((tree.getSelected() as TreeNode[]).map((n) => n.value)).not.toContain("node1");
            expect((tree.getSelected() as TreeNode[]).map((n) => n.value)).not.toContain("node4");
            expectObjectsInArray(tree.getSelected() as TreeNode[], { selected: true, value: "node5" });
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node5"));
        });

        it("items should be selected regardless of their selectable state when clicked (checkbox-mode, recursive).", () => {
            const tree = createInstance<"tree">(treeOnlyCtx, "tree", {
                nodes: [
                    createTreeNode("node1", "node1", [createTreeNode("node11", "node11", [], false, false)]),
                    createTreeNode("node2", "node2"),
                    createTreeNode("node3", "node3"),
                ],
                treeViewCheckboxes: true,
                checkboxRecursiveSelect: true,
            });

            clickTreeNode(tree.getNode("node11"));
            expectObjectsInArray(
                tree.getSelected() as TreeNode[],
                { selected: true, value: "node1" },
                { selected: true, selectable: false, value: "node11" }
            );
            treeOnlyCtx.dataService
                ?.getAllNodes()
                .forEach((n) => expect(n.selected).toBe(n.value === "node1" || n.value === "node11"));
        });
    });
});
