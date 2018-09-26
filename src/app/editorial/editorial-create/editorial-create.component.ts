import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { EditorialService } from '../editorial.service';

import { Editorial } from '../editorial';

@Component({
    selector: 'app-editorial-create',
    templateUrl: './editorial-create.component.html',
    styleUrls: ['./editorial-create.component.css']
})
export class EditorialCreateComponent implements OnInit {

    /**
    * Constructor for the component
    * @param editorialService The editorials' services provider
    * @param toastrService The toastr to show messages to the user 
    */
    constructor(
        private editorialService: EditorialService,
        private toastrService: ToastrService
    ) { }

    /**
    * The new editorial
    */
    editorial: Editorial;

    /**
    * The output which tells the parent component
    * that the user no longer wants to create an editorial
    */
    @Output() cancel = new EventEmitter();

    /**
    * The output which tells the parent component
    * that the user created a new editorial
    */
    @Output() create = new EventEmitter();

    /**
    * Creates a new editorial
    */
    createEditorial(): void {
        this.editorialService.createEditorial(this.editorial)
            .subscribe(() => {
                this.create.emit();
                this.toastrService.success("The editorial was created", "Editorial creation");
            }, err => {
                this.toastrService.error(err, "Error");
            });
    }

    /**
    * Informs the parent component that the user no longer wants to create an editorial
    */
    cancelCreation(): void {
        this.cancel.emit();
    }

    /**
    * This function will initialize the component
    */
    ngOnInit() {
        this.editorial = new Editorial();
    }
}
