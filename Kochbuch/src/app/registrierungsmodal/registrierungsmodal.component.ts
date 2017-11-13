import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {User} from "../user.model";
import {RegistrierungsService} from "./registrierungsmodal.service";


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

  user: User ;
  form: FormGroup;
  constructor(public modalService: NgbModal, public activeModal: NgbActiveModal, private _fb: FormBuilder, private registerService: RegistrierungsService) {

  }

  ngOnInit() {
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

  private register(){
    this.registerService.create(this.user);
    close();
  }



}

