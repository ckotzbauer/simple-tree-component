import { TreeNode } from "../types/tree-node";

export function validateTreeNodeArray(treeNodes: TreeNode[]): ValidationResult {
    if (treeNodes === null || treeNodes === undefined) {
        return {
            success: false,
            errors: [createValidationError(null, "array is not defined")],
        };
    }

    const errors: ValidationError[] = [];
    getTreeNodeValues(treeNodes, [], errors);

    return {
        success: errors.length === 0,
        errors: errors,
    };
}

function getTreeNodeValues(treeNodes: TreeNode[], values: string[], errors: ValidationError[]): void {
    treeNodes.forEach((node: TreeNode) => {
        if (!isTreeNodeValid(node)) {
            errors.push(createValidationError(node, "the given node list contains an invalid value"));
        }

        if (values.includes(node.value)) {
            errors.push(createValidationError(node, "node value is not unique"));
        } else {
            values.push(node.value);
        }

        if (node.children && node.children.length > 0) {
            getTreeNodeValues(node.children, values, errors);
        }
    });
}

export function isTreeNodeValid(treeNode: TreeNode) {
    return !!treeNode && !!treeNode.value;
}

export function isDuplicateNodeValue(treeNodes: TreeNode[], value: string): boolean {
    let duplicate = false;

    for (const node of treeNodes) {
        if (node.value === value) {
            duplicate = true;
            break;
        }

        if (node.children && node.children.length > 0) {
            const childrenContainDuplicate: boolean = isDuplicateNodeValue(node.children, value);
            if (childrenContainDuplicate) {
                duplicate = true;
                break;
            }
        }
    }

    return duplicate;
}

function createValidationError(node: TreeNode | null, message: string): ValidationError {
    return {
        node: node,
        message: message,
    };
}

export interface ValidationResult {
    success: boolean;
    errors: ValidationError[];
}

export interface ValidationError {
    node: TreeNode | null;
    message: string;
}
