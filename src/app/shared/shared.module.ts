import { BookSidebarComponent } from './book-sidebar/book-sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../routing-module/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        NgxPaginationModule
     ],
    declarations: [
        BookSidebarComponent
    ],
    exports: [
        BookSidebarComponent
    ]
})
  
export class SharedModule {}