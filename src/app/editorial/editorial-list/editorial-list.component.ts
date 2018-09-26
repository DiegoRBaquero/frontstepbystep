import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';

import { EditorialService } from '../editorial.service';

import { Editorial } from '../editorial';

/**
* The component for the list of editorials in the BookStore
*/
@Component({
    selector: 'app-editorial',
    templateUrl: './editorial-list.component.html',
    styleUrls: ['./editorial-list.component.css']
})
export class EditorialListComponent implements OnInit {

    /**
    * Constructor for the component
    * @param editorialService The author's services provider
    * @param toastrService The toastr to show messages to the user
    * @param modalDialogService The popup provider
    * @param viewRef The container for the popup
    */
    constructor(
        private editorialService: EditorialService,
        private toastrService: ToastrService,
        private modalDialogService: ModalDialogService,
        private viewRef: ViewContainerRef
    ) { }

    /**
    * The list of editorials which belong to the BookStore
    */
    editorials: Editorial[];

    /**
    * Shows or hides the create component
    */
    showCreate: boolean;

    /**
    * Shows or hides the edit component
    */
    showEdit: boolean;

    /**
    * The id of the editorial that the user wants to edit
    */
    edit_editorial_id: number;

    /**
    * Asks the service to update the list of editorials
    */
    getEditorials(): void {
        this.editorialService.getEditorials()
            .subscribe(editorials => {
                this.editorials = editorials;
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
    showEditEditorial(id): void {
        if (this.showCreate) {
            this.showCreate = false;
        }
        this.showEdit = true;
        this.edit_editorial_id = id;
    }

    /**
    * Hides the edit component
    */
    hideEditEditorial(): void {
        this.showEdit = false;
        this.edit_editorial_id = undefined;
    }

    /**
    * Deletes an editorial
    */
    deleteEditorial(editorialId): void {
        this.modalDialogService.openDialog(this.viewRef, {
            title: 'Delete an author',
            childComponent: SimpleModalComponent,
            data: { text: 'Are you sure your want to delete this author and all of their books from the BookStore?' },
            actionButtons: [
                {
                    text: 'Yes',
                    buttonClass: 'btn btn-danger',
                    onAction: () => {
                        this.editorialService.deleteEditorial(editorialId).subscribe(books => {
                            this.toastrService.error("The editorial and all its books were deleted from the BookStore", "Editorial deleted");
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
    * This function will be called when the component is created
    */
    ngOnInit() {
        this.showCreate = false;
        this.showEdit = false;
        this.getEditorials();
    }
}


