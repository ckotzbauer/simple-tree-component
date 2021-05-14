import { initialize, beforeEachTest, createInstance, createTreeNode, openDropdown, simulate } from "../../test-utils";
import constants from "../../ui/ui-constants";

const singleCtx = initialize<"singleSelectDropdown">();
const treeOnlyCtx = initialize<"tree">();

describe("simpleTree", () => {
    beforeEach(() => {
        beforeEachTest(singleCtx);
        beforeEachTest(treeOnlyCtx);
    });

    describe("base-tree", () => {
        it("should not highight search-results.", () => {
            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [
                    createTreeNode("Node Test 1", "node1"),
                    createTreeNode("Node Test 2", "node2"),
                    createTreeNode("Node Test 3", "node3", [], true),
                ],
            });

            openDropdown(singleCtx, constants.classNames.SimpleTreeSingleSelectBox);
            const input = document
                .querySelector(`.${constants.classNames.SimpleTreeInputContainer}`)
                ?.querySelector("input") as HTMLInputElement;

            input.value = "Test 1";
            simulate("input", input);

            const uid = tree.getNode("node1")?.uid;
            const textNode = document.getElementById(uid as string)?.querySelector(`.${constants.classNames.SimpleTreeNodeText}`);

            expect(textNode?.innerHTML).toEqual("Node Test 1");
        });

        it("should highight correctly.", () => {
            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [
                    createTreeNode("Node Test 1", "node1"),
                    createTreeNode("Node Test 2", "node2"),
                    createTreeNode("Node Test 3", "node3", [], true),
                ],
                highlightSearchResults: true,
            });

            openDropdown(singleCtx, constants.classNames.SimpleTreeSingleSelectBox);
            const input = document
                .querySelector(`.${constants.classNames.SimpleTreeInputContainer}`)
                ?.querySelector("input") as HTMLInputElement;

            input.value = "Test 1";
            simulate("input", input);

            let uid = tree.getNode("node1")?.uid;
            let textNode = document.getElementById(uid as string)?.querySelector(`.${constants.classNames.SimpleTreeNodeText}`);
            expect(textNode?.innerHTML).toEqual("Node <em>Test 1</em>");

            input.value = "Node Test";
            simulate("input", input);

            uid = tree.getNode("node1")?.uid;
            textNode = document.getElementById(uid as string)?.querySelector(`.${constants.classNames.SimpleTreeNodeText}`);
            expect(textNode?.innerHTML).toEqual("<em>Node Test</em> 1");
        });

        it("should collapse correctly.", () => {
            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [
                    createTreeNode("Node Test 1", "node1", [
                        createTreeNode("Child 1", "child1"),
                        createTreeNode("Child 2", "child2", [
                            createTreeNode("Subchild 1", "subchild1"),
                            createTreeNode("Subchild 2", "subchild2"),
                        ]),
                        createTreeNode("Child 3", "child3"),
                    ]),
                    createTreeNode("Node Test 2", "node2"),
                    createTreeNode("Node Test 3", "node3", [], true),
                ],
            });

            openDropdown(singleCtx, constants.classNames.SimpleTreeSingleSelectBox);
            expect(singleCtx.dataService?.getFlattedClickableNodeValues().length).toBe(8);

            const uid = tree.getNode("child2")?.uid;
            const chevron = document
                .getElementById(uid as string)
                ?.querySelector(`.${constants.classNames.SimpleTreeNodeChevronDown}`) as HTMLElement;

            chevron.click();

            expect(singleCtx.dataService?.getFlattedClickableNodeValues().length).toBe(6);
            expect(singleCtx.dataService?.getFlattedClickableNodeValues()).not.toEqual(
                expect.arrayContaining(["subchild1", "subchild2"])
            );


            chevron.click();

            expect(singleCtx.dataService?.getFlattedClickableNodeValues().length).toBe(8);
            expect(singleCtx.dataService?.getFlattedClickableNodeValues()).toEqual(
                expect.arrayContaining(["subchild1", "subchild2"])
            );
        });

        it("should be readonly correctly.", () => {
            const tree = createInstance<"tree">(treeOnlyCtx, "tree", {
                nodes: [
                    createTreeNode("Node Test 1", "node1", [
                        createTreeNode("Child 1", "child1"),
                        createTreeNode("Child 2", "child2"),
                        createTreeNode("Child 3", "child3"),
                    ]),
                    createTreeNode("Node Test 2", "node2"),
                    createTreeNode("Node Test 3", "node3", [], true),
                ],
                searchBar: true
            });

            tree.setReadOnly(true);
            expect(document.querySelector(
                `.${constants.classNames.SimpleTree}`)?.classList.contains(constants.classNames.SimpleTreeReadOnly)).toBeTruthy();
        });
    });
});
