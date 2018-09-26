import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorialListComponent } from './editorial-list/editorial-list.component';
import { EditorialService } from './editorial.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../routing-module/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EditorialDetailComponent } from './editorial-detail/editorial-detail.component';
import { EditorialCreateComponent } from './editorial-create/editorial-create.component';
import { EditorialEditComponent } from './editorial-edit/editorial-edit.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [EditorialListComponent, EditorialDetailComponent, EditorialCreateComponent, EditorialEditComponent],
    providers: [EditorialService]
})
export class EditorialModule { }
