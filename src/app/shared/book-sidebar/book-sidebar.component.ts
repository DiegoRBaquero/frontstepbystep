import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Book } from '../../book/book';

@Component({
    selector: 'app-book-sidebar',
    templateUrl: './book-sidebar.component.html',
    styleUrls: ['./book-sidebar.component.css']
})
export class BookSidebarComponent implements OnInit, OnChanges {

    /**
    * The list of books
    */
    @Input() books: Book[];

    /**
    * The books shown in the list
    */
    list: Book[];

    /**
    * The max number of books shown at the same time
    */
    maxPerPage: number;

    /**
    * Shows/hides the button that shifts the list to left
    */
    showLeft: boolean;

    /**
    * Shows/hides the button that shifts the list to right
    */
    showRight: boolean;

    /**
    * The component's constructor
    */
    constructor() { }

    /**
     * This function initializes the list
     */
    initializeList(): void {
        this.list = [];
        if (this.books.length > this.maxPerPage) {
            this.showRight = true;
            for (let index = 0; index < this.maxPerPage; index++) {
                this.list.push(this.books[index]);
            }
        } else this.list = this.books;
    }

    /**
    * Shifts the list to the right
    */
    nextBook(): void {
        let lastBook = this.list[this.maxPerPage - 1];
        let index = this.books.indexOf(lastBook) + 1;
        this.list.push(this.books[index]);
        this.list.shift();
        this.hideShowButtons();
    }

    /**
    * Shifts the list to the left
    */
    previousBook(): void {
        let firstBook = this.list[0];
        let index = this.books.indexOf(firstBook) - 1;
        this.list.unshift(this.books[index]);
        this.list.pop();
        this.hideShowButtons();
    }

    /**
     * Hides or shows the buttons depending on the position of the list
     */
    hideShowButtons(): void {
        if (this.list[0] == this.books[0]) this.showLeft = false;
        else this.showLeft = true;
        if (this.list[this.maxPerPage - 1] == this.books[this.books.length - 1]) this.showRight = false;
        else this.showRight = true;
    }

    /**
    * The function which initializes the component
    */
    ngOnInit() {
        this.maxPerPage = 5;
        this.showLeft = false;
        this.showRight = false;
        this.initializeList();
    }

    /**
     * This function is called everytime there's the need to update the content of the list
     */
    ngOnChanges() {
        this.showLeft = false;
        this.showRight = false;
        this.initializeList();
    }

}
