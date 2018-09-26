import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BookService } from '../book.service';
import { Review } from '../review';

@Component({
    selector: 'app-book-reviews',
    templateUrl: './book-review-list.component.html',
    styleUrls: ['./book-review-list.component.css']
})
export class BookReviewListComponent implements OnInit, OnChanges {

    /**
    * The constructor of the component
    * @param bookService The book service which communicates with the API
     */
    constructor(
        private bookService: BookService
    ) { }

    /**
    * The list of reviews of the book
    */
    reviews: Review[];

    /**
    * The id of the book whose reviews we want to show
    * This attribute is set by the parent component
    */
    @Input() book_id: number;

    /**
    * The page (controls pagination)
    */
    page: number;

    /**
    * The function which obtains the reviews of the book
    */
    getReviews(): void {
        this.bookService.getReviews(this.book_id)
            .subscribe(reviews => this.reviews = reviews);
    }

    /**
    * The function which initializes the component.
    */
    ngOnInit() {
        this.reviews = [];
        this.page = 1;
        if (this.book_id != undefined) {
            this.getReviews();
        }
    }

    /**
    * The function which notices that the input which defines the book_id has changed.
    * If the book has changed, we update the reviews to show
    */
    ngOnChanges(changes: SimpleChanges) {
        if (changes['book_id']) {
            this.ngOnInit();
        }
    }
}
