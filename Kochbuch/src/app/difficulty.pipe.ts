import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'difficulty'
})
export class DifficultyPipe implements PipeTransform {

  transform(value: number): string {
    return ["","Anfänger", "Fortgeschritten", "Fortgeschritten", "Fortgeschritten", "Profi"][value];
  }

}
