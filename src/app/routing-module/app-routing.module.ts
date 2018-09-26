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
                component: BookEditComponent
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
