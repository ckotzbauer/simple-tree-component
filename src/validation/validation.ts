import { InitTreeNode } from "../types/tree-node";

export function validateTreeNodeArray(treeNodes: InitTreeNode[]): ValidationResult {
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
        errors,
    };
}

function getTreeNodeValues(treeNodes: InitTreeNode[], values: string[], errors: ValidationError[]): void {
    treeNodes.forEach((node: InitTreeNode) => {
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

export function isTreeNodeValid(treeNode: InitTreeNode): boolean {
    return !!treeNode && !!treeNode.value;
}

export function isDuplicateNodeValue(treeNodes: InitTreeNode[], value: string): boolean {
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

function createValidationError(node: InitTreeNode | null, message: string): ValidationError {
    return {
        node,
        message,
    };
}

export interface ValidationResult {
    success: boolean;
    errors: ValidationError[];
}

export interface ValidationError {
    node: InitTreeNode | null;
    message: string;
}
