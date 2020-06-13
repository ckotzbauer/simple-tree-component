import { createTreeNode } from "../test-utils";
import { ValidationResult, validateTreeNodes } from "../validation/validation";
import { TreeNode } from "../types/tree-node";

describe("simpleTree", () => {
    describe("validation", () => {
        it("should not allow null or undefined node array", () => {
            const nullResult: ValidationResult = validateTreeNodes(null as any);
            expect(nullResult.success).toEqual(false);
            expect(nullResult.errors.length).toEqual(1);

            const undefinedResult: ValidationResult = validateTreeNodes(undefined as any);
            expect(undefinedResult.success).toEqual(false);
            expect(undefinedResult.errors.length).toEqual(1);
        });

        it("should allow correct structure", () => {
            const treeNodes: TreeNode[] = [
                createTreeNode("Test Node 1", "testNode1"),
                createTreeNode("Test Node 2", "testNode2"),
                createTreeNode("Test Node 3", "testNode3"),
            ];

            const validationResult: ValidationResult = validateTreeNodes(treeNodes);
            expect(validationResult.success).toEqual(true);
            expect(validationResult.errors.length).toEqual(0);
        });

        it("should not allow null or undefined node values", () => {
            const treeNodes: TreeNode[] = [
                createTreeNode("Test Node 1", "testNode1"),
                createTreeNode("Test Node 2", null),
                createTreeNode("Test Node 3", undefined),
            ];

            const validationResult: ValidationResult = validateTreeNodes(treeNodes);
            expect(validationResult.success).toEqual(false);
            expect(validationResult.errors.length).toEqual(2);
        });

        it("should not allow duplicate values on same layer", () => {
            const treeNodes: TreeNode[] = [
                createTreeNode("Test Node 1", "duplicateValue"),
                createTreeNode("Test Node 2", "testNode2"),
                createTreeNode("Test Node 3", "duplicateValue"),
            ];

            const validationResult: ValidationResult = validateTreeNodes(treeNodes);
            expect(validationResult.success).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
        });

        it("should not allow duplicate values on different layers", () => {
            const treeNodes: TreeNode[] = [
                createTreeNode("Parent 1", "parent1", [
                    createTreeNode("Parent 1 Child 1", "parent1Child1"),
                    createTreeNode("Parent 1 Child 2", "duplicateValue"),
                ]),
                createTreeNode("Parent 2", "parent2", [
                    createTreeNode("Parent 2 Child 1", "parent2Child1"),
                    createTreeNode("Parent 2 Child 2", "parent2Child2", [
                        createTreeNode("Parent 2 Child 2 Sub 1", "duplicateValue"),
                    ]),
                ]),
            ];

            const validationResult: ValidationResult = validateTreeNodes(treeNodes);
            expect(validationResult.success).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
        });

        // prettier-ignore
        it("should find and return multiple errors", () => {
            const treeNodes: TreeNode[] = [
                createTreeNode("Parent 1", "parent1", [
                    createTreeNode("Parent 1 Child 1", "parent1Child1"),
                    createTreeNode("Parent 1 Child 2", "duplicateValue1"),
                ]),
                createTreeNode("Parent 2", "parent2", [
                    createTreeNode("Parent 2 Child 1", "duplicateValue2"),
                    createTreeNode("Parent 2 Child 2", null, [
                        createTreeNode("Parent 2 Child 2 Sub 1", "duplicateValue1")
                    ]),
                ]),
                createTreeNode("Parent 3", undefined, [
                    createTreeNode("Parent 2 Child 1", "duplicateValue2")
                ]),
            ];

            const validationResult: ValidationResult = validateTreeNodes(treeNodes);
            expect(validationResult.success).toEqual(false);
            expect(validationResult.errors.length).toEqual(4);
        });
    });
});
