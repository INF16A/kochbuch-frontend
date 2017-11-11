import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import {IngredientSmall} from "./rezeptanlegen.model";
import {Tag} from "../tag.model";
import {HttpClient} from "@angular/common/http";

/**
 * @author Thomas Hörner
 */
@Injectable()
export class TagSearchService {

  private baseUrl = 'http://localhost:8080/tag/search?q=';  // URL to web api

  constructor(private http: HttpClient) {
  }

  search(text: string): Promise<Tag[]> {
    let url = this.baseUrl + text;
    return this.http.get<Tag[]>(url)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}

@Injectable()
export class IngredientSearchService {

  private baseUrl = 'http://localhost:8080/ingredient/search?q=';  // URL to web api

  constructor(private http: HttpClient) {
  }

  search(text: string): Promise<IngredientSmall[]> {
    let url = this.baseUrl + text;
    return this.http.get<IngredientSmall[]>(this.baseUrl + text)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}

@Injectable()
export class RezeptanlegenService {
  private baseUrl = 'http://localhost:8080/recipe/create';  // URL to web api

  constructor(private http: HttpClient) {
  }

  create(recipe: string): Promise<any> {
    return this.http.post(this.baseUrl, recipe)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
