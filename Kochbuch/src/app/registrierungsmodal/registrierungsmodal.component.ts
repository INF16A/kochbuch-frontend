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

  form: FormGroup;
  @ViewChild('email')
  private email: HTMLInputElement;
  @ViewChild('username')
  private username: HTMLInputElement;
  @ViewChild('password')
  private password: HTMLInputElement;
  @ViewChild('passwordRepeat')
  private passwordRepeat: HTMLInputElement;
  private error: boolean = false;
  constructor(public modalService: NgbModal, public activeModal: NgbActiveModal, private _fb: FormBuilder, private registrierungsService: RegistrierungsService) {

  }

  ngOnInit() {
    //initial value setzen

  }
  register() {
    this.registrierungsService.registerUser(
      this.email.value,
      this.username.value,
      this.password.value,
      this.passwordRepeat.value).subscribe(
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

