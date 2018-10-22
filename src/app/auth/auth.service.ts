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
    constructor(private roleService: NgxRolesService, private permissionsService: NgxPermissionsService) { }

    start(): void {
        this.permissionsService.flushPermissions();
        this.roleService.flushRoles();
        this.permissionsService.loadPermissions(['edit_author_permission', 'delete_author_permission']);
        this.setGuestRole();
        this.printRole();
    }

    setGuestRole(): void {
        this.roleService.addRole('GUEST', ['']);
    }

    setAdministratorRole(): void {
        this.roleService.addRole('ADMIN', ['edit_author_permission', 'delete_author_permission']);
    }

    printRole(): void {
        console.log(this.roleService.getRoles());
    }

    /**
    * Retrieves the information of an author from the BookStore
    * @param authorId The id of the author
    * @returns The author details
    */
    login(role): void {
        this.roleService.flushRoles();
        this.roleService.addRole(role, [role]);
        this.printRole();
    }
}
