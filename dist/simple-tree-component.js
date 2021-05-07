/* simple-tree-component v1.0.0-beta.9, @license MIT */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['simple-tree-component'] = factory());
}(this, (function () { 'use strict';

    const defaults$1 = {
        nodes: [],
        searchBar: true,
        searchBarFocus: false,
        highlightSearchResults: false,
        watermark: "Please select a value...",
        noNodesMessage: "No items found.",
        css: {
            dropdownHolder: "",
        },
        templateSelectedText: (node) => node.label,
        checkboxes: {
            active: false,
            recursive: false,
        },
        clearButton: false,
        scrollContainer: null,
    };

    var constants = {
        classNames: {
            SimpleTree: "simple-tree",
            SimpleTreeReadOnly: "simple-tree-readonly",
            SimpleTreeViewOnly: "simple-tree-view-only",
            SimpleTreeDropdownHolder: "simple-tree-dropdown-holder",
            SimpleTreeSingleSelectBox: "simple-tree-single-selectbox",
            SimpleTreeMultiSelectBox: "simple-tree-multi-selectbox",
            SimpleTreeInputContainer: "simple-tree-input-container",
            SimpleTreePillboxHolder: "simple-tree-pillbox-holder",
            SimpleTreePillboxCross: "simple-tree-pillbox-cross",
            SimpleTreeCross: "simple-tree-cross",
            SimpleTreeClearable: "simple-tree-clearable",
            SimpleTreeSelectedLabel: "simple-tree-selected-label",
            SimpleTreeSelectedLabelWatermark: "simple-tree-selected-label-watermark",
            SimpleTreeChevronUp: "simple-tree-chevron-up",
            SimpleTreeChevronDown: "simple-tree-chevron-down",
            SimpleTreeEmphasize: "simple-tree-emphasize-icon",
            SimpleTreeEmphasized: "simple-tree-emphasized",
            SimpleTreeNodeContainer: "simple-tree-node-container",
            SimpleTreeNodeContainerRoot: "simple-tree-node-container-root",
            SimpleTreeNodeText: "simple-tree-node-text",
            SimpleTreeNodeSelected: "simple-tree-node-selected",
            SimpleTreeNodeSelectable: "simple-tree-node-selectable",
            SimpleTreeNodeHovered: "simple-tree-node-hovered",
            SimpleTreeNodeArrow: "simple-tree-node-arrow",
            SimpleTreeNodeWrapper: "simple-tree-node-wrapper",
            SimpleTreeParentNode: "simple-tree-parent-node",
            SimpleTreeNodeChevronContainer: "simple-tree-node-chevron-container",
            SimpleTreeNodeChevronClickable: "simple-tree-node-chevron-clickable",
            SimpleTreeNodeChevronDown: "simple-tree-node-chevron-down",
            SimpleTreeNodeChevronRight: "simple-tree-node-chevron-right",
            SimpleTreeNodeCheckbox: "simple-tree-node-checkbox",
            SimpleTreeNodeCheckboxDisabled: "simple-tree-node-checkbox-disabled",
            SimpleTreeNodeCheckboxSelected: "simple-tree-node-checkbox-selected",
        },
        events: {
            SelectionChanged: "selectionChanged",
            NodeSelected: "nodeSelected",
            EscapePressed: "escapePressed",
            HoverChanged: "hoverChanged",
            FilterChanged: "filterChanged",
        },
        nodeIdPrefix: "simple-tree-node",
    };

    class KeyEventHandler {
        constructor(eventManager, dataService) {
            this.eventManager = eventManager;
            this.dataService = dataService;
            this.hoveredNodeValue = null;
            this.boundKeyUp = this.handleKeyUp.bind(this);
        }
        initialize() {
            window.addEventListener("keyup", this.boundKeyUp);
        }
        destroy() {
            window.removeEventListener("keyup", this.boundKeyUp);
        }
        setHoveredNodeValue(value) {
            this.hoveredNodeValue = value;
        }
        handleKeyUp(e) {
            if (e.code === "Escape") {
                this.eventManager.publish(constants.events.EscapePressed);
                return;
            }
            const flattedValues = this.dataService.getFlattedClickableNodeValues();
            const hoveredIndex = this.hoveredNodeValue === null ? -1 : flattedValues.indexOf(this.hoveredNodeValue);
            let targetIndex = hoveredIndex;
            if (e.code === "ArrowUp") {
                if (hoveredIndex > 0) {
                    targetIndex = hoveredIndex - 1;
                }
                else {
                    targetIndex = flattedValues.length - 1;
                }
            }
            else if (e.code === "ArrowDown") {
                if (hoveredIndex !== -1 && hoveredIndex < flattedValues.length - 1) {
                    targetIndex = hoveredIndex + 1;
                }
                else {
                    targetIndex = 0;
                }
            }
            else if ((e.code === "Enter" || e.code === "NumpadEnter") && flattedValues[targetIndex]) {
                const mutatedNode = this.dataService.toggleNodeSelected(flattedValues[targetIndex]);
                this.eventManager.publish(constants.events.NodeSelected, mutatedNode);
            }
            if (targetIndex !== hoveredIndex && flattedValues[targetIndex]) {
                this.hoveredNodeValue = flattedValues[targetIndex];
                const node = this.dataService.getNode(this.hoveredNodeValue);
                this.eventManager.publish(constants.events.HoverChanged, node);
                const nodeElement = document.getElementById(node.uid);
                const container = document.getElementsByClassName(constants.classNames.SimpleTreeNodeContainer)[0];
                if (container.scrollHeight > container.clientHeight) {
                    container.scrollTo({ top: nodeElement.offsetTop - container.offsetHeight });
                }
            }
            e.preventDefault();
            e.stopPropagation();
        }
    }

    function createInternalContainer(element, type, ...cssClasses) {
        const container = document.createElement(type);
        container.classList.add(...cssClasses.filter((s) => s));
        element.appendChild(container);
        return container;
    }
    function createContainer(element, ...cssClasses) {
        return createInternalContainer(element, "div", ...cssClasses);
    }
    function createUnorderedList(element, ...cssClasses) {
        return createInternalContainer(element, "ul", ...cssClasses);
    }
    function createListItem(element, ...cssClasses) {
        return createInternalContainer(element, "li", ...cssClasses);
    }
    function createDropdownContainer() {
        const className = constants.classNames.SimpleTreeDropdownHolder;
        let container = document.body.querySelector(`.${className}`);
        if (!container) {
            container = createContainer(document.body, className);
            container.style.display = "none";
        }
        return container;
    }
    function escape(s) {
        return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    class BaseTree {
        constructor(element, config, dataService, eventManager, readOnly) {
            this.element = element;
            this.config = config;
            this.dataService = dataService;
            this.eventManager = eventManager;
            this.readOnly = readOnly;
            this.highlightedNode = null;
            this.hoveredNode = null;
            this.searchTextInput = null;
            this.keyEventHandler = new KeyEventHandler(this.eventManager, this.dataService);
            this.eventManager.subscribe(constants.events.HoverChanged, (n) => this.hoverNode(n));
        }
        destroy() {
            this.deactivateKeyListener();
        }
        activateKeyListener() {
            this.keyEventHandler.initialize();
        }
        deactivateKeyListener() {
            this.keyEventHandler.destroy();
        }
        setNodeUiState(node, current, cssClass) {
            var _a, _b, _c;
            (_a = this.element.querySelector(`.${constants.classNames.SimpleTreeNodeWrapper}.${cssClass}`)) === null || _a === void 0 ? void 0 : _a.classList.remove(cssClass);
            if (node !== null && current !== node.value) {
                (_c = (_b = document
                    .getElementById(node.uid)) === null || _b === void 0 ? void 0 : _b.querySelector(`.${constants.classNames.SimpleTreeNodeWrapper}`)) === null || _c === void 0 ? void 0 : _c.classList.add(cssClass);
                return node.value;
            }
            return null;
        }
        highlightNode(node) {
            this.highlightedNode = this.setNodeUiState(node, this.highlightedNode, constants.classNames.SimpleTreeNodeSelected);
        }
        hoverNode(node) {
            this.hoveredNode = this.setNodeUiState(node, this.hoveredNode, constants.classNames.SimpleTreeNodeHovered);
            this.keyEventHandler.setHoveredNodeValue(this.hoveredNode);
        }
        renderContent() {
            this.element.innerHTML = "";
            this.createBasicHtml();
            this.dataService.filter("");
            this.renderTree();
        }
        createBasicHtml() {
            if (this.config.searchBar) {
                const wrapperDiv = document.createElement("div");
                wrapperDiv.classList.add(constants.classNames.SimpleTreeInputContainer);
                this.searchTextInput = document.createElement("input");
                this.searchTextInput.type = "text";
                if (this.config.searchBarFocus) {
                    setTimeout(() => { var _a; return (_a = this.searchTextInput) === null || _a === void 0 ? void 0 : _a.focus(); }, 0);
                }
                this.searchTextInput.addEventListener("input", (e) => {
                    this.dataService.filter(e.target.value);
                    this.renderTree();
                    this.eventManager.publish(constants.events.FilterChanged);
                });
                wrapperDiv.appendChild(this.searchTextInput);
                this.element.appendChild(wrapperDiv);
            }
            const nodeContainer = document.createElement("div");
            nodeContainer.classList.add(constants.classNames.SimpleTreeNodeContainer);
            this.element.appendChild(nodeContainer);
        }
        getNodeContainer() {
            const container = this.element.querySelector(`div.${constants.classNames.SimpleTreeNodeContainer}`);
            if (!container) {
                console.error("node container not found!");
            }
            return container;
        }
        renderTree() {
            const nodeContainer = this.getNodeContainer();
            if (nodeContainer) {
                nodeContainer.innerHTML = "";
                nodeContainer.appendChild(this.renderUnorderedList(this.dataService.displayedNodes));
            }
        }
        renderUnorderedList(nodes) {
            var _a, _b;
            const ulElement = document.createElement("ul");
            ulElement.classList.add(constants.classNames.SimpleTreeNodeContainerRoot);
            let highlightRegex = null;
            if (((_a = this.searchTextInput) === null || _a === void 0 ? void 0 : _a.value) && this.config.highlightSearchResults) {
                highlightRegex = new RegExp(`(${(_b = this.searchTextInput) === null || _b === void 0 ? void 0 : _b.value})`, "ig");
            }
            nodes.forEach((node) => {
                var _a;
                const hasChildren = ((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) > 0;
                const liElement = document.createElement("li");
                liElement.id = node.uid;
                const lineWrapperDiv = document.createElement("div");
                lineWrapperDiv.classList.add(constants.classNames.SimpleTreeNodeWrapper);
                lineWrapperDiv.addEventListener("mouseover", () => this.hoverNode(node));
                lineWrapperDiv.addEventListener("mouseout", () => this.hoverNode(null));
                if (hasChildren) {
                    lineWrapperDiv.classList.add(constants.classNames.SimpleTreeParentNode);
                }
                const textDivElement = document.createElement("div");
                textDivElement.classList.add(constants.classNames.SimpleTreeNodeText);
                this.addChevronDiv(lineWrapperDiv, node, hasChildren);
                if (this.config.checkboxes.active) {
                    const checkboxElement = document.createElement("div");
                    checkboxElement.classList.add(constants.classNames.SimpleTreeNodeCheckbox);
                    if (this.readOnly || (!this.config.checkboxes.recursive && !node.selectable)) {
                        checkboxElement.classList.add(constants.classNames.SimpleTreeNodeCheckboxDisabled);
                    }
                    else {
                        checkboxElement.addEventListener("click", () => this.toggleCheckboxSelected(node));
                    }
                    if (node.selected) {
                        checkboxElement.classList.add(constants.classNames.SimpleTreeNodeCheckboxSelected);
                    }
                    lineWrapperDiv.appendChild(checkboxElement);
                }
                else if (node.selected) {
                    lineWrapperDiv.classList.add(constants.classNames.SimpleTreeNodeSelected);
                }
                textDivElement.innerHTML = this.formatNodeLabel(node.label, highlightRegex);
                if (!this.config.checkboxes.active && node.selectable && !this.readOnly) {
                    lineWrapperDiv.addEventListener("click", () => this.toggleNodeSelected(node));
                    lineWrapperDiv.classList.add(constants.classNames.SimpleTreeNodeSelectable);
                }
                lineWrapperDiv.appendChild(textDivElement);
                liElement.appendChild(lineWrapperDiv);
                ulElement.appendChild(liElement);
                if (!node.collapsed && hasChildren) {
                    liElement.appendChild(this.renderUnorderedList(node.children));
                }
            });
            if (nodes.length === 0) {
                const liElement = document.createElement("li");
                const lineWrapperDiv = document.createElement("div");
                lineWrapperDiv.classList.add(constants.classNames.SimpleTreeNodeWrapper);
                const textDivElement = document.createElement("div");
                textDivElement.classList.add(constants.classNames.SimpleTreeNodeText);
                textDivElement.textContent = this.config.noNodesMessage;
                lineWrapperDiv.appendChild(textDivElement);
                liElement.appendChild(lineWrapperDiv);
                ulElement.appendChild(liElement);
            }
            return ulElement;
        }
        toggleNodeSelected(node) {
            const mutatedNode = this.dataService.toggleNodeSelected(node.value);
            this.eventManager.publish(constants.events.NodeSelected, mutatedNode);
        }
        toggleCheckboxSelected(node) {
            const mutatedNode = this.dataService.toggleCheckboxSelected(node.value);
            this.eventManager.publish(constants.events.NodeSelected, mutatedNode);
        }
        addChevronDiv(divElement, node, hasChildren) {
            const chevronDivContainer = document.createElement("div");
            chevronDivContainer.classList.add(constants.classNames.SimpleTreeNodeChevronContainer);
            if (hasChildren) {
                const chevronDiv = document.createElement("div");
                if (node.collapsed) {
                    chevronDiv.classList.add(constants.classNames.SimpleTreeNodeChevronRight);
                }
                else {
                    chevronDiv.classList.add(constants.classNames.SimpleTreeNodeChevronDown);
                }
                chevronDivContainer.appendChild(chevronDiv);
                chevronDivContainer.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const flag = !node.collapsed;
                    node.collapsed = flag;
                    this.collapseNode(node, flag);
                    this.renderTree();
                });
                chevronDivContainer.classList.add(constants.classNames.SimpleTreeNodeChevronClickable);
            }
            divElement.appendChild(chevronDivContainer);
        }
        collapseNode(node, flag) {
            node.children.forEach((c) => {
                c.hidden = flag;
                c.children.forEach((c) => this.collapseNode(c, flag));
            });
        }
        setReadOnly(readOnly) {
            this.readOnly = readOnly;
            if (this.searchTextInput) {
                this.searchTextInput.disabled = readOnly;
            }
        }
        formatNodeLabel(text, highlightRegex) {
            if (highlightRegex) {
                return escape(text).replace(highlightRegex, (match) => `<em>${match}</em>`);
            }
            return escape(text);
        }
    }

    class EventManager {
        constructor() {
            this.eventLookup = {};
        }
        publish(event, data) {
            let subscribers;
            let i;
            if (!event) {
                throw new Error("Event was invalid.");
            }
            subscribers = this.eventLookup[event];
            if (subscribers) {
                subscribers = subscribers.slice();
                i = subscribers.length;
                while (i--) {
                    try {
                        subscribers[i](data, event);
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            }
        }
        subscribe(event, callback) {
            const handler = callback;
            let subscribers = [];
            if (!event) {
                throw new Error("Event channel/type was invalid.");
            }
            subscribers = this.eventLookup[event] || (this.eventLookup[event] = []);
            subscribers.push(handler);
            return {
                dispose() {
                    const idx = subscribers.indexOf(handler);
                    if (idx !== -1) {
                        subscribers.splice(idx, 1);
                    }
                },
            };
        }
        subscribeOnce(event, callback) {
            const sub = this.subscribe(event, (a, b) => {
                sub.dispose();
                return callback(a, b);
            });
            return sub;
        }
    }

    const defaults = {
        label: "",
        value: "",
        selected: false,
        selectable: true,
        children: [],
        collapsed: false,
        hidden: false,
        uid: "",
    };

    function isTreeNodeValid(treeNode) {
        return !!treeNode && !!treeNode.value;
    }
    function isDuplicateNodeValue(treeNodes, value) {
        let duplicate = false;
        for (const node of treeNodes) {
            if (node.value === value) {
                duplicate = true;
                break;
            }
            if (node.children && node.children.length > 0) {
                const childrenContainDuplicate = isDuplicateNodeValue(node.children, value);
                if (childrenContainDuplicate) {
                    duplicate = true;
                    break;
                }
            }
        }
        return duplicate;
    }

    class DataService {
        constructor(displayedNodes = [], checkboxesActive = false, checkboxesRecursive = false) {
            this.displayedNodes = displayedNodes;
            this.checkboxesActive = checkboxesActive;
            this.checkboxesRecursive = checkboxesRecursive;
            this.allNodes = [];
            this.treeInstanceId = Math.floor(1000 + Math.random() * 9000);
            this.displayedNodes = this.normalizeNodes(displayedNodes);
            this.allNodes = this.displayedNodes;
        }
        normalizeNodes(nodes) {
            return nodes.map((node) => {
                const n = this.copyNode(node);
                n.uid = this.generateUid(node.value);
                n.children = this.normalizeNodes(n.children || []);
                return n;
            });
        }
        copyNode(node) {
            return Object.assign(Object.assign({}, defaults), node);
        }
        clear() {
            this.allNodes = [];
            this.displayedNodes = [];
        }
        getAllNodes() {
            return this.allNodes;
        }
        getNode(value) {
            const nodeToReturn = this.getNodeInternal(this.allNodes, value);
            if (nodeToReturn) {
                return this.copyNode(nodeToReturn);
            }
            return null;
        }
        getNodeInternal(nodes, value) {
            for (const node of nodes) {
                if (node.value === value) {
                    return node;
                }
                if (node.children && node.children.length > 0) {
                    const result = this.getNodeInternal(node.children, value);
                    if (result) {
                        return result;
                    }
                }
            }
            return null;
        }
        addNode(node, parent = null) {
            if (!isTreeNodeValid(node) || isDuplicateNodeValue(this.allNodes, node.value)) {
                throw new Error("node value is invalid or node with value already exists!");
            }
            if (parent && this.isTreeNode(parent)) {
                parent.children.push(node);
            }
            else if (typeof parent === "string") {
                const parentNode = this.getNodeInternal(this.allNodes, parent);
                if (this.isTreeNode(parentNode)) {
                    parentNode.children.push(node);
                }
            }
            else {
                this.allNodes.push(node);
            }
        }
        moveNode(node, direction) {
            var _a;
            if (!node) {
                return;
            }
            const nodeValue = this.isTreeNode(node) ? node.value : node;
            const nodeList = this.allNodes.some((n) => n.value === nodeValue)
                ? this.allNodes
                : ((_a = this.getParentForNode(this.allNodes, nodeValue)) === null || _a === void 0 ? void 0 : _a.children) || this.allNodes;
            const nodeIndex = nodeList.findIndex((n) => n.value === nodeValue);
            if (direction === "up" && nodeIndex > 0) {
                const tempNode = nodeList[nodeIndex];
                nodeList[nodeIndex] = nodeList[nodeIndex - 1];
                nodeList[nodeIndex - 1] = tempNode;
            }
            else if (direction === "down" && nodeIndex < nodeList.length - 1) {
                const tempNode = nodeList[nodeIndex];
                nodeList[nodeIndex] = nodeList[nodeIndex + 1];
                nodeList[nodeIndex + 1] = tempNode;
            }
        }
        isTreeNode(value) {
            return value.children !== undefined;
        }
        deleteNode(value) {
            const node = this.allNodes.find((node) => node.value === value);
            if (node) {
                this.allNodes.splice(this.allNodes.indexOf(node), 1);
            }
            else {
                const parent = this.getParentForNode(this.allNodes, value);
                if (parent) {
                    const childNode = parent.children.find((node) => node.value === value);
                    parent.children.splice(parent.children.indexOf(childNode), 1);
                }
            }
        }
        updateNodeLabel(value, newLabel) {
            const node = this.getNodeInternal(this.allNodes, value);
            if (node) {
                node.label = newLabel;
            }
        }
        getParentForNode(nodes, value) {
            for (const node of nodes) {
                if (node.children && node.children.some((n) => n.value === value)) {
                    return node;
                }
                let parent = null;
                if (node.children) {
                    parent = this.getParentForNode(node.children, value);
                }
                if (parent) {
                    return parent;
                }
            }
            return null;
        }
        getFlattedClickableNodeValues() {
            return this.flatten(this.displayedNodes)
                .filter((node) => node.selectable && !node.hidden)
                .map((n) => n.value);
        }
        flatten(nodes) {
            return nodes.reduce((acc, e) => {
                if (e.children.length > 0) {
                    acc.push(e);
                    return acc.concat(this.flatten(e.children));
                }
                else {
                    return acc.concat(e);
                }
            }, []);
        }
        filter(searchTerm) {
            if (searchTerm) {
                this.displayedNodes = this.filterNodes(this.allNodes, searchTerm.toLowerCase());
            }
            else {
                this.displayedNodes = this.normalizeNodes(this.allNodes);
            }
        }
        filterNodes(nodes, searchTerm) {
            const filtered = [];
            nodes.forEach((n) => {
                const childNodes = this.filterNodes(n.children, searchTerm);
                if (n.label.toLowerCase().includes(searchTerm) || childNodes.length > 0) {
                    const node = this.copyNode(n);
                    node.children = childNodes;
                    filtered.push(node);
                }
            });
            return filtered;
        }
        setSelected(...nodes) {
            const values = nodes.map((n) => n.value);
            this.setSelectedNodes(this.allNodes, values);
            if (this.checkboxesActive && this.checkboxesRecursive) {
                this.cleanRecursiveSelection(this.allNodes);
            }
        }
        updateCheckboxState(node) {
            var _a;
            if (!this.checkboxesActive) {
                return;
            }
            const checkboxDiv = (_a = document
                .getElementById(node.uid)) === null || _a === void 0 ? void 0 : _a.querySelector(`.${constants.classNames.SimpleTreeNodeCheckbox}`);
            if (!checkboxDiv) {
                console.error("checkbox div not found for node!", node);
                return;
            }
            if (checkboxDiv) {
                if (node.selected && !checkboxDiv.classList.contains(constants.classNames.SimpleTreeNodeCheckboxSelected)) {
                    checkboxDiv.classList.add(constants.classNames.SimpleTreeNodeCheckboxSelected);
                }
                else if (!node.selected && checkboxDiv.classList.contains(constants.classNames.SimpleTreeNodeCheckboxSelected)) {
                    checkboxDiv.classList.remove(constants.classNames.SimpleTreeNodeCheckboxSelected);
                }
            }
        }
        setSelectedNodes(nodes, values) {
            nodes.forEach((n) => {
                if (this.checkboxesRecursive || n.selectable) {
                    n.selected = values.includes(n.value);
                    this.updateCheckboxState(n);
                }
                if (n.children && n.children.length > 0) {
                    this.setSelectedNodes(n.children, values);
                }
            });
        }
        cleanRecursiveSelection(nodes) {
            let allNodesSelected = true;
            nodes.forEach((n) => {
                if (n.children && n.children.length > 0) {
                    if (n.selected) {
                        this.checkRecursiveChilds(n.children);
                    }
                    else {
                        n.selected = this.cleanRecursiveSelection(n.children);
                        this.updateCheckboxState(n);
                    }
                }
                allNodesSelected = allNodesSelected && n.selected;
            });
            return allNodesSelected;
        }
        checkRecursiveChilds(nodes) {
            nodes.forEach((n) => {
                n.selected = true;
                this.updateCheckboxState(n);
                if (n.children && n.children.length > 0) {
                    this.checkRecursiveChilds(n.children);
                }
            });
        }
        getSelected() {
            return this.getSelectedInternal(this.allNodes).map(this.copyNode);
        }
        getSelectedInternal(nodes, filtered = []) {
            nodes.forEach((n) => {
                if (n.selected) {
                    filtered.push(n);
                }
                if (n.children && n.children.length > 0) {
                    filtered = this.getSelectedInternal(n.children, filtered);
                }
            });
            return filtered;
        }
        toggleNodeSelected(nodeValue) {
            const node = this.getNodeInternal(this.allNodes, nodeValue);
            if (!node) {
                console.error(`node '${nodeValue}' to toggle not found!`);
                return null;
            }
            node.selected = !node.selected;
            return this.copyNode(node);
        }
        toggleCheckboxSelected(nodeValue) {
            let node = this.getNodeInternal(this.allNodes, nodeValue);
            if (!node) {
                console.error(`checkbox node '${nodeValue}' to toggle not found!`);
                return null;
            }
            const selected = !node.selected;
            node = this.toggleCheckboxNode(node, selected);
            if (this.checkboxesRecursive) {
                this.toggleCheckboxParent(node);
            }
            return this.copyNode(node);
        }
        toggleCheckboxNode(node, selected, toggleChildren = true) {
            var _a, _b;
            const nodeCheckboxDiv = (_a = document
                .getElementById(node.uid)) === null || _a === void 0 ? void 0 : _a.querySelector(`.${constants.classNames.SimpleTreeNodeCheckbox}`);
            if (!nodeCheckboxDiv) {
                console.error("checkbox div not found!");
                return node;
            }
            node.selected = selected;
            if (node.selected && !nodeCheckboxDiv.classList.contains(constants.classNames.SimpleTreeNodeCheckboxSelected)) {
                nodeCheckboxDiv.classList.add(constants.classNames.SimpleTreeNodeCheckboxSelected);
            }
            else if (!node.selected && nodeCheckboxDiv.classList.contains(constants.classNames.SimpleTreeNodeCheckboxSelected)) {
                nodeCheckboxDiv.classList.remove(constants.classNames.SimpleTreeNodeCheckboxSelected);
            }
            if (this.checkboxesRecursive && toggleChildren && ((_b = node.children) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                node.children.forEach((child) => this.toggleCheckboxNode(child, selected));
            }
            return node;
        }
        toggleCheckboxParent(node) {
            var _a;
            const parentNode = this.getParentForNode(this.allNodes, node.value);
            if (parentNode && ((_a = parentNode.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                const selected = parentNode.children.every((node) => node.selected === true);
                this.toggleCheckboxNode(parentNode, selected, false);
                this.toggleCheckboxParent(parentNode);
            }
        }
        generateUid(value) {
            let hash = 0;
            for (let i = 0; i < value.length; i++) {
                const chr = value.charCodeAt(i);
                hash = (hash << 5) - hash + chr;
                hash |= 0;
            }
            return `${this.treeInstanceId}-${Math.abs(hash)}`;
        }
    }

    class CommonTreeLogic {
        constructor(element, options) {
            this.element = element;
            this.options = options;
            this.readOnly = false;
            this.eventManager = new EventManager();
            this.dataService = new DataService(options.nodes, options.checkboxes.active, options.checkboxes.recursive);
        }
        destroy() {
            this.tree.destroy();
            Array.from(this.element.children).forEach((e) => this.element.removeChild(e));
            this.dataService.clear();
        }
        showEmphasizeIcon(_cssClass) {
            throw new Error("Feature not supported in this mode!");
        }
        hideEmphasizeIcon() {
            throw new Error("Feature not supported in this mode!");
        }
        moveNode(_value, _direction) {
            throw new Error("Feature not supported in this mode!");
        }
        setSelected(value) {
            this.selected = value;
        }
        getSelected() {
            return this.selected;
        }
        getNode(value) {
            return this.dataService.getNode(value);
        }
        addNode(node, parent = null) {
            this.dataService.addNode(node, parent);
        }
        deleteNode(node) {
            this.dataService.deleteNode(node.value);
        }
        updateNodeLabel(node, newLabel) {
            this.dataService.updateNodeLabel(node.value, newLabel);
        }
        setReadOnly(readOnly) {
            if (this.readOnly !== readOnly) {
                this.readOnly = readOnly;
                this.tree.setReadOnly(readOnly);
                this.rootContainer.classList.toggle(constants.classNames.SimpleTreeReadOnly, readOnly);
                this.tree.renderContent();
            }
        }
        subscribe(event, handler) {
            return this.eventManager.subscribe(event, handler);
        }
        subscribeOnce(event, handler) {
            return this.eventManager.subscribeOnce(event, handler);
        }
    }

    function calculate(elementRect, availableHeight, overlayHeight, borderWith = 0, maxOverlayHeight = 300) {
        let top = elementRect.top + elementRect.height + borderWith;
        let height = overlayHeight > maxOverlayHeight ? maxOverlayHeight : overlayHeight;
        const tolerance = 10;
        const topRelative = top - window.scrollY;
        if (topRelative + height + tolerance > availableHeight) {
            top = elementRect.top - height - borderWith;
        }
        if (top < 0) {
            top = elementRect.top + elementRect.height + borderWith;
            height = availableHeight - top - tolerance;
        }
        return {
            top,
            left: elementRect.left - borderWith,
            width: elementRect.width - borderWith,
            height,
        };
    }
    function calculateOverlay(overlay, element, overlayHeight, maxHeight = 300) {
        const { top, left } = element.getBoundingClientRect();
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        const rect = calculate({
            top: top + scrollY,
            height: element.offsetHeight,
            left: left + scrollX,
            width: element.offsetWidth,
        }, window.innerHeight, overlayHeight, parseInt(getComputedStyle(overlay).borderLeftWidth.replace("px", ""), 10), maxHeight);
        overlay.style.top = `${rect.top}px`;
        overlay.style.left = `${rect.left}px`;
        overlay.style.width = `${rect.width}px`;
        overlay.style.height = `${rect.height}px`;
    }

    class CommonDropdownTreeLogic extends CommonTreeLogic {
        constructor(element, options) {
            super(element, options);
            this.dropdownOpen = false;
            this.eventManager.subscribe(constants.events.EscapePressed, () => this.closeDropdown());
            this.boundClick = this.onClick.bind(this);
        }
        toggleDropdown() {
            if (this.dropdownOpen) {
                this.closeDropdown();
            }
            else {
                this.openDropdown();
            }
        }
        onClick(e) {
            const clickedElement = e.target;
            if (!this.dropdownHolder.contains(clickedElement) && !this.selectContainer.contains(clickedElement)) {
                this.closeDropdown();
            }
        }
        openDropdown() {
            if (this.readOnly) {
                return;
            }
            this.tree.renderContent();
            this.tree.activateKeyListener();
            this.filterChangedSubscription = this.eventManager.subscribe(constants.events.FilterChanged, () => this.calculateDropdownPosition());
            if (this.options.css.dropdownHolder) {
                this.dropdownHolder.classList.add(this.options.css.dropdownHolder);
            }
            this.dropdownHolder.style.top = "-9999px";
            this.dropdownHolder.style.left = "-9999px";
            this.dropdownHolder.style.display = "inherit";
            this.calculateDropdownPosition();
            this.arrowElement.classList.remove(constants.classNames.SimpleTreeChevronDown);
            this.arrowElement.classList.add(constants.classNames.SimpleTreeChevronUp);
            this.dropdownOpen = true;
            window.addEventListener("mouseup", this.boundClick);
            if (this.options.scrollContainer) {
                this.preventScrollListener = (e) => e.preventDefault();
                this.options.scrollContainer.addEventListener("wheel", this.preventScrollListener, { passive: false });
            }
        }
        closeDropdown() {
            if (!this.dropdownOpen) {
                return;
            }
            if (this.filterChangedSubscription) {
                this.filterChangedSubscription.dispose();
                this.filterChangedSubscription = null;
            }
            if (this.options.css.dropdownHolder) {
                this.dropdownHolder.classList.remove(this.options.css.dropdownHolder);
            }
            this.dropdownHolder.style.display = "none";
            this.dropdownHolder.style.top = ``;
            this.dropdownHolder.style.left = ``;
            this.dropdownHolder.style.width = ``;
            this.dropdownHolder.style.height = ``;
            this.arrowElement.classList.remove(constants.classNames.SimpleTreeChevronUp);
            this.arrowElement.classList.add(constants.classNames.SimpleTreeChevronDown);
            this.dropdownOpen = false;
            window.removeEventListener("mouseup", this.boundClick);
            this.tree.deactivateKeyListener();
            if (this.options.scrollContainer && this.preventScrollListener) {
                this.options.scrollContainer.removeEventListener("wheel", this.preventScrollListener);
                this.preventScrollListener = null;
            }
        }
        calculateDropdownPosition() {
            let height = 0;
            if (this.options.searchBar) {
                height += this.dropdownHolder.children[0].clientHeight;
                height += this.dropdownHolder.children[1].scrollHeight;
            }
            else {
                height += this.dropdownHolder.children[0].scrollHeight;
            }
            calculateOverlay(this.dropdownHolder, this.selectContainer.parentElement, height);
        }
    }

    class SingleSelectDropdown extends CommonDropdownTreeLogic {
        constructor(element, options) {
            super(element, options);
            this.rootContainer = createContainer(element, constants.classNames.SimpleTree);
            this.selected = this.dataService.getSelected()[0] || null;
            this.dropdownHolder = createDropdownContainer();
            this.tree = new BaseTree(this.dropdownHolder, options, this.dataService, this.eventManager, this.readOnly);
            this.subscribe(constants.events.NodeSelected, (n) => this.nodeSelected(n));
            this.renderSelectField(this.rootContainer);
        }
        setSelected(value) {
            if (value) {
                this.dataService.setSelected(value);
            }
            else {
                this.dataService.setSelected();
            }
            super.setSelected(this.dataService.getSelected()[0] || null);
            this.updateUiOnSelection();
            this.tree.highlightNode(value);
        }
        setReadOnly(readOnly) {
            super.setReadOnly(readOnly);
            if (readOnly && this.dropdownOpen) {
                this.closeDropdown();
            }
        }
        showEmphasizeIcon(cssClass) {
            this.emphasisCssClass = cssClass;
            if (this.selected && this.emphasisCssClass && !this.emphasizeElement) {
                this.selectContainer.classList.add(constants.classNames.SimpleTreeEmphasized);
                this.emphasizeElement = document.createElement("i");
                this.emphasizeElement.classList.add(constants.classNames.SimpleTreeEmphasize, cssClass);
                this.selectContainer.appendChild(this.emphasizeElement);
            }
        }
        hideEmphasizeIcon() {
            this.emphasisCssClass = null;
            if (this.emphasizeElement) {
                this.selectContainer.classList.remove(constants.classNames.SimpleTreeEmphasized);
                this.selectContainer.removeChild(this.emphasizeElement);
                this.emphasizeElement = null;
            }
        }
        nodeSelected(node) {
            this.dataService.setSelected(node);
            this.selected = this.dataService.getSelected()[0] || null;
            this.tree.highlightNode(node);
            this.updateUiOnSelection();
            this.closeDropdown();
            this.eventManager.publish(constants.events.SelectionChanged, this.selected);
        }
        renderSelectField(container) {
            this.selectContainer = createContainer(container, constants.classNames.SimpleTreeSingleSelectBox);
            this.selectContainer.onclick = () => !this.readOnly && this.toggleDropdown();
            this.selectedLabel = document.createElement("span");
            this.selectedLabel.classList.add(constants.classNames.SimpleTreeSelectedLabel);
            this.selectContainer.appendChild(this.selectedLabel);
            this.updateUiOnSelection();
            this.arrowElement = document.createElement("i");
            this.arrowElement.classList.add(constants.classNames.SimpleTreeChevronDown);
            this.selectContainer.appendChild(this.arrowElement);
        }
        updateUiOnSelection() {
            this.selectedLabel.innerText = this.selected ? this.options.templateSelectedText(this.selected) : this.options.watermark;
            this.selectedLabel.classList.toggle(constants.classNames.SimpleTreeSelectedLabelWatermark, !this.selected);
            if (this.emphasisCssClass && this.selected) {
                this.showEmphasizeIcon(this.emphasisCssClass);
            }
            else if (!this.selected) {
                const css = this.emphasisCssClass;
                this.hideEmphasizeIcon();
                this.emphasisCssClass = css;
            }
            if (this.options.clearButton && this.selected && !this.clearElement) {
                this.clearElement = document.createElement("i");
                this.clearElement.classList.add(constants.classNames.SimpleTreeCross);
                this.clearElement.onclick = (e) => {
                    if (!this.readOnly) {
                        this.setSelected(null);
                        this.eventManager.publish(constants.events.SelectionChanged, null);
                    }
                    e.stopPropagation();
                };
                this.selectContainer.appendChild(this.clearElement);
                this.selectContainer.classList.add(constants.classNames.SimpleTreeClearable);
            }
            else if (!this.selected && this.clearElement) {
                this.clearElement.remove();
                this.clearElement = null;
            }
        }
    }

    class MultiSelectDropdown extends CommonDropdownTreeLogic {
        constructor(element, options) {
            super(element, options);
            this.rootContainer = createContainer(element, constants.classNames.SimpleTree);
            this.selected = this.dataService.getSelected();
            this.dropdownHolder = createDropdownContainer();
            this.tree = new BaseTree(this.dropdownHolder, options, this.dataService, this.eventManager, this.readOnly);
            this.subscribe(constants.events.NodeSelected, (n) => this.nodeSelected(n));
            this.renderSelectField(this.rootContainer);
        }
        setSelected(value) {
            this.dataService.setSelected(...(value || []));
            super.setSelected(this.dataService.getSelected());
            this.renderPillboxes();
        }
        setReadOnly(readOnly) {
            super.setReadOnly(readOnly);
            if (readOnly && this.dropdownOpen) {
                this.closeDropdown();
            }
        }
        nodeSelected(node) {
            const index = this.selected.findIndex((s) => s.value === node.value);
            if (index !== -1) {
                node.selected = false;
                this.selected.splice(index, 1);
            }
            else {
                node.selected = true;
                this.selected.push(node);
            }
            this.dataService.setSelected(...this.selected);
            this.selected = this.dataService.getSelected();
            this.renderPillboxes();
            this.closeDropdown();
            this.eventManager.publish(constants.events.SelectionChanged, this.selected);
        }
        renderSelectField(container) {
            this.selectContainer = createContainer(container, constants.classNames.SimpleTreeMultiSelectBox);
            this.selectContainer.onclick = () => !this.readOnly && this.toggleDropdown();
            this.pillboxContainer = createUnorderedList(this.selectContainer, constants.classNames.SimpleTreePillboxHolder);
            this.renderPillboxes();
            this.arrowElement = document.createElement("i");
            this.arrowElement.classList.add(constants.classNames.SimpleTreeChevronDown);
            this.selectContainer.appendChild(this.arrowElement);
        }
        renderPillboxes() {
            this.pillboxContainer.innerHTML = "";
            this.selected.forEach((item) => {
                const listItem = createListItem(this.pillboxContainer, "");
                listItem.innerText = this.options.templateSelectedText(item);
                const cross = createContainer(listItem, constants.classNames.SimpleTreePillboxCross);
                cross.addEventListener("click", (e) => {
                    if (!this.readOnly) {
                        this.nodeSelected(item);
                    }
                    e.stopPropagation();
                });
            });
            if (this.options.clearButton && this.selected.length > 0 && !this.clearElement) {
                this.clearElement = document.createElement("i");
                this.clearElement.classList.add(constants.classNames.SimpleTreeCross);
                this.clearElement.onclick = (e) => {
                    if (!this.readOnly) {
                        this.setSelected([]);
                        this.eventManager.publish(constants.events.SelectionChanged, []);
                    }
                    e.stopPropagation();
                };
                this.selectContainer.appendChild(this.clearElement);
                this.selectContainer.classList.add(constants.classNames.SimpleTreeClearable);
            }
            else if (this.selected.length === 0 && this.clearElement) {
                this.clearElement.remove();
                this.clearElement = null;
            }
        }
    }

    class TreeView extends CommonTreeLogic {
        constructor(element, options) {
            super(element, options);
            this.rootContainer = createContainer(element, constants.classNames.SimpleTree, constants.classNames.SimpleTreeViewOnly);
            if (options.checkboxes.active) {
                this.selected = this.dataService.getSelected();
            }
            else {
                this.selected = this.dataService.getSelected()[0] || null;
            }
            this.tree = new BaseTree(this.rootContainer, options, this.dataService, this.eventManager, this.readOnly);
            this.subscribe(constants.events.NodeSelected, (n) => this.nodeSelected(n));
            this.tree.renderContent();
            this.tree.activateKeyListener();
        }
        setSelected(value) {
            if (this.options.checkboxes.active) {
                this.dataService.setSelected(...(value || []));
                super.setSelected(this.dataService.getSelected());
            }
            else {
                this.dataService.setSelected(value || []);
                super.setSelected(this.dataService.getSelected()[0] || []);
            }
        }
        moveNode(value, direction) {
            this.dataService.moveNode(value, direction);
            this.tree.renderContent();
        }
        nodeSelected(node) {
            var _a;
            if (this.options.checkboxes.active) {
                this.selected = this.dataService.getSelected();
            }
            else {
                if ((node === null || node === void 0 ? void 0 : node.value) === ((_a = this.selected) === null || _a === void 0 ? void 0 : _a.value)) {
                    this.dataService.setSelected();
                    this.selected = null;
                    this.tree.highlightNode(null);
                }
                else {
                    this.dataService.setSelected(node);
                    this.selected = this.dataService.getSelected()[0] || null;
                    this.tree.highlightNode(node);
                }
            }
            this.eventManager.publish(constants.events.SelectionChanged, this.selected);
        }
    }

    function createSimpleTree(element, mode, instanceConfig) {
        const config = Object.assign(Object.assign({}, defaults$1), instanceConfig);
        if (mode === "singleSelectDropdown") {
            return new SingleSelectDropdown(element, config);
        }
        else if (mode === "multiSelectDropdown") {
            return new MultiSelectDropdown(element, config);
        }
        else {
            return new TreeView(element, config);
        }
    }

    function _simpleTree(nodeList, mode, config) {
        const nodes = Array.prototype.slice.call(nodeList).filter((x) => x instanceof HTMLElement);
        const instances = [];
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            try {
                if (node._simpleTree !== undefined) {
                    node._simpleTree.destroy();
                    node._simpleTree = undefined;
                }
                node._simpleTree = createSimpleTree(node, mode, config || {});
                instances.push(node._simpleTree);
            }
            catch (e) {
                console.error(e);
            }
        }
        return instances.length === 1 ? instances[0] : instances;
    }
    const simpleTree = function (selector, mode, config) {
        if (typeof selector === "string") {
            return _simpleTree(window.document.querySelectorAll(selector), mode, config);
        }
        else if (selector instanceof Node) {
            return _simpleTree([selector], mode, config);
        }
        else {
            return _simpleTree(selector, mode, config);
        }
    };

    return simpleTree;

})));
