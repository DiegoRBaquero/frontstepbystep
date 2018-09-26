import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { EditorialService } from '../editorial.service';

import { Editorial } from '../editorial';


@Component({
    selector: 'app-editorial-edit',
    templateUrl: './editorial-edit.component.html',
    styleUrls: ['./editorial-edit.component.css']
})
export class EditorialEditComponent implements OnInit {

    /**
    * The component's constructor
    * @param editorialService The editorial's service
    * @param toastrService The toastr to show messages to the user 
    */
    constructor(
        private editorialService: EditorialService,
        private toastrService: ToastrService
    ) { }

    /**
    * The id of the editorial that the user wants to edit
    * This is passed as a parameter by the parent component
    */
    @Input() editorial_id;

    /**
    * The output which tells the parent component
    * that the user no longer wants to create an editorial
    */
    @Output() cancel = new EventEmitter();

    /**
    * The output which tells the parent component
    * that the user updated a new editorial
    */
    @Output() update = new EventEmitter();

    /**
    * The editorial to edit
    */
    editorial: Editorial;

    /**
    * Retrieves the information of the editorial
    */
    getEditorial(): void {
        this.editorialService.getEditorial(this.editorial_id)
            .subscribe(editorial => {
                this.editorial = editorial;
            }, err => {
                this.toastrService.error(err, "Error");
            });
    }

    /**
    * Updates the editorial's information
    */
    editEditorial(): void {
        this.editorialService.updatEditorial(this.editorial)
            .subscribe(() => {
                this.update.emit();
                this.toastrService.success("The editorial's information was updated", "Editorial edition");
            }, err => {
                this.toastrService.error(err, "Error");
            });
    }

    /**
    * Informs the parent component that the user no longer wants to update the editorial
    */
    cancelEdition(): void {
        this.cancel.emit();
    }

    /**
    * The function which initializes the component
    */
    ngOnInit() {
        this.editorial = new Editorial();
        this.getEditorial();
    }

    /**
    * The function which is called every time the user chooses to edit a different editorial
    */
    ngOnChanges() {
        this.ngOnInit();
    }
}
