/**
* This class represents a review of a book of the BookStore. 
* It contains all the information relevant to the review.
*/
export class Review {
    /**
    * The review's id
    */
    id: number;
    
    /**
    * The review's name
    */
    title: string;
    
    /**
    * The review's description
    */
    description: string;
    
    /**
    * The review's book's id
    */
    book_id: number;
    
    /**
    * The name of the book of the review
    */
    book: string;
}