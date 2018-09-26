import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { BookReviewListComponent } from '../book-review-list/book-review-list.component';

import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';

import { BookService } from '../book.service';

import { Book } from '../book';
import { Editorial } from '../../editorial/editorial';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit, OnDestroy {

    /**
    * The constructor of the component
    * @param bookService The book service which communicates with the API
    * @param route The route which helps to retrieves the id of the book to be shown
    * @param router The router which is needed to know when the component needs to reload
    * @param toastrService The toastr to show messages to the user
    * @param modalDialogService The popup provider
    * @param viewRef The container for the popup
    */
    constructor(
        private bookService: BookService,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private modalDialogService: ModalDialogService,
        private viewRef: ViewContainerRef
    ) {
        //This is added so we can refresh the view when one of the books in
        //the "Other books" list is clicked
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.ngOnInit();
            }
        });
    }

    /**
    * The book's id retrieved from the address
    */
    book_id: number;

    /**
    * The book whose details are shown
    */
    book: Book;

    /**
    * The other books shown in the sidebar
    */
    other_books: Book[];

    /**
    * The suscription which helps to know when a new book
    * needs to be loaded
    */
    navigationSubscription;

    /**
     * The child BookReviewListComponent
     */
    @ViewChild(BookReviewListComponent) reviewListComponent: BookReviewListComponent;

    /**
    * The function which retrieves the details of the book that
    * we want to show
    */
    getBook(): void {
        this.bookService.getBook(this.book_id)
            .subscribe(book => {
                this.book = book;
            }, err => {
                this.toastrService.error(err, "Error");
            });
    }

    /**
    * This function retrieves all the books in the Bookstore to show them in the list
    */
    getAllBooks(): void {
        this.bookService.getBooks()
            .subscribe(books => {
                this.other_books = books;
                this.other_books = this.other_books.filter(book => book.id !== this.book_id);
            }, err => {
                this.toastrService.error(err, "Error");
            });
    }

    /**
    * This function deletes the book from the BookStore 
    */
    deleteBook(): void {
        this.modalDialogService.openDialog(this.viewRef, {
            title: 'Delete a book',
            childComponent: SimpleModalComponent,
            data: { text: 'Are you sure your want to delete this book?' },
            actionButtons: [
                {
                    text: 'Yes',
                    buttonClass: 'btn btn-danger',
                    onAction: () => {
                        this.bookService.deleteBook(this.book_id).subscribe(books => {
                            this.toastrService.error("The book was successfully deleted", "Book deleted");
                            this.router.navigate(['books/list']);
                        }, err => {
                            this.toastrService.error(err, "Error");
                        });
                        return true;
                    }
                },
                { text: 'No', onAction: () => true }
            ]
        });
    }

    /**
     * The function called when a review is posted, so that the child component can refresh the list
     */
    updateReviews() {
        this.reviewListComponent.getReviews();
    }

    /**
    * The function which initilizes the component
    */
    ngOnInit() {
        this.book_id = +this.route.snapshot.paramMap.get('id');
        this.book = new Book();
        this.book.editorial = new Editorial();
        this.other_books = [];
        this.getBook();
        this.getAllBooks();
    }

    /**
    * This function helps to refresh the view when we need to load another book into it
    * when one of the other books in the list is clicked
    */
    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }
}
