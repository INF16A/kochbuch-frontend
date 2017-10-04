import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlleRezepteComponent } from './alle-rezepte.component';

describe('AlleRezepteComponent', () => {
  let component: AlleRezepteComponent;
  let fixture: ComponentFixture<AlleRezepteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlleRezepteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlleRezepteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
