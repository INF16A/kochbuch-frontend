import { IngredientService } from '../ingredient.service';
import { IngredientUnit } from '../ingredientunit.model';
import { Ingredient } from '../ingredient.model';
import { ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

/**
 * @author André Berberich
 */

@Component({
  selector: 'app-addingredientmodal',
  templateUrl: './addingredientmodal.component.html',
  styleUrls: ['./addingredientmodal.component.css']
})
export class AddingredientmodalComponent implements OnInit {

  
  @Input() preselectedIngredientName: string;
  closeResult: string;
  createdIngredient: Promise<Ingredient>;
  ingredient: Ingredient;
  units = IngredientUnit;
  unitKeys;
  service: IngredientService;
  modalRef: NgbModalRef;
  selectedUnit: number;
  invalidFields: string[];

  constructor(private modalService: NgbModal, service: IngredientService) {
    this.unitKeys = Object.keys(this.units).filter(Number);
    this.service = service;
  }

  private initialize() {
    this.ingredient = new Ingredient();
    this.createdIngredient = undefined;
    this.selectedUnit = this.unitKeys[0];
    this.invalidFields = [];
    if(this.preselectedIngredientName !== undefined && this.preselectedIngredientName.length > 0){
      this.ingredient.name = this.preselectedIngredientName;
    }
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
      return `with: ${reason}`;
    }
  }

  public addNewIngredient(): Promise<Ingredient> {
    this.ingredient.unit = this.selectedUnit;
    this.invalidFields = [];
    const valid = this.validateIngredient();
    if (valid) {
      this.createdIngredient = this.service.createIngredient(this.ingredient);
      this.modalRef.close();
      return this.createdIngredient;
    }
  }

  validateIngredient(): boolean {
    let isValid = true;

    this.validateName();
    this.validateNonNegativeValue('kcalPerUnit');
    this.validateNonNegativeValue('kcalPerUnit');
    if (this.invalidFields.length !== 0 || !(this.ingredient.unit >= 1 && this.ingredient.unit <= 6 )) {
      isValid = false;
    }

    return isValid;
  }

  private fieldIsInvalid(fieldName: String): Boolean {
    return this.invalidFields.some(f => f === fieldName);
  }

  inputValueChanged(field) {
    switch (field) {
      case 'kcalPerUnit':
        this.validateNonNegativeValue('kcalPerUnit');
        break;
      case 'costPerUnit':
        this.validateNonNegativeValue('costPerUnit');
        break;
      case 'name':
        this.validateName();
        break;
    }
  }

  private validateName() {
    if (!this.ingredient.name || this.ingredient.name.length === 0
      || !this.ingredient.name.trim() || this.ingredient.name.startsWith(' ')) {
      const index = this.invalidFields.indexOf('name');
      if (index < 0) {
        this.invalidFields.push('name');
      }
    } else {
      const index = this.invalidFields.indexOf('name');
      if (index > -1) {
        this.invalidFields.splice(index, 1);
      }
    }
  }

  private validateNonNegativeValue(fieldname: string) {
    let value = undefined;
    switch (fieldname) {
      case 'kcalPerUnit':
        value = this.ingredient.kcalPerUnit;
        break;
      case 'costPerUnit':
        value = this.ingredient.costPerUnit;
        break;
    }
    if (!value === undefined || value < 0) {
      const index = this.invalidFields.indexOf(fieldname);
      if (index < 0) {
        this.invalidFields.push(fieldname);
      }
    } else {
      const index = this.invalidFields.indexOf(fieldname);
      if (index > -1) {
        this.invalidFields.splice(index, 1);
      }
    }
  }

  ngOnInit() {
  }

}
