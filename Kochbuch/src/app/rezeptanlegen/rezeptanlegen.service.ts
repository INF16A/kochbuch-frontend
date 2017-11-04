import {Injectable} from '@angular/core';
import {Http, Jsonp, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import {Ingredient, Tag} from "./rezeptanlegen.model";

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
        let t : Tag[] = response.json();
        return t;
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

  search(text: string): Promise<Ingredient[]> {
    let url = this.baseUrl + text;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json() as Ingredient[];
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
