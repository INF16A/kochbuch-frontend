import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrierungsmodalComponent } from './registrierungsmodal.component';

describe('RegistrierungsmodalComponent', () => {
  let component: RegistrierungsmodalComponent;
  let fixture: ComponentFixture<RegistrierungsmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrierungsmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrierungsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
