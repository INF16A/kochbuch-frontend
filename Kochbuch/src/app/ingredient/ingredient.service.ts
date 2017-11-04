import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Ingredient } from './ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

/**
 * @author André Berberich
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

  createIngredient(ingredient: Ingredient): Promise<Ingredient> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http
      .post(IngredientService.SERVER + '/ingredient', JSON.stringify(ingredient), options)
    .toPromise()
    .then(res => this.ingredientCreated(res.json() as Ingredient))
    .catch(this.handleError);
  }

  private ingredientCreated(ingredient: Ingredient){
    this.subject.next(ingredient);
    return ingredient;
  }

  getCreatedIngredients(): Observable<Ingredient> {
    return this.subject.asObservable();
}


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
