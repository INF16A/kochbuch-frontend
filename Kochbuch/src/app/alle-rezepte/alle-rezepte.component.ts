import {Component, OnInit} from "@angular/core";
import {RezeptListItem} from "../rezeptliste/RezeptListItem";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

/**
 * @author Patrick Hahn
 * @author Armin Beck
 */

@Component({
  selector: 'app-alle-rezepte',
  templateUrl: './alle-rezepte.component.html',
  styleUrls: ['./alle-rezepte.component.css']
})
export class AlleRezepteComponent implements OnInit {
  searchValue: string;
  rezeptListe: Observable<RezeptListItem[]>;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.rezeptListe = this.route.queryParams
      .map(params => params['search'] || '')
      .debounceTime(250)
      .do(searchText => this.searchValue = searchText)
      .map(searchText => searchText.toLowerCase().trim())
      .flatMap(searchText => {
        return this.getData()
          .flatMap(liste => liste)
          .filter((rezept: RezeptListItem, index: number): boolean => {
            const name = rezept.name.toLowerCase();
            const description = rezept.beschreibung.toLowerCase();
            if (name.includes(searchText)) {
              return true;
            }
            if (description.includes(searchText)) {
              return true;
            }
            return this.findTag(rezept, searchText);
          }).toArray();
      });
  }

  ngOnInit() {
  }

  public searchTextChanged(newVal) {
    this.router.navigate([], {queryParams: {search: newVal}, replaceUrl: true});
  }

  private findTag(rezept: RezeptListItem, searchText: string): boolean {
    let found: boolean = false;
    const words = searchText.split(' ');
    rezept.tags
      .map(tag => tag.toLowerCase())
      .forEach(tag => {
        if (words.some((word): boolean => {
            return tag.includes(word);
          })) found = true;
      });
    return found;
  }

  getData(): Observable<RezeptListItem[]> {
    return Observable.of([
      {
        id: "0",
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
        id: "1",
        name: "Schneckle",
        beschreibung: "Schneckle isst man halt in Frankreich, is halt so. ",
        aufwandmin: 20,
        schwierigkeit: 2,
        bewertung: 0,
        creator: "Armin Beck",
        creatorDate: "2017-10-11",
        img: "../assets/320px-Cooked_snails.JPG",
        forpersons: 1,
        tags: ["Französisch", "nicht-lecker", "exotisch", "komisch"]
      },
      {
        id: "2",
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
        id: "3",
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
        id: "4",
        name: "Schneckle",
        beschreibung: "Schneckle isst man halt in Frankreich, is halt so. ",
        aufwandmin: 20,
        schwierigkeit: 2,
        bewertung: 0,
        creator: "Armin Beck",
        creatorDate: "2017-10-11",
        img: "../assets/320px-Cooked_snails.JPG",
        forpersons: 1,
        tags: ["Französisch", "nicht-lecker", "exotisch", "komisch"]
      },
      {
        id: "5",
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
        id: "6",
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
        id: "7",
        name: "Schneckle",
        beschreibung: "Schneckle isst man halt in Frankreich, is halt so. ",
        aufwandmin: 20,
        schwierigkeit: 2,
        bewertung: 0,
        creator: "Armin Beck",
        creatorDate: "2017-10-11",
        img: "../assets/320px-Cooked_snails.JPG",
        forpersons: 1,
        tags: ["Französisch", "nicht-lecker", "exotisch", "komisch"]
      },
      {
        id: "8",
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
