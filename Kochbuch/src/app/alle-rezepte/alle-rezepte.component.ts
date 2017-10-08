import {Component, OnInit} from '@angular/core';
import {RezeptListItem} from "../rezeptliste/RezeptListItem";
import {Observable} from "rxjs";

@Component({
  selector: 'app-alle-rezepte',
  templateUrl: './alle-rezepte.component.html',
  styleUrls: ['./alle-rezepte.component.css']
})
export class AlleRezepteComponent implements OnInit {
  searchText: string = "";
  rezeptListe: RezeptListItem[];

  constructor() {
    console.log('Alle Rezepte');
  }

  ngOnInit() {
    this.getData().subscribe(rezeptListe => {
      this.rezeptListe = rezeptListe;
      console.log('Rezepte', this.rezeptListe);
    });
  }

  public searchTextChanged(newVal) {
    this.searchText = newVal;
    console.log('test');
    this.getData()
      .flatMap(rezeptListe => rezeptListe)
      .filter((rezept: RezeptListItem, index: number): boolean => {
        const name = rezept.name.toLowerCase();
        const description = rezept.beschreibung.toLowerCase();
        if (name.includes(this.searchText)) {
          return true;
        }
        if (description.includes(this.searchText)) {
          return true;
        }
        if(this.findTag(rezept)) {
          return true;
        }
        return false;
      }).toArray().subscribe(rezeptListe => this.rezeptListe = rezeptListe);
  }

  private findTag(rezept: RezeptListItem): boolean {
    let found: boolean = false;
    const words = this.searchText.split(' ');
    rezept.tags
      .map(tag => tag.toLowerCase())
      .forEach(tag => {
        if(words.some((word): boolean => {
          console.log(tag, word, tag.includes(word));
          return tag.includes(word);
        })) found = true;
      });
    return found;
  }

  getData(): Observable<RezeptListItem[]> {
    return Observable.of([
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
        tags: ["Schwäbisch", "lecker"]
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
        tags: ["Französisch", "nicht lecker", "exotisch", "komisch"]
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
        tags: ["Italienisch", "lecker"]
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
        tags: ["Schwäbisch", "lecker"]
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
        tags: ["Französisch", "nicht lecker", "exotisch", "komisch"]
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
        tags: ["Italienisch", "lecker"]
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
        tags: ["Schwäbisch", "lecker"]
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
        tags: ["Französisch", "nicht lecker", "exotisch", "komisch"]
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
        tags: ["Italienisch", "lecker"]
      }
    ]);
  }
}
