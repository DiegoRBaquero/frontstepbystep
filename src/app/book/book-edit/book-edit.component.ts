import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { BookService } from '../book.service';
import { AuthorService } from '../../author/author.service';
import { EditorialService } from '../../editorial/editorial.service';

import { Book } from '../book';
import { Author } from '../../author/author';
import { Editorial } from '../../editorial/editorial';

@Component({
    selector: 'app-book-edit',
    templateUrl: './book-edit.component.html',
    styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

    /**
    * The constructor of the component
    * @param bookService The book service which communicates with the API
    * @param authorService The author service which communicates with the API
    * @param editorialService The editorial service which communicates with the API
    * @param toastrService The toastr to show messages to the user
    * @param router The router which is needed to know when the component needs to reload
    * @param route The route which helps to retrieves the id of the book to be shown
    */
    constructor(
        private bookService: BookService,
        private authorService: AuthorService,
        private editorialService: EditorialService,
        private toastrService: ToastrService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    /**
    * The book which will be updated
    */
    book: Book

    /**
    * The list of every author in the BookStore
    */
    authors: Author[];

    /**
    * The list of every editorial in the BookStore
    */
    editorials: Editorial[];

    /**
    * The list of authors who wrote the book
    * This list is passed as a parameter to the two-list child component
    * This list is udpated in that component as well
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
    * Retrieves the information of the book which will be updated
    */
    getBook(): void {
        this.bookService.getBook(this.book.id)
            .subscribe(book => {
                var publish_date = {
                    day: +book.publish_date.split('-')[2],
                    month: +book.publish_date.split('-')[1],
                    year: +book.publish_date.split('-')[0]
                };
                this.book = book;
                this.book.publish_date = publish_date;
                this.authorService.getAuthors()
                    .subscribe(authors => {
                        this.authors = authors;
                        this.bookAuthors = this.authors.filter(author => this.book.authors.map(author => author.id).includes(author.id));
                        this.authors = this.authors.filter(author => !this.bookAuthors.includes(author));
                        this.editorialService.getEditorials()
                            .subscribe(editorials => {
                                this.editorials = editorials;

                            }, err => {
                                this.toastrService.error(err, 'Error');
                            });
                    }, err => {
                        this.toastrService.error(err, 'Error');
                    });
            }, err => {
                this.toastrService.error(err, 'Error');
            });
    }

    /**
    * Cancels the edition of the book
    */
    cancelEdition(): void {
        this.toastrService.warning('The book wasn\'t edited', 'Book edition');
        this.router.navigate(['/books/list']);
    }

    /**
    * This function updates the list of authors of the book
    * @param authors The updated list of authors of the book
    */
    selectBookAuthors(authors): void {
        this.book.authors = authors;
    }

    /**
    * This function updates the book
    */
    updateBook(): void {
        if (this.book.authors.length == 0) {
            this.toastrService.error('The book must have at least one author!', 'Error');
        } else {
            var book_update = {
                id: this.book.id,
                name: this.book.name,
                description: this.book.description,
                isbn: this.book.isbn,
                publish_date: this.book.publish_date.year + '-' + this.book.publish_date.month + '-' + this.book.publish_date.day,
                image: this.book.image,
                editorial: this.book.editorial.id,
                authors: this.book.authors.map(author => author.id)
            };
            this.bookService.updateBook(book_update)
                .subscribe(book => {
                    this.router.navigate(['/books/' + book.id + '/details']);
                    this.toastrService.success("The book was successfully edited", 'Book edition');
                }, err => {
                    this.toastrService.error(err, 'Error');
                });
        }
    }

    /**
    * The function which initilizes the component
    */
    ngOnInit() {
        this.book = new Book();
        this.book.id = +this.route.snapshot.paramMap.get('id');
        this.book.authors = [];
        this.bookAuthors = [];
        this.titleLeft = 'Book\'s authors';
        this.titleRight = 'All authors';
        this.getBook();
    }


}
