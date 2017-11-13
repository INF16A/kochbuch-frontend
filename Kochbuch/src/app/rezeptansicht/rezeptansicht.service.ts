import { Ingredient } from '../ingredient/ingredient.model';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../user.model';
import { Recipe } from "app/alle-rezepte/alle-rezepte.service";
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";

/**
 * @author Alexander Krieg
 * @author Patrick Eichert
 * @author Theresa Reus
 * @author Leandro Späth
 * @author Tim Kühnlein
 * @author Adrian Haase
 * @author Adrian Dumke
 */

//

/**
 * 💩 Alexander Krieg
 * Representiert ein Kommentar-Objekt
 */
export class Comment {
  public id: Number;
  public user: User;
  constructor(
    public text: String,
    public user_id: Number,
    public recipe_id: Number,
    public creationDate: Date
  ) { }
}

@Injectable()
export class RezeptansichtService {

  private static SERVER = environment.backendUrl;

  constructor(private http: Http, private HttpClient: HttpClient) {
  }


  // Theresa Reus, Patrick Eichert
  getRecipeData(recipeId: number, callback: (ar: Recipe) => void) {
    this.fetchRecipe(recipeId).subscribe((res: Response) => {
      callback(res.json());
    }, error => {
      if (callback) {
        callback(null);
      }
    });
  }

  private fetchRecipe(id: Number) {
    let url = environment.backendUrl + "/recipe/" + id;
    return this.http.get(url);
  }

  getIngredientByRecipe(recipeId: number, callback: (ar: Ingredient[]) => void) {
    this.fetchIngredientsByRecipe(recipeId).subscribe((res: Response) => {
      callback(res.json());
    }, error => {
      if (callback) {
        callback([]);
      }
    });
  }

  private fetchIngredientsByRecipe(id: Number) {
    let url = environment.backendUrl + "/recipe/" + id;
    return this.http.get(url);
  }


  /**
   * 💩 Alexander Krieg
   * Öffentliche Methode holt alle Kommentare zu einem Rezept.
   * Sind vom Server sortiert nach 'creationDate'.
   * @param recipeId
   * @param callback
   */
  public getRecipeComments(recipeId: Number, callback: (ar: Comment[]) => void) {
    this.fetchRecipeComments(recipeId).subscribe((res: Response) => {
      let ret = new Array<Comment>();
      res.json().forEach(element => {
        ret.push
      });
      let coms = res.json() as Comment[];
      callback(coms);
    }, error => {
      if (callback) {
        callback([]);
      }
    });
  }

  /**
   * 💩 Alexander Krieg
   * Private Methode holt alle Kommentare zu einem Rezept.
   * @param recipeId
   * @return HTTPPromise
   */
  private fetchRecipeComments(id: Number) {
    let url = RezeptansichtService.SERVER + "/comments/" + id;
    return this.http.get(url);
  }

  /**
   * 💩 Alexander Krieg
   * Führt einen Post-Request aus, um ein neuen Kommentar hinzuzufügen.
   * @param comment: Der Kommentar der hinzugefügt werden soll.
   * @param callback: Wird aufgerufen sobald eine Antwort vom Server kommt
   */
  public addComment(comment: Comment, callback?: (fail: boolean, data: any) => void) {
    let url = RezeptansichtService.SERVER + "/comment";
    this.HttpClient.post(url, comment).subscribe(data => callback(false, data), err => callback(true, err));
  }
  /**
   * 💩 Alexander Krieg
   * Marc Reinke
   * Führt einen Post-Request aus, um ein Kommenar zu löschen.
   * @param comment: Der Kommentar der hinzugefügt werden soll.
   * @param callback: Wird aufgerufen sobald eine Antwort vom Server kommt
   */
  public deleteComment(comment: Comment, callback?: (fail: boolean, data: any) => void) {
    let url = RezeptansichtService.SERVER + "/comment/" + comment.id;
    this.HttpClient.delete(url).subscribe(data => callback(false, data), err => callback(true, err));
  }


  //Kühnlein
  /**
   * Two wrapper methods which calls countRating with parameter 1 / -1
   * Method to run corresponding GET requests
   * @param {number} recipeid
   * @param {(amount: number) => void} callback to get the amount of up-/ downratings when loaded
   */
  public countRatingUp(recipeid: number, callback?: (amount: number) => void) {
    this.countRating(recipeid, 1, callback);
  }
  public countRatingDown(recipeid: number, callback?: (amount: number) => void) {
    this.countRating(recipeid, -1, callback);
  }
  private countRating(recipeid: number, count: number, callback?: (amount: number) => void) {
    let url = RezeptansichtService.SERVER + "/rating/";
    let method = (count == 1) ? "/count/up" : "/count/down";
    let headers = new Headers({ 'Accept': '*/*' });
    let options = new RequestOptions({ headers });
    this.http.get(url + recipeid + method, options).subscribe((res: Response) => {
      if (callback)
        callback(res.json());
    }, error => {
      if (callback) {
        callback(0);
      }
    });
  }

  /**
   * @param {number} recipeid
   * @param {number} userid
   * @param {(givenRating: number) => void} callback to get the previously given rating by the current user or 0 if there is none
   */
  public getGivenRating(recipeid: number, userid: number, callback?: (givenRating: number) => void) {
    let url = RezeptansichtService.SERVER + "/rating/";
    let headers = new Headers({ 'Accept': '*/*' });
    let options = new RequestOptions({ headers });
    this.http.get(url + recipeid + "/" + userid, options).subscribe((res: Response) => {
      if (callback)
        callback(res.json());
    }, error => {
      if (callback) {
        callback(0);
      }
    });
  }

  /**
   * Posts rating
   * @param {number} recipeid
   * @param {number} userid
   * @param {number} givenRating
   * @param {(update) => void} callback
   */
  public giveRating(recipeid: number, userid: number, givenRating: number, callback?: (update) => void) {
    let url = RezeptansichtService.SERVER + "/rating";
    let json = "{\"recipeId\":" + recipeid + ",\"userId\":" + userid + ",\"value\":" + givenRating + "}";
    let headers = new Headers({ 'Accept': '*/*', 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers });
    this.http.post(url, json, options).subscribe(data => {
      if (callback) {
        callback(1);
      }
    }, error => {
      console.log("true" + error);
    });;
  }
  //!Kühnlein
}
