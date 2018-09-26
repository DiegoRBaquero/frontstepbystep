import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthorService } from '../author.service';

import { Author } from '../author';
import { Book } from '../../book/book';

@Component({
    selector: 'app-author-detail',
    templateUrl: './author-detail.component.html',
    styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {

    /**
    * Constructor for the component
    * @param route The route which helps to retrieves the id of the book to be shown
    * @param authorService The author's services provider
    * @param toastrService The toastr to show messages to the user
    */
    constructor(
        private route: ActivatedRoute,
        private authorService: AuthorService,
        private toastrService: ToastrService
    ) { }

    /**
    * The author
    */
    author: Author;

    /**
    * The author
    */
    author_books: Book[];

    /**
    * The author's id that we will pass to the book list component
    * to show the author's books
    */
    author_id: number;

    /**
    * The function which obtains the author whose details we want to show
    */
    getAuthor(): void {
        this.authorService.getAuthor(this.author_id)
            .subscribe(author => {
                this.author = author
            }, err => {
                this.toastrService.error(err, "Error");
            });
    }

    /**
    * This function retrieves the books of the author
    */
    getBooksByAuthor(): void {
        this.authorService.getBooksOfAuthor(this.author_id)
            .subscribe(books => {
                this.author_books = books
            }, err => {
                this.toastrService.error(err, "Error");
            });
    }

    /**
    * The function which initializes the component.
    */
    ngOnInit() {
        this.author_id = +this.route.snapshot.paramMap.get('id');
        this.author = new Author();
        this.author_books = [];
        this.getAuthor();
        this.getBooksByAuthor();
    }

}
