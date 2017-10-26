import {Component, OnInit} from "@angular/core";
import {RezeptListItem} from "../rezeptliste/RezeptListItem";
import {Observable} from "rxjs/Rx";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {RecipeServie, Recipe} from './alle-rezepte.service';

/**
 * @author Patrick Hahn
 * @author Armin Beck
 * @author Daniel Abel
 */

@Component({
  selector: 'app-alle-rezepte',
  templateUrl: './alle-rezepte.component.html',
  styleUrls: ['./alle-rezepte.component.css']
})
export class AlleRezepteComponent implements OnInit {
  searchValue: string;
  rezeptListe: Observable<Recipe[]>;

  constructor(private route: ActivatedRoute, private router: Router, private rezeptService: RecipeServie ) {

  }

  ngOnInit() {
    this.rezeptService.getAllRecipes(alleRezepte => {
      this.rezeptListe = this.route.queryParams
      .map(params => params['search'] || '')
      .debounceTime(250)
      .do(searchText => this.searchValue = searchText)
      .map(searchText => searchText.toLowerCase().trim())
      .flatMap(searchText => {
        return Observable.of(alleRezepte)
          .flatMap(liste => liste)
          .filter((rezept: Recipe, index: number): boolean => {
            const name = rezept.name.toLowerCase();
            const description = rezept.description.toLowerCase();
            if (name.includes(searchText)) {
              return true;
            }
            if (description.includes(searchText)) {
              return true;
            }
            return this.findTag(rezept, searchText);
          }).toArray();
      });
    });
  }

  public searchTextChanged(newVal) {
    this.router.navigate([], {queryParams: {search: newVal}, replaceUrl: true});
  }

  private findTag(rezept: Recipe, searchText: string): boolean {
    let found: boolean = false;
    const words = searchText.split(' ');
    rezept.tags
      .map(tag => tag.name.toLowerCase())
      .forEach(tag => {
        if (words.some((word): boolean => {
            return tag.includes(word);
          })) found = true;
      });
    return found;
  }

  getData(): Observable<Recipe[]> {
    return this.rezeptListe;
  }
}
