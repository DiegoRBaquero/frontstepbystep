import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { AuthorService } from '../author.service';

import { Author } from '../author';

@Component({
    selector: 'app-author-create',
    templateUrl: './author-create.component.html',
    styleUrls: ['./author-create.component.css']
})
export class AuthorCreateComponent implements OnInit {

    /**
    * Constructor for the component
    * @param authorService The author's services provider
    * @param toastrService The toastr to show messages to the user
    */
    constructor(
        private authorService: AuthorService,
        private toastrService: ToastrService
    ) { }

    /**
    * The new author
    */
    author: Author;

    /**
    * The output which tells the parent component
    * that the user no longer wants to create an author
    */
    @Output() cancel = new EventEmitter();

    /**
    * The output which tells the parent component
    * that the user created a new author
    */
    @Output() create = new EventEmitter();

    /**
    * Creates an author
    */
    createAuthor(): void {
        var author_create = {
            name: this.author.name,
            description: this.author.description,
            birthdate: this.author.birthdate.year + '-' + this.author.birthdate.month + '-' + this.author.birthdate.day,
            image: this.author.image
        };
        this.authorService.createAuthor(author_create)
            .subscribe(() => {
                this.create.emit();
                this.toastrService.success("The author was created", "Author creation");
            }, err => {
                this.toastrService.error(err, "Error");
            });
    }

    /**
    * Emits the signal to tell the parent component that the
    * user no longer wants to create an user
    */
    cancelCreation(): void {
        this.cancel.emit();
    }

    /**
    * This function will initialize the component
    */
    ngOnInit() {
        this.author = new Author();
    }

}
