import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAddReviewComponent } from './book-add-review.component';

describe('BookAddReviewComponent', () => {
  let component: BookAddReviewComponent;
  let fixture: ComponentFixture<BookAddReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAddReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAddReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
