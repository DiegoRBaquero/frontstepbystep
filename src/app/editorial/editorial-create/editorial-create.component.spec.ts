import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialCreateComponent } from './editorial-create.component';

describe('EditorialCreateComponent', () => {
  let component: EditorialCreateComponent;
  let fixture: ComponentFixture<EditorialCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorialCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorialCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
