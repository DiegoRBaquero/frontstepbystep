import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { BookService } from '../book.service';
import { AuthorService } from '../../author/author.service';
import { EditorialService } from '../../editorial/editorial.service';

import { Book } from '../book';
import { Author } from '../../author/author';
import { Editorial } from '../../editorial/editorial';

@Component({
    selector: 'app-book-create',
    templateUrl: './book-create.component.html',
    styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

    /**
    * Constructor for the component
    * @param bookService The books' services provider
    * @param authorService The authors' services provider
    * @param editorialService The editorials' services provider
    * @param toastrService The toastr to show messages to the user
    * @param router The router
    */
    constructor(
        private bookService: BookService,
        private authorService: AuthorService,
        private editorialService: EditorialService,
        private toastrService: ToastrService,
        private router: Router
    ) { }

    /**
    * The new book
    */
    book: Book

    /**
    * The list of all the authors in the BookStore
    */
    authors: Author[];

    /**
    * The list of all the editorials in the BookStore
    */
    editorials: Editorial[];

    /**
    * The authors of the new book
    * This list is passed as a parameter to the child two-list component
    * It is also updated by that child component
    */
    bookAuthors: Author[];

    /**
    * The title of the left column in the two-list component
    * This list is passed as a parameter to the two-list component
    */
    titleLeft: String;

    /**
    * The title of the right column in the two-list component
    * This list is passed as a parameter to the two-list component
    */
    titleRight: String;

    /**
    * Retrieves the list of authors in the BookStore
    */
    getAuthors(): void {
        this.authorService.getAuthors()
            .subscribe(authors => {
                this.authors = authors;
            }, err => {
                this.toastrService.error(err, 'Error');
            });
    }

    /**
    * Retrieves the list of editorials in the BookStore
    */
    getEditorials(): void {
        this.editorialService.getEditorials()
            .subscribe(editorials => {
                this.editorials = editorials;
            }, err => {
                this.toastrService.error(err, 'Error');
            });
    }

    /**
    * Cancels the creation of the new book
    * Redirects to the books' list page
    */
    cancelCreation(): void {
        this.toastrService.warning('The book wasn\'t created', 'Book creation');
        this.router.navigate(['/books/list']);
    }

    /**
    * The function which updates the list of authors of the new book
    * @param authors The updated list of authors of the book
    */
    selectBookAuthors(authors): void {
        this.book.authors = authors;
    }

    /**
    * Creates a new book
    */
    createBook(): void {
        if (this.book.authors.length == 0) {
            this.toastrService.error('The book must have at least one author!', 'Error');
        } else {
            var book_create = {
                name: this.book.name,
                description: this.book.description,
                isbn: this.book.isbn,
                publish_date: this.book.publish_date.year + '-' + this.book.publish_date.month + '-' + this.book.publish_date.day,
                image: this.book.image,
                editorial: this.book.editorial,
                authors: this.book.authors.map(author => author.id)
            };
            this.bookService.createBook(book_create)
                .subscribe(book => {
                    this.router.navigate(['/books/' + book.id + '/details']);
                    this.toastrService.success("The book was successfully created", 'Book creation');
                }, err => {
                    this.toastrService.error(err, 'Error');
                });
        }
    }

    /**
    * This function will initialize the component
    */
    ngOnInit() {
        this.book = new Book();
        this.book.authors = [];
        this.bookAuthors = [];
        this.titleLeft = 'Book\'s authors';
        this.titleRight = 'All authors';
        this.getAuthors();
        this.getEditorials();
    }

}
