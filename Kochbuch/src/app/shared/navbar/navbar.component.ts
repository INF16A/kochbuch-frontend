import {Component, ComponentFactory, ComponentFactoryResolver, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { RegistrierungsmodalComponent } from "../../registrierungsmodal/registrierungsmodal.component";

/**
   @authors
  Annika Schatz
  Irina Eurich
  Tobias Bloch
  Endrit Çallaki
*/

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private modalService: NgbModal) {
  }

  public openModal():void{


  const modalReg = this.modalService.open( RegistrierungsmodalComponent);
  }

  public closeModal():void{
  window.alert("close");
  }

  ngOnInit() {

    }
}

