import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from '../book/book-list/book-list.component';
import { AuthorListComponent } from '../author/author-list/author-list.component';
import { EditorialListComponent } from '../editorial/editorial-list/editorial-list.component';
import { BookDetailComponent } from '../book/book-detail/book-detail.component';
import { AuthorDetailComponent } from '../author/author-detail/author-detail.component';
import { EditorialDetailComponent } from '../editorial/editorial-detail/editorial-detail.component';
import { BookCreateComponent } from '../book/book-create/book-create.component';
import { BookEditComponent } from '../book/book-edit/book-edit.component';
import { AuthLoginComponent } from '../auth/auth-login/auth-login.component';
import { AuthSignUpComponent } from '../auth/auth-sign-up/auth-sign-up.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [

    {
        path: 'books',
        children: [
            {
                path: 'list',
                component: BookListComponent
            },
            {
                path: ':id/details',
                component: BookDetailComponent,
                runGuardsAndResolvers: 'always'
            },
            {
                path: ':id/edit',
                component: BookEditComponent,
                  canActivate: [NgxPermissionsGuard],
                  data: {
                    permissions: {
                      only: ['ADMIN', 'MODERATOR'],
                      except: ['GUEST']
                    }
                  }
            },
            {
                path: 'add',
                component: BookCreateComponent
            }
        ]
    },
    {
        path: 'authors',
        children: [
            {
                path: 'list',
                component: AuthorListComponent
            },
            {
                path: ':id',
                component: AuthorDetailComponent
            }
        ]
    },
    {
        path: 'editorials',
        children: [
            {
                path: 'list',
                component: EditorialListComponent
            },
            {
                path: ':id',
                component: EditorialDetailComponent
            }
        ]
    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                component: AuthLoginComponent
            },
            {
                path: 'sign-up',
                component: AuthSignUpComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule {

}
