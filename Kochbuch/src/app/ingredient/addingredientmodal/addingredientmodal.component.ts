import { IngredientService } from '../ingredient.service';
import { IngredientUnit } from '../ingredientunit.model';
import { Ingredient } from '../ingredient.model';
import { ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
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
  createdIngredient: Promise<Ingredient>;
  ingredient: Ingredient;
  units = IngredientUnit;
  unitKeys;
  service: IngredientService;
  modalRef: NgbModalRef;
  selectedUnit: number;

  constructor(private modalService: NgbModal, service: IngredientService) {
    this.unitKeys = Object.keys(this.units).filter(Number);
    this.service = service;
  }

  private initialize() {
    this.ingredient = new Ingredient();
    this.createdIngredient = undefined;
    this.selectedUnit = this.unitKeys[0];
  }

  openWithIngredientName(content, ingredientName: string): Promise<Ingredient> {
    this.initialize();
    this.ingredient.name = ingredientName;
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    return this.createdIngredient;
  }

  open(content): Promise<Ingredient> {
    this.initialize();
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    return this.createdIngredient;
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

  public addNewIngredient(): Promise<Ingredient> {
    this.ingredient.unit = this.selectedUnit;
    this.createdIngredient = this.service.createIngredient(this.ingredient);
    this.modalRef.close();
    return this.createdIngredient;
  }

  ngOnInit() {
  }

}
