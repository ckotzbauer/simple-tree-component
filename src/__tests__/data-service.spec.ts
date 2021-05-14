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

        it("addNode - should not allow adding duplicate node", () => {
            const treeNode = createTreeNode("Parent 3", "parent3");
            expect(() => dataService.addNode(treeNode)).toThrowError();
            expect(dataService.getAllNodes().length).toEqual(3);
        });

        it("addNode - avoid non-selectable to be selected", () => {
            const treeNode = createTreeNode("Parent 4", "parent4");
            treeNode.selectable = false;
            treeNode.selected = true;
            dataService.addNode(treeNode);
            expect(dataService.getNode("parent4")?.selected).toBeFalsy();
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
            node = dataService.getNode("parent2Child1");
            expect(node?.label).toEqual("Parent 2 Child 1");
        });

        it("filter - should filter nodes case insensitive based on given search term (OnlyMatches)", () => {
            // Filters out Parent 3
            dataService.filter("child", "OnlyMatches");
            expect(dataService.displayedNodes.length).toEqual(2);
            expect(countTreeNodes(dataService.displayedNodes)).toEqual(7);

            // Only find results within tree of Parent 2
            dataService.filter("sub", "OnlyMatches");
            expect(countTreeNodes(dataService.displayedNodes)).toEqual(3);
            expect(dataService.displayedNodes.length).toEqual(1);
            expect(dataService.displayedNodes[0].value).toEqual("parent2");
            expect(dataService.displayedNodes[0].children.length).toEqual(1);
            expect(dataService.displayedNodes[0].children[0].value).toEqual("parent2Child2");
            expect(dataService.displayedNodes[0].children[0].children.length).toEqual(1);
            expect(dataService.displayedNodes[0].children[0].children[0].value).toEqual("parent2Child2Sub1");

            // Check specific node
            dataService.filter("Parent 2 Child 2", "OnlyMatches");
            expect(countTreeNodes(dataService.displayedNodes)).toEqual(3);
            expect(dataService.displayedNodes.length).toEqual(1);
            expect(dataService.displayedNodes[0].value).toEqual("parent2");
            expect(dataService.displayedNodes[0].children.length).toEqual(1);
            expect(dataService.displayedNodes[0].children[0].value).toEqual("parent2Child2");
            expect(dataService.displayedNodes[0].children[0].children.length).toEqual(1);

            // All visible
            dataService.filter("parent", "OnlyMatches");
            expect(countTreeNodes(dataService.displayedNodes)).toEqual(8);

            // Don't filter
            dataService.filter("", "OnlyMatches");
            expect(countTreeNodes(dataService.displayedNodes)).toEqual(9);
        });

        it("filter - should filter nodes case insensitive based on given search term (OnlyMatchesAndChilds)", () => {
            // Filters out Parent 3
            dataService.filter("child", "OnlyMatchesAndChilds");
            expect(dataService.displayedNodes.length).toEqual(2);
            expect(countTreeNodes(dataService.displayedNodes)).toEqual(8);

            // Only find results within tree of Parent 2
            dataService.filter("sub", "OnlyMatchesAndChilds");
            expect(countTreeNodes(dataService.displayedNodes)).toEqual(3);
            expect(dataService.displayedNodes.length).toEqual(1);
            expect(dataService.displayedNodes[0].value).toEqual("parent2");
            expect(dataService.displayedNodes[0].children.length).toEqual(1);
            expect(dataService.displayedNodes[0].children[0].value).toEqual("parent2Child2");
            expect(dataService.displayedNodes[0].children[0].children.length).toEqual(1);
            expect(dataService.displayedNodes[0].children[0].children[0].value).toEqual("parent2Child2Sub1");

            // Check specific node
            dataService.filter("Parent 2 Child 2", "OnlyMatchesAndChilds");
            expect(countTreeNodes(dataService.displayedNodes)).toEqual(4);
            expect(dataService.displayedNodes.length).toEqual(1);
            expect(dataService.displayedNodes[0].value).toEqual("parent2");
            expect(dataService.displayedNodes[0].children.length).toEqual(1);
            expect(dataService.displayedNodes[0].children[0].value).toEqual("parent2Child2");
            expect(dataService.displayedNodes[0].children[0].children.length).toEqual(2);

            // All visible
            dataService.filter("parent", "OnlyMatchesAndChilds");
            expect(countTreeNodes(dataService.displayedNodes)).toEqual(9);

            // Don't filter
            dataService.filter("", "OnlyMatchesAndChilds");
            expect(countTreeNodes(dataService.displayedNodes)).toEqual(9);
        });

        it("moveNode - should not crash for null value", () => {
            expect(() => dataService.moveNode(null as any, "up")).not.toThrowError();
        });

        it("moveNode - should not move anything if node is the only one in list", () => {
            let node = dataService.getAllNodes()[1].children[1].children[0];
            expect(dataService.getAllNodes()[1].children[1].children[0].value).toEqual("parent2Child2Sub1");

            dataService.moveNode(node, "up");

            node = dataService.getAllNodes()[1].children[1].children[0];
            expect(dataService.getAllNodes()[1].children[1].children[0].value).toEqual("parent2Child2Sub1");
        });

        it("moveNode - should switch nodes and also move child nodes", () => {
            let firstNode = dataService.getAllNodes()[0];
            let secondNode = dataService.getAllNodes()[1];
            expect(firstNode.value).toEqual("parent1");
            expect(firstNode.children.length).toEqual(2);
            expect(secondNode.value).toEqual("parent2");
            expect(secondNode.children.length).toEqual(2);
            expect(secondNode.children[1].children.length).toEqual(2);

            dataService.moveNode(firstNode, "down");

            firstNode = dataService.getAllNodes()[0];
            secondNode = dataService.getAllNodes()[1];
            expect(firstNode.value).toEqual("parent2");
            expect(firstNode.children.length).toEqual(2);
            expect(firstNode.children[1].children.length).toEqual(2);
            expect(secondNode.value).toEqual("parent1");
            expect(secondNode.children.length).toEqual(2);

            dataService.moveNode(secondNode, "up");

            firstNode = dataService.getAllNodes()[0];
            secondNode = dataService.getAllNodes()[1];
            expect(firstNode.value).toEqual("parent1");
            expect(firstNode.children.length).toEqual(2);
            expect(secondNode.value).toEqual("parent2");
            expect(secondNode.children.length).toEqual(2);
            expect(secondNode.children[1].children.length).toEqual(2);
        });

        it("moveNode - should not move nodes on end of list", () => {
            let firstNode = dataService.getAllNodes()[0].children[0];
            let secondNode = dataService.getAllNodes()[0].children[1];
            expect(firstNode.value).toEqual("parent1Child1");
            expect(secondNode.value).toEqual("parent1Child2");

            dataService.moveNode(firstNode, "up");

            firstNode = dataService.getAllNodes()[0].children[0];
            secondNode = dataService.getAllNodes()[0].children[1];
            expect(firstNode.value).toEqual("parent1Child1");
            expect(secondNode.value).toEqual("parent1Child2");

            dataService.moveNode(secondNode, "down");

            firstNode = dataService.getAllNodes()[0].children[0];
            secondNode = dataService.getAllNodes()[0].children[1];
            expect(firstNode.value).toEqual("parent1Child1");
            expect(secondNode.value).toEqual("parent1Child2");
        });

        it("moveNode - should not move anything if node is unknown", () => {
            dataService.moveNode("parent4", "up");

            const nodeList = dataService.getAllNodes();
            expect(nodeList[0].value).toEqual("parent1");
            expect(nodeList[1].value).toEqual("parent2");
            expect(nodeList[2].value).toEqual("parent3");
        });

        it("getFlattedClickableNodeValues - should return correct nodes", () => {
            const flatted = dataService.getFlattedClickableNodeValues();
            expect(flatted.length).toEqual(7);
            expect(flatted.indexOf("parent2Child1") === -1).toBeTruthy();
            expect(flatted.indexOf("parent3") === -1).toBeTruthy();
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
            createTreeNode("Parent 2 Child 1", "parent2Child1", [], false, false),
            createTreeNode("Parent 2 Child 2", "parent2Child2", [
                createTreeNode("Parent 2 Child 2 Sub 1", "parent2Child2Sub1"),
                createTreeNode("Different named", "parent2Child2Sub2")
            ]),
        ]),
        createTreeNode("Parent 3", "parent3", [], false, false),
    ];

    dataService = new DataService(treeNodes);
}
