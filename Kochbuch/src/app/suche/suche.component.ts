import { Component, OnInit } from '@angular/core';
import { AjaxService } from "../_services/ajax.service";
import { ActivatedRoute } from "@angular/router";
import {MessageService} from "../_services/message.service";


/**
 @author Team Chrocorg: Yoco Harrmann, Christian Werner, Georg Frey
 */

@Component({
  selector: 'app-suche',
  templateUrl: './suche.component.html',
  styleUrls: ['./suche.component.css']
})
export class SucheComponent implements OnInit {

  private liste: any[];     //Warning hier ignorieren, liste wird im HTML gebraucht um alle Ergebnisse der Suche anzuzeigen
  private option: any;
  private suchtext: string;

  constructor(private ajaxService: AjaxService,
              private route: ActivatedRoute,
              private messageService: MessageService) {
  }



  ngOnInit() {
    //Legt fest, welcher Radiobutton ausgewählt wird, wenn die Seite aufgerufen wird
    if (this.route.snapshot.params['option'] == undefined ||    //Alle möglichen versuchten User-Sabotagen abfangen.
      this.route.snapshot.params['option'] == "undefined" ||
      this.route.snapshot.params['option'] == null ||
      this.route.snapshot.params['option'] == "null")
    {
      this.option = 1;                                          //Default
    }
    else {                                                    //Andere Radio-Buttons als das Default
      this.option = Number.parseInt(this.route.snapshot.params['option']);
    }

    this.suchtext = this.route.snapshot.params['suchtext'];     //Holt den Parameter aus der URL und speichert ihn in die lokale Variable

    if (this.suchtext == "undefined") {
      this.suchtext = '';
    }

    this.suchen();        //Nach dem laden der Website die Suche ausführen
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
          break;
        case 4:
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
    this.sendMessage();
  }

  getRezeptebyName(name: string) {
    this.ajaxService.getRezepteByName(name).subscribe((response) => {
      console.log(response);
      this.liste = response;
      return
    });
    this.sendMessage();
  }


  //Diese beiden Funktionen werden benötigt, um Daten das andere Component (Rezeptliste) zu "senden"
  sendMessage(): void {
    this.messageService.sendMessage( this.liste );
  }

  clearMessage(): void {
    this.messageService.clearMessage();
  }

}
