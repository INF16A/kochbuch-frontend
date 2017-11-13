import {HttpClient} from '@angular/common/http';
import {Ingredient} from './ingredient.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {IngredientSmall} from "../rezeptanlegen/rezeptanlegen.model";

/**
 * @author André Berberich
 * @author Thomas Hörner - Rückgabewert beim Anlegen geändert
 */

@Injectable()
export class IngredientService {

  private static SERVER = 'http://localhost:8080';
  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  getIngredients(): Promise<Ingredient[]>{
    return this.http.get<Ingredient[]>(IngredientService.SERVER + '/ingredients')
    .toPromise()
    .catch(this.handleError);
  }

  getIngredient(id: number): Promise<Ingredient>{
    return this.http.get<Ingredient>(IngredientService.SERVER + '/ingredient/' +id)
    .toPromise()
    .catch(this.handleError);
  }

  createIngredient(ingredient: Ingredient): Promise<IngredientSmall> {
    return this.http
      .post<IngredientSmall>(IngredientService.SERVER + '/ingredient', ingredient)
    .toPromise()
    .then(res => this.ingredientCreated(res))
    .catch(this.handleError);
  }

  private ingredientCreated(ingredient: IngredientSmall){
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
