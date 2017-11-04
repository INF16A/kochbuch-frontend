import {Headers, Http, RequestOptions} from '@angular/http';
import {Ingredient} from './ingredient.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {IngredientLight} from "../rezeptanlegen/rezeptanlegen.model";

/**
 * @author André Berberich
 * @author Thomas Hörner - Rückgabewert beim Anlegen geändert
 */

@Injectable()
export class IngredientService {

  private static SERVER = 'http://localhost:8080';
  private subject = new Subject<any>();

  constructor(private http: Http) { }

  getIngredients(): Promise<Ingredient[]>{
    return this.http.get(IngredientService.SERVER + '/ingredients')
    .toPromise()
    .then(response => response.json() as Ingredient[])
    .catch(this.handleError);
  }

  getIngredient(id: number): Promise<Ingredient>{
    return this.http.get(IngredientService.SERVER + '/ingredient/' +id)
    .toPromise()
    .then(response => response.json() as Ingredient)
    .catch(this.handleError);
  }

  createIngredient(ingredient: Ingredient): Promise<IngredientLight> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http
      .post(IngredientService.SERVER + '/ingredient', JSON.stringify(ingredient), options)
    .toPromise()
    .then(res => this.ingredientCreated(res.json() as IngredientLight))
    .catch(this.handleError);
  }

  private ingredientCreated(ingredient: IngredientLight){
    this.subject.next(ingredient);
    return ingredient;
  }

  getCreatedIngredients(): Observable<IngredientLight> {
    return this.subject.asObservable();
}

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
