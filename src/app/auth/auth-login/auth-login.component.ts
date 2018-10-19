import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../auth.service';

import { User } from '../user';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-auth-login',
    templateUrl: './auth-login.component.html',
    styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit, OnChanges {

    /**
    * Constructor for the component
    * @param authorService The authors' services provider
    * @param toastrService The toastr to show messages to the user
    * @param bookService The books' services provider
    */
    constructor(
        private authService: AuthService,
        private toastrService: ToastrService,
    ) { }

    user: User;

    roles: String[];

    /**
    * Retrieves the information of the author who the user intends
    * to update
    */
    login(): void {
        console.log('woot')
        this.authService.login(this.user.role)
    }

    /**
    * This function will initialize the component
    */
    ngOnInit() {
        this.user = new User();
        this.roles = ['Administrator', 'Assistant'];
    }

    /**
    * This function will be called when the user chooses another author to edit
    */
    ngOnChanges() {
        this.ngOnInit();
    }

}
