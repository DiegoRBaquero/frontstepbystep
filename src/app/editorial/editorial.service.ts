import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';

import { Editorial } from './editorial';
import { Book } from '../book/book';

import { environment } from '../../environments/environment';
const API_URL = environment.apiURL;
const editorials = '/editorials';
const books = '/books';

/**
* The service provider for everything related to editorials
*/
@Injectable()
export class EditorialService {

    /**
    * Constructor of the service
    * @param http The HttpClient - This is necessary in order to perform requests
    */
    constructor(private http: HttpClient) { }

    /**
    * Retrieves the list of editorials in the BookStore
    * @returns The list of editorials
    */
    getEditorials(): Observable<Editorial[]> {
        return this.http.get<Editorial[]>(API_URL + editorials).catch(err => this.handleError(err));
    }

    /**
    * Retrieves an editorial given its id
    * @param editorialId The editorial's id
    * @returns The editorial
    */
    getEditorial(editorialId): Observable<Editorial> {
        return this.http.get<Editorial>(API_URL + editorials + '/' + editorialId).catch(err => this.handleError(err));
    }

    /**
    * Retrieves the list of books published by an editorial
    * @param editorialId The editorial's id
    * @returns The editorial's books
    */
    getBooksOfEditorial(editorialId): Observable<Book[]> {
        return this.http.get<Book[]>(API_URL + editorials + '/' + editorialId + books).catch(err => this.handleError(err));
    }

    /**
    * Creates an editorial
    * @param editorial The editorial which will be created
    * @returns The confirmation of the editorial's creation
    */
    createEditorial(editorial): Observable<boolean> {
        return this.http.post<boolean>(API_URL + editorials, editorial).catch(err => this.handleError(err));
    }

    /**
    * Updates an editorial
    * @param editorial The editorial which will be update
    * @returns The confirmation of the editorial's update
    */
    updatEditorial(editorial): Observable<boolean> {
        return this.http.put<boolean>(API_URL + editorials + '/' + editorial.id, editorial).catch(err => this.handleError(err));
    }

    /**
    * Deletes an editorial and all the books published by it
    * @param editorialId The editorial which will be deleted
    * @returns True if the editorial was deleted, false otherwise
    */
    deleteEditorial(editorialId): Observable<boolean> {
        return this.http.delete<boolean>(API_URL + editorials + '/' + editorialId).catch(err => this.handleError(err));
    }

    /**
    * The function which handles the errors generated by the requests
    * @param error The error which the API REST returned
    */
    private handleError(error: any) {
        return throwError(error.error.errorMessage);
    }
}
