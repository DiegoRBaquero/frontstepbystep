import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '../../routing-module/app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppModule } from '../../app.module';

import { AuthorListComponent } from './author-list.component';
import { Auth } from '../auth';
import { AuthService } from '../auth.service';

describe('AuthorComponent', () => {
    let component: AuthorListComponent;
    let fixture: ComponentFixture<AuthorListComponent>;
    const authors: Auth[] = require('../../../assets/authors.json');

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppRoutingModule, HttpClientModule, AppModule],
            declarations: [],
            providers: [{ provide: APP_BASE_HREF, useValue: '' }, AuthService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthorListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a list of authors', () => {
        component.authors = authors;
        expect(component.authors.length).toEqual(authors.length);
    });

    it('an author should be an author (first and last)', () => {
        component.authors = authors;
        expect(component.authors[0].birthDate).toEqual(authors[0].birthDate);
        expect(component.authors[authors.length - 1].birthDate).toEqual(authors[authors.length - 1].birthDate);
    });

});