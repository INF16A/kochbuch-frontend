import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";


/**
@authors
Annika Schatz
Irina Eurich
Tobias Bloch
Endrit Çallaki

 */

@Component({
  selector: 'app-registrierungsmodal',
  templateUrl: './registrierungsmodal.component.html',
  styleUrls: ['./registrierungsmodal.component.css']
})
export class RegistrierungsmodalComponent implements OnInit {
  closeResult: string;

  form: FormGroup;
  constructor(public modalService: NgbModal, public activeModal: NgbActiveModal, private _fb: FormBuilder) {

  }

  ngOnInit() {
    //initial value setzen

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


}

