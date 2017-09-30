import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rezeptliste',
  templateUrl: './rezeptliste.component.html',
  styleUrls: ['./rezeptliste.component.css']
})
export class RezeptlisteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  getData() {
    return [
      {
        id: "0000-0000-000000-000000",
        name: "Maultaschen",
        beschreibung: "Ein sehr leckeres Gericht aus dem Schwabenland.",
        aufwandmin: 20,
        schwierigkeit: 0,
        bewertung: 1,
        creator: "Armin Beck",
        creatorDate: "2017-10-12",
        img: "../assets/320px-Schwäbische_Maultaschen.JPG",
        forpersons: 2,
        tags:["Schwäbisch","lecker"]
      },
      {
        id: "0000-0000-000000-000000",
        name: "Schneckle",
        beschreibung: "Schneckle isst man halt in Frankreich, is halt so. ",
        aufwandmin: 20,
        schwierigkeit: 2,
        bewertung: 0,
        creator: "Armin Beck",
        creatorDate: "2017-10-11",
        img: "../assets/320px-Cooked_snails.JPG",
        forpersons: 1,
        tags:["Französisch","nicht lecker","exotisch","komisch"]
      },
      {
        id: "0000-0000-000000-000000",
        name: "Spaghetti Carbonara",
        beschreibung: "Singularis Porcus!",
        aufwandmin: 20,
        schwierigkeit: 1,
        bewertung: -1,
        creator: "Patrick Hahn",
        creatorDate: "2017-10-11",
        img: "../assets/320px-Spaghetti_alla_Carbonara_2.jpg",
        forpersons: 1,
        tags:["Italienisch","lecker"]
      },
      {
        id: "0000-0000-000000-000000",
        name: "Maultaschen",
        beschreibung: "Ein sehr leckeres Gericht aus dem Schwabenland.",
        aufwandmin: 20,
        schwierigkeit: 0,
        bewertung: 1,
        creator: "Armin Beck",
        creatorDate: "2017-10-12",
        img: "../assets/320px-Schwäbische_Maultaschen.JPG",
        forpersons: 2,
        tags:["Schwäbisch","lecker"]
      },
      {
        id: "0000-0000-000000-000000",
        name: "Schneckle",
        beschreibung: "Schneckle isst man halt in Frankreich, is halt so. ",
        aufwandmin: 20,
        schwierigkeit: 2,
        bewertung: 0,
        creator: "Armin Beck",
        creatorDate: "2017-10-11",
        img: "../assets/320px-Cooked_snails.JPG",
        forpersons: 1,
        tags:["Französisch","nicht lecker","exotisch","komisch"]
      },
      {
        id: "0000-0000-000000-000000",
        name: "Spaghetti Carbonara",
        beschreibung: "Singularis Porcus!",
        aufwandmin: 20,
        schwierigkeit: 1,
        bewertung: -1,
        creator: "Patrick Hahn",
        creatorDate: "2017-10-11",
        img: "../assets/320px-Spaghetti_alla_Carbonara_2.jpg",
        forpersons: 1,
        tags:["Italienisch","lecker"]
      },
      {
        id: "0000-0000-000000-000000",
        name: "Maultaschen",
        beschreibung: "Ein sehr leckeres Gericht aus dem Schwabenland.",
        aufwandmin: 20,
        schwierigkeit: 0,
        bewertung: 1,
        creator: "Armin Beck",
        creatorDate: "2017-10-12",
        img: "../assets/320px-Schwäbische_Maultaschen.JPG",
        forpersons: 2,
        tags:["Schwäbisch","lecker"]
      },
      {
        id: "0000-0000-000000-000000",
        name: "Schneckle",
        beschreibung: "Schneckle isst man halt in Frankreich, is halt so. ",
        aufwandmin: 20,
        schwierigkeit: 2,
        bewertung: 0,
        creator: "Armin Beck",
        creatorDate: "2017-10-11",
        img: "../assets/320px-Cooked_snails.JPG",
        forpersons: 1,
        tags:["Französisch","nicht lecker","exotisch","komisch"]
      },
      {
        id: "0000-0000-000000-000000",
        name: "Spaghetti Carbonara",
        beschreibung: "Singularis Porcus!",
        aufwandmin: 20,
        schwierigkeit: 1,
        bewertung: -1,
        creator: "Patrick Hahn",
        creatorDate: "2017-10-11",
        img: "../assets/320px-Spaghetti_alla_Carbonara_2.jpg",
        forpersons: 1,
        tags:["Italienisch","lecker"]
      }
    ];
  }
}
