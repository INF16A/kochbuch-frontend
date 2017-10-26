import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {User} from '../user.model';


/**
 * @author Alexander Krieg
 */

// 💩 Alexander Krieg
export class Comment{
  public id:Number;
  public user:User;
  constructor(
    public text:String,
    public user_id:Number,
    public recipe_id:Number,
    public creationDate:Date
  ) {}
}
// 💩 Alexander Krieg

@Injectable()
export class RezeptansichtService {

  private static SERVER = "http://localhost:8080";

  constructor(private http:Http) {
  }

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
  }

  getRecipeData(recipeId) {
    return this.getMockRecipeData();
  }


  // 💩 Alexander Krieg
  /**
   * Alle Kommentare zu einem Rezept.
   * Sind vom Server sortiert nach 'creationDate'.
   * @param recipeId 
   * @param callback 
   */
  public getRecipeComments(recipeId:Number, callback: (ar:Comment[]) => void){
    this.fetchRecipeComments(recipeId).subscribe((res:Response) => {
      let ret = new Array<Comment>();
      res.json().forEach(element => {
        ret.push
      });
      let coms = res.json() as Comment[];
      callback(coms);
    }, error => {
      if(callback){
        callback([]);
      }
    });
  }
  private fetchRecipeComments(id:Number){
    let url = RezeptansichtService.SERVER+"/comments/"+id;
    return this.http.get(url);
  }
  public addComment(comment:Comment, callback?: (fail:boolean, data:any) => void){
    let url = RezeptansichtService.SERVER+"/comment";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, JSON.stringify(comment), options).subscribe(data => {
      if(callback){
        callback(false, data);
      }
    }, error => {
      if(callback){
        callback(true, error);
      }
    });
  }
  public deleteComment(comment:Comment, callback?: (fail:boolean, data:any) => void){
    let url = RezeptansichtService.SERVER+"/comment/delete";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, JSON.stringify(comment.id), options).subscribe(data => {
      if(callback){
        callback(false, data);
      }
    }, error => {
      if(callback){
        callback(true, error);
      }
    });
  }
  // 💩 Alexander Krieg

}
