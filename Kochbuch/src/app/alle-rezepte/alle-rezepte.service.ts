

import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../user.model';
import { Pic } from '../pic.model';
import { Tag } from '../tag.model';
import { RecipeIngredient } from '../mapRecipeIngredient.model';
import { Comment } from '../rezeptansicht/rezeptansicht.service';


/**
 * @author Daniel Abel
 * @author Alexander Krieg
 */

export class Recipe {
    comments: Comment[];
    createDate: Date;
    creator: User;
    description: string;
    difficulty: number;
    id: number;
    name: string;
    pics: Pic[];
    recipeIngredients: RecipeIngredient[];
    tags: Tag[];
    effort: number;
  }

  @Injectable()
  export class RecipeServie {

    private currRezept: Recipe[];

    constructor(private http: Http) {

    }

    public getRecipeByIdLocal(id: number) {
      for (const actRecipe of this.currRezept) {
        if (actRecipe.id == id) {
          return actRecipe;
        }
      }
      return null;
    }

    public getRecipeById(id:number, callback: (val: Recipe) => void) {
      this.fetchRecipeById(id).subscribe((res: Response) => {
        callback(res.json());
      });
    }


    private fetchRecipeById(id: number) {
      const url = 'http://localhost:8080/recipe/{id}?id=' + id;
      return this.http.get(url);
    }

    public getAllRecipes(callback: (ar: Recipe[]) => void) {
      this.fetchRecipe().subscribe((res: Response) => {
        this.currRezept = res.json();
        callback(res.json());
      });
    }
    private fetchRecipe() {
      const url = 'http://localhost:8080/recipes';
      return this.http.get(url);
    }

}
