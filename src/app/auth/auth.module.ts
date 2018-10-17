import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthorListComponent } from './author-list/author-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../routing-module/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { AuthorCreateComponent } from './author-create/author-create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthorEditComponent } from './author-edit/author-edit.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        SharedModule,
        NgbModule
    ],
    declarations: [
        AuthorListComponent, AuthorDetailComponent, AuthorCreateComponent, AuthorEditComponent
    ],
    providers: [AuthService],
    bootstrap: [AuthorListComponent]
})
export class AuthModule { }
