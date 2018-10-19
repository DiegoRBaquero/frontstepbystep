import { Injectable } from '@angular/core';
import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions'
import 'rxjs/add/operator/catch';

/**
* The service provider for everything related to authors
*/
@Injectable()
export class AuthService {

    /**
    * Constructor of the service
    * @param http The HttpClient - This is necessary in order to perform requests
    */
    constructor(private roleService: NgxRolesService, private permissionService: NgxPermissionsService) { }

    /**
    * Retrieves the information of an author from the BookStore
    * @param authorId The id of the author
    * @returns The author details
    */
    login(role): void {
        this.roleService.addRole(role, [role])
    }
}
