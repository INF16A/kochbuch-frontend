import { TestBed, inject } from '@angular/core/testing';

import { RezeptService } from './rezept.service';

describe('RezeptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RezeptService]
    });
  });

  it('should ...', inject([RezeptService], (service: RezeptService) => {
    expect(service).toBeTruthy();
  }));
});
