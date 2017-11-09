import { HttpClient } from '@angular/common/http';
import { Ingredient } from './ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { IngredientSmall } from "../rezeptanlegen/rezeptanlegen.model";
import { environment } from "environments/environment";

/**
 * @author André Berberich
 * @author Thomas Hörner - Rückgabewert beim Anlegen geändert
 * 
 * @author Armin Beck
 * @author Patrick Hahn
 * @author Leandro Späth
 */

@Injectable()
export class IngredientService {

  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  getIngredients(): Promise<Ingredient[]> {
    return this.http.get<Ingredient[]>(environment.backendUrl + '/ingredients')
      .toPromise()
      .catch(this.handleError);
  }

  getIngredient(id: number): Promise<Ingredient> {
    return this.http.get<Ingredient>(environment.backendUrl + '/ingredient/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  createIngredient(ingredient: Ingredient): Promise<IngredientSmall> {
    return this.http
      .post<IngredientSmall>(environment.backendUrl + '/ingredient', ingredient)
      .toPromise()
      .then(res => this.ingredientCreated(res))
      .catch(this.handleError);
  }

  getIngredientByRecipe(recipeId: number): Observable<Ingredient[]> {
    let url = environment.backendUrl + "/recipe/" + recipeId;
    return this.http.get<Ingredient[]>(url);
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
