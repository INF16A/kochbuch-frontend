import { Headers, Http, RequestOptions } from '@angular/http';
import { Ingredient } from './ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { IngredientSmall } from "../rezeptanlegen/rezeptanlegen.model";
import { environment } from "environments/environment";

/**
 * @author André Berberich
 * @author Thomas Hörner - Rückgabewert beim Anlegen geändert
 */

@Injectable()
export class IngredientService {

  private subject = new Subject<any>();

  constructor(private http: Http) { }

  getIngredients(): Promise<Ingredient[]> {
    return this.http.get(environment.backendUrl + '/ingredients')
      .toPromise()
      .then(response => response.json() as Ingredient[])
      .catch(this.handleError);
  }

  getIngredient(id: number): Promise<Ingredient> {
    return this.http.get(environment.backendUrl + '/ingredient/' + id)
      .toPromise()
      .then(response => response.json() as Ingredient)
      .catch(this.handleError);
  }

  createIngredient(ingredient: Ingredient): Promise<IngredientSmall> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http
      .post(environment.backendUrl + '/ingredient', JSON.stringify(ingredient), options)
      .toPromise()
      .then(res => this.ingredientCreated(res.json() as IngredientSmall))
      .catch(this.handleError);
  }

  private ingredientCreated(ingredient: IngredientSmall) {
    this.subject.next(ingredient);
    return ingredient;
  }

  getCreatedIngredients(): Observable<IngredientSmall> {
    return this.subject.asObservable();
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
