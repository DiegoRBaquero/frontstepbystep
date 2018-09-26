import { Editorial } from '../editorial/editorial';

/**
* This class represents a book of the BookStore. 
* It contains all the information relevant to the book.
*/
export class Book {
    /**
    * The book's id
    */
    id: number;

    /**
    * The book's name
    */
    name: string;

    /**
    * The book's ISBN
    */
    isbn: string;

    /**
    * The book's publish date
    */
    publish_date: any;

    /**
    * A brief summary of the book
    */
    description: string;

    /**
    * The location of the book's image
    */
    image: string;

    /**
    * The authors of the book
    */
    authors: any[];

    /**
    * The editorial of the book
    */
    editorial: Editorial;
}
