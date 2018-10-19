import { Component, OnInit } from '@angular/core';
import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions';

/**
 * The app component. This component is the base of the BookStore
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    /**
     * The title that appears on the NavBar and the web browser
     */
    title: String;

    /**
     * Assigns a title to the web page
     */
    ngOnInit(): void {
        this.title = "BookStore";
        this.permissionsService.loadPermissions(['GUEST', 'Administrator', 'Assistant']);
        this.roleService.addRole('GUEST', ["GUEST"])
    }

    /**
     * @ignore
     */
    constructor(private roleService: NgxRolesService, private permissionsService: NgxPermissionsService) { }

}





