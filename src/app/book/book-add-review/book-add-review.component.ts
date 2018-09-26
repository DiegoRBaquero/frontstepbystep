import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { Review } from '../review';
import { BookService } from '../book.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-book-add-review',
    templateUrl: './book-add-review.component.html',
    styleUrls: ['./book-add-review.component.css']
})
export class BookAddReviewComponent implements OnInit, OnChanges {

    /**
    * The constructor of the component
    * @param bookService The book service which communicates with the API
    * @param toastrService The toastr to show messages to the user
    */
    constructor(
        private bookService: BookService,
        private toastrService: ToastrService
    ) { }

    /**
    * The book's id
    */
    @Input() book_id: number;

    /**
    * The review to post
    */
    review: Review;

    /**
    * The Event Emitter which sends the signal when a review has just been posted
    * so that the list of reviews refreshes
    */
    @Output() updateReviews = new EventEmitter();

    /**
    * This function posts a review
    * @param reviewForm The form of the review
    */
    postReview(reviewForm: NgForm): void {
        this.review.book_id = this.book_id;
        this.bookService.postReview(this.review)
            .subscribe(() => {
                reviewForm.resetForm();
                this.updateReviews.emit();
                this.toastrService.success("The review was successfully posted", 'Review added');
            }, err => {
                this.toastrService.error(err, 'Error');
            });
    }

    /**
    * The function which initializes the component.
    */
    ngOnInit() {
        this.review = new Review();
    }

    /**
    * The function which notices that the input which defines the book_id has changed.
    * If the book has changed, we update the reviews to show
    */
    ngOnChanges() {
        this.ngOnInit();
    }

}
