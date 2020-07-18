import { DataService } from "../data/data-service";
import { createTreeNode, countTreeNodes } from "../test-utils";
import { TreeNode } from "../types/tree-node";

let dataService: DataService;

describe("simpleTree", () => {
    beforeEach(() => init());

    describe("data service", () => {
        it("getNode - should return a copy of the node", () => {
            const node = dataService.getNode("parent1");
            expect(node).not.toBeNull();
            (node as TreeNode).label = "Parent 1 Update";

            const nodeAgain = dataService.getNode("parent1");
            expect((node as TreeNode).label).not.toEqual((nodeAgain as TreeNode).label);
        });

        it("addNode - should add node to top layer if no parent is given", () => {
            const treeNode = createTreeNode("Parent 4", "parent4");
            dataService.addNode(treeNode);

            expect(dataService.getNode("parent4")).not.toBeNull();
            expect(dataService.getAllNodes().length).toEqual(4);
            expect(dataService.getAllNodes()[3]).toEqual(treeNode);
        });

        it("addNode - should add node to specified parent by reference", () => {
            const treeNode = createTreeNode("Parent 3 Child 1", "parent3Child1");
            const parentNode = dataService.getNode("parent3");
            dataService.addNode(treeNode, parentNode);

            expect(dataService.getNode("parent3Child1")).not.toBeNull();
            expect(dataService.getNode("parent3")?.children.length).toEqual(1);
            expect(dataService.getNode("parent3")?.children[0]).toEqual(treeNode);
        });

        it("addNode - should add node to specified parent by string value", () => {
            const treeNode = createTreeNode("Parent 3 Child 1", "parent3Child1");
            dataService.addNode(treeNode, "parent3");

            expect(dataService.getNode("parent3Child1")).not.toBeNull();
            expect(dataService.getNode("parent3")?.children.length).toEqual(1);
            expect(dataService.getNode("parent3")?.children[0]).toEqual(treeNode);
        });

        it("deleteNode - should remove specified root node from tree", () => {
            dataService.deleteNode("parent3");
            expect(dataService.getNode("parent3")).toBeNull();
        });

        it("deleteNode - should remove specified node from tree", () => {
            dataService.deleteNode("parent2Child1");

            expect(dataService.getNode("parent2Child1")).toBeNull();
            expect(dataService.getNode("parent2")?.children.length).toEqual(1);
        });

        it("deleteNode - should remove specified parent node and its children from tree", () => {
            dataService.deleteNode("parent2Child2");

            expect(dataService.getNode("parent2Child2")).toBeNull();
            expect(dataService.getNode("parent2Child2Sub1")).toBeNull();
        });

        it("deleteNode - should not remove anything if no node was found", () => {
            const nodeCountBefore = countTreeNodes(dataService.getAllNodes());
            dataService.deleteNode("parent4");
            expect(nodeCountBefore).toEqual(countTreeNodes(dataService.getAllNodes()));
        });

        it("updateNodeLabel - should update the label of the specified node", () => {
            let node = dataService.getNode("parent2Child1");
            expect(node?.label).toEqual("Parent 2 Child 1");

            expect(node).not.toBeNull();
            dataService.updateNodeLabel("parent2Child1", "Parent 2 Child 1 Updated");
            node = dataService.getNode("parent2Child1");
            expect(node?.label).toEqual("Parent 2 Child 1 Updated");

            dataService.updateNodeLabel("parent2Child1", "Parent 2 Child 1");
            node = dataService.getNode("parent2Child1")
            expect(node?.label).toEqual("Parent 2 Child 1");
        });

        it("filter - should filter nodes case insensitive based on given search term", () => {
            // Filters out Parent 3
            dataService.filter("child");
            expect(dataService.displayedNodes.length).toEqual(2);
            expect(countTreeNodes(dataService.displayedNodes)).toEqual(7);

            // Only find results within tree of Parent 2
            dataService.filter("sub");
            expect(countTreeNodes(dataService.displayedNodes)).toEqual(3);
            expect(dataService.displayedNodes.length).toEqual(1);
            expect(dataService.displayedNodes[0].value).toEqual("parent2");
            expect(dataService.displayedNodes[0].children.length).toEqual(1);
            expect(dataService.displayedNodes[0].children[0].value).toEqual("parent2Child2");
            expect(dataService.displayedNodes[0].children[0].children.length).toEqual(1);
            expect(dataService.displayedNodes[0].children[0].children[0].value).toEqual("parent2Child2Sub1");

            // All visible
            dataService.filter("parent");
            expect(countTreeNodes(dataService.displayedNodes)).toEqual(8);

            // Don't filter
            dataService.filter("");
            expect(countTreeNodes(dataService.displayedNodes)).toEqual(8);
        });
    });
});

// prettier-ignore
function init(): void {
    const treeNodes: TreeNode[] = [
        createTreeNode("Parent 1", "parent1", [
            createTreeNode("Parent 1 Child 1", "parent1Child1"),
            createTreeNode("Parent 1 Child 2", "parent1Child2"),
        ]),
        createTreeNode("Parent 2", "parent2", [
            createTreeNode("Parent 2 Child 1", "parent2Child1"),
            createTreeNode("Parent 2 Child 2", "parent2Child2", [
                createTreeNode("Parent 2 Child 2 Sub 1", "parent2Child2Sub1"),
            ]),
        ]),
        createTreeNode("Parent 3", "parent3"),
    ];

    dataService = new DataService(treeNodes);
}
