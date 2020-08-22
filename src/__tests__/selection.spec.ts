import { initialize, beforeEachTest, createInstance, createTreeNode, openDropdown, clickTreeNode } from "../test-utils";
import { TreeNode } from "../types/tree-node";
import constants from "../ui/ui-constants";

const singleCtx = initialize<"singleSelectDropdown">();
const multiCtx = initialize<"multiSelectDropdown">();
const treeOnlyCtx = initialize<"view">();

describe("simpleTree", () => {
    beforeEach(() => {
        beforeEachTest(singleCtx);
        beforeEachTest(multiCtx);
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

            expect(tree.getSelected()?.value).toEqual("node3");
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
                nodes: [createTreeNode("node1", "node1"), createTreeNode("node2", "node2"), createTreeNode("node3", "node3")],
            });

            const node2 = tree.getNode("node2");
            expect(node2).not.toBeNull();
            tree.setSelected(node2 as TreeNode);
            expect(tree.getSelected()?.value).toEqual("node2");
            singleCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node2"));

            const node1 = tree.getNode("node1");
            expect(node1).not.toBeNull();
            tree.setSelected(node1 as TreeNode);
            expect(tree.getSelected()?.value).toEqual("node1");
            singleCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node1"));
        });

        it("item should be selected when clicked.", () => {
            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [createTreeNode("node1", "node1"), createTreeNode("node2", "node2"), createTreeNode("node3", "node3")],
            });

            openDropdown(singleCtx, constants.classNames.SimpleTreeSingleSelectBox);
            clickTreeNode(tree.getNode("node2"));
            expect(tree.getSelected()?.value).toEqual("node2");
            singleCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node2"));

            openDropdown(singleCtx, constants.classNames.SimpleTreeSingleSelectBox);
            clickTreeNode(tree.getNode("node1"));
            expect(tree.getSelected()?.value).toEqual("node1");
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

            expect(tree.getSelected().map((n) => n.value)).toContain("node1");
            expect(tree.getSelected().map((n) => n.value)).toContain("node3");
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
            expect(tree.getSelected().map((n) => n.value)).toContain("node2");
            multiCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node2"));

            const node1 = tree.getNode("node1");
            expect(node1).not.toBeNull();
            tree.setSelected([node1 as TreeNode, node2 as TreeNode]);
            expect(tree.getSelected().map((n) => n.value)).toContain("node1");
            expect(tree.getSelected().map((n) => n.value)).toContain("node2");
            multiCtx.dataService
                ?.getAllNodes()
                .forEach((n) => expect(n.selected).toBe(n.value === "node1" || n.value === "node2"));

            tree.setSelected([]);
            expect(tree.getSelected()).toEqual([]);
            multiCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBeFalsy());
        });

        it("items should be selected or unselected when clicked.", () => {
            const tree = createInstance<"multiSelectDropdown">(multiCtx, "multiSelectDropdown", {
                nodes: [createTreeNode("node1", "node1"), createTreeNode("node2", "node2"), createTreeNode("node3", "node3")],
            });

            openDropdown(multiCtx, constants.classNames.SimpleTreeMultiSelectBox);
            clickTreeNode(tree.getNode("node2"));
            expect(tree.getSelected().map((n) => n.value)).toContain("node2");
            multiCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node2"));

            openDropdown(multiCtx, constants.classNames.SimpleTreeMultiSelectBox);
            clickTreeNode(tree.getNode("node1"));
            expect(tree.getSelected().map((n) => n.value)).toContain("node1");
            expect(tree.getSelected().map((n) => n.value)).toContain("node2");
            multiCtx.dataService
                ?.getAllNodes()
                .forEach((n) => expect(n.selected).toBe(n.value === "node1" || n.value === "node2"));

            openDropdown(multiCtx, constants.classNames.SimpleTreeMultiSelectBox);
            clickTreeNode(tree.getNode("node2"));
            expect(tree.getSelected().map((n) => n.value)).not.toContain("node2");
            multiCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node1"));
        });
    });

    describe("treeOnlySelection", () => {
        it("should respect initial selection (single-mode).", () => {
            const tree = createInstance<"view">(treeOnlyCtx, "view", {
                nodes: [
                    createTreeNode("node1", "node1"),
                    createTreeNode("node2", "node2"),
                    createTreeNode("node3", "node3", [], true),
                ],
            });

            expect((tree.getSelected() as TreeNode).value).toContain("node3");
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node3"));
        });

        it("should respect initial selection (checkbox-mode).", () => {
            const tree = createInstance<"view">(treeOnlyCtx, "view", {
                nodes: [
                    createTreeNode("node1", "node1", [], true),
                    createTreeNode("node2", "node2"),
                    createTreeNode("node3", "node3", [], true),
                ],
                treeViewCheckboxes: true,
            });

            expect((tree.getSelected() as TreeNode[]).map((n) => n.value)).toContain("node1");
            expect((tree.getSelected() as TreeNode[]).map((n) => n.value)).toContain("node3");
            treeOnlyCtx.dataService
                ?.getAllNodes()
                .forEach((n) => expect(n.selected).toBe(n.value === "node1" || n.value === "node3"));
        });

        it("item should be selected on setSelected api-call (single-mode).", () => {
            const tree = createInstance<"view">(treeOnlyCtx, "view", {
                nodes: [createTreeNode("node1", "node1"), createTreeNode("node2", "node2"), createTreeNode("node3", "node3")],
            });

            const node2 = tree.getNode("node2");
            expect(node2).not.toBeNull();
            tree.setSelected(node2 as TreeNode);
            expect((tree.getSelected() as TreeNode).value).toEqual("node2");
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node2"));

            const node1 = tree.getNode("node1");
            expect(node1).not.toBeNull();
            tree.setSelected(node1 as TreeNode);
            expect((tree.getSelected() as TreeNode).value).toEqual("node1");
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node1"));
        });

        it("item should be selected on setSelected api-call (checkbox-mode).", () => {
            const tree = createInstance<"view">(treeOnlyCtx, "view", {
                nodes: [createTreeNode("node1", "node1"), createTreeNode("node2", "node2"), createTreeNode("node3", "node3")],
                treeViewCheckboxes: true,
            });

            const node2 = tree.getNode("node2");
            expect(node2).not.toBeNull();
            const node3 = tree.getNode("node3");
            expect(node3).not.toBeNull();
            tree.setSelected([node2 as TreeNode, node3 as TreeNode]);
            expect((tree.getSelected() as TreeNode[]).map((n) => n.value)).toContain("node2");
            expect((tree.getSelected() as TreeNode[]).map((n) => n.value)).toContain("node3");
            treeOnlyCtx.dataService
                ?.getAllNodes()
                .forEach((n) => expect(n.selected).toBe(n.value === "node2" || n.value === "node3"));

            tree.setSelected([node3 as TreeNode]);
            expect((tree.getSelected() as TreeNode[]).map((n) => n.value)).not.toContain("node2");
            expect((tree.getSelected() as TreeNode[]).map((n) => n.value)).toContain("node3");
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node3"));
        });

        /*it("items should be selected or unselected when clicked (single-mode).", () => {
            const tree = createInstance<"view">(treeOnlyCtx, "view", {
                nodes: [createTreeNode("node1", "node1"), createTreeNode("node2", "node2"), createTreeNode("node3", "node3")],
            });

            clickTreeNode(tree.getNode("node2"));
            expect((tree.getSelected() as TreeNode).value).toEqual("node2");
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node2"));

            clickTreeNode(tree.getNode("node1"));
            expect((tree.getSelected() as TreeNode).value).toEqual("node1");
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBe(n.value === "node1"));

            clickTreeNode(tree.getNode("node1"));
            expect(tree.getSelected()).toBeNull();
            treeOnlyCtx.dataService?.getAllNodes().forEach((n) => expect(n.selected).toBeFalsy());
        });*/
    });
});
