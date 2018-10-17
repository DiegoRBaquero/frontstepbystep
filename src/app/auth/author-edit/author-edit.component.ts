import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../auth.service';
import { BookService } from '../../book/book.service';

import { Book } from '../../book/book';
import { Auth } from '../auth';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-author-edit',
    templateUrl: './author-edit.component.html',
    styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit, OnChanges {

    /**
    * Constructor for the component
    * @param authorService The authors' services provider
    * @param toastrService The toastr to show messages to the user
    * @param bookService The books' services provider
    */
    constructor(
        private authorService: AuthService,
        private toastrService: ToastrService,
        private bookService: BookService
    ) { }

    /**
    * The author id as received from the parent component
    */
    @Input() author_id;

    /**
    * The output which tells the parent component
    * that the user no longer wants to create an author
    */
    @Output() cancel = new EventEmitter();

    /**
    * The output which tells the parent component
    * that the user updated a new author
    */
    @Output() update = new EventEmitter();

    /**
    * The author who the user intends to update
    */
    author: Auth;

    /**
    * The list of books written by the author
    * This list is passed as a parameter to the two-list component
    */
    authorBooks: Book[];

    /**
    * The books in the BookStore not written by the author
    * This list is passed as a parameter to the two-list component
    */
    otherBooks: Book[];

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
    * Retrieves the information of the author who the user intends
    * to update
    */
    getAuthor(): void {
        this.authorService.getAuthor(this.author_id)
            .subscribe(author => {
                var date = {
                    day: +author.birthdate.split('-')[2],
                    month: +author.birthdate.split('-')[1],
                    year: +author.birthdate.split('-')[0]
                };
                this.author = author;
                this.author.birthdate = date;
            }, err => {
                this.toastrService.error(err, "Error");
            });
    }

    /**
    * Retrieves the list of books (the author's and the others)
    */
    getBooks(): void {
        this.authorService.getBooksOfAuthor(this.author_id)
            .subscribe(author_books => {
                this.author.books = author_books;
                this.authorBooks = author_books;
                this.bookService.getBooks()
                    .subscribe(other_books => {
                        this.otherBooks = other_books;
                        this.otherBooks = this.otherBooks.filter(book => !book.authors.map(author => author.id).includes(this.author_id));
                    }, err => {
                        this.toastrService.error(err, "Error");
                    });
            }, err => {
                this.toastrService.error(err, "Error");
            });
    }

    /**
    * Updates the information of the author
    */
    editAuthor(): void {
        var author_edit = {
            id: this.author.id,
            name: this.author.name,
            description: this.author.description,
            birthdate: this.author.birthdate.year + '-' + this.author.birthdate.month + '-' + this.author.birthdate.day,
            image: this.author.image
        };
        this.authorService.updateAuthor(author_edit)
            .subscribe(() => {
                this.toastrService.success("The author's information was updated", "Author edition");
                this.updateAuthorBooks();
            }, err => {
                this.toastrService.error(err, "Error");
            });
    }

    /**
    * Updates the list of books written by the author
    */
    updateAuthorBooks(): void {
        let idsOfBooks = this.author.books.map(book => book.id);
        this.authorService.updateBooks(idsOfBooks, this.author_id)
            .subscribe(() => {
                this.update.emit();
                this.toastrService.success("The list of books of the authors was updated", "List of books modified");
            }, err => {
                this.toastrService.error(err, "Error");
            });
    }

    /**
    * Emits the signal to tell the parent component that the
    * user no longer wants to create an user
    */
    cancelEdition(): void {
        this.cancel.emit();
    }

    /**
    * The function executed everytime a book is switched from a column to another
    * in the child two-list component
    * @param books The updated list of books written by the author
    */
    updateBooks(books): void {
        this.author.books = books;
    }

    /**
    * This function will initialize the component
    */
    ngOnInit() {
        this.author = new Auth();
        this.author.books = [];
        this.titleLeft = 'Books written by this author';
        this.titleRight = 'All other books in the BookStore';
        this.getAuthor();
        this.getBooks();
    }

    /**
    * This function will be called when the user chooses another author to edit
    */
    ngOnChanges() {
        this.ngOnInit();
    }

}
