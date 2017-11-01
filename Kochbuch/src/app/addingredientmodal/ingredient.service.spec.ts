import { TestBed, inject } from '@angular/core/testing';

import { IngredientService } from './ingredient.service';

describe('IngredientserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngredientService]
    });
  });

  it('should ...', inject([IngredientService], (service: IngredientService) => {
    expect(service).toBeTruthy();
  }));
});
