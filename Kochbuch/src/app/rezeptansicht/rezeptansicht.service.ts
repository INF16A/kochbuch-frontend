import { Ingredient } from '../ingredient/ingredient.model';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { User } from '../user.model';
import { Recipe, RezepteService } from "app/RezepteService/rezepte-service";
import { environment } from "environments/environment";

/**
 * @author Alexander Krieg
 * @author Patrick Eichert
 * @author Theresa Reus
 * @author Leandro Späth
 * @author Armin Beck
 * @author Patrick Hahn
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

  constructor(private http: HttpClient, private RezepteService: RezepteService) {
  }

  /**
   * @author Leandro Späth
   * Beispieldaten, wie sie die Seite erwartet
   */
  /*mockRecipe = {
   id: 0,
   name: 'Gebratenes Lachsfilet',
   description: 'Lecker Schmecker! <<insert more description here>>',
   difficultyOwner: 5,
   userId: 0,
   creation: new Date().toISOString(),
   image: 'assets/rezeptansicht/recipePictures/0.jpg'
   };*/
  //wanted to start building complete mock api here, but didn't
  //just built an object structure as it should be generated later

  /*
  mockData = {
    id: 0,
    name: 'Gebratenes Lachsfilet',
    description: 'Lecker Schmecker! <<insert more description here>>',
    difficultyOwner: 5,
    creatorId: 0,
    creatorName: 'Fiete',
    rating: 13,
    ratingCount: 42,
    creation: new Date(1505000000).toISOString(),
    image: '../../assets/rezeptansicht/recipePictures/0.jpg',
    tags: [
      'Fisch',
      'gebraten',
      'nordisch'
    ],
    ingredients: [
      {id: 0, name: 'Butter', amountPerPerson: 20, unit: 'g'},
      {id: 1, name: 'Lachsfilet', amountPerPerson: 100, unit: 'g'},
      {id: 4, name: 'Spargel', amountPerPerson: 2, unit: 'Stange(n)'},
      {id: 2, name: 'Salz', amountPerPerson: 1, unit: 'Prise(n)'},
      {id: 3, name: 'Pfeffer', amountPerPerson: 1, unit: 'Messerspitze(n)'},
    ],
    instructions: [
      'Wer anderen einen Braten brät, hat ein Bratenbratgerät.',
      'Dann noch mit Fisch verfeinern.',
      'Spargel rein stecken',
      'In Soße ertränken',
      'Abschließend eine Salzpyramide bauen.'
    ],
    comments: [
      {name: 'Hannelore Schmidt', text: 'Love it!', creation: new Date(1506500000).toISOString()},
      {
        name: 'Franz Paul',
        text: 'Also find des ja gar nicht gut. Mir schmeckt\'s nicht.',
        creation: new Date(1506400000).toISOString()
      },
      {
        name: 'Susanne Wagner',
        text: 'Definitiv das beste Rezept auf allen bisherigen Mockups!',
        creation: new Date(1506300000).toISOString()
      }
    ]
  };

  getMockRecipeData() {
    return Observable.of(this.mockData);
  }*/


  getIngredientByRecipe(recipeId: number): Observable<Ingredient[]> {
    let url = environment.backendUrl + "/recipe/" + recipeId;
    return this.http.get<Ingredient[]>(url);
  }

  /**
   * 💩 Alexander Krieg
   * Öffentliche Methode holt alle Kommentare zu einem Rezept.
   * Sind vom Server sortiert nach 'creationDate'.
   * @param recipeId
   * @param callback
   */
  public getRecipeComments(recipeId: Number): Observable<Comment[]> {
    let url = environment.backendUrl + "/comments/" + recipeId;
    return this.http.get<Comment[]>(url);
  }


  /**
   * 💩 Alexander Krieg
   * Führt einen Post-Request aus, um ein neuen Kommentar hinzuzufügen.
   * @param comment: Der Kommentar der hinzugefügt werden soll.
   * @param callback: Wird aufgerufen sobald eine Antwort vom Server kommt
   */
  public addComment(comment: Comment, callback?: (fail: boolean, data: any) => void): Observable<Comment> {
    return this.http.post<Comment>(environment.backendUrl + "/comment", comment);
  }
  /**
   * 💩 Alexander Krieg
   * Marc Reinke
   * Führt einen Post-Request aus, um ein Kommenar zu löschen.
   * @param comment: Der Kommentar der hinzugefügt werden soll.
   * @param callback: Wird aufgerufen sobald eine Antwort vom Server kommt
   */
  public deleteComment(comment: Comment): Observable<any> {
    return this.http.delete(environment.backendUrl + "/comment/" + comment.id);
  }


  //Kühnlein
  /**
   * Method to run corresponding GET requests
   * @param {number} recipeid
   * get the amount of up-/ downratings when loaded
   */
  public countRatingUp(recipeid: number): Observable<number> {
    return this.http.get<number>(`${environment.backendUrl}/rating/${recipeid}/count/up`)
  }
  public countRatingDown(recipeid: number): Observable<number> {
    return this.http.get<number>(`${environment.backendUrl}/rating/${recipeid}/count/down`)
  }

  /**
   * @param {number} recipeid
   * @param {number} userid
   * get the previously given rating by the current user or 0 if there is none
   */
  public getGivenRating(recipeid: number, userid: number): Observable<number> {
    return this.http.get<number>(`${environment.backendUrl}/rating/${recipeid}/${userid}`);
  }

  /**
   * Posts rating
   * @param {number} recipeid
   * @param {number} userid
   * @param {number} givenRating
   * @param {(update) => void} callback
   */
  public giveRating(recipeid: number, userid: number, givenRating: number, callback?: (update) => void): Observable<any> {
    let data = {
      recipeId: recipeid,
      userId: userid,
      value: givenRating
    };
    return this.http.post(environment.backendUrl + "/rating", data);
  }
  //!Kühnlein
}
