import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
 * 
 * @author Armin Beck
 * @author Patrick Hahn
 * @author Leandro Späth
 */
@Injectable()
export class TagSearchService {

  private baseUrl = environment.backendUrl + '/tag/search?q=';  // URL to web api

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

  private baseUrl = environment.backendUrl + '/ingredient/search?q=';  // URL to web api

  constructor(private http: HttpClient) {
  }

  search(text: string): Promise<IngredientSmall[]> {
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
  private baseUrl = environment.backendUrl + '/recipe/create';  // URL to web api

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
