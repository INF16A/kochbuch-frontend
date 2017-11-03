import {Component, OnInit} from '@angular/core';
/*import * as http from "http";*/
import {AjaxService} from "../_services/ajax.service";
import {isNullOrUndefined} from "util";
import {ActivatedRoute, Router} from "@angular/router";

/*
@author Team Chrocorg: Yoco Harrmann, Christian Werner, Georg Frey
*/

@Component({
  selector: 'app-suche',
  templateUrl: './suche.component.html',
  styleUrls: ['./suche.component.css']
})
export class SucheComponent implements OnInit {

  private liste: any[];
  private option: any;
  private suchtext: string;

  constructor(private ajaxService: AjaxService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  janstest() {
    console.log("irgendwas");
  }

  suchen() {
    if (this.suchtext) {        //Suche wird nur ausgeführt, wenn auch was im Suchfeld steht
      switch (this.option) {    //Je nach Radiobutton wird eine andere Suchfunktion angesteuert
        case 1:
          this.getRezeptebyName(this.suchtext);
          break;
        case 2:
          this.getRezeptebyTag(this.suchtext);
          break;
        case 3:
          break;
        case 4:
          break;
      }
    }
  }

  getRezeptebyTag(tag: string) {
    this.ajaxService.getRezepteByTag(tag).subscribe((response) => {
      console.log(response);
      this.liste = response;
    });
  }

  getRezeptebyName(name: string) {
    this.ajaxService.getRezepteByName(name).subscribe((response) => {
      console.log(response);
      this.liste = response;
    });
  }

}
