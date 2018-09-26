import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-list-swap',
    templateUrl: './list-swap.component.html',
    styleUrls: ['./list-swap.component.css']
})
export class ListSwapComponent implements OnInit {

    /**
    * The component's constructor
    */
    constructor() { }

    /**
     * The title of left column
     */
    @Input() titleLeft: String;

    /**
     * The title of the right column
     */
    @Input() titleRight: String;

    /**
     * The left side's list
     */
    @Input() left: any[];

    /**
     * The right side's list
     */
    @Input() right: any[];

    /**
     * The current selected item
     */
    @Input() selectedItem: any;

    /**
     * The emitter which informs the parent component that 
     * the left side's list has been updated
     */
    @Output() updateLeft = new EventEmitter();

    /**
     * Selects an item
     * @param item The selected item
     */
    select(item): void {
        this.selectedItem = item;
    }

    /**
     * Shifts an item from the right side's list to the left side's list
     */
    addToLeft(): void {
        if (this.right.includes(this.selectedItem)) {
            this.left.push(this.selectedItem);
            this.right = this.right.filter(item => item.id !== this.selectedItem.id);
            this.updateLeft.emit(this.left);
        }
    }

    /**
     * Shifts an item from the left side's list to the right side's list
     */
    addToRight(): void {
        if (this.left.includes(this.selectedItem)) {
            this.right.push(this.selectedItem);
            this.left = this.left.filter(item => item.id !== this.selectedItem.id);
            this.updateLeft.emit(this.left);
        }
    }

    /**
     * This function initializes the component
     */
    ngOnInit() {
        this.left = [];
        this.right = [];
        this.selectedItem = -1;
    }

}
