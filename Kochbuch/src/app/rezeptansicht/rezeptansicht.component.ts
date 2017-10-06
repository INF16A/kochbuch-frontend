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


  ngOnInit() {
    console.log(this.currentRecipe);
    this.rezeptAnsichtService.getRecipeData(this.paramId).subscribe(data => {
      this.currentRecipe = data;
      console.log(this.currentRecipe);
    });
  }

  range(min, max) {
    let items = [];
    for (let i = Math.floor(min); i <= Math.floor(max); i++) {
      items.push(i);
    }
    return items;
  }

}
