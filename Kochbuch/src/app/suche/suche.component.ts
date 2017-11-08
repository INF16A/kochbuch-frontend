import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MessageService } from "../_services/message.service";
import { RezepteService } from "../RezepteService/rezepte-service";

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

  constructor(private RezepteService: RezepteService,
    private route: ActivatedRoute,
    private messageService: MessageService) {
    this.route.params.subscribe((event) => {
      this.suchtext = event.suchtext;
      this.suchen();
      return
    });
  }


  ngOnInit() {
    //Legt fest, welcher Radiobutton ausgewählt wird, wenn die Seite aufgerufen wird
    switch (this.route.snapshot.params['option']) {
      case "1":
        this.option = 1;
        break;
      case "2":
        this.option = 2;
        break;
      case "3":
        this.option = 3;
        break;
      case "4":
        this.option = 4;
        break;
      //Falls ein "manipulierter" Wert oder undefined in der URL steht, wird immer der erste Radiobutton benutzt
      default:
        this.option = 1;
        break;
    }

    //Holt den Parameter aus der URL und speichert ihn in die lokale Variable
    this.suchtext = this.route.snapshot.params['suchtext'];

    //Falls von der Startseite kein Suchbegriff eingegeben wurde, wird undefined übergeben, weshalb ich hier einen leeren String abspeicher
    if (this.suchtext == "undefined") {
      this.suchtext = '';
    }

    //Nach dem laden der Website die Suche ausführen
    this.suchen();
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

  // Nachfolgend die Funktionen, mit denen die Rezeptergebnisse geholt werden /

  getRezeptebyTag(tag: string) {
    this.RezepteService.getRezepteByTag(tag).subscribe((response) => {
      this.liste = response;
      this.sendMessage();
    });
  }

  getRezeptebyName(name: string) {
    this.RezepteService.getRezepteByName(name).subscribe((response) => {
      this.liste = response;
      this.sendMessage();
    });
  }


  //Diese beiden Funktionen werden benötigt, um Daten an das andere Component (Rezeptliste) zu übergeben
  sendMessage(): void {
    this.messageService.sendMessage(this.liste);
  }

  clearMessage(): void {
    this.messageService.clearMessage();
  }

}
