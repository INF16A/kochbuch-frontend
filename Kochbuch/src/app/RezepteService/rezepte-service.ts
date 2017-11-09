import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { User } from '../user.model';
import { Pic } from '../pic.model';
import { Tag } from '../tag.model';
import { RecipeIngredient } from '../mapRecipeIngredient.model';
import { Comment } from 'app/KommentarService/kommentar-service';

/**
 * @author Daniel Abel
 * @author Alexander Krieg
 * 
 * 
 * @author
 * Team Chrocorg: Yoco Harrmann, Christian Werner und Georg Frey
 *
 * 
 * @author Leandro Späth
 * @author Armin Beck
 * @author Patrick Hahn
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
export class RezepteService {
    constructor(private http: HttpClient) {
    }
    private allRecipes: Observable<Recipe[]>;

    public getRecipeById(id: number): Observable<Recipe> {
        return this.http.get<Recipe>(environment.backendUrl + "/recipe/" + id);
    }
    public getAllRecipes(): Observable<Recipe[]> {
        if (this.allRecipes) { return this.allRecipes; }
        return this.allRecipes = this.http.get<Recipe[]>(environment.backendUrl + "/recipes");
    }
    public getRezepteByTag(tag: string): Observable<Array<Recipe>> {
        return this.http.get<Array<Recipe>>(environment.backendUrl + "/recipes/{tag}?tag=" + tag)
    }
    public getRezepteByName(name: string): Observable<Array<any>> {
        return this.http.get<Array<any>>(environment.backendUrl + "/recipes/{name}?name=" + name)
    }

}
