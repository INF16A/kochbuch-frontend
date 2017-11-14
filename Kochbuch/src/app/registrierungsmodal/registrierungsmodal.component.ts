import { Component, OnInit , ViewChild} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { RegistrierungsService } from "./registrierung.service";


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

  public model: { user: string, passwort: string, passwort1: string, email: string };
  private error: boolean = false;
  constructor(public modalService: NgbModal, public activeModal: NgbActiveModal, private _fb: FormBuilder, private registrierungsService: RegistrierungsService)
  {
    { this.model = { user: "", passwort: "", passwort1: "", email: "", }; }
  }

  ngOnInit() {
    //initial value setzen

  }
  register() {
    this.registrierungsService.registerUser(
      this.model.email,
      this.model.user,
      this.model.passwort,
      this.model.passwort1).subscribe(
      data => this.activeModal.close("successful"),
      error => this.error = true
    );
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

