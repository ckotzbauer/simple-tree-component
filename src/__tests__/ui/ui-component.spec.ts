import { initialize, beforeEachTest, createInstance, createTreeNode, openDropdown, simulate } from "../../test-utils";
import constants from "../../ui/ui-constants";

const singleCtx = initialize<"singleSelectDropdown">();
const multiCtx = initialize<"multiSelectDropdown">();
const treeOnlyCtx = initialize<"tree">();

describe("simpleTree", () => {
    beforeEach(() => {
        beforeEachTest(singleCtx);
        beforeEachTest(multiCtx);
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
                searchBar: true,
            });

            tree.setReadOnly(true);
            expect(
                document
                    .querySelector(`.${constants.classNames.SimpleTree}`)
                    ?.classList.contains(constants.classNames.SimpleTreeReadOnly)
            ).toBeTruthy();
        });
    });

    describe("single-select", () => {
        it("clear-button should not be visible, if disabled.", () => {
            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [
                    createTreeNode("Node Test 1", "node1"),
                    createTreeNode("Node Test 2", "node2"),
                    createTreeNode("Node Test 3", "node3", [], true),
                ],
            });

            const clearButton = singleCtx.elem?.querySelector(`.${constants.classNames.SimpleTreeCross}`);
            expect(clearButton).toBeNull();
            expect(tree.getSelected()).not.toBeNull();
        });

        it("clear-button should be visible, if enabled.", () => {
            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [
                    createTreeNode("Node Test 1", "node1"),
                    createTreeNode("Node Test 2", "node2"),
                    createTreeNode("Node Test 3", "node3", [], true),
                ],
                clearButton: true,
            });

            const clearButton = singleCtx.elem?.querySelector(`.${constants.classNames.SimpleTreeCross}`);
            expect(clearButton).not.toBeNull();
            expect(tree.getSelected()).not.toBeNull();
        });

        it("clear-button should clear selected-value.", () => {
            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [
                    createTreeNode("Node Test 1", "node1"),
                    createTreeNode("Node Test 2", "node2"),
                    createTreeNode("Node Test 3", "node3", [], true),
                ],
                clearButton: true,
            });

            let clearButton: HTMLElement = singleCtx.elem?.querySelector(
                `.${constants.classNames.SimpleTreeCross}`
            ) as HTMLElement;
            expect(clearButton).not.toBeNull();
            expect(tree.getSelected()).not.toBeNull();

            clearButton.click();

            clearButton = singleCtx.elem?.querySelector(`.${constants.classNames.SimpleTreeCross}`) as HTMLElement;
            expect(clearButton).toBeNull();
            expect(tree.getSelected()).toBeNull();
        });
    });

    describe("multi-select", () => {
        it("clear-button should not be visible, if disabled.", () => {
            const tree = createInstance<"multiSelectDropdown">(multiCtx, "multiSelectDropdown", {
                nodes: [
                    createTreeNode("Node Test 1", "node1"),
                    createTreeNode("Node Test 2", "node2"),
                    createTreeNode("Node Test 3", "node3", [], true),
                ],
            });

            const clearButton = multiCtx.elem?.querySelector(`.${constants.classNames.SimpleTreeCross}`);
            expect(clearButton).toBeNull();
            expect(tree.getSelected().length).toBe(1);
        });

        it("clear-button should be visible, if enabled.", () => {
            const tree = createInstance<"multiSelectDropdown">(multiCtx, "multiSelectDropdown", {
                nodes: [
                    createTreeNode("Node Test 1", "node1"),
                    createTreeNode("Node Test 2", "node2"),
                    createTreeNode("Node Test 3", "node3", [], true),
                ],
                clearButton: true,
            });

            const clearButton = multiCtx.elem?.querySelector(`.${constants.classNames.SimpleTreeCross}`);
            expect(clearButton).not.toBeNull();
            expect(tree.getSelected().length).toBe(1);
        });

        it("clear-button should clear selected-value.", () => {
            const tree = createInstance<"multiSelectDropdown">(multiCtx, "multiSelectDropdown", {
                nodes: [
                    createTreeNode("Node Test 1", "node1"),
                    createTreeNode("Node Test 2", "node2"),
                    createTreeNode("Node Test 3", "node3", [], true),
                ],
                clearButton: true,
            });

            let clearButton: HTMLElement = multiCtx.elem?.querySelector(
                `.${constants.classNames.SimpleTreeCross}`
            ) as HTMLElement;
            expect(clearButton).not.toBeNull();
            expect(tree.getSelected().length).toBe(1);

            clearButton.click();

            clearButton = multiCtx.elem?.querySelector(`.${constants.classNames.SimpleTreeCross}`) as HTMLElement;
            expect(clearButton).toBeNull();
            expect(tree.getSelected().length).toBe(0);
        });
    });
});
