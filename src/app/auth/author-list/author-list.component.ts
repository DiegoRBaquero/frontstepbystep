import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';

import { AuthService } from '../auth.service';
import { Auth } from '../auth';

/**
* The author's list component
*/
@Component({
    selector: 'app-author',
    templateUrl: './author-list.component.html',
    styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

    /**
    * Constructor for the component
    * @param authorService The author's services provider
    * @param toastrService The toastr to show messages to the user
    * @param modalDialogService The popup provider
    * @param viewRef The container for the popup
    */
    constructor(
        private authorService: AuthService,
        private toastrService: ToastrService,
        private modalDialogService: ModalDialogService,
        private viewRef: ViewContainerRef
    ) { }

    /**
    * The list of authors which belong to the BookStore
    */
    authors: Auth[];

    /**
    * Shows or hides the author-create-component
    */
    showCreate: boolean;

    /**
    * Shows or hides the edition of an author
    */
    showEdit: boolean;

    /**
    * The id of the author that the user wants to edit
    */
    edit_author_id: number;

    /**
    * Asks the service to update the list of authors
    */
    getAuthors(): void {
        this.authorService.getAuthors()
            .subscribe(authors => {
                this.authors = authors;
            }, err => {
                this.toastrService.error(err, "Error");
            });
    }

    /**
    * Shows or hides the create component
    */
    showHideCreate(): void {
        if (this.showEdit) {
            this.showEdit = false;
        }
        this.showCreate = !this.showCreate!
    }

    /**
    * Shows the edit component
    */
    showEditAuthor(id): void {
        if (this.showCreate) {
            this.showCreate = false;
        }
        this.showEdit = true;
        this.edit_author_id = id;
    }

    /**
    * Hides the edit component
    */
    hideEditAuthor(): void {
        this.showEdit = false;
        this.edit_author_id = undefined;
    }

    /**
    * Deletes an author
    */
    deleteAuthor(authorId): void {
        this.modalDialogService.openDialog(this.viewRef, {
            title: 'Delete an author',
            childComponent: SimpleModalComponent,
            data: { text: 'Are you sure your want to delete this author and all of their books from the BookStore?' },
            actionButtons: [
                {
                    text: 'Yes',
                    buttonClass: 'btn btn-danger',
                    onAction: () => {
                        this.authorService.deleteAuthor(authorId).subscribe(books => {
                            this.toastrService.error("The author and all their books were deleted from the BookStore", "Author deleted");
                            this.ngOnInit();
                        }, err => {
                            this.toastrService.error(err, "Error");
                        });
                        return true;
                    }
                },
                { text: 'No', onAction: () => true }
            ]
        });
    }

    /**
    * This function will initialize the component
    */
    ngOnInit() {
        this.showCreate = false;
        this.showEdit = false;
        this.edit_author_id = undefined;
        this.getAuthors();
    }

}
