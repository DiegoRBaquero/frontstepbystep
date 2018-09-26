import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from './book.service';
import { BookListComponent } from './book-list/book-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../routing-module/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookReviewListComponent } from './book-review-list/book-review-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookAddReviewComponent } from './book-add-review/book-add-review.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        SharedModule,
        NgxPaginationModule,
        NgbModule
    ],
    declarations: [
        BookListComponent, BookDetailComponent, BookReviewListComponent, BookCreateComponent, BookEditComponent, BookAddReviewComponent
    ],
    providers: [BookService],
    bootstrap: [BookListComponent]
})
export class BookModule { }
