import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { EditorialService } from '../editorial.service';

import { Editorial } from '../editorial';
import { Book } from '../../book/book';

@Component({
    selector: 'app-editorial-detail',
    templateUrl: './editorial-detail.component.html',
    styleUrls: ['./editorial-detail.component.css']
})
export class EditorialDetailComponent implements OnInit {

    /**
    * The component's constructor
    * @param editorialService The editorial's service
    * @param route The route element which helps to obtain the editorial's id
    * @param toastrService The toastr to show messages to the user
    */
    constructor(
        private editorialService: EditorialService,
        private route: ActivatedRoute,
        private toastrService: ToastrService
    ) { }

    /**
    * The editorial whose details we want to show
    */
    editorial: Editorial;

    /**
    * The books published by the editorial
    */
    editorial_books: Book[];

    /**
    * The editorial's id retrieved from the address
    */
    editorial_id: number;

    /**
    * The function which retrieves the books of an editorial
    */
    getBooks(): void {
        this.editorialService.getEditorial(this.editorial_id)
            .subscribe(editorial => {
                this.editorial = editorial
            }, err => {
                this.toastrService.error(err, "Error");
            });
    }

    /**
    * This function retrieves the books of an editorial to show them in the list
    */
    getBooksByEditorial(): void {
        this.editorialService.getBooksOfEditorial(this.editorial_id)
            .subscribe(books => this.editorial_books = books);
    }

    /**
    * The function which initializes the component
    */
    ngOnInit() {
        this.editorial_books = [];
        this.editorial_id = +this.route.snapshot.paramMap.get('id');
        this.editorial = new Editorial();
        this.getBooks();
        this.getBooksByEditorial();
    }

}
