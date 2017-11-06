import {IngredientService} from '../ingredient.service';
import {IngredientUnit} from '../ingredientunit.model';
import {ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {isNumber} from "util";
import {Ingredient} from "app/ingredient/ingredient.model";

/**
 * @author André Berberich
 * @author Thomas Hörner
 */
@Component({
  selector: 'app-addingredientmodal',
  templateUrl: './addingredientmodal.component.html',
  styleUrls: ['./addingredientmodal.component.css']
})
export class AddingredientmodalComponent implements OnInit {

  @Input() preselectedIngredientName: string;

  units = IngredientUnit;
  newIngredient: FormGroup;

  constructor(public modalService: NgbModal, public service: IngredientService, public activeModal: NgbActiveModal, private _fb: FormBuilder) {
    this.newIngredient = _fb.group({
      name: ['',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      unit: [this.units.Gramm,
        [Validators.required]
      ],
      kcalPerUnit: ['',
        [
          Validators.required,
          AddingredientmodalComponent.negativeValidator()
        ]
      ],
      costPerUnit: ['',
        [
          Validators.required,
          AddingredientmodalComponent.negativeValidator()
        ]
      ],
    })
  }

  ngOnInit() {
    //initial value setzen
    this.newIngredient.patchValue({
      name: this.preselectedIngredientName != null ? this.preselectedIngredientName : '',
      unit: 1
    })
  }

  //unit keys
  get unitKeys() {
    return Object.keys(this.units).filter(Number);
  }

  //validator für negative zahlen
  static negativeValidator(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: any } => {
      if (!isNumber(c.value))
        return {'NaN': {valid: false}};
      if (isNumber(c.value) && c.value >= 0)
        return null;
      return {'negativ': {valid: false}};
    }
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

  private creatingIngredient: boolean = false;

  private addNewIngredient(): void {
    if (this.newIngredient.valid && !this.creatingIngredient) {
      //ausführlicher ingredient
      this.creatingIngredient = true;
      let ingr: Ingredient = Object.assign({}, this.newIngredient.value);

      let res: Promise<any> = this.service.createIngredient(ingr);
      res.then(value => {
        this.creatingIngredient = false;
        this.activeModal.close();
      }, reason => {
        this.creatingIngredient = false;
      })
    }
  }
}
