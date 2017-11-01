import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingredientmodalComponent } from './addingredientmodal.component';

describe('AddingredientmodalComponent', () => {
  let component: AddingredientmodalComponent;
  let fixture: ComponentFixture<AddingredientmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingredientmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingredientmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
