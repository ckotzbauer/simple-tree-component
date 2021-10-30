import { TreeNode } from "typings";
import {
    initialize,
    beforeEachTest,
    createInstance,
    createTreeNode,
    openDropdown,
    simulate,
    isDropdownVisible,
} from "../../test-utils";
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

        it("should collapse and expand specific node on api-call.", () => {
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

            tree.collapseNode(tree.getNode("node1") as TreeNode);
            expect(singleCtx.dataService?.getFlattedClickableNodeValues().length).toBe(3);
            expect(tree.getNode("node1")?.collapsed).toBeTruthy();
            expect(tree.getNode("child2")?.collapsed).toBeTruthy();
            expect(tree.getNode("node1")?.hidden).toBeFalsy();
            expect(tree.getNode("child2")?.hidden).toBeTruthy();

            // same call again - nothing should change
            tree.collapseNode(tree.getNode("node1") as TreeNode);
            expect(singleCtx.dataService?.getFlattedClickableNodeValues().length).toBe(3);
            expect(tree.getNode("node1")?.collapsed).toBeTruthy();
            expect(tree.getNode("child2")?.collapsed).toBeTruthy();
            expect(tree.getNode("node1")?.hidden).toBeFalsy();
            expect(tree.getNode("child2")?.hidden).toBeTruthy();

            tree.expandNode(tree.getNode("node1") as TreeNode);
            expect(singleCtx.dataService?.getFlattedClickableNodeValues().length).toBe(8);
            expect(tree.getNode("node1")?.collapsed).toBeFalsy();
            expect(tree.getNode("child2")?.collapsed).toBeFalsy();
            expect(tree.getNode("node1")?.hidden).toBeFalsy();
            expect(tree.getNode("child2")?.hidden).toBeFalsy();
        });

        it("should toggle collapse specific node on api-call.", () => {
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

            tree.toggleCollapseNode(tree.getNode("node1") as TreeNode);
            expect(singleCtx.dataService?.getFlattedClickableNodeValues().length).toBe(3);
            expect(tree.getNode("node1")?.collapsed).toBeTruthy();
            expect(tree.getNode("child2")?.collapsed).toBeTruthy();
            expect(tree.getNode("node1")?.hidden).toBeFalsy();
            expect(tree.getNode("child2")?.hidden).toBeTruthy();

            tree.toggleCollapseNode(tree.getNode("node1") as TreeNode);
            expect(singleCtx.dataService?.getFlattedClickableNodeValues().length).toBe(8);
            expect(tree.getNode("node1")?.collapsed).toBeFalsy();
            expect(tree.getNode("child2")?.collapsed).toBeFalsy();
            expect(tree.getNode("node1")?.hidden).toBeFalsy();
            expect(tree.getNode("child2")?.hidden).toBeFalsy();

            tree.toggleCollapseNode(tree.getNode("node1") as TreeNode);
            expect(singleCtx.dataService?.getFlattedClickableNodeValues().length).toBe(3);
            expect(tree.getNode("node1")?.collapsed).toBeTruthy();
            expect(tree.getNode("child2")?.collapsed).toBeTruthy();
            expect(tree.getNode("node1")?.hidden).toBeFalsy();
            expect(tree.getNode("child2")?.hidden).toBeTruthy();
        });

        it("should collapse and expand all nodes on api-call.", () => {
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

            tree.collapseAllNodes();
            expect(singleCtx.dataService?.getFlattedClickableNodeValues().length).toBe(3);
            expect(tree.getNode("node1")?.collapsed).toBeTruthy();
            expect(tree.getNode("child2")?.collapsed).toBeTruthy();
            expect(tree.getNode("node1")?.hidden).toBeFalsy();
            expect(tree.getNode("child2")?.hidden).toBeTruthy();

            // same call again - nothing should change
            tree.collapseAllNodes();
            expect(singleCtx.dataService?.getFlattedClickableNodeValues().length).toBe(3);
            expect(tree.getNode("node1")?.collapsed).toBeTruthy();
            expect(tree.getNode("child2")?.collapsed).toBeTruthy();
            expect(tree.getNode("node1")?.hidden).toBeFalsy();
            expect(tree.getNode("child2")?.hidden).toBeTruthy();

            tree.expandAllNodes();
            expect(singleCtx.dataService?.getFlattedClickableNodeValues().length).toBe(8);
            expect(tree.getNode("node1")?.collapsed).toBeFalsy();
            expect(tree.getNode("child2")?.collapsed).toBeFalsy();
            expect(tree.getNode("node1")?.hidden).toBeFalsy();
            expect(tree.getNode("child2")?.hidden).toBeFalsy();
        });

        it("should respect custom-node-css-classes.", () => {
            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [
                    createTreeNode("Node Test 1", "node1"),
                    createTreeNode("Node Test 2", "node2", [], false, true, "my-class"),
                    createTreeNode("Node Test 3", "node3"),
                ],
            });

            openDropdown(singleCtx, constants.classNames.SimpleTreeSingleSelectBox);
            const uid = tree.getNode("node2")?.uid;
            const lineWrapper = document
                .getElementById(uid as string)
                ?.querySelector(`.${constants.classNames.SimpleTreeNodeWrapper}`) as HTMLElement;

            expect(lineWrapper.classList.contains("my-class")).toBeTruthy();
        });

        it("should close dropdown on escape.", () => {
            createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [
                    createTreeNode("Node Test 1", "node1"),
                    createTreeNode("Node Test 2", "node2"),
                    createTreeNode("Node Test 3", "node3"),
                ],
            });

            openDropdown(singleCtx, constants.classNames.SimpleTreeSingleSelectBox);
            expect(isDropdownVisible()).toBeTruthy();

            simulate("keyup", window, { code: "Escape" }, KeyboardEvent);
            expect(isDropdownVisible()).toBeFalsy();
        });

        it("should change hover-state with arrow-keys.", () => {
            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [
                    createTreeNode("Node Test 1", "node1"),
                    createTreeNode("Node Test 2", "node2"),
                    createTreeNode("Node Test 3", "node3", [], true),
                ],
            });

            openDropdown(singleCtx, constants.classNames.SimpleTreeSingleSelectBox);

            let selectedElement = document?.querySelector(`.${constants.classNames.SimpleTreeNodeSelected}`);
            expect(selectedElement).not.toBeNull();

            simulate("mouseover", selectedElement as Element);
            selectedElement = document?.querySelector(`.${constants.classNames.SimpleTreeNodeSelected}`);
            expect(selectedElement?.classList.contains(constants.classNames.SimpleTreeNodeHovered)).toBeTruthy();

            // mouse-down (expect first is hovered now)
            simulate("keyup", window, { code: "ArrowDown" }, KeyboardEvent);
            selectedElement = document?.querySelector(`.${constants.classNames.SimpleTreeNodeSelected}`);
            expect(selectedElement?.classList.contains(constants.classNames.SimpleTreeNodeHovered)).toBeFalsy();
            expect(
                document
                    .getElementById(tree.getNode("node1")?.uid as string)
                    ?.querySelector(`.${constants.classNames.SimpleTreeNodeHovered}`)
            ).not.toBeNull();

            // mouse-down (expect second is hovered now)
            simulate("keyup", window, { code: "ArrowDown" }, KeyboardEvent);
            expect(
                document
                    .getElementById(tree.getNode("node1")?.uid as string)
                    ?.querySelector(`.${constants.classNames.SimpleTreeNodeHovered}`)
            ).toBeNull();
            expect(
                document
                    .getElementById(tree.getNode("node2")?.uid as string)
                    ?.querySelector(`.${constants.classNames.SimpleTreeNodeHovered}`)
            ).not.toBeNull();

            // mouse-up (expect first is hovered again)
            simulate("keyup", window, { code: "ArrowUp" }, KeyboardEvent);
            expect(
                document
                    .getElementById(tree.getNode("node2")?.uid as string)
                    ?.querySelector(`.${constants.classNames.SimpleTreeNodeHovered}`)
            ).toBeNull();
            expect(
                document
                    .getElementById(tree.getNode("node1")?.uid as string)
                    ?.querySelector(`.${constants.classNames.SimpleTreeNodeHovered}`)
            ).not.toBeNull();

            // mouse-up (expect last is hovered again)
            simulate("keyup", window, { code: "ArrowUp" }, KeyboardEvent);
            expect(
                document
                    .getElementById(tree.getNode("node1")?.uid as string)
                    ?.querySelector(`.${constants.classNames.SimpleTreeNodeHovered}`)
            ).toBeNull();
            expect(
                document
                    .getElementById(tree.getNode("node3")?.uid as string)
                    ?.querySelector(`.${constants.classNames.SimpleTreeNodeHovered}`)
            ).not.toBeNull();
        });

        it("should select on enter.", () => {
            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [
                    createTreeNode("Node Test 1", "node1"),
                    createTreeNode("Node Test 2", "node2"),
                    createTreeNode("Node Test 3", "node3"),
                ],
            });

            openDropdown(singleCtx, constants.classNames.SimpleTreeSingleSelectBox);
            simulate("keyup", window, { code: "ArrowDown" }, KeyboardEvent);
            simulate("keyup", window, { code: "Enter" }, KeyboardEvent);
            expect(tree.getSelected()?.value).toBe("node1");
            expect(isDropdownVisible()).toBeFalsy();

            openDropdown(singleCtx, constants.classNames.SimpleTreeSingleSelectBox);
            simulate("keyup", window, { code: "ArrowDown" }, KeyboardEvent);
            simulate("keyup", window, { code: "NumpadEnter" }, KeyboardEvent);
            expect(tree.getSelected()?.value).toBe("node2");
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

        it("should be readonly correctly.", () => {
            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
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

        it("should handle emphasize icon correctly.", () => {
            const tree = createInstance<"singleSelectDropdown">(singleCtx, "singleSelectDropdown", {
                nodes: [
                    createTreeNode("Node Test 1", "node1", [
                        createTreeNode("Child 1", "child1"),
                        createTreeNode("Child 2", "child2"),
                        createTreeNode("Child 3", "child3"),
                    ]),
                    createTreeNode("Node Test 2", "node2"),
                    createTreeNode("Node Test 3", "node3"),
                ],
                searchBar: true,
            });

            let emphasize = singleCtx.elem?.querySelector(`.${constants.classNames.SimpleTreeEmphasize}`);
            expect(emphasize).toBeNull();

            tree.setSelected(tree.getNode("child2"));
            emphasize = singleCtx.elem?.querySelector(`.${constants.classNames.SimpleTreeEmphasize}`);
            expect(emphasize).toBeNull();

            tree.showEmphasizeIcon("my-emphasized-item");
            emphasize = singleCtx.elem?.querySelector(`.${constants.classNames.SimpleTreeEmphasize}`);
            expect(emphasize).not.toBeNull();
            expect(emphasize?.classList.contains("my-emphasized-item")).toBeTruthy();

            tree.setSelected(null);
            emphasize = singleCtx.elem?.querySelector(`.${constants.classNames.SimpleTreeEmphasize}`);
            expect(emphasize).toBeNull();

            tree.setSelected(tree.getNode("child3"));
            emphasize = singleCtx.elem?.querySelector(`.${constants.classNames.SimpleTreeEmphasize}`);
            expect(emphasize).not.toBeNull();

            tree.hideEmphasizeIcon();
            emphasize = singleCtx.elem?.querySelector(`.${constants.classNames.SimpleTreeEmphasize}`);
            expect(emphasize).toBeNull();
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

        it("should be readonly correctly.", () => {
            const tree = createInstance<"multiSelectDropdown">(multiCtx, "multiSelectDropdown", {
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

        it("should throw error on showEmphasize call.", () => {
            const tree = createInstance<"multiSelectDropdown">(multiCtx, "multiSelectDropdown", {
                nodes: [
                    createTreeNode("Node Test 1", "node1", [
                        createTreeNode("Child 1", "child1"),
                        createTreeNode("Child 2", "child2"),
                        createTreeNode("Child 3", "child3"),
                    ]),
                    createTreeNode("Node Test 2", "node2"),
                    createTreeNode("Node Test 3", "node3"),
                ],
                searchBar: true,
            });

            expect(() => tree.showEmphasizeIcon("my-emphasized-item")).toThrow();
        });

        it("should throw error on hideEmphasize call.", () => {
            const tree = createInstance<"multiSelectDropdown">(multiCtx, "multiSelectDropdown", {
                nodes: [
                    createTreeNode("Node Test 1", "node1", [
                        createTreeNode("Child 1", "child1"),
                        createTreeNode("Child 2", "child2"),
                        createTreeNode("Child 3", "child3"),
                    ]),
                    createTreeNode("Node Test 2", "node2"),
                    createTreeNode("Node Test 3", "node3"),
                ],
                searchBar: true,
            });

            expect(() => tree.hideEmphasizeIcon()).toThrow();
        });

        it("should throw error on moveNode call.", () => {
            const tree = createInstance<"multiSelectDropdown">(multiCtx, "multiSelectDropdown", {
                nodes: [
                    createTreeNode("Node Test 1", "node1", [
                        createTreeNode("Child 1", "child1"),
                        createTreeNode("Child 2", "child2"),
                        createTreeNode("Child 3", "child3"),
                    ]),
                    createTreeNode("Node Test 2", "node2"),
                    createTreeNode("Node Test 3", "node3"),
                ],
                searchBar: true,
            });

            expect(() => tree.moveNode("node2", "up")).toThrow();
        });
    });

    describe("tree-view", () => {
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

        it("setNodes - should work correctly.", () => {
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
            });

            expect(treeOnlyCtx.dataService?.getFlattedClickableNodeValues().length).toBe(6);

            tree.setNodes([createTreeNode("Replace Node 1", "r1"), createTreeNode("Replace Node 2", "r2")]);
            expect(treeOnlyCtx.dataService?.getFlattedClickableNodeValues().length).toBe(2);
            expect(tree.getNode("r1")?.label).toBe("Replace Node 1");

            expect(document.querySelectorAll(`.${constants.classNames.SimpleTreeNodeText}`).length).toBe(2);
        });
    });
});
