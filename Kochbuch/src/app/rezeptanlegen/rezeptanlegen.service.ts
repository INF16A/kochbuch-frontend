import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import {IngredientLight, Recipe, Tag} from "./rezeptanlegen.model";

/**
 * @author Thomas Hörner
 */
@Injectable()
export class TagSearchService {

  private baseUrl = 'http://localhost:8080/tag/search?q=';  // URL to web api

  constructor(private http: Http) { }

  search(text: string): Promise<Tag[]> {
    let url = this.baseUrl + text;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json() as Tag[];
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}

@Injectable()
export class IngredientSearchService {

  private baseUrl = 'http://localhost:8080/ingredient/search?q=';  // URL to web api

  constructor(private http: Http) { }

  search(text: string): Promise<IngredientLight[]> {
    let url = this.baseUrl + text;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json() as IngredientLight[];
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}

@Injectable()
export class RezeptanlegenService {
  private baseUrl = 'http://localhost:8080/recipe/create';  // URL to web api

  constructor(private http: Http) { }

  create(recipe: Recipe): Promise<Recipe> {
    return this.http.post(this.baseUrl, JSON.stringify(recipe))
      .toPromise()
      .then(response => {
        return response.json() as Recipe;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
