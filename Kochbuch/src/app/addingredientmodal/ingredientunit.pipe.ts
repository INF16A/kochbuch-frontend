/**
 * @author André Berberich
 */
import { IngredientUnit } from './ingredientunit.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ingredientunit'
})
export class IngredientUnitPipe implements PipeTransform {

  transform(value: number): string {
    return IngredientUnit[value];
  }

}