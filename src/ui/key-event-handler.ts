import { DataService } from "../data/data-service";
import { EventManager } from "../event/event-manager";
import constants from "./ui-constants";

export class KeyEventHandler {
    private boundKeyUp: (e: KeyboardEvent) => void;
    private hoveredNodeValue: string | null = null;

    constructor(private eventManager: EventManager, private dataService: DataService) {
        this.boundKeyUp = this.handleKeyUp.bind(this);
    }

    public initialize(): void {
        window.addEventListener("keyup", this.boundKeyUp);
    }

    public destroy(): void {
        window.removeEventListener("keyup", this.boundKeyUp);
    }

    public setHoveredNodeValue(value: string | null): void {
        this.hoveredNodeValue = value;
    }

    private handleKeyUp(e: KeyboardEvent): void {
        if (e.code === "Escape") {
            this.eventManager.publish(constants.events.EscapePressed);
            return;
        }

        const flattedValues: string[] = this.dataService.getFlattedClickableNodeValues();
        const hoveredIndex = this.hoveredNodeValue === null ? -1 : flattedValues.indexOf(this.hoveredNodeValue);
        let targetIndex: number = hoveredIndex;

        if (e.code === "ArrowUp") {
            if (hoveredIndex > 0) {
                targetIndex = hoveredIndex - 1;
            } else {
                targetIndex = flattedValues.length - 1;
            }
        } else if (e.code === "ArrowDown") {
            if (hoveredIndex !== -1 && hoveredIndex < flattedValues.length - 1) {
                targetIndex = hoveredIndex + 1;
            } else {
                targetIndex = 0;
            }
        } else if ((e.code === "Enter" || e.code === "NumpadEnter") && flattedValues[targetIndex]) {
            const mutatedNode = this.dataService.toggleNodeSelected(flattedValues[targetIndex]);
            this.eventManager.publish(constants.events.NodeSelected, mutatedNode);
        }

        if (targetIndex !== hoveredIndex && flattedValues[targetIndex]) {
            this.hoveredNodeValue = flattedValues[targetIndex];
            this.eventManager.publish(constants.events.HoverChanged, this.dataService.getNode(this.hoveredNodeValue));
        }

        e.preventDefault();
        e.stopPropagation();
    }
}
