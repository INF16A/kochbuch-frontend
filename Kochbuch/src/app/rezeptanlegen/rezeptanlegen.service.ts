import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import { IngredientSmall } from "./rezeptanlegen.model";
import { Tag } from "../tag.model";
import { environment } from "environments/environment";

/**
 * @author Thomas Hörner
 */
@Injectable()
export class TagSearchService {

  private baseUrl = environment.backendUrl + '/tag/search?q=';  // URL to web api

  constructor(private http: Http) {
  }

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

  private baseUrl = environment.backendUrl + '/ingredient/search?q=';  // URL to web api

  constructor(private http: Http) {
  }

  search(text: string): Promise<IngredientSmall[]> {
    let url = this.baseUrl + text;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json() as IngredientSmall[];
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}

@Injectable()
export class RezeptanlegenService {
  private baseUrl = environment.backendUrl + '/recipe/create';  // URL to web api

  constructor(private http: Http) {
  }

  create(recipe: string): Promise<any> {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl, JSON.stringify(recipe), options)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
