import { IngredientUnit } from './ingredientunit.model';
import { Ingredient } from './ingredient.model';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

/**
 * @author André Berberich
 */

@Component({
  selector: 'app-addingredientmodal',
  templateUrl: './addingredientmodal.component.html',
  styleUrls: ['./addingredientmodal.component.css']
})
export class AddingredientmodalComponent implements OnInit {
  closeResult: string;
  ingredient: Ingredient;
  units = IngredientUnit;
  unitKeys;

  constructor(private modalService: NgbModal) {
    this.ingredient = new Ingredient()
    this.ingredient.name = "";    
    this.unitKeys = Object.keys(this.units).filter(Number)
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  public addNewIngredient(){

  }

  ngOnInit() {
  }

}
