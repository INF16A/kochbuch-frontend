import {Component, OnInit} from '@angular/core';
import {RezeptansichtService} from "./rezeptansicht.service";

@Component({
  selector: 'app-rezeptansicht',
  templateUrl: './rezeptansicht.component.html',
  styleUrls: ['./rezeptansicht.component.css']
})
export class RezeptansichtComponent implements OnInit {

  constructor(private rezeptAnsichtService: RezeptansichtService) {
  }

  paramId = 0;
  currentRecipe = {};
  personCount: number = 4;

  ngOnInit() {
    console.log(this.currentRecipe);
    this.rezeptAnsichtService.getRecipeData(this.paramId).subscribe(data => {
      this.currentRecipe = data;
      console.log(this.currentRecipe);
    });
  }

  /**
   *  Generates an array containing all numbers from min to max
   *
   *  e.g. range(1,4) returns [1, 2, 3, 4]
   *
   * @param min lower bound of array
   * @param max upper bound of array
   * @returns Array with numbers from min to max
   */

  range(min, max) {
    let items = [];
    for (let i = Math.floor(min); i <= Math.floor(max); i++) {
      items.push(i);
    }
    return items;
  }

}
