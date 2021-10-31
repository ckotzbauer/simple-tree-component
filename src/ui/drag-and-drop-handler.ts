export class DragAndDropHandler {
    private boundOnDragStart: (e: DragEvent) => void;
    private boundOnDragOver: (e: DragEvent) => void;
    private boundOnDrop: (e: DragEvent) => void;
    private draggedId: string | null = null;

    constructor(private setNodeIndex: (uid: string, newIndex: number) => void) {
        this.boundOnDragStart = this.onDragStart.bind(this);
        this.boundOnDragOver = this.onDragOver.bind(this);
        this.boundOnDrop = this.onDrop.bind(this);
    }

    public initialize(liElement: HTMLLIElement): void {
        liElement.setAttribute("draggable", "true");
        liElement.addEventListener("dragstart", this.boundOnDragStart);
        liElement.addEventListener("dragover", this.boundOnDragOver);
        liElement.addEventListener("drop", this.boundOnDrop);
    }

    public destroy(liElement: HTMLLIElement): void {
        liElement.removeAttribute("draggable");
        liElement.removeEventListener("dragstart", this.boundOnDragStart);
        liElement.removeEventListener("dragover", this.boundOnDragOver);
        liElement.removeEventListener("drop", this.boundOnDrop);
    }

    private onDragStart(e: DragEvent): void {
        const target = e.target as HTMLElement;
        if (!target.hasAttribute("draggable")) {
            return;
        }

        target.setAttribute("data-dragging", "true");
        this.draggedId = target.id;

        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = "move";
        }
    }

    private onDragOver(e: DragEvent): void {
        e.preventDefault();
        const target = this.getTargetListItem(e.target as HTMLElement);

        if (!target) {
            return;
        }

        const { elements: sameLevelNodes, ids: sameLevelNodeIds } = this.getSameLevelNodes(target);
        const draggedId = sameLevelNodes.find((x: Element) => x.getAttribute("data-dragging") === "true")?.id;

        if (!draggedId) {
            return;
        }

        if (!sameLevelNodeIds.includes(draggedId)) {
            return;
        }

        const toDrop: Element | null = document.getElementById(draggedId);

        if (!toDrop) {
            return;
        }

        const bounding: DOMRect = target.getBoundingClientRect() as DOMRect;
        const offset: number = bounding.y + bounding.height / 2;

        if (e.clientY - offset > 0) {
            target.parentElement?.insertBefore(toDrop, target.nextSibling);
        } else {
            target.parentElement?.insertBefore(toDrop, target);
        }
    }

    private onDrop(e: DragEvent): void {
        e.preventDefault();
        e.stopPropagation();

        if (this.draggedId) {
            document.getElementById(this.draggedId)?.removeAttribute("data-dragging");
            const { ids } = this.getSameLevelNodes(document.getElementById(this.draggedId) as HTMLElement);
            console.log(`Ids: ${ids.join(",")}; ID: ${this.draggedId}`);
            this.setNodeIndex(this.draggedId, ids.indexOf(this.draggedId));
        }
    }

    private getTargetListItem(t: HTMLElement): HTMLElement | null {
        while (t.parentElement && t.tagName !== "LI") {
            t = t.parentElement;
        }

        return t;
    }

    private getSameLevelNodes(target: HTMLElement): { elements: Element[]; ids: string[] } {
        const sameLevelNodes = Array.from(target.parentElement?.children || []);
        const sameLevelNodeIds = sameLevelNodes.map((x: Element) => x.id);
        return { elements: sameLevelNodes, ids: sameLevelNodeIds };
    }
}
