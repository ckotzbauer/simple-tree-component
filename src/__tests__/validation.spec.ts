import { createTreeNode } from "../test-utils";
import { ValidationResult, validateTreeNodeArray, isDuplicateNodeValue, isTreeNodeValid } from "../validation/validation";
import { InitTreeNode } from "../types/tree-node";

describe("simpleTree", () => {
    describe("validation", () => {
        it("validateTreeNodeArray - should not allow null or undefined node array", () => {
            const nullResult: ValidationResult = validateTreeNodeArray(null as any);
            expect(nullResult.success).toEqual(false);
            expect(nullResult.errors.length).toEqual(1);

            const undefinedResult: ValidationResult = validateTreeNodeArray(undefined as any);
            expect(undefinedResult.success).toEqual(false);
            expect(undefinedResult.errors.length).toEqual(1);
        });

        it("validateTreeNodeArray - should allow correct structure", () => {
            const treeNodes: InitTreeNode[] = [
                createTreeNode("Test Node 1", "testNode1"),
                createTreeNode("Test Node 2", "testNode2"),
                createTreeNode("Test Node 3", "testNode3"),
            ];

            const validationResult: ValidationResult = validateTreeNodeArray(treeNodes);
            expect(validationResult.success).toEqual(true);
            expect(validationResult.errors.length).toEqual(0);
        });

        it("validateTreeNodeArray - should not allow null or undefined node values", () => {
            const treeNodes: InitTreeNode[] = [
                createTreeNode("Test Node 1", "testNode1"),
                createTreeNode("Test Node 2", null),
                createTreeNode("Test Node 3", undefined),
            ];

            const validationResult: ValidationResult = validateTreeNodeArray(treeNodes);
            expect(validationResult.success).toEqual(false);
            expect(validationResult.errors.length).toEqual(2);
        });

        it("validateTreeNodeArray - should not allow duplicate values on same layer", () => {
            const treeNodes: InitTreeNode[] = [
                createTreeNode("Test Node 1", "duplicateValue"),
                createTreeNode("Test Node 2", "testNode2"),
                createTreeNode("Test Node 3", "duplicateValue"),
            ];

            const validationResult: ValidationResult = validateTreeNodeArray(treeNodes);
            expect(validationResult.success).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
        });

        it("validateTreeNodeArray - should not allow duplicate values on different layers", () => {
            const treeNodes: InitTreeNode[] = [
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

            const validationResult: ValidationResult = validateTreeNodeArray(treeNodes);
            expect(validationResult.success).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
        });

        // prettier-ignore
        it("validateTreeNodeArray - should find and return multiple errors", () => {
            const treeNodes: InitTreeNode[] = [
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

            const validationResult: ValidationResult = validateTreeNodeArray(treeNodes);
            expect(validationResult.success).toEqual(false);
            expect(validationResult.errors.length).toEqual(4);
        });

        it("isTreeNodeValid - should forbid empty values", () => {
            const treeNode = createTreeNode("TestNode", "testValue");
            expect(isTreeNodeValid(treeNode)).toEqual(true);
            treeNode.value = "";
            expect(isTreeNodeValid(treeNode)).toEqual(false);
            treeNode.value = null as any;
            expect(isTreeNodeValid(treeNode)).toEqual(false);
            treeNode.value = undefined as any;
            expect(isTreeNodeValid(treeNode)).toEqual(false);
        });

        it("isDuplicateNodeValue- should find duplicate value in tree", () => {
            const treeNodes: InitTreeNode[] = [
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
            ];

            expect(validateTreeNodeArray(treeNodes).success).toEqual(true);
            expect(isDuplicateNodeValue(treeNodes, "parent1Child2")).toEqual(true);
            expect(isDuplicateNodeValue(treeNodes, "parent1Child2Sub1")).toEqual(false);
            expect(isDuplicateNodeValue(treeNodes, "parent2")).toEqual(true);
            expect(isDuplicateNodeValue(treeNodes, "parent2Child2Sub1")).toEqual(true);
            expect(isDuplicateNodeValue(treeNodes, "parent2Child2Sub2")).toEqual(false);
            expect(isDuplicateNodeValue(treeNodes, "parent3")).toEqual(false);
        });
    });
});
