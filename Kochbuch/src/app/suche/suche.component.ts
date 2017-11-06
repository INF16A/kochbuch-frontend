import {Component, OnInit} from '@angular/core';
/*import * as http from "http";*/
import {AjaxService} from "../_services/ajax.service";
import {isNullOrUndefined} from "util";
import {ActivatedRoute, Router} from "@angular/router";

/**
 * @author Team Chrocorg: Christian Werner, Yoco Harrmann und Georg Frey
 *         Philipp Steigler, Roman Würtemberger und Jarno Wagner
 */

@Component({
  selector: 'app-suche',
  templateUrl: './suche.component.html',
  styleUrls: ['./suche.component.css']
})
export class SucheComponent implements OnInit {

  private liste: any[]; //Warning hier ignorieren, liste wird im HTML gebraucht um alle Ergebnisse der Suche anzuzeigen
  private option: any;
  private suchtext: string;

  constructor(private ajaxService: AjaxService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.option = 1;    //Erster Radiobutton ist bei Seitenaufruf ausgefüllt
    this.suchtext = this.route.snapshot.params['suchtext'];  //Holt den Parameter aus der URL und speichert ihn in die lokale Variable
    this.getRezeptebyName(this.suchtext);
  }


  suchen() {
    if (this.suchtext) {        //Suche wird nur ausgeführt, wenn auch etwas im Suchfeld steht
      switch (this.option) {    //Je nach Radiobutton wird eine andere Suchfunktion angesteuert
        case 1:
          this.getRezeptebyName(this.suchtext);
          break;
        case 2:
          this.getRezeptebyTag(this.suchtext);
          break;
        case 3:
          this.getRezeptebyUser(this.suchtext);
          break;
        case 4:
          this.getRezeptebyIngredient(this.suchtext);
          break;
      }
    }
  }

  //* Nachfolgend die Funktionen, mit denen die Rezeptergebnisse geholt werden */

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

  getRezeptebyIngredient(ingredient: string) {
    this.ajaxService.getRezepteByTag(ingredient).subscribe((response) => {
      console.log(response);
      this.liste = response;
    });
  }

  getRezeptebyUser(user: string) {
    this.ajaxService.getRezepteByTag(user).subscribe((response) => {
      console.log(response);
      this.liste = response;
    });
  }

}
