import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Book } from '../book';
import { BookService } from '../book.service';

/**
* The component for the list of books in the BookStore
*/
@Component({
    selector: 'app-book',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

    /**
    * Constructor of the component
    * @param bookService The book's services provider
    * @param toastrService The toastr to show messages to the user
    */
    constructor(
        private bookService: BookService,
        private toastrService: ToastrService
    ) { }

    /**
    * The list of books in the BookStore
    */
    books: Book[];

    /**
    * This function retrieves all the books in the Bookstore to show them in the list
    */
    getBooks(): void {
        this.bookService.getBooks()
            .subscribe(books => {
                this.books = books;
            }, err => {
                this.toastrService.error(err, "Error");
            });
    }

    /**
    * This will initialize the component by retrieving the list of books from the service
    * This function will be called when the component is created
    */
    ngOnInit() {
        this.books = [];
        this.getBooks();
    }
}




