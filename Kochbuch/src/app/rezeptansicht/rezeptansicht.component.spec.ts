import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezeptansichtComponent } from './rezeptansicht.component';

describe('RezeptansichtComponent', () => {
  let component: RezeptansichtComponent;
  let fixture: ComponentFixture<RezeptansichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezeptansichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezeptansichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
