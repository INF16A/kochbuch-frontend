import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezeptlisteComponent } from './rezeptliste.component';

describe('RezeptlisteComponent', () => {
  let component: RezeptlisteComponent;
  let fixture: ComponentFixture<RezeptlisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezeptlisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezeptlisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
