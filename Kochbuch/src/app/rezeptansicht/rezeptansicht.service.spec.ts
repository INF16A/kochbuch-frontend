import { TestBed, inject } from '@angular/core/testing';

import { RezeptansichtService } from './rezeptansicht.service';

describe('RezeptansichtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RezeptansichtService]
    });
  });

  it('should ...', inject([RezeptansichtService], (service: RezeptansichtService) => {
    expect(service).toBeTruthy();
  }));
});
